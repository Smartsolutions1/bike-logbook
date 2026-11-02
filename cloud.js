// Bike Logbook online storage (Firebase Auth + Firestore).
// Exposes window.BikeCloud. The app talks to it through the same store
// interface it uses for on-phone storage: subscribe / put / remove /
// putBike / removeBike / setActive / putSettings, plus family-group helpers.
(function () {
  "use strict";
  const ACTIVE_KEY = "bike-logbook-active";
  const randomCode = (n) => {
    const a = "abcdefghjkmnpqrstuvwxyz23456789";
    let s = "";
    const r = (window.crypto && crypto.getRandomValues) ? crypto.getRandomValues(new Uint32Array(n)) : Array.from({ length: n }, () => Math.random() * 4e9);
    for (let i = 0; i < n; i++) s += a[r[i] % a.length];
    return s;
  };
  const lsGet = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

  let fb = null, auth = null, db = null;

  function available() { return !!(window.firebase && window.FIREBASE_CONFIG); }

  function init() {
    if (fb) return fb;
    if (!available()) return null;
    fb = firebase.initializeApp(window.FIREBASE_CONFIG);
    auth = firebase.auth();
    db = firebase.firestore();
    try { db.enablePersistence({ synchronizeTabs: true }).catch(() => {}); } catch (e) {}
    return fb;
  }

  function onAuth(cb) { init(); auth.onAuthStateChanged(cb); }

  async function signIn() {
    init();
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await auth.signInWithPopup(provider);
    } catch (err) {
      if (err && (err.code === "auth/popup-blocked" || err.code === "auth/operation-not-supported-in-this-environment")) {
        await auth.signInWithRedirect(provider);
      } else throw err;
    }
  }
  function signOut() { return auth.signOut(); }
  function currentUser() { return auth && auth.currentUser; }

  // ---------- the live store ----------
  function createStore(user, onError) {
    const uid = user.uid;
    const myName = user.displayName || (user.email ? user.email.split("@")[0] : "Me");
    const fail = (what) => (err) => { console.error(what, err); onError && onError(what, err); };

    db.collection("users").doc(uid).set({ name: myName, photo: user.photoURL || "" }, { merge: true }).catch(() => {});

    const state = {
      me: { uid, name: myName, email: user.email || "" },
      ownBikes: new Map(),      // id -> bike
      sharedBikes: new Map(),   // id -> bike (from groups)
      entriesByBike: new Map(), // bikeId -> Map(id -> entry)
      groups: new Map(),        // gid -> group {id, name, ownerId, inviteCode, bikeIds, members:[{uid,name}]}
      active: lsGet(ACTIVE_KEY),
      loaded: { own: false, groups: false },
      shops: new Map(),         // shopId -> shop (my own shop + shops I saved)
      myShopId: null, savedShops: [],
      links: new Map(),         // my own bikeId -> Map(shopId -> link): shops allowed to add jobs to that bike
      customers: [],            // bikes linked to my own shop (4.2)
    };
    const unsubs = { entries: new Map(), sharedBike: new Map(), group: new Map(), groupMembers: new Map() };
    let cb = () => {};
    let emitQueued = false;

    function allBikes() {
      const m = new Map(state.sharedBikes);
      state.ownBikes.forEach((b, id) => m.set(id, b));
      return [...m.values()].sort((a, b) => (a.ownerId === uid ? 0 : 1) - (b.ownerId === uid ? 0 : 1) || String(a.createdAt || "").localeCompare(String(b.createdAt || "")));
    }
    function emit() {
      if (emitQueued) return;
      emitQueued = true;
      Promise.resolve().then(() => {
        emitQueued = false;
        const bikes = allBikes();
        const ready = state.loaded.own && state.loaded.groups;
        if (ready && !bikes.some((b) => b.id === state.active)) state.active = bikes.length ? bikes[0].id : null;
        const entries = [];
        state.entriesByBike.forEach((m) => m.forEach((e) => entries.push(e)));
        cb({
          bikes, active: state.active, entries,
          groups: [...state.groups.values()],
          me: state.me,
          ready,
          myShop: state.myShopId ? (state.shops.get(state.myShopId) || null) : null,
          savedShops: state.savedShops.map((id) => state.shops.get(id)).filter(Boolean),
          links: [...state.links.values()].flatMap((m) => [...m.values()]),
          customers: state.customers,
        });
      });
    }

    function watchEntries(bikeId) {
      if (unsubs.entries.has(bikeId)) return;
      const m = new Map();
      state.entriesByBike.set(bikeId, m);
      const un = db.collection("bikes").doc(bikeId).collection("entries").onSnapshot((snap) => {
        snap.docChanges().forEach((ch) => {
          if (ch.type === "removed") m.delete(ch.doc.id);
          else m.set(ch.doc.id, { ...ch.doc.data(), id: ch.doc.id, bikeId });
        });
        emit();
      }, () => { m.clear(); emit(); });
      unsubs.entries.set(bikeId, un);
    }
    function unwatchEntriesIfGone(bikeId) {
      if (state.ownBikes.has(bikeId) || state.sharedBikes.has(bikeId)) return;
      const un = unsubs.entries.get(bikeId);
      if (un) { un(); unsubs.entries.delete(bikeId); }
      state.entriesByBike.delete(bikeId);
    }

    // Shops linked to my own bikes (4.2). Also copies each link into the shop's customer list.
    const linkUnsubs = new Map();
    function watchLinks(bikeId) {
      if (linkUnsubs.has(bikeId)) return;
      const m = new Map(); state.links.set(bikeId, m);
      linkUnsubs.set(bikeId, db.collection("bikes").doc(bikeId).collection("links").onSnapshot((snap) => {
        snap.docChanges().forEach((ch) => {
          if (ch.type === "removed") { m.delete(ch.doc.id); return; }
          const l = { ...ch.doc.data(), shopId: ch.doc.id, bikeId };
          m.set(ch.doc.id, l);
          if (!l.listed) writeCustomer(bikeId, ch.doc.id).catch(() => {});
        });
        emit();
      }, () => {}));
    }
    function unwatchLinks(bikeId) {
      const u = linkUnsubs.get(bikeId); if (u) u(); linkUnsubs.delete(bikeId); state.links.delete(bikeId);
    }
    async function writeCustomer(bikeId, shopId) {
      const b = state.ownBikes.get(bikeId); if (!b) return;
      await db.collection("shops").doc(shopId).collection("customers").doc(bikeId).set({
        bikeId, bikeLabel: [b.model, b.name].filter(Boolean).join(" · "), type: b.type === "electric" ? "electric" : "petrol",
        ownerId: uid, ownerName: myName, at: now() });
      await db.collection("bikes").doc(bikeId).collection("links").doc(shopId).set({ listed: true }, { merge: true });
    }
    let unCustomers = null, customersOf = null;
    function watchCustomers(shopId) {
      if (customersOf === shopId) return;
      if (unCustomers) { unCustomers(); unCustomers = null; }
      customersOf = shopId; state.customers = [];
      if (!shopId) return;
      unCustomers = db.collection("shops").doc(shopId).collection("customers").onSnapshot((snap) => {
        state.customers = snap.docs.map((d) => ({ ...d.data(), bikeId: d.id }))
          .sort((a, b) => String(b.at || "").localeCompare(String(a.at || "")));
        emit();
      }, () => { state.customers = []; emit(); });
    }

    // My own bikes
    const unOwn = db.collection("bikes").where("ownerId", "==", uid).onSnapshot((snap) => {
      snap.docChanges().forEach((ch) => {
        const id = ch.doc.id;
        if (ch.type === "removed") { state.ownBikes.delete(id); unwatchEntriesIfGone(id); unwatchLinks(id); }
        else { state.ownBikes.set(id, { ...ch.doc.data(), id }); watchEntries(id); watchLinks(id); }
      });
      state.loaded.own = true;
      emit();
    }, fail("Couldn't load your bikes"));

    // Bikes shared through groups
    function syncSharedBikes() {
      const wanted = new Set();
      state.groups.forEach((g) => (g.bikeIds || []).forEach((id) => { if (!state.ownBikes.has(id)) wanted.add(id); }));
      wanted.forEach((id) => {
        if (unsubs.sharedBike.has(id)) return;
        const un = db.collection("bikes").doc(id).onSnapshot((d) => {
          if (d.exists && d.data().ownerId !== uid) { state.sharedBikes.set(id, { ...d.data(), id }); watchEntries(id); }
          else { state.sharedBikes.delete(id); unwatchEntriesIfGone(id); }
          emit();
        }, () => { state.sharedBikes.delete(id); unwatchEntriesIfGone(id); emit(); });
        unsubs.sharedBike.set(id, un);
      });
      [...unsubs.sharedBike.keys()].forEach((id) => {
        if (!wanted.has(id)) { unsubs.sharedBike.get(id)(); unsubs.sharedBike.delete(id); state.sharedBikes.delete(id); unwatchEntriesIfGone(id); }
      });
    }

    // Groups I belong to (listed on my own profile document)
    function dropGroup(gid) {
      const u = unsubs.group.get(gid); if (u) u(); unsubs.group.delete(gid);
      const um = unsubs.groupMembers.get(gid); if (um) um(); unsubs.groupMembers.delete(gid);
      state.groups.delete(gid);
    }
    function forgetGroup(gid) {
      // I was removed from it, or it no longer exists
      dropGroup(gid);
      db.collection("users").doc(uid).update({ groups: firebase.firestore.FieldValue.arrayRemove(gid) }).catch(() => {});
      syncSharedBikes(); emit();
    }
    const shopUnsubs = new Map();
    function watchShop(id) {
      if (!id || shopUnsubs.has(id)) return;
      shopUnsubs.set(id, db.collection("shops").doc(id).onSnapshot((sd) => {
        if (sd.exists) state.shops.set(id, { ...sd.data(), id }); else state.shops.delete(id);
        emit();
      }, () => {}));
    }
    const unMemberships = db.collection("users").doc(uid).onSnapshot((d) => {
      const ud = d.exists ? d.data() : {};
      state.myShopId = ud.shopId || null; watchShop(state.myShopId); watchCustomers(state.myShopId);
      state.savedShops = Array.isArray(ud.myShops) ? ud.myShops.slice(-20) : []; state.savedShops.forEach(watchShop);
      const list = (d.exists && Array.isArray(d.data().groups)) ? d.data().groups : [];
      const gids = new Set(list);
      gids.forEach((gid) => {
        if (unsubs.group.has(gid)) return;
        unsubs.group.set(gid, db.collection("groups").doc(gid).onSnapshot((gd) => {
          if (!gd.exists) { forgetGroup(gid); return; }
          const prev = state.groups.get(gid) || {};
          state.groups.set(gid, { ...gd.data(), id: gid, members: prev.members || [] });
          syncSharedBikes(); emit();
        }, () => forgetGroup(gid)));
        unsubs.groupMembers.set(gid, db.collection("groups").doc(gid).collection("members").onSnapshot((ms) => {
          const members = ms.docs.map((m) => ({ uid: m.id, name: m.data().name || "Someone" }));
          const g = state.groups.get(gid);
          if (g) { g.members = members; emit(); }
        }, () => {}));
      });
      [...unsubs.group.keys()].forEach((gid) => { if (!gids.has(gid)) dropGroup(gid); });
      state.loaded.groups = true;
      syncSharedBikes(); emit();
    }, (err) => { state.loaded.groups = true; emit(); fail("Couldn't load your family groups")(err); });

    // ---------- writes (saved on the phone at once, uploaded when online) ----------
    const now = () => new Date().toISOString();
    function findEntry(id) { for (const m of state.entriesByBike.values()) if (m.has(id)) return m.get(id); return null; }
    function bikeById(id) { return state.ownBikes.get(id) || state.sharedBikes.get(id) || null; }

    const store = {
      mode: "cloud",
      subscribe(fn) { cb = fn; emit(); },
      async put(e) {
        const bikeId = e.bikeId || state.active;
        if (!bikeId) throw new Error("no bike");
        const existing = findEntry(e.id);
        const { id, ...body } = e;
        body.bikeId = bikeId;
        body.addedBy = existing ? existing.addedBy : uid;
        body.addedByName = existing ? (existing.addedByName || "") : myName;
        body.updatedAt = now();
        if (!existing) body.createdAt = now();
        Object.keys(body).forEach((k) => body[k] === undefined && delete body[k]);
        db.collection("bikes").doc(bikeId).collection("entries").doc(id).set(body).catch(fail("Couldn't save that entry"));
      },
      async remove(id) {
        const e = findEntry(id); if (!e) return;
        db.collection("bikes").doc(e.bikeId).collection("entries").doc(id).delete().catch(fail("Couldn't delete that entry"));
      },
      async putBike(b) {
        const prev = state.ownBikes.get(b.id);
        if (!prev && state.sharedBikes.has(b.id)) throw new Error("not owner");
        const groups = (b.groups || []).filter((g) => state.groups.has(g)).slice(0, 3);
        const body = {
          name: b.name || "", model: b.model || "", currency: b.currency || "Rs", startOdo: b.startOdo || 0,
          type: b.type === "electric" ? "electric" : "petrol", batteryKwh: b.batteryKwh || 0, unitRate: b.unitRate || 0,
          serviceKm: b.serviceKm || 2500, serviceMonths: b.serviceMonths || 3,
          oilKm: b.oilKm || 2000, tuneKm: b.tuneKm || 3000, tuneMonths: b.tuneMonths || 3,
          partLife: b.partLife || {}, ownerId: uid, ownerName: myName, groups,
          createdAt: (prev && prev.createdAt) || b.createdAt || now(), updatedAt: now(),
        };
        db.collection("bikes").doc(b.id).set(body).then(() => {
          const before = new Set((prev && prev.groups) || []);
          groups.forEach((g) => { if (!before.has(g)) db.collection("groups").doc(g).update({ bikeIds: firebase.firestore.FieldValue.arrayUnion(b.id) }).catch(fail("Couldn't share the bike")); });
          before.forEach((g) => { if (!groups.includes(g) && state.groups.has(g)) db.collection("groups").doc(g).update({ bikeIds: firebase.firestore.FieldValue.arrayRemove(b.id) }).catch(() => {}); });
        }).catch(fail("Couldn't save the bike"));
        // show it straight away even before the server answers
        state.ownBikes.set(b.id, { ...body, id: b.id }); watchEntries(b.id); emit();
      },
      async removeBike(id) {
        const b = state.ownBikes.get(id); if (!b) return;
        const m = state.entriesByBike.get(id);
        if (m) m.forEach((e) => db.collection("bikes").doc(id).collection("entries").doc(e.id).delete().catch(() => {}));
        (b.groups || []).forEach((g) => db.collection("groups").doc(g).update({ bikeIds: firebase.firestore.FieldValue.arrayRemove(id) }).catch(() => {}));
        db.collection("bikes").doc(id).delete().catch(fail("Couldn't delete the bike"));
        state.ownBikes.delete(id); unwatchEntriesIfGone(id);
        if (state.active === id) { state.active = null; lsSet(ACTIVE_KEY, ""); }
        emit();
      },
      async setActive(id) { state.active = id; lsSet(ACTIVE_KEY, id); emit(); },
      async putSettings(sv) {
        const b = state.ownBikes.get(state.active); if (!b) return;
        return store.putBike({ ...b, ...sv, id: b.id });
      },

      // ---------- family groups ----------
      isOwner(bikeId) { const b = bikeById(bikeId); return !!b && b.ownerId === uid; },
      async createGroup(name) {
        const ref = db.collection("groups").doc();
        const inviteCode = randomCode(10);
        await ref.set({ name: name || "Family", ownerId: uid, ownerName: myName, inviteCode, bikeIds: [], createdAt: now() });
        await ref.collection("members").doc(uid).set({ uid, name: myName, code: inviteCode, joinedAt: now() });
        await db.collection("users").doc(uid).set({ groups: firebase.firestore.FieldValue.arrayUnion(ref.id) }, { merge: true });
        return ref.id;
      },
      inviteLink(gid) {
        const g = state.groups.get(gid); if (!g || !g.inviteCode) return "";
        const base = location.origin + location.pathname;
        return `${base}?join=${encodeURIComponent(gid)}&code=${encodeURIComponent(g.inviteCode)}&g=${encodeURIComponent(g.name || "Family")}`;
      },
      async joinGroup(gid, code) {
        await db.collection("groups").doc(gid).collection("members").doc(uid).set({ uid, name: myName, code, joinedAt: now() });
        await db.collection("users").doc(uid).set({ groups: firebase.firestore.FieldValue.arrayUnion(gid) }, { merge: true });
      },
      async leaveGroup(gid) {
        // take my bikes out of the group first
        state.ownBikes.forEach((b) => { if ((b.groups || []).includes(gid)) store.putBike({ ...b, groups: b.groups.filter((x) => x !== gid) }); });
        await db.collection("groups").doc(gid).collection("members").doc(uid).delete();
        await db.collection("users").doc(uid).update({ groups: firebase.firestore.FieldValue.arrayRemove(gid) });
      },
      async removeMember(gid, memberUid) {
        await db.collection("groups").doc(gid).collection("members").doc(memberUid).delete();
      },
      // ---------- phone reminders ----------
      async saveDevice(id, data) {
        await db.collection("users").doc(uid).collection("devices").doc(id).set({ ...data, updatedAt: now() }, { merge: true });
      },
      async deleteDevice(id) {
        await db.collection("users").doc(uid).collection("devices").doc(id).delete();
      },
      writeStats(bikeId, stats) {
        db.collection("bikeStats").doc(bikeId).set({ ...stats, updatedAt: now() }).catch(() => {});
      },
      // ---------- shops (mechanics and parts shops) ----------
      async saveShop(data) {
        const id = state.myShopId || randomCode(8);
        const prev = state.shops.get(id);
        const body = { ...data, ownerId: uid, ownerName: myName, updatedAt: now(), createdAt: (prev && prev.createdAt) || now() };
        Object.keys(body).forEach((k) => body[k] === undefined && delete body[k]);
        await db.collection("shops").doc(id).set(body);
        if (!state.myShopId) await db.collection("users").doc(uid).set({ shopId: id }, { merge: true });
        return id;
      },
      async getShop(id) {
        if (state.shops.has(id)) return state.shops.get(id);
        const d = await db.collection("shops").doc(id).get();
        return d.exists ? { ...d.data(), id } : null;
      },
      async saveShopToMine(id) {
        await db.collection("users").doc(uid).set({ myShops: firebase.firestore.FieldValue.arrayUnion(id) }, { merge: true });
      },
      async forgetShop(id) {
        await db.collection("users").doc(uid).set({ myShops: firebase.firestore.FieldValue.arrayRemove(id) }, { merge: true });
      },
      // Lets that shop add jobs to this bike (used from version 4.2). Only the bike's owner can do this.
      async linkBikeToShop(bikeId, shop) {
        const b = bikeById(bikeId); if (!b || b.ownerId !== uid) return false;
        await db.collection("bikes").doc(bikeId).collection("links").doc(shop.id).set({
          shopId: shop.id, shopName: shop.name || "", bikeLabel: [b.model, b.name].filter(Boolean).join(" · "),
          ownerId: uid, ownerName: myName, status: "active", at: now() });
        await writeCustomer(bikeId, shop.id).catch(() => {});
        return true;
      },
      // The bike's owner stops a shop from adding jobs. Jobs it already added stay in the bike's history.
      async unlinkBikeFromShop(bikeId, shopId) {
        const b = state.ownBikes.get(bikeId); if (!b) return false;
        await db.collection("shops").doc(shopId).collection("customers").doc(bikeId).delete().catch(() => {});
        await db.collection("bikes").doc(bikeId).collection("links").doc(shopId).delete();
        return true;
      },
      // ---------- my shop's customers (4.2) ----------
      async shopJobs(bikeId) {
        if (!state.myShopId) return [];
        const snap = await db.collection("bikes").doc(bikeId).collection("entries").where("shopId", "==", state.myShopId).get();
        return snap.docs.map((d) => ({ ...d.data(), id: d.id, bikeId })).filter((e) => !e.deleted)
          .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")) || (b.odo || 0) - (a.odo || 0));
      },
      async addShopJob(bikeId, e) {
        const shop = state.myShopId && state.shops.get(state.myShopId);
        if (!shop) throw new Error("no shop");
        const { id, ...body } = e;
        Object.assign(body, { bikeId, shop: shop.name || "", shopId: shop.id, addedBy: uid, addedByName: shop.name || myName,
          byShop: true, createdAt: now(), updatedAt: now() });
        Object.keys(body).forEach((k) => body[k] === undefined && delete body[k]);
        await db.collection("bikes").doc(bikeId).collection("entries").doc(id).set(body);
      },
      async deleteShopJob(job) {
        const { id, bikeId, ...body } = job;
        await db.collection("bikes").doc(bikeId).collection("entries").doc(id).set({ ...body, bikeId, deleted: true, deletedAt: now(), deletedBy: uid, deletedByName: body.shop || myName, updatedAt: now() });
      },
      shopLink(id) { return `${location.origin}${location.pathname}?shop=${encodeURIComponent(id)}`; },
      async renameGroup(gid, name) {
        await db.collection("groups").doc(gid).update({ name });
      },
      stop() {
        unOwn(); unMemberships(); shopUnsubs.forEach((u) => u()); shopUnsubs.clear();
        linkUnsubs.forEach((u) => u()); linkUnsubs.clear(); if (unCustomers) unCustomers();
        [unsubs.entries, unsubs.sharedBike, unsubs.group, unsubs.groupMembers].forEach((m) => { m.forEach((u) => u()); m.clear(); });
      },
    };
    return store;
  }

  window.BikeCloud = { available, init, onAuth, signIn, signOut, currentUser, createStore };
})();
