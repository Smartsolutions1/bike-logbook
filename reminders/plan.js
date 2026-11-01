// Bike Log reminders: decides which reminder (if any) a person gets for a bike today.
// Pure functions, so they can be tested without Firebase.
"use strict";

const DAY = 864e5;
const MON_EN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MON_UR = ["جنوری","فروری","مارچ","اپریل","مئی","جون","جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر"];
const fmt = n => Math.round(n).toLocaleString("en-US");
const parseD = s => { const [y, m, d] = String(s).split("-").map(Number); return new Date(Date.UTC(y, m - 1, d)); };
const dShort = (s, lang) => { const d = parseD(s); return `${d.getUTCDate()} ${(lang === "ur" ? MON_UR : MON_EN)[d.getUTCMonth()]}`; };
const daysBetween = (a, b) => Math.floor((b - a) / DAY);

const ITEM = {
  oil:     { en: "Oil change", ur: "آئل چینج" },
  tune:    { en: "Tuning",     ur: "ٹیوننگ" },
  service: { en: "Check-up",   ur: "چیک اپ" }
};

// What is due, how far away, and the last time it was done
function dueItems(st, now) {
  const out = [];
  const last = st.lastEntry;
  if (!last || !last.date) return out;
  const kpd = +st.kmPerDay || 0;
  const sinceLast = Math.max(0, daysBetween(parseD(last.date), now));
  const estOdo = (last.odo || 0) + kpd * Math.min(sinceLast, 60);
  const items = st.type === "electric"
    ? [["service", st.lastService, st.serviceKm || 2500, st.serviceMonths || 3]]
    : [["oil", st.lastOil, st.oilKm || 2000, 0], ["tune", st.lastTune, st.tuneKm || 3000, st.tuneMonths || 3]];
  for (const [key, done, everyKm, everyMonths] of items) {
    if (!done || !done.date) continue;
    const dueOdo = (done.odo || 0) + everyKm;
    const kmLeft = dueOdo - estOdo;
    let daysByDate = null, dueDate = null;
    if (everyMonths) {
      const d = parseD(done.date); d.setUTCMonth(d.getUTCMonth() + everyMonths);
      dueDate = d.toISOString().slice(0, 10); daysByDate = daysBetween(now, d);
    }
    const daysByKm = kpd > 0 ? kmLeft / kpd : null;
    const overdue = kmLeft <= 0 || (daysByDate !== null && daysByDate <= 0);
    const soon = overdue || kmLeft <= Math.max(150, 4 * kpd) || (daysByDate !== null && daysByDate <= 4) || (daysByKm !== null && daysByKm <= 4);
    if (soon) out.push({ key, done, dueOdo, kmLeft: Math.max(0, kmLeft), daysByDate, dueDate, overdue, estimated: kpd > 0 && sinceLast > 0 });
  }
  return out;
}

const lastDoneText = (done, lang) => {
  if (lang === "ur") return `پچھلی بار ${fmt(done.odo)} کلومیٹر پر، ${dShort(done.date, lang)} کو${done.shop ? `، ${done.shop} سے` : ""}۔`;
  return `Last done at ${fmt(done.odo)} km on ${dShort(done.date, lang)}${done.shop ? ` at ${done.shop}` : ""}.`;
};

function dueMessage(st, it, lang, pick) {
  const name = ITEM[it.key][lang === "ur" ? "ur" : "en"], bike = st.label || "your bike";
  if (lang === "ur") {
    const title = it.overdue ? `${name} کا وقت گزر گیا — ${bike}` : `${name} قریب ہے — ${bike}`;
    const left = it.overdue ? `یہ ${fmt(it.dueOdo)} کلومیٹر پر ہونا تھا۔` :
      `تقریباً ${fmt(it.kmLeft)} کلومیٹر باقی ہیں (${fmt(it.dueOdo)} کلومیٹر پر)${it.dueDate ? ` یا ${dShort(it.dueDate, lang)} تک` : ""}۔`;
    const ask = pick(["اپنی میٹر ریڈنگ چیک کریں۔", "میٹر ریڈنگ دیکھ کر ایپ میں لکھ دیں۔", "اپنے مستری سے وقت لے لیں۔"]);
    return { title, body: `${left} ${lastDoneText(it.done, lang)} ${ask}` };
  }
  const title = it.overdue ? `${name} overdue — ${bike}` : `${name} due soon — ${bike}`;
  const left = it.overdue ? `It was due at ${fmt(it.dueOdo)} km.` :
    `About ${fmt(it.kmLeft)} km left (due at ${fmt(it.dueOdo)} km)${it.dueDate ? ` or by ${dShort(it.dueDate, lang)}` : ""}.`;
  const ask = pick(["Check your meter reading.", "Check your reading and update it in Bike Log.", "Time to book it with your mechanic."]);
  return { title, body: `${left} ${lastDoneText(it.done, lang)} ${ask}` };
}

function nudgeMessage(st, days, lang, pick) {
  const bike = st.label || "your bike", le = st.lastEntry;
  const oil = st.type === "electric" ? st.lastService : st.lastOil;
  if (lang === "ur") {
    const title = pick([`میٹر ریڈنگ اپ ڈیٹ کریں — ${bike}`, `${days} دن ہو گئے — ${bike}`]);
    const parts = [`${days} دن سے کوئی ریڈنگ درج نہیں ہوئی۔ پچھلی ریڈنگ ${fmt(le.odo)} کلومیٹر (${dShort(le.date, lang)})۔`];
    if (oil) parts.push(`${st.type === "electric" ? "پچھلا چیک اپ" : "پچھلا آئل چینج"}: ${fmt(oil.odo)} کلومیٹر پر، ${dShort(oil.date, lang)} کو${oil.shop ? `، ${oil.shop} سے` : ""}۔`);
    parts.push(pick(["آج کی ریڈنگ لکھ دیں تاکہ یاد دہانیاں درست رہیں۔", "ایپ کھول کر آج کی میٹر ریڈنگ درج کریں۔"]));
    return { title, body: parts.join(" ") };
  }
  const title = pick([`Update your odometer — ${bike}`, `It's been ${days} days — ${bike}`]);
  const parts = [`No reading logged for ${days} days. Last reading: ${fmt(le.odo)} km on ${dShort(le.date, lang)}.`];
  if (oil) parts.push(`${st.type === "electric" ? "Last check-up" : "Last oil change"}: ${fmt(oil.odo)} km on ${dShort(oil.date, lang)}${oil.shop ? ` at ${oil.shop}` : ""}.`);
  parts.push(pick(["Add today's reading so your reminders stay accurate.", "Open Bike Log and add your current reading."]));
  return { title, body: parts.join(" ") };
}

// log = {nudgeAt, due:{oil,tune,service}} — when each kind was last sent for this person + bike
function plan(st, log, lang, now, rand) {
  rand = rand || Math.random;
  const pick = a => a[Math.floor(rand() * a.length) % a.length];
  log = log || {}; const dueLog = log.due || {};
  const choices = [];
  for (const it of dueItems(st, now)) {
    const sent = dueLog[it.key] ? daysBetween(new Date(dueLog[it.key]), now) : 999;
    if (sent >= 3) choices.push({ kind: "due", it });
  }
  const le = st.lastEntry;
  if (le && le.date) {
    const quiet = daysBetween(parseD(le.date), now);
    const sinceNudge = log.nudgeAt ? daysBetween(new Date(log.nudgeAt), now) : 999;
    if (quiet >= 15 && sinceNudge >= 15) choices.push({ kind: "nudge", days: quiet });
  }
  if (!choices.length) return null;
  const c = pick(choices);                                   // shuffle when several reminders are possible
  const msg = c.kind === "due" ? dueMessage(st, c.it, lang, pick) : nudgeMessage(st, c.days, lang, pick);
  return { ...msg, kind: c.kind, item: c.kind === "due" ? c.it.key : null };
}

module.exports = { plan, dueItems };
