// Bike Log daily reminders. Runs once a day on GitHub Actions (see .github/workflows/reminders.yml).
// Reads each bike's short summary, decides who needs a reminder, and sends it to their phones.
// Needs two secrets: FIREBASE_SERVICE_ACCOUNT (JSON key) and VAPID_PRIVATE_KEY.
"use strict";
const admin = require("firebase-admin");
const webpush = require("web-push");
const { plan } = require("./plan");

const VAPID_PUBLIC = "BM5NQ-LbSR3qXeSiyUgk__EBRcAOlN9tEDf8MJtO7rYXeMvi20IjYqhNmKh2gfOhWxfEZ1cooO4h92korfXwdio";
const APP_URL = "https://smartsolutions1.github.io/bike-logbook/";
const MAX_PER_PERSON = 2;          // at most this many reminders per person per day
const DRY = process.argv.includes("--dry-run");

function seeded(str) {             // same shuffle result for every phone of the same person today
  let h = 2166136261; for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 100000) / 100000; };
}

async function main() {
  admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
  // Tolerate spaces, line breaks or quotes pasted into the secret by mistake
  const rawKey = process.env.VAPID_PRIVATE_KEY || "";
  const vapidKey = rawKey.replace(/[^A-Za-z0-9_-]/g, "");
  if (vapidKey.length !== 43) throw new Error(`VAPID_PRIVATE_KEY secret looks wrong: ${rawKey.length} characters pasted, ${vapidKey.length} usable (should be 43). Paste it again without extra text.`);
  webpush.setVapidDetails("mailto:smartecomsolution@gmail.com", VAPID_PUBLIC, vapidKey);
  const db = admin.firestore();
  const now = new Date(), today = now.toISOString().slice(0, 10);

  // Phones with reminders on, grouped by person
  const devSnap = await db.collectionGroup("devices").get();
  const devices = new Map();
  devSnap.forEach(d => {
    const v = d.data(); if (!v.sub || v.on === false) return;
    const uid = d.ref.parent.parent.id;
    if (!devices.has(uid)) devices.set(uid, []);
    devices.get(uid).push({ ref: d.ref, sub: JSON.parse(v.sub), lang: v.lang === "ur" ? "ur" : "en" });
  });
  if (!devices.size) { console.log("No phones have reminders turned on."); return; }

  // Test mode (run by hand with "test" ticked): send one bilingual test notification to every phone, nothing else
  if (process.argv.includes("--test")) {
    let ok = 0;
    for (const [uid, phones] of devices) for (const ph of phones) {
      const en = { t: "Test reminder", b: "Bike Log reminders are working on this phone." };
      const ur = { t: "آزمائشی یاد دہانی", b: "Bike Log کی یاد دہانیاں اس فون پر کام کر رہی ہیں۔" };
      const [a, b] = ph.lang === "ur" ? [ur, en] : [en, ur];
      const payload = JSON.stringify({ title: `${a.t} · ${b.t}`, body: `${a.b}\n\n${b.t}\n${b.b}`, lang: ph.lang, tag: "bike-log-test", url: APP_URL });
      try { await webpush.sendNotification(ph.sub, payload, { TTL: 3600 }); ok++; }
      catch (e) { console.error("test send failed", e.statusCode || e.message); if (e.statusCode === 404 || e.statusCode === 410) await ph.ref.delete(); }
    }
    console.log(`Test: sent to ${ok} phone(s).`); return;
  }

  // Bikes and who can see them (owner + members of the groups the bike is shared with)
  const [bikeSnap, statSnap] = await Promise.all([db.collection("bikes").get(), db.collection("bikeStats").get()]);
  const stats = new Map(); statSnap.forEach(d => stats.set(d.id, d.data()));
  const memberCache = new Map();
  async function members(gid) {
    if (!memberCache.has(gid)) memberCache.set(gid, (await db.collection("groups").doc(gid).collection("members").get()).docs.map(m => m.id));
    return memberCache.get(gid);
  }
  const perPerson = new Map();     // uid -> [bikeId]
  for (const b of bikeSnap.docs) {
    if (!stats.has(b.id)) continue;
    const v = b.data(), who = new Set([v.ownerId]);
    for (const g of (v.groups || [])) (await members(g)).forEach(u => who.add(u));
    who.forEach(u => { if (devices.has(u)) { if (!perPerson.has(u)) perPerson.set(u, []); perPerson.get(u).push(b.id); } });
  }

  let sent = 0, removed = 0;
  for (const [uid, bikeIds] of perPerson) {
    let count = 0;
    for (const bikeId of bikeIds) {
      if (count >= MAX_PER_PERSON) break;
      const logRef = db.collection("reminderLog").doc(`${uid}_${bikeId}`);
      const log = (await logRef.get()).data() || {};
      const st = stats.get(bikeId);
      const phones = devices.get(uid);
      const result = { en: plan(st, log, "en", now, seeded(uid + bikeId + today)), ur: plan(st, log, "ur", now, seeded(uid + bikeId + today)) };
      if (!result.en) continue;
      for (const ph of phones) {
        // Every reminder carries both languages: the phone's chosen language first, the other underneath.
        const a = result[ph.lang], b = result[ph.lang === "ur" ? "en" : "ur"];
        const m = { title: `${a.title} · ${b.title}`, body: `${a.body}\n\n${b.title}\n${b.body}` };   // title shows both languages (phone's language first); full text of each kept separate below
        const payload = JSON.stringify({ title: m.title, body: m.body, lang: ph.lang, tag: `bike-${bikeId}`, url: `${APP_URL}?bike=${encodeURIComponent(bikeId)}${result.en.kind === "nudge" ? "&odo=1" : ""}` });   // "update your odometer" opens the km box
        if (DRY) { console.log(`[dry-run] ${uid.slice(0, 6)}… ${ph.lang}: ${m.title} | ${m.body}`); continue; }
        try { await webpush.sendNotification(ph.sub, payload, { TTL: 12 * 3600 }); sent++; }
        catch (e) {
          if (e.statusCode === 404 || e.statusCode === 410) { await ph.ref.delete(); removed++; }   // phone unsubscribed or app removed
          else console.error("send failed", e.statusCode || e.message);
        }
      }
      const upd = result.en.kind === "nudge" ? { nudgeAt: now.toISOString() } : { due: { ...(log.due || {}), [result.en.item]: now.toISOString() } };
      if (!DRY) await logRef.set(upd, { merge: true });
      count++;
    }
  }
  console.log(`Done. Sent ${sent} notification(s); removed ${removed} old phone subscription(s).`);
}

main().catch(e => { console.error(e); process.exit(1); });
