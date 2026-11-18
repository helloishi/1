(function () {
  "use strict";
  const { $, $$, el, store, icon, copy, fetchJSON } = Civic;
  const GOV_ETA = "https://www.gov.uk/eta";
  let D = null;

  const link = (href, text, cls) => el("a", { href, target: "_blank", rel: "noopener noreferrer", class: cls || "link-out" }, text);
  const card = (cls, ...kids) => el("div", { class: "card " + (cls || "") }, ...kids);

  // ---------- Before you fly ----------
  function etaCard() {
    const lists = [];
    D.eta.forEach((n) => lists.push({ n, k: "eta" }));
    D.none.forEach((n) => lists.push({ n, k: "none" }));
    D.visa.forEach((n) => lists.push({ n, k: "visa" }));
    lists.sort((a, b) => a.n.localeCompare(b.n));
    const input = el("input", { class: "input", id: "eta-q", type: "search", autocomplete: "off", placeholder: "Type your country", "aria-controls": "eta-list" });
    const list = el("div", { class: "pick-list", id: "eta-list", role: "list" });
    const out = el("div", { "aria-live": "polite" });
    function verdict(item) {
      let v;
      if (!item) v = ["info", "Check GOV.UK", "We don't have this passport in our short list. Use GOV.UK's official checker to see what you need."];
      else if (item.k === "eta") v = ["warn", "Usually an ETA, not a visa", item.n + " passport holders usually need an Electronic Travel Authorisation (ETA) before a short visit. The official fee is £20 as of April 2026. Confirm with GOV.UK's checker before you book."];
      else if (item.k === "none") v = ["ok", "No ETA needed", "British and Irish citizens don't need an ETA."];
      else v = ["bad", "You probably need a visa", item.n + " passport holders have usually needed a visa to visit the UK, and an ETA is not a visa. Check GOV.UK's official tool before you book."];
      out.replaceChildren(el("div", { class: "verdict " + v[0] }, el("p", { class: "v-title" }, (item ? item.n + ": " : "") + v[1]), el("p", {}, v[2]),
        el("p", { class: "small" }, "This list is a guide, not a decision. Rules change, so confirm on GOV.UK before you book."),
        el("p", { class: "small" }, "Apply only on GOV.UK or the official “UK ETA” app from the Home Office."),
        el("div", { class: "cluster" }, link("https://www.gov.uk/check-uk-visa", "Check on GOV.UK"), link(GOV_ETA, "Open gov.uk/eta"))));
    }
    function renderList() {
      const q = input.value.trim().toLowerCase();
      const m = lists.filter((x) => x.n.toLowerCase().includes(q));
      list.replaceChildren(...m.map((x) => el("button", { class: "row", type: "button", role: "listitem", onclick: () => { input.value = x.n; verdict(x); } }, el("span", { class: "row-title" }, x.n))),
        el("button", { class: "row", type: "button", role: "listitem", onclick: () => verdict(null) }, el("span", { class: "row-title" }, "My country isn't listed")));
    }
    input.addEventListener("input", renderList);
    renderList();
    return card("", el("h2", {}, "Do I need an ETA?"),
      el("div", { class: "field" }, el("label", { for: "eta-q" }, "Your passport"), input, el("span", { class: "hint" }, "Search, then choose your country.")),
      list, out);
  }

  function checkerCard() {
    const input = el("input", { class: "input", id: "url-q", type: "text", inputmode: "url", autocomplete: "off", autocapitalize: "off", spellcheck: "false", placeholder: "Paste a website address" });
    const out = el("div", { "aria-live": "polite" });
    function check() {
      let raw = input.value.trim();
      if (!raw) { out.replaceChildren(el("p", { class: "small muted" }, "Paste an address first, for example the site a search result sent you to.")); return; }
      let u = null;
      try { u = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : "https://" + raw); } catch { u = null; }
      if (!u || !/^https?:$/.test(u.protocol) || !u.hostname.includes(".")) {
        out.replaceChildren(el("div", { class: "verdict info" }, el("p", { class: "v-title" }, "That doesn't look like a web address"), el("p", {}, "Check for typos, then paste the full address, like https://www.gov.uk/eta.")));
        return;
      }
      const h = u.hostname.toLowerCase().replace(/\.$/, "");
      if (h === "gov.uk" || h.endsWith(".gov.uk")) {
        out.replaceChildren(el("div", { class: "verdict ok" }, el("p", { class: "v-title" }, "Official UK government website"), el("p", {}, "The address ends in .gov.uk (" + h + "). Still, check the address bar yourself before you enter passport details.")));
      } else {
        const look = /gov|uk|eta/.test(h);
        out.replaceChildren(el("div", { class: "verdict bad" },
          el("p", { class: "v-title" }, "Not an official UK government website"),
          el("p", {}, "The official ETA costs £20 (April 2026) on GOV.UK or the UK ETA app."),
          look ? el("p", {}, el("strong", {}, "It looks official, but it isn't.")) : null,
          el("p", { class: "small" }, "Why it matters: unofficial sites can charge far more than the official fee, and you would hand your passport details to a company, not the Home Office. Don't pay or enter data there."),
          el("p", { class: "small" }, "Checked address: " + h)));
      }
    }
    return card("", el("h2", {}, "Official or not?"),
      el("p", { class: "small muted" }, "Unofficial sites have charged up to $99 or €178 for an ETA. Check any link before you pay."),
      el("div", { class: "field" }, el("label", { for: "url-q" }, "Website address"), input),
      el("button", { class: "btn btn-accent btn-block", type: "button", onclick: check }, "Check this address"), out);
  }

  function prepCard() {
    const saved = store.get("lr:prep", {});
    const bar = el("span");
    const cnt = el("p", { class: "small muted", "aria-live": "polite" });
    const refresh = () => {
      const n = D.prep.filter((p) => saved[p.id]).length;
      bar.style.width = Math.round((n / D.prep.length) * 100) + "%";
      cnt.textContent = n + " of " + D.prep.length + " done";
    };
    const items = D.prep.map((p) => {
      const cb = el("input", { type: "checkbox", id: "prep-" + p.id, checked: !!saved[p.id], onchange: () => { saved[p.id] = cb.checked; store.set("lr:prep", saved); refresh(); } });
      return el("label", { class: "check", for: "prep-" + p.id }, cb, el("div", {},
        el("div", { class: "check-title" }, p.t), el("div", { class: "check-body" }, p.b),
        p.link ? el("a", { href: p.link, onclick: (e) => e.stopPropagation() }, p.linkText) : null));
    });
    const c = card("", el("h2", {}, "Before you fly checklist"), el("div", { class: "progress", "aria-hidden": "true" }, bar), cnt, el("div", { class: "checklist" }, ...items));
    refresh();
    return c;
  }

  function bookCard() {
    return card("", el("h2", {}, "Book ahead"), el("p", { class: "small muted" }, "Free does not mean walk-in. Check each official site."),
      el("div", { class: "list" }, ...D.book.map((b) => {
        const body = [el("div", { class: "grow" }, el("div", { class: "row-title" }, b.name), el("div", { class: "row-meta" }, b.note, b.url ? "" : " No link: search for the official schedule."))];
        return b.url ? el("a", { class: "row", href: b.url, target: "_blank", rel: "noopener noreferrer" }, ...body, el("span", { class: "chev", "aria-hidden": "true" }, "›"))
          : el("div", { class: "row", style: "cursor:default" }, ...body);
      })));
  }

  function renderFly() {
    $("#view-fly").replaceChildren(
      el("div", { class: "stack" }, el("h2", {}, "Before you fly"), el("p", { class: "lead" }, "Sort the paperwork, the payments and the bookings first.")),
      etaCard(), checkerCard(), prepCard(), bookCard());
  }

  // ---------- Arrive ----------
  function findCost(o, d = 0) {
    if (o == null || d > 8) return null;
    if (typeof o === "object") {
      if (!Array.isArray(o) && "cost" in o) { const n = Number(o.cost); if (isFinite(n) && n > 0) return n; }
      for (const v of Object.values(o)) { const r = findCost(v, d + 1); if (r != null) return r; }
    }
    return null;
  }
  const fareBox = el("div", { "aria-live": "polite" });
  async function loadFare() {
    try {
      const data = await fetchJSON("https://api.tfl.gov.uk/StopPoint/940GZZLUHRC/FareTo/940GZZLULSQ", { timeout: 8000 });
      const c = findCost(data);
      if (c != null) fareBox.replaceChildren(el("p", { class: "pill info" }, "Live TfL fare: £" + (c > 100 ? (c / 100).toFixed(2) : c.toFixed(2))), el("span", { class: "tiny muted" }, " Heathrow T2&3 to Leicester Square, Piccadilly line"));
    } catch { /* hide silently */ }
  }

  function renderArrive() {
    const names = Object.keys(D.airports);
    let cur = store.get("lr:airport", "Heathrow");
    if (!names.includes(cur)) cur = "Heathrow";
    const view = $("#view-arrive");
    const chips = el("div", { class: "chips", role: "group", "aria-label": "Choose your airport" });
    const results = el("div", { class: "stack", "aria-live": "polite" });
    function show() {
      $$(".chip", chips).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.n === cur)));
      results.replaceChildren(...D.airports[cur].map((o) => {
        const dl = el("dl", {},
          el("dt", {}, "Time"), el("dd", {}, o.time),
          o.price ? [el("dt", {}, "Price"), el("dd", {}, o.price + " (typical, check before you travel)")] : null,
          el("dt", {}, "Contactless"), el("dd", {}, o.contactless === "yes" ? "Yes" : o.contactlessOk ? "Accepted: " + o.contactless.replace(/^accepted /, "") : "Check before you travel"),
          el("dt", {}, "Step-free"), el("dd", {}, o.step));
        return card("opt", el("div", { class: "spread" }, el("h3", {}, o.mode), o.band ? el("span", { class: "band", title: "Price band", "aria-label": "Price band " + o.band }, o.band) : null), dl, el("p", { class: "small" }, o.tip));
      }));
    }
    names.forEach((n) => chips.append(el("button", { class: "chip", type: "button", "data-n": n, "aria-pressed": "false", onclick: () => { cur = n; store.set("lr:airport", n); show(); } }, n)));
    view.replaceChildren(
      el("div", { class: "stack" }, el("h2", {}, "Airport to central London"), el("p", { class: "lead" }, "Pick your airport. Prices are typical, check before you travel.")),
      chips, results, fareBox,
      card("tint-bad", el("h2", {}, "Touts warning"), el("p", {}, "Only take a black cab from the official rank or a minicab you have booked. Drivers who approach you in arrivals are illegal touts.")),
      card("", el("h2", {}, "Your first hour"), el("ul", { class: "tips" }, ...D.firstHour.map((t) => el("li", {}, t)))));
    show();
    loadFare();
  }

  // ---------- Pay & tips ----------
  function renderPay() {
    const amt = el("input", { class: "input num", id: "bill", type: "number", inputmode: "decimal", min: "0", step: "0.01", placeholder: "e.g. 80.00" });
    const calc = el("div", { "aria-live": "polite" });
    amt.addEventListener("input", () => {
      const b = parseFloat(amt.value);
      if (!isFinite(b) || b < 0) { calc.replaceChildren(); return; }
      const s = b * 0.125;
      calc.replaceChildren(el("div", { class: "total-line" }, el("span", {}, "Service charge (12.5%)"), el("strong", { class: "num" }, "£" + s.toFixed(2))),
        el("div", { class: "total-line" }, el("span", {}, "Total with service charge"), el("strong", { class: "num" }, "£" + (b + s).toFixed(2))));
    });
    const bullets = [
      "Tap in and out with the same card or phone. Fares match Oyster, with daily and Monday–Sunday weekly caps.",
      "One card or device per person.",
      "Your phone and the physical card count as different cards. Don't switch during the day.",
      "Card clash: hold only one card to the reader.",
      "Children under 11 travel free with a paying adult.",
      "Visitor Oyster is only for people without contactless.",
      "Check your bank's foreign-card fees."
    ];
    $("#view-pay").replaceChildren(
      el("div", { class: "stack" }, el("h2", {}, "Pay & tips"), el("p", { class: "lead" }, "Contactless and Oyster charge the same fares with the same caps (TfL).")),
      card("", el("h2", {}, "Contactless coach"), el("ul", { class: "tips" }, ...bullets.map((t) => el("li", {}, t)))),
      card("", el("h2", {}, "Service charge calculator"),
        el("div", { class: "field" }, el("label", { for: "bill" }, "Bill amount (£)"), amt), calc,
        el("p", { class: "small" }, "Many restaurants add a 12.5% discretionary service charge. You can ask for it to be removed if service was poor. If it's included, you don't need to tip again. No tipping at the bar in pubs. Rounding up a black cab fare is common, not required.")),
      card("tint-info", el("h2", {}, "Mostly cashless"), el("p", {}, "Most places take cards and phone payments. A few market stalls may be cash-only.")));
  }

  // ---------- Help ----------
  function emergencyCard() {
    const host = el("div", { class: "card em-card", id: "em" });
    const bar = el("div", { class: "chips", role: "group", "aria-label": "Language" });
    const body = el("div");
    function draw() {
      const lang = store.get("lr:lang", "en");
      const T = D.emergency[lang] || D.emergency.en;
      host.setAttribute("lang", D.emergency[lang] ? lang : "en");
      host.setAttribute("dir", T.dir || "ltr");
      $$(".chip", bar).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.l === lang)));
      const row = (num, label, desc, copyText, href) => el("div", { class: "em-row" },
        el("div", { class: "spread" }, href ? el("a", { class: "em-num", href, dir: "ltr" }, num) : el("span", { class: "em-num", dir: "ltr" }, num),
          el("button", { class: "btn btn-sm btn-ghost", type: "button", onclick: () => copy(copyText, T.copy + ": " + copyText) }, T.copy)),
        desc ? el("span", { class: "small" }, desc) : null);
      body.replaceChildren(
        el("h2", {}, T.title),
        row("999 / 112", "999 or 112", T.e999, "999", "tel:999"),
        row("NHS 111", "NHS 111", T.n111, "111", "tel:111"),
        row("101", "101", T.n101, "101", "tel:101"),
        row("61016", "61016", T.btp, "61016", "sms:61016"),
        el("div", { class: "em-row" }, el("strong", {}, T.pharm), el("span", { class: "small" }, T.pharmd)),
        el("div", { class: "em-row" }, el("strong", {}, T.ae), el("span", { class: "small" }, T.aed)),
        el("div", { class: "em-row" }, link("https://www.gov.uk/government/publications/foreign-embassies-in-the-uk", T.emb)));
    }
    Object.entries(D.emergency).forEach(([k, v]) => bar.append(el("button", { class: "chip", type: "button", "data-l": k, "aria-pressed": "false", lang: k, dir: v.dir || "ltr", onclick: () => { store.set("lr:lang", k); draw(); } }, v.name)));
    host.append(bar, body);
    draw();
    window.__drawEm = draw;
    return host;
  }

  const statusBox = el("div", { "aria-live": "polite" });
  function statusClass(s) {
    if (s === "Good Service") return "ok";
    if (s === "Minor Delays") return "warn";
    if (/Severe|Suspended|Closed|Closure|Part Suspended|Service Closed/i.test(s)) return "bad";
    return "neutral";
  }
  async function loadStatus() {
    statusBox.replaceChildren(el("p", { class: "small muted" }, "Loading line status…"));
    try {
      const data = await fetchJSON("https://api.tfl.gov.uk/Line/Mode/tube,elizabeth-line,dlr,overground/Status", { timeout: 9000 });
      if (!Array.isArray(data) || !data.length) throw new Error("empty");
      statusBox.replaceChildren(el("div", { class: "status-grid" }, ...data.map((l) => {
        const ls = (l.lineStatuses && l.lineStatuses[0]) || {};
        const s = ls.statusSeverityDescription || "Unknown";
        const pill = el("span", { class: "pill " + statusClass(s) }, el("span", { class: "status-name" }, l.name), s);
        if (!ls.reason) return el("div", { class: "status-item" }, pill);
        return el("details", { class: "status-item" }, el("summary", {}, pill), el("p", { class: "reason" }, ls.reason));
      })), el("p", { class: "tiny muted" }, "Updated " + new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" }) + ". Tap a line with a reason to read it."));
    } catch {
      statusBox.replaceChildren(el("p", { class: "small" }, "Live status needs a connection. Check ", link("https://tfl.gov.uk", "tfl.gov.uk"), " before you travel; strikes are announced in advance."),
        el("button", { class: "btn btn-sm btn-ghost", type: "button", onclick: loadStatus }, "Try again"));
    }
  }

  function renderHelp() {
    $("#view-help").replaceChildren(
      el("div", { class: "stack" }, el("h2", {}, "Help"), el("p", { class: "lead" }, "In an emergency call 999 or 112. Both are free.")),
      emergencyCard(),
      card("tint-info", el("h2", {}, "NHS for visitors"), el("p", {}, "Emergency treatment in A&E is free for everyone. If you're admitted to hospital, overseas visitors may be charged, so travel insurance matters. Pharmacies and NHS 111 can also help.")),
      card("", el("h2", {}, "Live line status"), el("p", { class: "small muted" }, "Tube, Elizabeth line, DLR and Overground."), statusBox),
      card("", el("h2", {}, "Scams to know"), el("p", { class: "small muted" }, "Most visits go smoothly. These are worth knowing."), el("ul", { class: "tips" }, ...D.scams.map((t) => el("li", {}, t)))),
      card("", el("h2", {}, "Protect your phone"), el("p", {}, "Phone theft is common in busy parts of London. A few habits make it much harder."), el("a", { class: "btn btn-ghost", href: "../phoneguard/" }, "Open Phone Guard")));
    loadStatus();
  }

  // ---------- Settings + About ----------
  let opener = null;
  function openSettings() {
    opener = document.activeElement;
    const p = Civic.prefs.get();
    const seg = (name, opts, curv, onpick) => {
      const w = el("div", { class: "seg", role: "group", "aria-label": name });
      opts.forEach(([v, l]) => w.append(el("button", { class: "chip", type: "button", "aria-pressed": String(v === curv), onclick: () => { onpick(v); $$(".chip", w).forEach((b, i) => b.setAttribute("aria-pressed", String(opts[i][0] === v))); } }, l)));
      return w;
    };
    const lang = store.get("lr:lang", "en");
    const closeBtn = el("button", { class: "icon-btn", type: "button", "aria-label": "Close settings", onclick: close, html: icon("close") });
    const backdrop = el("div", { class: "sheet-backdrop", onclick: close });
    const sheet = el("div", { class: "sheet", role: "dialog", "aria-modal": "true", "aria-labelledby": "set-h", tabindex: "-1" },
      el("div", { class: "sheet-head" }, el("h2", { id: "set-h" }, "Settings"), closeBtn),
      el("div", { class: "field" }, el("span", { class: "h3" }, "Theme"), seg("Theme", [["auto", "Auto"], ["light", "Light"], ["dark", "Dark"]], p.theme || "auto", (v) => Civic.prefs.set({ theme: v === "auto" ? null : v }))),
      el("div", { class: "field" }, el("span", { class: "h3" }, "Text size"), seg("Text size", [["s", "Standard"], ["l", "Large"], ["xl", "Extra large"]], p.size || "s", (v) => Civic.prefs.set({ size: v === "s" ? null : v }))),
      el("div", { class: "field" }, el("span", { class: "h3" }, "Language for the Emergency card"),
        seg("Emergency language", Object.entries(D.emergency).map(([k, v]) => [k, v.name]), lang, (v) => { store.set("lr:lang", v); if (window.__drawEm) window.__drawEm(); })),
      el("hr", { class: "divider" }), aboutBlock());
    function close() { backdrop.remove(); sheet.remove(); document.removeEventListener("keydown", onKey); if (opener && opener.focus) opener.focus(); }
    function onKey(e) {
      if (e.key === "Escape") return close();
      if (e.key === "Tab") {
        const f = $$("button, a[href], input", sheet).filter((x) => !x.disabled);
        if (!f.length) return;
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    }
    document.addEventListener("keydown", onKey);
    document.body.append(backdrop, sheet);
    sheet.focus();
  }

  function aboutBlock() {
    return el("div", { class: "stack" },
      el("h2", {}, "About London Ready"),
      el("p", {}, "Free help for first-time visitors and new arrivals. It removes the traps: fake ETA sites, overpriced airport transfers, touts, scams and unclear tipping."),
      el("h3", {}, "Evidence"),
      el("ul", { class: "evid" },
        el("li", {}, "UK ETA official fee: £10 at launch, £16 from 9 April 2025, £20 from 8 April 2026. Unofficial sites charge up to $99 or €178 (Euronews, Nov 2025; NL Times, Nov 2025; Malwarebytes, Sep 2025; The Local, Feb 2026)."),
        el("li", {}, "Heathrow Express walk-up fares have been around £25 versus roughly £13 on the Elizabeth line (fares from different years; 2026 not verified)."),
        el("li", {}, "Contactless and Oyster charge the same fares with the same caps (TfL)."),
        el("li", {}, "71,391 phone thefts and robberies in London in 2025 (Met, via Mayor of London, Feb 2026). About 40% in Westminster and the West End (reported, medium confidence)."),
        el("li", {}, "VisitBritain cut its 2026 forecast to 44.2m visits and £33.9bn spend (Aug 2026).")),
      el("h3", {}, "Privacy"),
      el("p", {}, "No accounts, no analytics, no cookies, no trackers. Your ticks, airport and language choices stay on your device. The link checker runs in your browser and sends nothing anywhere. Live fares and line status are requested directly from TfL."),
      el("h3", {}, "Disclaimer"),
      el("p", {}, "This is general guidance, not legal, immigration or medical advice. Rules and prices change. Always confirm entry rules on ", link(GOV_ETA, "GOV.UK"), " and fares with the operator. In an emergency call 999."),
      el("div", { class: "foot" }, el("p", {}, "Prototype from London Civic Hack 2026. Not affiliated with TfL, the Mayor of London, the Metropolitan Police or the NHS."), el("p", {}, "Powered by TfL Open Data")));
  }

  // ---------- Boot ----------
  function boot() {
    $("#open-settings").innerHTML = icon("settings");
    $("#open-settings").addEventListener("click", openSettings);
    $$("[data-ic]").forEach((n) => (n.innerHTML = icon(n.dataset.ic)));
    Civic.watchOnline($("#offline"));
    Civic.local("data/content.json").then((d) => {
      D = d;
      renderFly(); renderArrive(); renderPay(); renderHelp();
      Civic.tabs({ fly: $("#view-fly"), arrive: $("#view-arrive"), pay: $("#view-pay"), help: $("#view-help") }, "fly");
    }).catch(() => {
      $("#view-fly").hidden = false;
      $("#view-fly").replaceChildren(el("div", { class: "banner bad" }, "London Ready could not load its content. Reload the page. In an emergency call 999."));
    });
    Civic.registerSW("sw.js");
  }
  boot();
})();
