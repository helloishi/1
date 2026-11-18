/* London Civic Hack 2026 — shared helpers (no dependencies, exposes window.Civic).
   Everything degrades gracefully: storage may be blocked, network may be blocked,
   geolocation may be refused. Callers always get a value or a clear error. */
(function () {
  "use strict";

  const LONDON = { lat: 51.5072, lon: -0.1276 };
  const BBOX = { minLat: 51.25, maxLat: 51.72, minLon: -0.56, maxLon: 0.36 };

  // ---------- DOM ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /** el("button", {class: "btn", onclick: fn, "aria-label": "x"}, "Text", childNode) */
  function el(tag, attrs, ...children) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v == null || v === false) continue;
        if (k === "class") node.className = v;
        else if (k === "html") node.innerHTML = v; // only for trusted, static markup (icons)
        else if (k === "dataset") Object.assign(node.dataset, v);
        else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
        else if (v === true) node.setAttribute(k, "");
        else node.setAttribute(k, String(v));
      }
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      node.append(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return node;
  }

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- Storage (never throws) ----------
  const store = {
    get(key, fallback = null) {
      try { const v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
    },
    del(key) { try { localStorage.removeItem(key); } catch { /* ignore */ } },
  };

  // ---------- Network ----------
  /** Fetch JSON with a timeout. Rejects with Error("offline" | "timeout" | "http 4xx" | "blocked"). */
  async function fetchJSON(url, { timeout = 9000, headers } = {}) {
    if (typeof navigator !== "undefined" && navigator.onLine === false) throw new Error("offline");
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeout);
    try {
      const res = await fetch(url, { signal: ctrl.signal, headers, credentials: "omit" });
      if (!res.ok) throw new Error("http " + res.status);
      return await res.json();
    } catch (e) {
      if (e.name === "AbortError") throw new Error("timeout");
      if (e instanceof TypeError) throw new Error("blocked"); // CORS, CSP or no network
      throw e;
    } finally {
      clearTimeout(t);
    }
  }

  /** Stale-while-offline cache around a loader. Returns {data, fromCache, savedAt}. */
  async function cached(key, maxAgeMs, loader) {
    const hit = store.get("cache:" + key);
    if (hit && Date.now() - hit.savedAt < maxAgeMs) return { data: hit.data, fromCache: true, savedAt: hit.savedAt };
    try {
      const data = await loader();
      store.set("cache:" + key, { savedAt: Date.now(), data });
      return { data, fromCache: false, savedAt: Date.now() };
    } catch (err) {
      if (hit) return { data: hit.data, fromCache: true, stale: true, savedAt: hit.savedAt, error: err };
      throw err;
    }
  }

  /** Load a JSON file shipped with the app (works on static hosting and in artifacts). */
  async function local(path) {
    const res = await fetch(path, { credentials: "same-origin" });
    if (!res.ok) throw new Error("missing " + path);
    return res.json();
  }

  // ---------- Location ----------
  /** Resolves {lat, lon, accuracy} or rejects with Error("unsupported" | "denied" | "unavailable" | "timeout"). */
  function geo({ timeout = 10000, highAccuracy = false } = {}) {
    return new Promise((resolve, reject) => {
      if (!("geolocation" in navigator)) return reject(new Error("unsupported"));
      try {
        navigator.geolocation.getCurrentPosition(
          (p) => resolve({ lat: p.coords.latitude, lon: p.coords.longitude, accuracy: p.coords.accuracy }),
          (e) => reject(new Error(e.code === 1 ? "denied" : e.code === 3 ? "timeout" : "unavailable")),
          { timeout, enableHighAccuracy: highAccuracy, maximumAge: 120000 }
        );
      } catch {
        reject(new Error("denied"));
      }
    });
  }

  const inLondon = (lat, lon) => lat >= BBOX.minLat && lat <= BBOX.maxLat && lon >= BBOX.minLon && lon <= BBOX.maxLon;

  function distanceM(a, b) {
    const R = 6371000, rad = Math.PI / 180;
    const dLat = (b.lat - a.lat) * rad, dLon = (b.lon - a.lon) * rad;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  const fmtDistance = (m) => (m < 950 ? Math.round(m / 10) * 10 + " m" : (m / 1000).toFixed(m < 9500 ? 1 : 0) + " km");
  const walkMins = (m) => Math.max(1, Math.round(m / 80)); // ~4.8 km/h

  // ---------- Time (always London time) ----------
  function londonNow(date = new Date()) {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
      year: "numeric", month: "2-digit", day: "2-digit",
    }).formatToParts(date).reduce((o, p) => ((o[p.type] = p.value), o), {});
    const dow = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(parts.weekday); // 0 = Monday
    const hh = Number(parts.hour) % 24, mm = Number(parts.minute);
    return { dow, hh, mm, minutes: hh * 60 + mm, iso: `${parts.year}-${parts.month}-${parts.day}`, label: `${parts.weekday} ${parts.hour}:${parts.minute}` };
  }
  const relTime = (ts) => {
    const s = Math.round((Date.now() - ts) / 1000);
    if (s < 60) return "just now";
    if (s < 3600) return Math.round(s / 60) + " min ago";
    if (s < 86400) return Math.round(s / 3600) + " h ago";
    return Math.round(s / 86400) + " days ago";
  };

  // ---------- UI helpers ----------
  let toastTimer;
  function toast(msg, ms = 2600) {
    let t = $(".toast");
    if (!t) { t = el("div", { class: "toast", role: "status", "aria-live": "polite" }); document.body.append(t); }
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (t.hidden = true), ms);
  }

  /** Copy inside a click handler. Falls back to selecting the text. */
  async function copy(text, label = "Copied") {
    try {
      await navigator.clipboard.writeText(text);
      toast(label);
      return true;
    } catch {
      const ta = el("textarea", { class: "sr-only", readonly: true });
      ta.value = text; document.body.append(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch { ok = false; }
      ta.remove();
      toast(ok ? label : "Select and copy: " + text, ok ? 2600 : 6000);
      return ok;
    }
  }

  /** Online / offline banner. Pass an element; it is shown while offline. */
  function watchOnline(banner) {
    const sync = () => { if (banner) banner.hidden = navigator.onLine !== false; };
    window.addEventListener("online", sync); window.addEventListener("offline", sync); sync();
  }

  // ---------- Preferences: theme + text size ----------
  const prefs = {
    apply() {
      const p = store.get("civic:prefs", {});
      const root = document.documentElement;
      if (p.theme === "light" || p.theme === "dark") root.dataset.theme = p.theme; else delete root.dataset.theme;
      if (p.size === "l" || p.size === "xl") root.dataset.size = p.size; else delete root.dataset.size;
      return p;
    },
    set(patch) { store.set("civic:prefs", { ...store.get("civic:prefs", {}), ...patch }); return prefs.apply(); },
    get() { return store.get("civic:prefs", {}); },
  };

  // ---------- Hash tabs (artifact-safe: plain #name only) ----------
  /** tabs({home: sectionEl, map: sectionEl}, "home", onChange) — wires [data-tab] links/buttons too. */
  function tabs(views, fallback, onChange) {
    const show = () => {
      const name = (location.hash || "").replace(/^#/, "");
      const key = views[name] ? name : fallback;
      for (const [k, v] of Object.entries(views)) v.hidden = k !== key;
      $$("[data-tab]").forEach((b) => b.setAttribute("aria-current", b.dataset.tab === key ? "page" : "false"));
      if (onChange) onChange(key);
      window.scrollTo({ top: 0 });
    };
    $$("[data-tab]").forEach((b) => b.addEventListener("click", (e) => {
      e.preventDefault();
      if (location.hash === "#" + b.dataset.tab) show(); else location.hash = b.dataset.tab;
    }));
    window.addEventListener("hashchange", show);
    show();
    return { go: (k) => (location.hash = k), show };
  }

  // ---------- Service worker (only where supported; never in artifact frames) ----------
  function registerSW(path = "sw.js") {
    try {
      const okProto = location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1";
      if ("serviceWorker" in navigator && okProto && window.top === window.self) {
        navigator.serviceWorker.register(path).catch(() => {});
      }
    } catch { /* sandboxed frame */ }
  }

  // ---------- i18n ----------
  /** t(dict, lang)(key) with English fallback. dict = {en: {...}, es: {...}} */
  const i18n = (dict, lang) => (key) => (dict[lang] && dict[lang][key]) || (dict.en && dict.en[key]) || key;

  // ---------- Icons (24px stroke icons; trusted static markup) ----------
  const ICON = {
    home: '<path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z"/>',
    shield: '<path d="M12 3 4 6v6c0 4.4 3.4 8.5 8 9 4.6-.5 8-4.6 8-9V6z"/>',
    map: '<path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"/>',
    alert: '<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17.5v.5"/>',
    phone: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    pin: '<path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    plane: '<path d="M10.5 13.5 3 11l1.5-2 7 1 4-4.5c.8-.8 2.2-.8 3 0s.8 2.2 0 3l-4.5 4 1 7-2 1.5-2.5-7.5-3 3V20l-1.5 1-1-3-3-1L3 15.5h3l3-3"/>',
    card: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6 15h4"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    lift: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="m9 9 3-3 3 3M9 15l3 3 3-3"/>',
    calm: '<path d="M3 12c2.5-3 5.5-3 8 0s5.5 3 8 0M3 17c2.5-3 5.5-3 8 0s5.5 3 8 0M3 7c2.5-3 5.5-3 8 0s5.5 3 8 0"/>',
    gift: '<rect x="3" y="8" width="18" height="13" rx="1.5"/><path d="M12 8v13M3 12h18M12 8S10.5 3 7.5 4.5 9 8 12 8zm0 0s1.5-5 4.5-3.5S15 8 12 8z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    rain: '<path d="M7 15a4.5 4.5 0 1 1 .9-8.9A6 6 0 0 1 19 9a4 4 0 0 1 0 8H7"/><path d="M8 19l-1 2M12 19l-1 2M16 19l-1 2"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    back: '<path d="m15 6-6 6 6 6"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    exit: '<path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 17l5-5-5-5M15 12H3"/>',
    train: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M8.5 21l1.5-4M15.5 21 14 17M9 14h.01M15 14h.01"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c1.8.7 3 2.5 3.5 5.2"/>',
  };
  /** icon("shield") → inline SVG string (aria-hidden) */
  const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name] || ICON.info}</svg>`;

  window.Civic = {
    LONDON, $, $$, el, esc, store, fetchJSON, cached, local, geo, inLondon, distanceM, fmtDistance, walkMins,
    londonNow, relTime, toast, copy, watchOnline, prefs, tabs, registerSW, i18n, icon,
  };
  prefs.apply();
})();
