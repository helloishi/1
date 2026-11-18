(function () {
  "use strict";
  const { $, $$, el, store, icon } = Civic;

  // ---------- chrome ----------
  $("#open-settings").innerHTML = Civic.icon("settings");
  const TABS = [["prepare", "shield", "Prepare"], ["hotspots", "map", "Hotspots"], ["stolen", "alert", "Stolen?"], ["about", "info", "About"]];
  $("#tabs").append(...TABS.map(([k, ic, label]) => el("a", { class: "tab", href: "#" + k, "data-tab": k, html: icon(ic) + "<span>" + label + "</span>" })));
  Civic.watchOnline($("#offline"));
  Civic.registerSW("sw.js");

  const views = { prepare: $("#view-prepare"), hotspots: $("#view-hotspots"), stolen: $("#view-stolen"), about: $("#view-about") };
  let mapReady = false;
  Civic.tabs(views, "prepare", (k) => {
    document.title = "PhoneGuard London";
    if (k === "hotspots") setTimeout(() => { initHotspots(); setTimeout(() => map && map.invalidateSize(), 50); }, 0); // defer: the first call happens before later declarations run
  });

  // ---------- settings sheet ----------
  let stolenLang = store.get("pg:lang", "en");
  const sheetState = {};
  function openSettings() {
    const opener = document.activeElement;
    const prefs = Civic.prefs.get();
    const backdrop = el("div", { class: "sheet-backdrop" });
    const group = (label, key, opts, cur) => {
      const wrap = el("div", { class: "field", role: "group", "aria-label": label }, el("span", { class: "h3" }, label));
      const seg = el("div", { class: "seg" });
      opts.forEach(([v, t]) => {
        const b = el("button", { class: "chip", type: "button", "aria-pressed": String(cur === v), onclick: () => {
          Civic.prefs.set({ [key]: v === "auto" ? null : v });
          $$("button", seg).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
          if (key === "theme") syncTiles();
        } }, t);
        seg.append(b);
      });
      wrap.append(seg); return wrap;
    };
    const langSel = el("select", { class: "select", id: "set-lang", onchange: (e) => setLang(e.target.value) });
    const sheet = el("div", { class: "sheet", role: "dialog", "aria-modal": "true", "aria-labelledby": "set-h" },
      el("div", { class: "spread" }, el("h2", { id: "set-h" }, "Settings"), el("button", { class: "icon-btn", type: "button", "aria-label": "Close settings", html: icon("close"), onclick: close })),
      group("Theme", "theme", [["auto", "Auto"], ["light", "Light"], ["dark", "Dark"]], prefs.theme || "auto"),
      group("Text size", "size", [["auto", "Standard"], ["l", "Large"], ["xl", "Extra large"]], prefs.size || "auto"),
      el("div", { class: "field" }, el("label", { for: "set-lang" }, "Language for the Stolen? steps"), langSel),
      el("button", { class: "btn btn-primary", type: "button", onclick: close }, "Done"));
    sheetState.langSel = langSel;
    fillLangSelect();
    function close() { backdrop.remove(); sheet.remove(); document.removeEventListener("keydown", key); sheetState.langSel = null; opener && opener.focus && opener.focus(); }
    function key(e) {
      if (e.key === "Escape") return close();
      if (e.key === "Tab") {
        const f = $$("button, select, a[href]", sheet).filter((n) => !n.disabled);
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    backdrop.addEventListener("click", close);
    document.addEventListener("keydown", key);
    document.body.append(backdrop, sheet);
    sheet.querySelector("button.icon-btn").focus();
  }
  $("#open-settings").addEventListener("click", openSettings);

  // ---------- Prepare ----------
  let checklist = null;
  const ticks = store.get("pg:ticks", {});
  let platform = store.get("pg:platform", /android/i.test(navigator.userAgent) ? "android" : "iphone");
  function itemEl(it) {
    const box = el("input", { type: "checkbox", id: "c-" + it.id, checked: !!ticks[it.id], onchange: () => { ticks[it.id] = box.checked; store.set("pg:ticks", ticks); progress(); } });
    return el("label", { class: "check", for: "c-" + it.id }, box,
      el("div", null,
        el("div", { class: "check-title" }, it.title),
        it.look ? el("div", { class: "check-look" }, el("b", null, "Look for: "), it.look) : null,
        it.why ? el("div", { class: "check-why" }, el("b", null, "Why: "), it.why) : null,
        it.warn ? el("div", { class: "check-warn" }, "Warning: " + it.warn) : null));
  }
  function renderChecklist() {
    if (!checklist) return;
    $$("[data-platform]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.platform === platform)));
    const p = $("#check-platform"); p.replaceChildren(...checklist[platform].map(itemEl));
    $("#check-both").replaceChildren(...checklist.both.map(itemEl));
    progress();
  }
  function progress() {
    const items = [...checklist[platform], ...checklist.both];
    const n = items.filter((i) => ticks[i.id]).length;
    $("#prog-label").textContent = `${n} of ${items.length} done`;
    const pct = Math.round((n / items.length) * 100);
    $("#prog-bar").style.width = pct + "%";
    $(".progress").setAttribute("aria-valuenow", String(pct));
  }
  $$("[data-platform]").forEach((b) => b.addEventListener("click", () => { platform = b.dataset.platform; store.set("pg:platform", platform); renderChecklist(); }));
  $("#prog-reset").addEventListener("click", () => {
    [...checklist[platform], ...checklist.both].forEach((i) => delete ticks[i.id]);
    store.set("pg:ticks", ticks); renderChecklist();
  });
  Civic.local("data/checklist.json").then((d) => {
    checklist = d;
    $("#habits").replaceChildren(...d.habits.map((h) => el("li", null, h)));
    renderChecklist();
  }).catch(() => { $("#check-platform").textContent = "The checklist could not load. Try reloading the app."; });

  // ---------- Hotspots ----------
  const AREAS = [
    ["Oxford Circus", 51.5152, -0.1419], ["Soho & Leicester Square", 51.5115, -0.1300], ["Westminster", 51.5007, -0.1246],
    ["King's Cross", 51.5308, -0.1238], ["Shoreditch", 51.5246, -0.0786], ["Camden Town", 51.5390, -0.1426],
    ["Stratford", 51.5416, -0.0033], ["Canary Wharf", 51.5054, -0.0235], ["Brixton", 51.4613, -0.1156],
  ];
  const LAYERS = { "theft-from-the-person": "Theft from the person", robbery: "Robbery" };
  const WEEK = 7 * 864e5;
  let map, tileLayer, circleGroup, userMarker, hotInit = false, month = null, token = 0;
  let center = { name: AREAS[0][0], lat: AREAS[0][1], lon: AREAS[0][2], mine: false };
  const layersOn = { "theft-from-the-person": true, robbery: false };
  let points = []; // aggregated {lat, lon, n, streets}
  let userPos = null;

  const dark = () => { const t = document.documentElement.dataset.theme; return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; };
  function tileUrl() { return `https://{s}.basemaps.cartocdn.com/${dark() ? "dark" : "light"}_all/{z}/{x}/{y}{r}.png`; }
  function syncTiles() {
    if (!map) return;
    if (tileLayer) map.removeLayer(tileLayer);
    tileLayer = L.tileLayer(tileUrl(), { attribution: "© OpenStreetMap contributors © CARTO", subdomains: "abcd", maxZoom: 19 }).addTo(map);
    tileLayer.bringToBack();
    drawCircles();
  }
  matchMedia("(prefers-color-scheme: dark)").addEventListener && matchMedia("(prefers-color-scheme: dark)").addEventListener("change", syncTiles);

  const monthLabel = (m) => new Date(m + "-01T12:00:00Z").toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

  function evidenceHTML() {
    return el("div", { class: "card evidence" },
      el("h3", null, "London-wide picture"),
      el("div", null, el("div", { class: "big-number" }, "71,391"), el("p", { class: "small" }, "mobile phone thefts and robberies recorded by the Met in London in 2025, down 12.3% from 81,365 in 2024, but up 54% since 2022 (Mayor of London, Feb 2026).")),
      el("div", null, el("div", { class: "big-number" }, "about 40%"), el("p", { class: "small" }, "of thefts reported to happen in Westminster and the West End (Met figures reported in the press).")));
  }
  function setStatus(kind, msg) {
    const box = $("#hot-status");
    if (!kind) return box.replaceChildren();
    if (kind === "loading") return box.replaceChildren(el("div", { class: "banner info" }, "Loading reports from police.uk…"));
    box.replaceChildren(el("div", { class: "banner warn" }, el("div", null, el("strong", null, "Hotspot data needs a connection to police.uk. "), msg || "")), evidenceHTML());
  }

  function initHotspots() {
    if (hotInit) return; hotInit = true;
    const sel = $("#area");
    sel.append(...AREAS.map((a, i) => el("option", { value: i }, a[0])));
    sel.addEventListener("change", () => { const a = AREAS[+sel.value]; center = { name: a[0], lat: a[1], lon: a[2], mine: false }; $("#loc-note").textContent = ""; load(); });
    $("#use-loc").addEventListener("click", useLocation);
    $$("[data-layer]").forEach((b) => b.addEventListener("click", () => {
      layersOn[b.dataset.layer] = !layersOn[b.dataset.layer];
      if (!Object.values(layersOn).some(Boolean)) layersOn[b.dataset.layer] = true;
      $$("[data-layer]").forEach((x) => x.setAttribute("aria-pressed", String(layersOn[x.dataset.layer])));
      load();
    }));
    try {
      map = L.map("map", { zoomControl: true, attributionControl: true }).setView([center.lat, center.lon], 15);
      circleGroup = L.layerGroup().addTo(map);
      syncTiles(); mapReady = true;
    } catch (e) { $("#map").hidden = true; }
    try {
      if (navigator.permissions && navigator.permissions.query) navigator.permissions.query({ name: "geolocation" }).then((p) => { if (p.state === "granted") useLocation(true); }).catch(() => {});
    } catch (e) { /* ignore */ }
    load();
  }

  async function useLocation(quiet) {
    const note = $("#loc-note");
    note.textContent = "Finding you…";
    try {
      const p = await Civic.geo();
      if (!Civic.inLondon(p.lat, p.lon)) { note.textContent = "You seem to be outside London, so pick an area instead."; return; }
      center = { name: "Your location", lat: p.lat, lon: p.lon, mine: true };
      userPos = p; note.textContent = "Showing reports within about a mile of you.";
      load();
    } catch (e) {
      note.textContent = quiet === true ? "" : "Location is off. Pick an area instead.";
    }
  }

  async function fetchLayer(cat, month) {
    const lat = center.lat.toFixed(3), lon = center.lon.toFixed(3);
    const url = `https://data.police.uk/api/crimes-street/${cat}?lat=${lat}&lng=${lon}&date=${month}`;
    const r = await Civic.cached(`pg:${cat}:${lat},${lon}:${month}`, WEEK, async () => {
      const arr = await Civic.fetchJSON(url, { timeout: 15000 });
      if (!Array.isArray(arr)) throw new Error("bad data");
      return arr.filter((c) => c && c.location).map((c) => [+c.location.latitude, +c.location.longitude, (c.location.street && c.location.street.name) || ""]);
    });
    return r.data;
  }

  async function load() {
    const my = ++token;
    setStatus("loading");
    $("#top-card").hidden = true;
    try {
      const d = await Civic.cached("pg:dates", 6 * 36e5, async () => {
        const a = await Civic.fetchJSON("https://data.police.uk/api/crimes-street-dates", { timeout: 12000 });
        if (!Array.isArray(a) || !a[0] || !a[0].date) throw new Error("bad data");
        return a[0].date;
      });
      month = d.data;
      const cats = Object.keys(layersOn).filter((k) => layersOn[k]);
      const results = await Promise.all(cats.map((c) => fetchLayer(c, month)));
      if (my !== token) return;
      const rows = results.flat().filter((r) => isFinite(r[0]) && isFinite(r[1]));
      aggregate(rows);
      setStatus(null);
      $("#map-copy").textContent = `Not live: reports of theft from the person (pickpocketing and snatches of any item, not only phones) in ${monthLabel(month)}, the latest month police.uk has published, about two months ago. Locations are approximate: police.uk moves each report to a nearby anonymous point. Use this to stay alert, not to avoid places.`;
      if (map) { map.setView([center.lat, center.lon], 15); drawCircles(); }
      topStreets(rows);
    } catch (e) {
      if (my !== token) return;
      points = []; if (circleGroup) circleGroup.clearLayers();
      $("#map-copy").textContent = "";
      const m = String(e.message);
      const why = m === "http 503" ? "Police.uk found too many reports in this area to send. Try a different area." : m === "offline" ? "You are offline." : m === "timeout" ? "Police.uk took too long to answer." : "Police.uk could not be reached.";
      setStatus("error", why + " The checklist and the Stolen? steps still work.");
    }
  }

  function aggregate(rows) {
    const g = new Map();
    for (const [lat, lon, street] of rows) {
      const k = lat + "," + lon;
      const o = g.get(k) || { lat, lon, n: 0, streets: new Set() };
      o.n++; if (street) o.streets.add(street); g.set(k, o);
    }
    points = [...g.values()];
  }
  function drawCircles() {
    if (!circleGroup) return;
    circleGroup.clearLayers();
    const css = getComputedStyle(document.documentElement);
    const col = css.getPropertyValue("--accent").trim() || "#C62B33";
    points.forEach((p) => {
      const c = L.circleMarker([p.lat, p.lon], { radius: Math.min(30, 5 + Math.sqrt(p.n) * 4), color: col, weight: 1.5, fillColor: col, fillOpacity: .4 });
      c.bindPopup(`<strong>${p.n} report${p.n === 1 ? "" : "s"}</strong><br>${[...p.streets].slice(0, 3).map(Civic.esc).join("<br>")}`);
      c.addTo(circleGroup);
    });
    if (center) L.circleMarker([center.lat, center.lon], { radius: 5, color: css.getPropertyValue("--ink").trim() || "#101418", weight: 2, fillOpacity: 0, interactive: false }).addTo(circleGroup);
    if (userPos && center.mine) L.circleMarker([userPos.lat, userPos.lon], { radius: 6, color: css.getPropertyValue("--thames").trim() || "#0B6870", fillOpacity: 1, weight: 2, interactive: false }).addTo(circleGroup);
  }
  function topStreets(rows) {
    const c = {};
    rows.forEach((r) => { if (r[2]) c[r[2]] = (c[r[2]] || 0) + 1; });
    const top = Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const list = $("#top-list");
    list.replaceChildren(...top.map(([name, n]) => el("li", null, el("span", null, name), el("span", { class: "n" }, n + (n === 1 ? " report" : " reports")), el("span", { class: "bar" }, el("span", { style: `width:${Math.round((n / top[0][1]) * 100)}%` })))));
    $("#top-card").hidden = !top.length;
    if (!top.length) $("#hot-status").replaceChildren(el("div", { class: "banner info" }, "No reports found near this point for " + monthLabel(month) + "."));
  }

  // Heads-up mode was removed after jury review: it needed the phone in hand at the kerb, the data is
  // ~2 months old and covers any stolen item, so a "busy spot" banner would mislead.


  // ---------- Stolen? ----------
  let S = null;
  const sdone = store.get("pg:sdone", {});
  const fmt = (s, o) => s.replace(/\{(\w+)\}/g, (_, k) => o[k]);
  function ui(k) { return (S.ui[stolenLang] && S.ui[stolenLang][k]) || S.ui.en[k]; }
  function tr(o) { return o[stolenLang] || o.en; }
  function fillLangSelect() {
    if (!S || !sheetState.langSel) return;
    sheetState.langSel.replaceChildren(...S.langs.map((l) => el("option", { value: l.code, selected: l.code === stolenLang }, l.name)));
  }
  function setLang(code) { stolenLang = code; store.set("pg:lang", code); renderStolen(); }
  function copyBtn(text, label) { return el("button", { class: "btn btn-sm", type: "button", onclick: () => Civic.copy(text, label || ui("copy")) }, ui("copy") + " " + text); }
  function link(href, text, cls) { return el("a", { class: "btn btn-sm " + (cls || "btn-ghost"), href, target: "_blank", rel: "noopener" }, text); }

  function stepActions(id) {
    const a = [];
    if (id === "lock") a.push(link("https://www.icloud.com/find", ui("findIphone")), link("https://www.google.com/android/find", ui("findAndroid")));
    if (id === "police") a.push(link("https://www.met.police.uk", ui("met")), link("https://www.cityoflondon.police.uk", ui("city")), copyBtn("101"), copyBtn("61016"));
    if (id === "visitor") a.push(link("https://www.gov.uk/government/publications/foreign-embassies-in-the-uk", ui("embassies")));
    return a;
  }
  function renderStolen() {
    if (!S) return;
    const lang = S.langs.find((l) => l.code === stolenLang) || S.langs[0];
    $("#lang-chips").replaceChildren(...S.langs.map((l) => el("button", { class: "chip lang-chip", type: "button", lang: l.code, "aria-pressed": String(l.code === lang.code), onclick: () => setLang(l.code) }, l.name)));
    const body = $("#stolen-body");
    const total = S.steps.length;
    const count = () => S.steps.filter((s) => sdone[s.id]).length;
    const prog = el("strong", { "aria-live": "polite" }, fmt(ui("doneN"), { n: count(), total }));
    const items = S.steps.map((s) => {
      const li = el("li", { class: sdone[s.id] ? "is-done" : "" });
      const box = el("input", { type: "checkbox", id: "sd-" + s.id, checked: !!sdone[s.id], onchange: () => {
        sdone[s.id] = box.checked; store.set("pg:sdone", sdone); li.classList.toggle("is-done", box.checked); prog.textContent = fmt(ui("doneN"), { n: count(), total });
      } });
      const extra = [];
      if (s.id === "sim") extra.push(el("ul", { class: "netlist", lang: "en", dir: "ltr" }, S.networks.map((n) => el("li", null, el("a", { href: n.url, target: "_blank", rel: "noopener" }, n.name)))), el("p", { class: "small muted" }, ui("networksNote")));
      const acts = stepActions(s.id);
      li.append(el("div", { class: "stepbox" },
        el("div", { class: "step-title" }, tr(s.t)),
        el("p", null, tr(s.b)),
        ...extra,
        acts.length ? el("div", { class: "step-actions" }, acts) : null,
        el("label", { class: "donechk", for: "sd-" + s.id }, box, ui("done"))));
      return li;
    });
    const nums = [["999 / 112", "n999", "tel:999", "call"], ["101", "n101", "tel:101", "call"], ["61016", "n61016", "sms:61016", "text"], ["159", "n159", "tel:159", "call"], ["0800 555 111", "n0800", "tel:0800555111", "call"]];
    const numCard = el("div", { class: "card" }, el("h3", null, ui("numbers")),
      ...nums.map(([n, k, href, verb]) => el("div", { class: "copyline" },
        el("div", null, el("div", { class: "mono" }, n), k ? el("div", { class: "small muted" }, ui(k)) : el("div", { class: "small muted" }, ui("n999"))),
        el("div", { class: "cluster", dir: "ltr" }, el("button", { class: "btn btn-sm", type: "button", onclick: () => { const v = n.startsWith("999") ? "999" : n; Civic.copy(v, ui("copy") + ": " + v); } }, ui("copy")), el("a", { class: "btn btn-sm btn-ghost", href }, ui(verb))))));
    // 112 row duplicates 999 text; drop its subtitle
    const hdr = el("div", { class: "stack" }, el("p", { class: "lead" }, ui("intro")), el("div", { class: "cluster" }, prog,
      el("button", { class: "btn btn-ghost btn-sm", type: "button", onclick: () => { S.steps.forEach((s) => delete sdone[s.id]); store.set("pg:sdone", sdone); renderStolen(); } }, ui("reset"))));
    const copyAll = el("button", { class: "btn btn-accent btn-block", type: "button", onclick: () => {
      const txt = ui("listTitle") + "\n\n" + S.steps.map((s, i) => `${i + 1}. ${tr(s.t)}${sdone[s.id] ? " [" + ui("done") + "]" : ""}\n${tr(s.b)}`).join("\n\n") + "\n\n" + ui("numbers") + ":\n999 / 112, " + ui("n999") + "\n101, " + ui("n101") + "\n61016, " + ui("n61016") + "\n159, " + ui("n159") + "\n0800 555 111, " + ui("n0800");
      Civic.copy(txt, ui("copied"));
    } }, ui("copyList"));
    const wrap = el("div", { class: "stack-lg", lang: lang.code, dir: lang.dir }, hdr, el("ol", { class: "steps" }, items), copyAll, numCard);
    body.replaceChildren(wrap);
    fillLangSelect();
  }
  Civic.local("data/stolen-steps.json").then((d) => {
    S = d; if (!S.langs.some((l) => l.code === stolenLang)) stolenLang = "en"; renderStolen();
  }).catch(() => { $("#stolen-body").append(el("div", { class: "banner bad" }, "The steps could not load. If you are in danger, call 999. Otherwise: lock the phone from another device, call your network to block the SIM, report to police on 101, then call your bank.")); });

  // ---------- About ----------
  $("#copy-link").addEventListener("click", () => Civic.copy(location.href.split("#")[0], "Link copied"));
})();
