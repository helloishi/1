/* Report It Right: routes any London problem to the right place. Vanilla JS, offline core. */
(function () {
  "use strict";
  const { el, $, $$, store, copy, icon } = Civic;

  let DATA = null;
  const state = { borough: store.get("ri:borough", null), sensitive: false, flow: null };
  const councilSlots = new Set();
  const ICONS = { train: "train", card: "card", users: "users", heart: "heart", alert: "alert", pin: "pin", calm: "calm", home: "home", map: "map", search: "search", shield: "shield", check: "check" };
  const EXIT_URL = "https://www.bbc.co.uk/weather";

  const setIcon = (node, name) => { node.innerHTML = icon(name); };
  $$("[data-icon]").forEach((n) => setIcon(n, n.dataset.icon));
  setIcon($("#open-settings"), "settings");

  const telHref = (v) => "tel:" + String(v).replace(/\s+/g, "");
  const host = (u) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const catShort = (c) => c.short || c.title;

  // ---------- Copy helpers ----------
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-copy]");
    if (b) copy(b.dataset.copy, "Copied " + b.dataset.copy);
  });
  function copyline(value, label) {
    return el("div", { class: "copyline" },
      el("span", { class: "mono" }, value),
      el("button", { class: "btn btn-sm", type: "button", "aria-label": "Copy " + label + " " + value, onclick: () => copy(value, "Copied " + value) }, "Copy"));
  }

  // ---------- Actions ----------
  function actionNode(id, primary) {
    const a = DATA.actions[id];
    const box = el("div", { class: "act" + (primary ? " act-primary" : "") });
    if (a.type === "council") {
      const slot = el("div", { class: "act" });
      slot.dataset.council = "1";
      councilSlots.add(slot);
      fillCouncil(slot);
      return slot;
    }
    box.append(el("div", { class: "act-label" }, a.label));
    if (a.verify) box.append(el("div", {}, el("span", { class: "pill warn" }, "Check before you rely on it"), " ", el("span", { class: "small muted" }, a.verify)));
    const links = el("div", { class: "act-links" });
    if (a.type === "phone") {
      box.append(copyline(a.value, a.label));
      links.append(el("a", { class: "btn btn-sm " + (primary ? "btn-accent" : "btn-ghost"), href: telHref(a.value) }, "Call " + a.value));
    } else if (a.type === "number") {
      box.append(copyline(a.value, a.label));
    } else if (a.type === "text") {
      box.append(copyline(a.value, a.label));
      links.append(el("a", { class: "btn btn-sm " + (primary ? "btn-accent" : "btn-ghost"), href: "sms:" + a.value }, "Open messages"));
      links.append(el("button", { class: "btn btn-sm btn-ghost", type: "button", onclick: () => (location.hash = "btp") }, "Write the message"));
    } else if (a.type === "email") {
      box.append(copyline(a.value, a.label));
      links.append(el("a", { class: "btn btn-sm btn-ghost", href: "mailto:" + a.value }, "Open email"));
    } else if (a.type === "web") {
      box.append(copyline(host(a.url), a.label));
      links.append(el("a", { class: "btn btn-sm " + (primary ? "btn-accent" : "btn-ghost"), href: a.url, target: "_blank", rel: "noopener" }, "Open site"));
    }
    if (a.url && a.type !== "web") links.append(el("a", { class: "btn btn-sm btn-ghost", href: a.url, target: "_blank", rel: "noopener" }, "Open " + host(a.url)));
    if (links.children.length) box.append(links);
    if (a.note) box.append(el("p", { class: "small muted" }, a.note));
    return box;
  }

  function fillCouncil(slot) {
    slot.replaceChildren(el("div", { class: "act-label" }, state.borough ? "Your council: " + state.borough : "Your council"));
    const dom = state.borough && DATA.councils[state.borough];
    if (dom) {
      const url = "https://www." + dom;
      slot.append(copyline(host(url), "council website"));
      slot.append(el("div", { class: "act-links" }, el("a", { class: "btn btn-sm btn-accent", href: url, target: "_blank", rel: "noopener" }, "Open council website")));
    } else {
      slot.append(el("p", { class: "small muted" }, "Find your borough below to see your council's website."));
    }
  }
  function refreshCouncils() { councilSlots.forEach((s) => { if (s.isConnected) fillCouncil(s); else councilSlots.delete(s); }); }

  // ---------- Location helper ----------
  function locationHelper() {
    const status = el("p", { class: "small", "aria-live": "polite" });
    const names = Object.keys(DATA.councils).sort((a, b) => a.localeCompare(b));
    const select = el("select", { class: "select", id: "borough-sel" }, el("option", { value: "" }, "Choose your borough"),
      names.map((n) => el("option", { value: n }, n)));
    select.value = state.borough || "";
    const pc = el("input", { class: "input", id: "pc-in", type: "text", autocomplete: "postal-code", placeholder: "For example: E16 1ZE", "aria-label": "Postcode" });

    function setBorough(name, msg) {
      state.borough = name; store.set("ri:borough", name); select.value = name;
      status.textContent = msg || "Your borough: " + name + ".";
      refreshCouncils();
    }
    function fromDistrict(d, postcode) {
      if (d && DATA.councils[d]) setBorough(d, "Your borough: " + d + (postcode ? " (postcode " + postcode + ")." : "."));
      else status.textContent = "That place is not in one of London's 32 boroughs or the City. Choose from the list instead.";
    }
    function fail(e) {
      const m = String(e && e.message);
      status.textContent = m === "http 404" ? "We could not find that postcode. Check it, or choose your borough from the list."
        : "Postcode lookup needs a connection. Choose your borough from the list instead.";
    }
    const useLoc = el("button", { class: "btn btn-ghost btn-block", type: "button", onclick: async () => {
      status.textContent = "Finding your location…";
      try {
        const g = await Civic.geo();
        if (!Civic.inLondon(g.lat, g.lon)) { status.textContent = "You do not seem to be in London. Choose a borough from the list instead."; return; }
        const r = await Civic.fetchJSON(`https://api.postcodes.io/postcodes?lon=${g.lon}&lat=${g.lat}&limit=1`);
        const hit = r && r.result && r.result[0];
        if (!hit) { status.textContent = "No postcode found near you. Choose from the list instead."; return; }
        fromDistrict(hit.admin_district, hit.postcode);
      } catch (e) {
        const m = String(e && e.message);
        if (["denied", "unsupported", "unavailable", "timeout"].includes(m)) status.textContent = "We could not get your location. Enter a postcode or choose your borough from the list.";
        else fail(e);
      }
    } }, "Use my location");
    const lookup = el("button", { class: "btn", type: "button", onclick: async () => {
      const v = pc.value.replace(/\s+/g, "");
      if (!v) { status.textContent = "Type a postcode first."; return; }
      status.textContent = "Looking up…";
      try {
        const r = await Civic.fetchJSON("https://api.postcodes.io/postcodes/" + encodeURIComponent(v));
        fromDistrict(r && r.result && r.result.admin_district, r.result && r.result.postcode);
      } catch (e) { fail(e); }
    } }, "Look up");
    select.addEventListener("change", () => { if (select.value) setBorough(select.value); });
    if (state.borough) status.textContent = "Your borough: " + state.borough + ".";

    return el("section", { class: "card stack", "aria-labelledby": "loc-h" },
      el("h3", { id: "loc-h" }, "Find your council"),
      el("p", { class: "small muted" }, "Only a postcode or your coordinates go to postcodes.io, and only when you press a button."),
      useLoc,
      el("div", { class: "field" }, el("label", { for: "pc-in" }, "Or enter a postcode"), el("div", { class: "cluster" }, el("div", { class: "grow" }, pc), lookup)),
      el("div", { class: "field" }, el("label", { for: "borough-sel" }, "Or choose your borough"), select),
      status);
  }

  // ---------- Flow ----------
  const home = $("#home"), flow = $("#flow");
  function showHome() {
    state.flow = null; setSensitive(false);
    flow.hidden = true; flow.replaceChildren(); home.hidden = false;
    window.scrollTo({ top: 0 });
  }
  function show(nodes, heading) {
    home.hidden = true; flow.hidden = false; flow.replaceChildren(...nodes);
    window.scrollTo({ top: 0 });
    if (heading) { heading.setAttribute("tabindex", "-1"); heading.focus({ preventScroll: true }); }
  }
  const backBtn = (label, fn) => el("button", { class: "btn btn-sm btn-ghost back", type: "button", onclick: fn }, "← " + label);

  function openCategory(cat) {
    const q = cat.questions && cat.questions[0];
    if (!q) return showResult(cat, "main", null);
    const h = el("h2", {}, catShort(cat));
    const qh = el("h3", { id: "q-h" }, q.text);
    const list = el("div", { class: "list", role: "group", "aria-labelledby": "q-h" },
      q.options.map((o) => el("button", { class: "row opt-row", type: "button", onclick: () => showResult(cat, o.route, o.label) },
        el("span", { class: "grow row-title" }, o.label), el("span", { class: "chev", "aria-hidden": "true" }, "›"))));
    show([backBtn("All categories", showHome), h, qh, list,
      el("p", { class: "small muted" }, "In danger now? Call 999.")], h);
  }

  function setSensitive(on) {
    state.sensitive = on;
    document.body.classList.toggle("has-exit", on);
    let b = $(".quick-exit");
    if (on && !b) {
      b = el("button", { class: "btn btn-danger btn-sm quick-exit", type: "button", onclick: quickExit, "aria-label": "Quick exit. Leaves this page now." }, "Quick exit");
      document.body.append(b);
    }
    if (b) b.hidden = !on;
  }
  function quickExit() { location.replace(EXIT_URL); }
  let lastEsc = 0;
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const now = Date.now();
    if (now - lastEsc < 700) quickExit();
    lastEsc = now;
  });

  function showResult(cat, routeKey, answer) {
    const r = cat.routes[routeKey];
    const sensitive = !!cat.sensitive;
    setSensitive(sensitive);
    state.flow = { cat, routeKey, answer };
    const h = el("h2", {}, catShort(cat));
    const nodes = [];
    nodes.push(backBtn(cat.questions ? "Change answer" : "All categories", () => (cat.questions ? openCategory(cat) : showHome())));
    nodes.push(h);
    if (answer) nodes.push(el("p", { class: "small muted" }, "You said: " + answer));
    nodes.push(el("div", { class: "sos" }, el("span", {}, "In danger now? Call 999 (or 112)."), el("a", { class: "sos-num", href: "tel:999" }, "999")));

    nodes.push(el("section", { class: "card stack" }, el("div", { class: "sec-title" }, "Who handles it"), el("p", {}, r.who)));
    nodes.push(el("section", { class: "card tint-info raised stack", "aria-label": "Fastest way" }, el("div", { class: "sec-title" }, "Fastest way"), actionNode(r.primary, true)));
    if (r.others && r.others.length) {
      nodes.push(el("section", { class: "card stack" }, el("div", { class: "sec-title" }, "Other ways"), r.others.map((id) => actionNode(id, false))));
    }
    const inc = r.include || cat.include;
    if (inc && inc.length) nodes.push(el("section", { class: "card stack" }, el("div", { class: "sec-title" }, "What to include"), el("ul", { class: "plain" }, inc.map((t) => el("li", {}, t)))));
    if (r.support && r.support.length) nodes.push(el("section", { class: "card stack" }, el("div", { class: "sec-title" }, "Support services"), r.support.map((id) => actionNode(id, false))));
    if (cat.borough || [r.primary].concat(r.others || []).includes("council")) nodes.push(locationHelper());

    const saveBtn = el("button", { class: "btn btn-accent btn-block", type: "button" }, "Save to My reports");
    saveBtn.addEventListener("click", () => {
      saveReport(cat, r, answer);
      saveBtn.disabled = true; saveBtn.textContent = "Saved to My reports";
      Civic.toast("Saved on this device");
    });
    const saveWrap = el("div", { class: "stack" }, saveBtn,
      el("p", { class: "small muted" }, sensitive ? "Saved only on this device. Anyone who can unlock this phone could see it. You can delete it any time." : "Saved only on this device."));
    nodes.push(saveWrap);
    nodes.push(el("button", { class: "btn btn-ghost btn-block", type: "button", onclick: showHome }, "Start again"));
    show(nodes, h);
  }

  // ---------- Suggestions (offline keyword matching) ----------
  function suggest(text) {
    const t = " " + text.toLowerCase() + " ";
    const out = [];
    for (const c of DATA.categories) {
      let s = 0;
      for (const k of c.keywords || []) if (t.includes(k)) s += k.length > 5 ? 2 : 1;
      if (s) out.push({ c, s });
    }
    return out.sort((a, b) => b.s - a.s).slice(0, 3).map((x) => x.c);
  }
  const sugBox = $("#suggest"), descIn = $("#describe");
  function renderSuggest() {
    sugBox.replaceChildren();
    const v = descIn.value.trim();
    if (v.length < 4) return;
    const hits = suggest(v);
    if (!hits.length) { sugBox.append(el("p", { class: "small muted" }, "No match yet. Add more detail, or choose a category below.")); return; }
    sugBox.append(el("p", { class: "small muted" }, "This might be:"));
    hits.forEach((c) => sugBox.append(el("button", { class: "btn btn-ghost suggest-chip", type: "button", onclick: () => openCategory(c) }, el("span", {}, catShort(c)), el("span", { "aria-hidden": "true" }, "›"))));
  }
  let sugTimer; descIn.addEventListener("input", () => { clearTimeout(sugTimer); sugTimer = setTimeout(renderSuggest, 250); });

  // Optional: ask Claude when available in the host page
  let claudeHandle = null;
  async function probeClaude() {
    try {
      if (window.claude && typeof window.claude.use === "function") {
        const s = await window.claude.use("sample");
        if (s != null) { claudeHandle = s; $("#claude-wrap").hidden = false; }
      }
    } catch { /* unavailable: keep hidden */ }
  }
  async function askClaudeText(prompt) {
    const c = window.claude;
    if (typeof claudeHandle === "function") return claudeHandle(prompt, { modelTier: "quick" });
    if (claudeHandle && typeof claudeHandle.complete === "function") return claudeHandle.complete(prompt);
    if (typeof c.complete === "function") return c.complete(prompt);
    throw new Error("no method");
  }
  $("#claude-btn").addEventListener("click", async () => {
    const v = descIn.value.trim();
    if (v.length < 4) { Civic.toast("Describe what happened first"); return; }
    const btn = $("#claude-btn"); btn.disabled = true; btn.textContent = "Asking Claude…";
    try {
      const ids = DATA.categories.map((c) => c.id);
      const res = await askClaudeText(`Pick the single best category id for this London problem report. Reply with strict JSON only, like {"category":"<id>"}, using one id from: ${ids.join(", ")}.\n\nReport: ${v}`);
      const txt = typeof res === "string" ? res : (res && (res.text || res.content)) || JSON.stringify(res);
      const m = String(txt).match(/\{[^{}]*\}/);
      const id = m && JSON.parse(m[0]).category;
      const cat = DATA.categories.find((c) => c.id === id);
      if (cat) openCategory(cat); else Civic.toast("Claude could not suggest a category");
    } catch {
      $("#claude-wrap").hidden = true;
    } finally { btn.disabled = false; btn.textContent = "Ask Claude to suggest"; }
  });

  // ---------- Category grid ----------
  function renderGrid() {
    const g = $("#grid");
    DATA.categories.forEach((c) => {
      const b = el("button", { class: "cat", type: "button", onclick: () => openCategory(c) }, el("span", { html: icon(ICONS[c.icon] || "info") }), el("span", {}, c.title));
      g.append(b);
    });
  }

  // ---------- My reports ----------
  const getReports = () => store.get("ri:reports", []);
  const setReports = (r) => store.set("ri:reports", r);
  function fmtDate(ts) {
    return new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(ts));
  }
  function channelText(r) {
    const a = DATA.actions[r.primary];
    const v = a.value || (a.url && host(a.url)) || "";
    return (a.type === "council" ? "Council" + (state.borough ? " (" + state.borough + ")" : "") : a.label) + (v ? ": " + v : "");
  }
  function saveReport(cat, r, answer) {
    const list = getReports();
    list.unshift({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5), ts: Date.now(), cat: catShort(cat) + (answer ? " (" + answer + ")" : ""), channel: channelText(r), ref: "", notes: "" });
    setReports(list);
  }
  function renderReports() {
    const box = $("#rep-list"); box.replaceChildren();
    const list = getReports();
    $("#rep-copy").hidden = !list.length;
    if (!list.length) { box.append(el("p", { class: "empty" }, "Nothing saved yet. After you get a result, press Save to My reports.")); return; }
    list.forEach((r) => {
      const refId = "ref-" + r.id, noteId = "note-" + r.id;
      const upd = (k, v) => { const l = getReports(); const i = l.find((x) => x.id === r.id); if (i) { i[k] = v; setReports(l); } };
      box.append(el("article", { class: "card rep" },
        el("div", {}, el("h3", {}, r.cat), el("p", { class: "small muted" }, fmtDate(r.ts))),
        el("p", { class: "small" }, "Reported via: " + r.channel),
        el("div", { class: "field" }, el("label", { for: refId }, "Reference number"), el("input", { class: "input", id: refId, type: "text", value: r.ref, placeholder: "Add it when you get one", oninput: (e) => upd("ref", e.target.value) })),
        el("div", { class: "field" }, el("label", { for: noteId }, "Notes"), el("textarea", { class: "textarea", id: noteId, oninput: (e) => upd("notes", e.target.value) }, r.notes)),
        el("div", {}, el("button", { class: "btn btn-sm btn-ghost", type: "button", onclick: () => { setReports(getReports().filter((x) => x.id !== r.id)); renderReports(); Civic.toast("Deleted"); } }, "Delete"))));
    });
  }
  $("#rep-copy").addEventListener("click", () => {
    const t = getReports().map((r) => [fmtDate(r.ts) + " | " + r.cat, "Via: " + r.channel, r.ref ? "Reference: " + r.ref : "", r.notes ? "Notes: " + r.notes : ""].filter(Boolean).join("\n")).join("\n\n");
    copy(t, "Copied all reports");
  });

  // ---------- Text BTP ----------
  async function setupBtp() {
    const dlP = $("#dl-places"), dlS = $("#dl-stations");
    try {
      const d = await Civic.local("../shared/data/stations.json");
      const names = [...new Set(d.stations.map((s) => s.name))].sort((a, b) => a.localeCompare(b));
      Object.values(d.lines).map((l) => (/line$|^DLR$|^Tram$/i.test(l.name) ? (l.name === "Tram" ? "London Trams" : l.name) : l.name + " line"))
        .sort().forEach((n) => dlP.append(el("option", { value: n })));
      names.forEach((n) => { dlP.append(el("option", { value: n })); dlS.append(el("option", { value: n })); });
    } catch { /* free text still works */ }
    const f = { what: $("#b-what"), free: $("#b-free"), where: $("#b-where"), toward: $("#b-toward"), car: $("#b-car"), time: $("#b-time"), person: $("#b-person") };
    const nowStr = () => { const n = Civic.londonNow(); return String(n.hh).padStart(2, "0") + ":" + String(n.mm).padStart(2, "0"); };
    f.time.value = nowStr();
    $("#b-now").addEventListener("click", () => { f.time.value = nowStr(); build(); });
    let text = "";
    function build() {
      const v = (k) => f[k].value.trim();
      const head = f.what.value + (v("free") ? ": " + v("free") : "");
      let where = "";
      if (v("where")) where = v("where") + (v("toward") ? " towards " + v("toward") : "");
      else if (v("toward")) where = "Towards " + v("toward");
      if (v("car")) where += (where ? ", " : "") + "carriage " + v("car");
      const parts = [head, where, f.time.value ? "At " + f.time.value : "", v("person") ? "Person: " + v("person") : ""].filter(Boolean);
      text = parts.map((p) => p.replace(/[.\s]+$/, "")).join(". ") + ".";
      $("#b-preview").textContent = text;
      const n = text.length, segs = n <= 160 ? 1 : Math.ceil(n / 153);
      $("#b-count").textContent = n + " characters" + (segs > 1 ? ". This will send as " + segs + " parts. Shorter is better." : ". Fits in one text.");
      $("#b-sms").href = "sms:61016?&body=" + encodeURIComponent(text);
    }
    Object.values(f).forEach((i) => { i.addEventListener("input", build); i.addEventListener("change", build); });
    $("#b-copy").addEventListener("click", () => copy(text, "Message copied. Paste it into a text to 61016."));
    build();
  }

  // ---------- Settings sheet ----------
  function openSettings() {
    const trigger = $("#open-settings");
    const p = Civic.prefs.get();
    const seg = (key, opts, cur) => {
      const wrap = el("div", { class: "seg", role: "group" });
      opts.forEach(([val, label]) => {
        const b = el("button", { class: "chip", type: "button", "aria-pressed": String((cur || "") === val), onclick: () => {
          Civic.prefs.set({ [key]: val || null });
          $$("button", wrap).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        } }, label);
        wrap.append(b);
      });
      return wrap;
    };
    const backdrop = el("div", { class: "sheet-backdrop" });
    const close = () => { sheet.remove(); backdrop.remove(); document.removeEventListener("keydown", onKey); trigger.focus(); };
    const onKey = (e) => { if (e.key === "Escape") close(); };
    const closeBtn = el("button", { class: "btn btn-primary", type: "button", onclick: close }, "Done");
    const sheet = el("div", { class: "sheet", role: "dialog", "aria-modal": "true", "aria-labelledby": "set-h" },
      el("h2", { id: "set-h" }, "Settings"),
      el("div", { class: "field" }, el("span", { class: "h3", id: "th-l" }, "Theme"), seg("theme", [["", "Auto"], ["light", "Light"], ["dark", "Dark"]], p.theme)),
      el("div", { class: "field" }, el("span", { class: "h3", id: "sz-l" }, "Text size"), seg("size", [["", "Standard"], ["l", "Large"], ["xl", "Extra large"]], p.size)),
      closeBtn);
    backdrop.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    document.body.append(backdrop, sheet);
    closeBtn.focus();
  }
  $("#open-settings").addEventListener("click", openSettings);

  // ---------- Boot ----------
  Civic.tabs({ report: $("#view-report"), btp: $("#view-btp"), reports: $("#view-reports"), about: $("#view-about") }, "report", (k) => { if (k === "reports" && DATA) renderReports(); });
  setupBtp();
  Civic.local("data/channels.json").then((d) => {
    DATA = d; renderGrid(); renderReports(); probeClaude();
  }).catch(() => { $("#data-error").hidden = false; });
  Civic.registerSW("sw.js");
})();
