/* Free London Today: free places near you, right now. Vanilla JS on top of the shared Civic kit. */
(() => {
  "use strict";
  const { $, $$, el, store, icon, distanceM, fmtDistance, walkMins, londonNow } = Civic;

  const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const DAY_SHORT = { mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun" };
  const CATS = [
    ["museums", "Museums & galleries", "star"], ["views", "Views", "sun"], ["parks", "Parks & gardens", "calm"],
    ["markets", "Markets", "gift"], ["music", "Music & performance", "users"], ["public", "Public buildings", "shield"],
    ["faith", "Faith & architecture", "home"], ["farms", "Farms & nature", "heart"], ["unusual", "Unusual", "pin"],
  ];
  const CAT = Object.fromEntries(CATS.map(([id, label, ic]) => [id, { label, ic }]));
  const AREAS = [
    ["central", "Central London", 51.5072, -0.1276], ["kings-cross", "King's Cross", 51.5309, -0.1233],
    ["south-bank", "South Bank", 51.5055, -0.1166], ["city", "City of London", 51.5133, -0.0890],
    ["camden", "Camden Town", 51.5392, -0.1426], ["shoreditch", "Shoreditch", 51.5246, -0.0780],
    ["south-ken", "South Kensington", 51.4941, -0.1738], ["hampstead", "Hampstead", 51.5560, -0.1780],
    ["greenwich", "Greenwich", 51.4826, -0.0077], ["stratford", "Stratford", 51.5416, -0.0034],
    ["brixton", "Brixton", 51.4613, -0.1156], ["richmond", "Richmond", 51.4613, -0.3037], ["croydon", "Croydon", 51.3762, -0.0982],
  ].map(([id, label, lat, lon]) => ({ id, label, lat, lon }));
  const FEATURED = ["british-museum", "national-gallery", "tate-modern", "natural-history-museum", "science-museum", "v-and-a",
    "tate-modern-terrace", "st-james-park", "borough-market", "british-library", "wellcome-collection", "hyde-park", "regents-park",
    "southbank-centre", "wallace-collection"];
  const FILTERS = [
    ["open", "Open now"], ["indoor", "Indoor"], ["outdoor", "Outdoor"], ["kids", "Kids"], ["step", "Step-free"],
    ["nobook", "No booking"], ["evening", "Evening"], ["beyond", "Beyond Zone 1"],
  ];
  const DEFAULT_LOC = { lat: Civic.LONDON.lat, lon: Civic.LONDON.lon, label: "Central London", source: "default" };

  const state = {
    places: [], loc: { ...DEFAULT_LOC }, wx: null, filters: new Set(), cats: new Set(), view: "list",
    saved: new Set(store.get("free:saved", [])), essKey: null, openLimit: 10, current: "today",
  };

  // ---------- helpers ----------
  const t = (s) => { const [h, m] = s.split(":").map(Number); return h * 60 + m; };
  const hasLoc = () => state.loc.source !== "default";
  const isParkrun = (p) => p.id === "parkrun";
  const dist = (p) => (isParkrun(p) ? Infinity : distanceM(state.loc, p));
  const byId = (id) => state.places.find((p) => p.id === id);
  const gmaps = (lat, lon) => `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
  const svg = (name) => el("span", { html: icon(name), class: "ic" });

  function status(p, now) {
    if (p.hours === "always") return { state: "open", label: "Always open", always: true };
    if (!p.hours) return { state: "unknown", label: "Check hours" };
    const today = p.hours[DAYS[now.dow]] || [];
    for (const [o, c] of today) {
      if (now.minutes >= t(o) && now.minutes < t(c)) {
        const left = t(c) - now.minutes;
        return { state: "open", label: c === "24:00" ? "Open until midnight" : "Open until " + c, closesIn: left, soon: left <= 30 };
      }
    }
    for (const [o] of today) if (t(o) > now.minutes) return { state: "closed", label: "Opens " + o, later: true };
    for (let i = 1; i <= 7; i++) {
      const d = DAYS[(now.dow + i) % 7], r = p.hours[d];
      if (r && r.length) return { state: "closed", label: i === 1 ? "Closed · opens tomorrow " + r[0][0] : `Closed · opens ${DAY_SHORT[d]} ${r[0][0]}` };
    }
    return { state: "unknown", label: "Check hours" };
  }
  const pillClass = (st) => (st.state === "open" ? (st.soon ? "warn" : "ok") : st.later ? "warn" : "neutral");
  const isEvening = (p) => p.evening || p.hours === "always" || (p.hours && Object.values(p.hours).some((r) => r.some(([, c]) => t(c) > 1080)));

  function whereText(p) {
    if (isParkrun(p)) return "Many parks across London";
    if (!hasLoc()) return "Near " + p.nearestStation;
    const d = dist(p);
    return (p.approx ? "about " : "") + fmtDistance(d) + (d <= 3200 ? " · " + walkMins(d) + " min walk" : "");
  }

  function badges(p) {
    const b = [["Free", "free"]];
    if (p.indoor) b.push(["Indoor"]);
    if (p.stepFree === "yes") b.push(["Step-free"]); else if (p.stepFree === "partial") b.push(["Partly step-free"]);
    if (p.kids) b.push(["Kids"]);
    if (p.booking === "required") b.push(["Book ahead"]); else if (p.booking === "recommended") b.push(["Booking advised"]);
    return el("div", { class: "tags" }, b.map(([l, c]) => el("span", { class: "tag " + (c || "") }, l)));
  }

  // Rank: lower is better. Distance in metres, adjusted for weather. Without a chosen place, a curated featured order.
  function score(p) {
    let s;
    if (hasLoc()) s = dist(p);
    else { const i = FEATURED.indexOf(p.id); s = i >= 0 ? i * 400 : 8000 + Math.min(dist(p), 30000); }
    const wx = state.wx;
    if (wx && wx.rain) s += p.indoor ? -1500 : 800;
    if (wx && wx.hot) s += (p.indoor ? -800 : 0) + (p.category === "parks" ? -800 : 0);
    return s;
  }

  function placeRow(p, now) {
    const st = status(p, now);
    return el("button", { class: "row place", type: "button", "aria-label": `${p.name}. ${st.label}. Open details.`, onclick: () => openPlace(p.id) },
      el("span", { class: "row-icon cat", html: icon(CAT[p.category].ic) }),
      el("span", { class: "body" },
        el("span", { class: "row-title" }, p.name),
        el("span", { class: "row-meta" }, `${CAT[p.category].label} · ${whereText(p)}`),
        badges(p)),
      el("span", { class: "side" }, el("span", { class: "pill " + pillClass(st) }, st.label)));
  }

  function listOf(rows) { return el("div", { class: "list" }, rows); }

  // ---------- sheets ----------
  let sheetEls = null, lastFocus = null;
  function openSheet(content, label) {
    closeSheet(true);
    lastFocus = document.activeElement;
    const bd = el("div", { class: "sheet-backdrop", onclick: () => closeSheet() });
    const sh = el("div", { class: "sheet", role: "dialog", "aria-modal": "true", "aria-label": label, tabindex: "-1" }, content);
    document.body.append(bd, sh);
    document.body.classList.add("locked");
    $("#main").inert = true; $(".tabbar").inert = true;
    sheetEls = [bd, sh];
    const first = $("button, a[href]", sh);
    (first || sh).focus();
  }
  function closeSheet(silent) {
    if (!sheetEls) return;
    sheetEls.forEach((n) => n.remove()); sheetEls = null;
    document.body.classList.remove("locked");
    $("#main").inert = false; $(".tabbar").inert = false;
    if (!silent && lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && sheetEls) closeSheet(); });

  function closeBtn() { return el("button", { class: "icon-btn", type: "button", "aria-label": "Close", html: icon("close"), onclick: () => closeSheet() }); }

  function hoursGroups(p) {
    if (p.hours === "always") return [["Every day", "Always accessible"]];
    if (!p.hours) return [["Hours", "Not confirmed. Check the official site."]];
    const keys = DAYS.map((d) => (p.hours[d] || []).map(([o, c]) => `${o}–${c}`).join(", ") || "Closed");
    const out = [];
    let i = 0;
    while (i < 7) {
      let j = i;
      while (j + 1 < 7 && keys[j + 1] === keys[i]) j++;
      out.push([i === j ? DAY_SHORT[DAYS[i]] : `${DAY_SHORT[DAYS[i]]}–${DAY_SHORT[DAYS[j]]}`, keys[i]]);
      i = j + 1;
    }
    return out;
  }

  function openPlace(id) {
    const p = byId(id); if (!p) return;
    const now = londonNow(), st = status(p, now);
    const saveBtn = el("button", { class: "btn btn-ghost btn-block", type: "button", "aria-pressed": String(state.saved.has(id)) });
    const paintSave = () => { const on = state.saved.has(id); saveBtn.setAttribute("aria-pressed", String(on)); saveBtn.textContent = on ? "Saved. Tap to remove" : "Save this place"; };
    paintSave();
    saveBtn.onclick = () => {
      if (state.saved.has(id)) state.saved.delete(id); else state.saved.add(id);
      store.set("free:saved", [...state.saved]);
      paintSave(); renderSaved();
      Civic.toast(state.saved.has(id) ? "Saved" : "Removed from saved");
    };
    const dl = el("dl", { class: "hours-list" }, hoursGroups(p).flatMap(([d, h]) => [el("dt", null, d), el("dd", null, h)]));
    const node = el("div", { class: "stack" },
      el("div", { class: "sheet-head" }, el("div", null, el("h2", null, p.name),
        el("p", { class: "small muted" }, `${CAT[p.category].label} · ${p.area}, ${p.borough}`)), closeBtn()),
      el("div", { class: "cluster" }, el("span", { class: "pill " + pillClass(st) }, st.label), el("span", { class: "small muted" }, whereText(p))),
      !isParkrun(p) && hasLoc() ? el("p", { class: "small muted" }, "Nearest station: " + p.nearestStation) : null,
      badges(p),
      el("p", null, p.description),
      el("div", { class: "banner info" }, el("div", null, el("strong", null, "Tip: "), p.tip)),
      el("div", { class: "stack" }, el("div", { class: "sec-title" }, "Typical hours"), dl),
      el("div", { class: "banner warn" }, el("div", null, el("strong", null, "Check before you go. "),
        "Hours shown are typical. Closures, events and bank holidays can change them. Confirm on the official site. ",
        p.checkNote || "", p.approx ? " The map pin is approximate." : "")),
      el("div", { class: "actions" },
        el("a", { class: "btn btn-accent", href: p.url, target: "_blank", rel: "noopener noreferrer" }, "Official website"),
        isParkrun(p) ? null : el("a", { class: "btn", href: gmaps(p.lat, p.lon), target: "_blank", rel: "noopener noreferrer" }, "Directions"),
        saveBtn));
    openSheet(node, p.name);
  }

  // ---------- settings + about ----------
  function seg(name, opts, current, onPick) {
    const wrap = el("div", { class: "seg-set", role: "group", "aria-label": name });
    const btns = opts.map(([v, l]) => el("button", { class: "chip", type: "button", "aria-pressed": String(v === current), onclick: () => { onPick(v); btns.forEach((b, i) => b.setAttribute("aria-pressed", String(opts[i][0] === v))); } }, l));
    wrap.append(...btns);
    return wrap;
  }
  function openSettings() {
    const p = Civic.prefs.get();
    const EV = [
      ["26% of Londoners (about 2.3m) live in poverty after housing costs; 35% of children.", "Trust for London, 2025"],
      ["31% of 16–29-year-olds in Great Britain report feeling lonely.", "ONS"],
      ["59% of students sometimes skip meals.", "Student surveys cited in hackathon research (medium confidence)"],
      ["More than 4,500 free tap-water Refill points in London, up from about 200 in 2018.", "Mayor of London"],
      ["At least 97 public toilets closed and 32 opened in London in a decade.", "Age UK London, Jan 2025"],
      ["VisitBritain cut its 2026 forecast to 44.2m visits, so value for money matters.", "VisitBritain, Aug 2026"],
    ];
    const node = el("div", { class: "stack-lg" },
      el("div", { class: "sheet-head" }, el("h2", null, "Settings"), closeBtn()),
      el("div", { class: "stack" }, el("div", { class: "sec-title" }, "Theme"),
        seg("Theme", [["auto", "Auto"], ["light", "Light"], ["dark", "Dark"]], p.theme === "light" || p.theme === "dark" ? p.theme : "auto", (v) => { Civic.prefs.set({ theme: v }); onThemeChange(); })),
      el("div", { class: "stack" }, el("div", { class: "sec-title" }, "Text size"),
        seg("Text size", [["s", "Standard"], ["l", "Large"], ["xl", "Extra large"]], p.size === "l" || p.size === "xl" ? p.size : "s", (v) => Civic.prefs.set({ size: v }))),
      el("hr", { class: "divider" }),
      el("div", { class: "stack" },
        el("h2", null, "About Free London Today"),
        el("p", null, "Free places to go, near you, right now, plus free water, toilets and libraries. For families on a budget, students, older people, visitors and anyone with a rainy day to fill."),
        el("div", { class: "sec-title" }, "Why it matters"),
        el("ul", { class: "evidence" }, EV.map(([a, s]) => el("li", null, el("strong", null, a), el("span", { class: "src" }, "Source: " + s)))),
        el("p", { class: "small" }, "It helps the Mayor and councils meet cost-of-living, culture and loneliness goals, spreads visitors beyond Zone 1, and makes full use of public assets that already exist."),
        el("div", { class: "sec-title" }, "Privacy"),
        el("p", { class: "small" }, "No accounts, no analytics, no cookies, no trackers. Your location is used on your device only. It is sent to Open-Meteo (weather) and Overpass (water, toilets, libraries) as a map point so they can answer. Saved places stay on your phone."),
        el("div", { class: "sec-title" }, "Limits"),
        el("p", { class: "small" }, "Places are curated from official sources and are free to enter at the time of writing. Hours are typical. Always check before you go. Live toilets and water points come from OpenStreetMap volunteers and may be out of date.")),
      el("footer", { class: "foot" },
        el("p", null, "Prototype from London Civic Hack 2026. Not affiliated with TfL, the Mayor of London, the Metropolitan Police or the NHS."),
        el("p", null, "Weather data by Open-Meteo.com (CC BY 4.0) · © OpenStreetMap contributors · Map tiles © CARTO · Postcode lookup by postcodes.io")));
    openSheet(node, "Settings and About");
  }

  // ---------- location ----------
  function setLoc(loc, persist) {
    state.loc = loc;
    if (persist) store.set("free:loc", { id: loc.id, lat: loc.lat, lon: loc.lon, label: loc.label, source: loc.source });
    else store.del("free:loc");
    $("#where-label").textContent = loc.label;
    state.wx = null; state.essKey = null;
    loadWeather();
    renderAll();
  }
  function fillAreas() {
    const sel = $("#area-pick");
    sel.append(...AREAS.map((a) => el("option", { value: a.id }, a.label)));
    sel.onchange = () => {
      const a = AREAS.find((x) => x.id === sel.value);
      $("#loc-note").textContent = "";
      if (a.id === "central") setLoc({ ...DEFAULT_LOC }, false);
      else setLoc({ lat: a.lat, lon: a.lon, label: a.label, source: "area", id: a.id }, true);
    };
  }
  async function useMyLocation(silent) {
    const btn = $("#use-loc"), note = $("#loc-note");
    btn.disabled = true; if (!silent) note.textContent = "Finding your location…";
    try {
      const g = await Civic.geo({ timeout: 10000 });
      if (!Civic.inLondon(g.lat, g.lon)) { note.textContent = "You seem to be outside London, so showing central London."; return; }
      note.textContent = "";
      setLoc({ lat: g.lat, lon: g.lon, label: "Your location", source: "gps" }, false);
    } catch (e) {
      if (silent) return;
      note.textContent = e.message === "denied" ? "Location is off for this site. Choose an area or postcode instead." : "Could not get your location. Choose an area or postcode instead.";
      $(".where-more").open = true;
    } finally { btn.disabled = false; }
  }
  async function lookupPostcode(ev) {
    ev.preventDefault();
    const raw = $("#pc-input").value.trim().toUpperCase().replace(/\s+/g, "");
    const hint = $("#pc-hint");
    if (raw.length < 5) { hint.textContent = "Enter a full postcode, such as WC1B 3DG."; return; }
    hint.textContent = "Looking up…";
    try {
      const r = await Civic.fetchJSON("https://api.postcodes.io/postcodes/" + encodeURIComponent(raw), { timeout: 8000 });
      const { latitude: lat, longitude: lon } = r.result || {};
      if (lat == null || !Civic.inLondon(lat, lon)) { hint.textContent = "That postcode is outside London."; return; }
      hint.textContent = "Postcode lookup needs a connection. Your location stays on your device.";
      setLoc({ lat, lon, label: raw.replace(/^(.+)(\d[A-Z]{2})$/, "$1 $2"), source: "postcode" }, true);
    } catch (e) {
      hint.textContent = e.message === "http 404" ? "Postcode not found. Check it and try again." : "Postcode lookup needs a connection. Try an area instead.";
    }
  }

  // ---------- weather ----------
  const wxText = (c) => (c === 0 ? "Clear" : c <= 3 ? "Partly cloudy" : c <= 48 ? "Fog" : c <= 57 ? "Drizzle" : c <= 67 ? "Rain" : c <= 77 ? "Snow" : c <= 82 ? "Showers" : c >= 95 ? "Thunderstorms" : "Cloudy");
  async function loadWeather() {
    const { lat, lon } = state.loc, key = `wx:${lat.toFixed(2)},${lon.toFixed(2)}`;
    const mine = state.loc;
    try {
      const r = await Civic.cached(key, 15 * 60 * 1000, () => Civic.fetchJSON(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,precipitation,weather_code&hourly=precipitation_probability,temperature_2m&forecast_days=1&timezone=Europe%2FLondon`, { timeout: 8000 }));
      if (state.loc !== mine) return;
      const d = r.data, c = d.current, times = d.hourly.time, probs = d.hourly.precipitation_probability;
      const hourKey = (c.time || "").slice(0, 13);
      let idx = times.findIndex((x) => x.slice(0, 13) >= hourKey);
      if (idx < 0) idx = 0;
      const next = probs.slice(idx, idx + 4).filter((x) => typeof x === "number");
      const maxP = next.length ? Math.max(...next) : null;
      state.wx = { temp: c.temperature_2m, feels: c.apparent_temperature, code: c.weather_code, precip: c.precipitation, maxP, rain: maxP != null && maxP >= 50, hot: c.temperature_2m >= 28 };
    } catch { state.wx = null; }
    renderWeather(); renderToday();
  }
  function renderWeather() {
    const box = $("#weather"); box.replaceChildren();
    const w = state.wx; if (!w) return;
    const temp = `${Math.round(w.temp)}°C now, feels like ${Math.round(w.feels)}°C. ${wxText(w.code)}.`;
    const chance = w.maxP != null ? ` Rain chance up to ${w.maxP}% in the next 3 hours.` : "";
    let title, cls = "info", ic = "sun", extra = null;
    if (w.hot) { title = "Hot day — shade, cool museums and free water first"; cls = "warn"; extra = el("a", { class: "btn btn-sm", href: "#essentials" }, "Find free water"); }
    else if (w.rain) { title = "Rain likely — indoor picks first"; ic = "rain"; }
    else title = "Dry for now";
    box.append(el("div", { class: "banner " + cls }, el("span", { class: "wx", html: icon(ic) }),
      el("div", { class: "stack" }, el("strong", null, title), el("span", null, temp + chance), extra)));
  }

  // ---------- Today ----------
  function renderOpenNow(now) {
    const box = $("#open-now"); box.replaceChildren();
    const ranked = state.places.map((p) => ({ p, st: status(p, now), s: score(p) })).sort((a, b) => a.s - b.s);
    const open = ranked.filter((x) => x.st.state === "open");
    const unk = ranked.filter((x) => x.st.state === "unknown" && !isParkrun(x.p));
    if (!open.length) box.append(el("div", { class: "card" }, el("p", null, "Nothing is confirmed open right now."), el("p", { class: "small muted" }, "Many places close in the evening. Try Explore, or the places below to check.")));
    else {
      box.append(listOf(open.slice(0, state.openLimit).map((x) => placeRow(x.p, now))));
      if (open.length > state.openLimit) box.append(el("button", { class: "btn btn-ghost more-btn", type: "button", onclick: () => { state.openLimit += 10; renderToday(); } }, `Show more (${open.length - state.openLimit} left)`));
    }
    if (unk.length) box.append(el("details", { class: "card" }, el("summary", { class: "h3" }, `Hours to check (${unk.length})`),
      el("p", { class: "small muted" }, "We have no confirmed opening times for these. Check the official site first."),
      listOf(unk.slice(0, 12).map((x) => placeRow(x.p, now)))));
  }

  function suits(p) {
    const w = state.wx;
    if (w && w.rain) return p.indoor;
    if (w && w.hot) return p.indoor || p.category === "parks";
    return true;
  }
  function buildHalfDay(now) {
    const cand = state.places.filter((p) => !isParkrun(p)).map((p) => ({ p, st: status(p, now), s: score(p) }))
      .filter((x) => x.st.state === "open" && (x.st.always || x.st.closesIn >= 60) && suits(x.p)).sort((a, b) => a.s - b.s).slice(0, 14);
    let best = null;
    for (let i = 0; i < cand.length; i++) for (let j = i + 1; j < cand.length; j++) for (let k = j + 1; k < cand.length; k++) {
      const [a, b, c] = [cand[i], cand[j], cand[k]];
      const dab = distanceM(a.p, b.p), dac = distanceM(a.p, c.p), dbc = distanceM(b.p, c.p);
      if (dab > 1500 || dac > 1500 || dbc > 1500) continue;
      const cats = new Set([a.p.category, b.p.category, c.p.category]);
      const cost = a.s + b.s + c.s + 0.8 * (dab + dac + dbc) + (3 - cats.size) * 600;
      if (!best || cost < best.cost) best = { cost, items: [a, b, c] };
    }
    if (!best) return null;
    const items = best.items.slice().sort((x, y) => x.s - y.s);
    const seq = [items.shift()];
    while (items.length) {
      const last = seq[seq.length - 1].p;
      items.sort((x, y) => distanceM(last, x.p) - distanceM(last, y.p));
      seq.push(items.shift());
    }
    return seq;
  }
  function renderHalfDay(now) {
    const box = $("#half-day"); box.replaceChildren();
    const seq = buildHalfDay(now);
    if (!seq) { box.append(el("div", { class: "card" }, el("p", null, "Not enough open places close together right now."), el("p", { class: "small muted" }, "Try again later, choose another area, or browse Explore."))); return; }
    const w = state.wx;
    const why = w && w.rain ? "Indoor picks, because rain is likely." : w && w.hot ? "Cool indoor places and green spaces, because it is hot." : "Open now, within 1.5 km of each other.";
    let total = 0;
    const lis = seq.map((x, i) => {
      let walk = null;
      if (i > 0) { const m = walkMins(distanceM(seq[i - 1].p, x.p)); total += m; walk = `${m} min walk from ${seq[i - 1].p.name}`; }
      else if (hasLoc()) { const d = dist(x.p); walk = `${walkMins(d)} min walk from you`; }
      return el("li", null, el("div", null,
        walk ? el("span", { class: "walk" }, walk) : null,
        el("button", { class: "step-btn", type: "button", onclick: () => openPlace(x.p.id) }, x.p.name),
        el("span", { class: "row-meta" }, `${CAT[x.p.category].label} · `, el("span", { class: "pill " + pillClass(x.st) }, x.st.label))));
    });
    box.append(el("div", { class: "card raised plan" }, el("p", null, why), el("ol", { class: "steps" }, lis),
      el("p", { class: "small muted" }, `About ${total} min of walking between the three. All free to enter.`)));
  }
  function renderToday() {
    if (!state.places.length) return;
    const now = londonNow();
    renderOpenNow(now); renderHalfDay(now);
  }

  // ---------- Explore ----------
  function passes(p, now) {
    const f = state.filters;
    if (f.has("open") && status(p, now).state !== "open") return false;
    if (f.has("indoor") && !p.indoor) return false;
    if (f.has("outdoor") && p.indoor) return false;
    if (f.has("kids") && !p.kids) return false;
    if (f.has("step") && p.stepFree !== "yes") return false;
    if (f.has("nobook") && p.booking !== "no") return false;
    if (f.has("evening") && !isEvening(p)) return false;
    if (f.has("beyond") && !p.outerBorough) return false;
    if (state.cats.size && !state.cats.has(p.category)) return false;
    return true;
  }
  function chip(label, on, fn) { return el("button", { class: "chip", type: "button", "aria-pressed": String(on), onclick: fn }, label); }
  function renderChips() {
    $("#filter-chips").replaceChildren(...FILTERS.map(([id, label]) => chip(label, state.filters.has(id), () => {
      if (state.filters.has(id)) state.filters.delete(id);
      else { state.filters.add(id); if (id === "indoor") state.filters.delete("outdoor"); if (id === "outdoor") state.filters.delete("indoor"); }
      renderExplore();
    })));
    $("#cat-chips").replaceChildren(...CATS.map(([id, label]) => chip(label, state.cats.has(id), () => {
      if (state.cats.has(id)) state.cats.delete(id); else state.cats.add(id);
      renderExplore();
    })));
  }
  function filtered() {
    const now = londonNow();
    return { now, list: state.places.filter((p) => passes(p, now)).sort((a, b) => dist(a) - dist(b)) };
  }
  function renderExplore() {
    renderChips();
    const { now, list } = filtered();
    $("#explore-count").textContent = `${list.length} ${list.length === 1 ? "place" : "places"}` + (hasLoc() ? ", nearest first" : ", nearest to central London first");
    const box = $("#explore-list"); box.replaceChildren();
    if (!list.length) box.append(el("div", { class: "card empty" }, el("p", { class: "h3" }, "No places match these filters."), el("p", { class: "muted" }, "Turn a filter off to see more.")));
    else box.append(listOf(list.map((p) => placeRow(p, now))));
    if (state.view === "map") renderMap(list);
  }
  function setView(v) {
    state.view = v;
    $("#seg-list").setAttribute("aria-pressed", String(v === "list")); $("#seg-map").setAttribute("aria-pressed", String(v === "map"));
    $("#explore-list").hidden = v !== "list"; $("#explore-map-wrap").hidden = v !== "map";
    if (v === "map") renderMap(filtered().list);
  }

  // ---------- map ----------
  let map = null, tiles = null, layer = null, tileFailed = false;
  const isDark = () => { const th = document.documentElement.dataset.theme; return th === "dark" || (th !== "light" && matchMedia("(prefers-color-scheme: dark)").matches); };
  const cssVar = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim() || "#0B6870";
  function setTiles() {
    if (!map) return;
    if (tiles) map.removeLayer(tiles);
    tiles = L.tileLayer(`https://{s}.basemaps.cartocdn.com/${isDark() ? "dark_all" : "light_all"}/{z}/{x}/{y}{r}.png`,
      { subdomains: "abcd", maxZoom: 19, attribution: "© OpenStreetMap contributors © CARTO" }).addTo(map);
    tiles.on("tileerror", () => { if (!tileFailed) { tileFailed = true; $("#map-note").textContent = "Map tiles could not load. The list view still works."; } });
    tiles.on("tileload", () => { if (tileFailed) { tileFailed = false; $("#map-note").textContent = ""; } });
  }
  function renderMap(list) {
    if (typeof L === "undefined") { $("#map-note").textContent = "The map could not load. Use the list view."; return; }
    if (!map) {
      map = L.map("explore-map", { zoomControl: true }).setView([state.loc.lat, state.loc.lon], 12);
      map.attributionControl.setPrefix(false);
      setTiles();
    }
    setTimeout(() => map.invalidateSize(), 0);
    if (layer) layer.remove();
    layer = L.layerGroup().addTo(map);
    const col = cssVar("--thames"), ring = cssVar("--surface");
    const pts = [];
    list.filter((p) => !isParkrun(p)).forEach((p) => {
      const m = L.circleMarker([p.lat, p.lon], { radius: 9, color: ring, weight: 2, fillColor: col, fillOpacity: 0.95 }).addTo(layer);
      m.bindTooltip(p.name);
      m.on("click", () => openPlace(p.id));
      pts.push([p.lat, p.lon]);
    });
    if (hasLoc()) { L.circleMarker([state.loc.lat, state.loc.lon], { radius: 7, color: cssVar("--signal"), weight: 3, fillColor: ring, fillOpacity: 1 }).bindTooltip("You are here").addTo(layer); pts.push([state.loc.lat, state.loc.lon]); }
    if (pts.length) map.fitBounds(pts, { padding: [24, 24], maxZoom: 14 });
    $("#map-note").textContent = tileFailed ? "Map tiles could not load. The list view still works." : "Tap a dot for details. The list view has the same places.";
  }
  function onThemeChange() { if (map) { setTiles(); if (state.view === "map") renderMap(filtered().list); } }
  try { matchMedia("(prefers-color-scheme: dark)").addEventListener("change", onThemeChange); } catch { /* old browser */ }

  // ---------- Essentials ----------
  const GUIDE = [
    ["Free water", "Many cafés refill water bottles for free — look for the Refill sticker or use the Refill app."],
    ["Libraries", "Public libraries are free warm spaces, usually with Wi-Fi and toilets."],
    ["Heat and cold", "In heatwaves the Mayor and councils publish Cool Spaces; in winter councils run Warm Spaces."],
  ];
  const KINDS = [
    ["drinking_water", "Free drinking water", "Drinking water tap"], ["toilets", "Public toilets", "Public toilet"], ["library", "Libraries", "Library"],
  ];
  function renderGuide() {
    $("#ess-guidance").replaceChildren(...GUIDE.map(([h, b]) => el("div", { class: "card tint-info" }, el("h3", null, h), el("p", null, b))));
  }
  function essQuery({ lat, lon }) {
    return `[out:json][timeout:20];(node(around:1000,${lat},${lon})[amenity=drinking_water];node(around:1000,${lat},${lon})[amenity=toilets];node(around:1000,${lat},${lon})[amenity=library];way(around:1000,${lat},${lon})[amenity=library];);out center 80;`;
  }
  async function overpass(loc) {
    if (navigator.onLine === false) throw new Error("offline");
    const ctrl = new AbortController(), tm = setTimeout(() => ctrl.abort(), 22000);
    try {
      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST", signal: ctrl.signal, credentials: "omit",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: "data=" + encodeURIComponent(essQuery(loc)),
      });
      if (!res.ok) throw new Error("http " + res.status);
      const j = await res.json();
      return (j.elements || []).map((e) => ({ id: e.type + e.id, lat: e.lat ?? e.center?.lat, lon: e.lon ?? e.center?.lon, tags: e.tags || {} })).filter((e) => e.lat != null);
    } catch (e) { throw e.name === "AbortError" ? new Error("timeout") : e; } finally { clearTimeout(tm); }
  }
  function essRow(it, def) {
    const tg = it.tags, d = distanceM(state.loc, it);
    const bits = [];
    if (tg.fee === "no") bits.push(el("span", { class: "tag free" }, "Free")); else if (tg.fee === "yes") bits.push(el("span", { class: "tag" }, "Fee"));
    const wc = { yes: "Wheelchair accessible", limited: "Limited wheelchair access", no: "Not wheelchair accessible" }[tg.wheelchair];
    if (wc) bits.push(el("span", { class: "tag" }, wc));
    if (tg.changing_table === "yes") bits.push(el("span", { class: "tag" }, "Baby changing"));
    return el("a", { class: "row place", href: gmaps(it.lat, it.lon), target: "_blank", rel: "noopener noreferrer", "aria-label": `${tg.name || def}, ${fmtDistance(d)}. Opens directions in a new tab.` },
      el("span", { class: "body" },
        el("span", { class: "row-title" }, tg.name || def),
        el("span", { class: "row-meta" }, `${fmtDistance(d)}${d <= 3200 ? " · " + walkMins(d) + " min walk" : ""}`),
        tg.opening_hours ? el("span", { class: "row-meta" }, "Hours (OpenStreetMap): " + tg.opening_hours) : null,
        bits.length ? el("div", { class: "tags" }, bits) : null),
      el("span", { class: "chev", "aria-hidden": "true" }, "›"));
  }
  async function loadEssentials(force) {
    $("#ess-where").textContent = `Showing within 1 km of ${state.loc.label}.` + (hasLoc() ? "" : " Choose a place on Today to change this.");
    const box = $("#ess-live"), loc = state.loc;
    const key = `ess:${loc.lat.toFixed(3)},${loc.lon.toFixed(3)}`;
    if (!force && state.essKey === key) return;
    state.essKey = key;
    if (force) store.del("cache:" + key);
    box.replaceChildren(el("div", { class: "skeleton", "aria-label": "Loading" }), el("div", { class: "skeleton" }));
    const unavailable = (msg) => box.replaceChildren(el("div", { class: "card tint-warn" }, el("h3", null, "Live map unavailable"),
      el("p", null, msg), el("p", { class: "small" }, "The guidance above is saved on your phone and still applies.")));
    try {
      const r = await Civic.cached(key, 30 * 60 * 1000, () => overpass(loc));
      if (state.essKey !== key) return;
      const items = r.data.map((e) => ({ ...e, kind: e.tags.amenity })).sort((a, b) => distanceM(loc, a) - distanceM(loc, b));
      const out = [];
      if (r.fromCache) out.push(el("p", { class: "small muted" }, (r.stale ? "Showing saved results from " : "Results from ") + Civic.relTime(r.savedAt) + (r.stale ? " (could not refresh)." : ".")));
      KINDS.forEach(([k, title, def]) => {
        const rows = items.filter((i) => i.kind === k);
        const sec = el("div", { class: "stack" }, el("h3", null, `${title} (${rows.length})`));
        if (!rows.length) sec.append(el("p", { class: "small muted" }, "None found within 1 km in OpenStreetMap."));
        else {
          const list = el("div", { class: "list" }, rows.slice(0, 6).map((i) => essRow(i, def)));
          sec.append(list);
          if (rows.length > 6) {
            const b = el("button", { class: "btn btn-ghost btn-sm more-btn", type: "button" }, `Show all ${rows.length}`);
            b.onclick = () => { list.replaceChildren(...rows.map((i) => essRow(i, def))); b.remove(); };
            sec.append(b);
          }
        }
        out.push(sec);
      });
      out.push(el("p", { class: "tiny muted" }, "Data © OpenStreetMap contributors. Volunteers keep it up to date, so check hours and access on arrival."));
      box.replaceChildren(...out);
    } catch (e) {
      if (state.essKey !== key) return;
      state.essKey = null;
      unavailable(e.message === "offline" ? "The live map of water, toilets and libraries needs a connection." : "The live map of water, toilets and libraries needs a connection, and the service did not answer. Try Refresh in a moment.");
    }
  }

  // ---------- Saved ----------
  function renderSaved() {
    const box = $("#saved-list"); box.replaceChildren();
    const now = londonNow();
    const list = [...state.saved].map(byId).filter(Boolean);
    if (!list.length) { box.append(el("div", { class: "card empty" }, el("p", { class: "h3" }, "Nothing saved yet."), el("p", { class: "muted" }, "Open any place and tap Save this place. Saved places stay on your phone."))); return; }
    list.sort((a, b) => dist(a) - dist(b));
    box.append(listOf(list.map((p) => placeRow(p, now))));
  }

  function renderAll() { renderToday(); renderExplore(); renderSaved(); }

  // ---------- init ----------
  async function init() {
    $("#open-settings").innerHTML = icon("settings");
    $("#open-settings").onclick = openSettings;
    $$("[data-i]").forEach((s) => (s.outerHTML = icon(s.dataset.i)));
    Civic.watchOnline($("#offline-banner"));
    fillAreas(); renderGuide();
    $("#use-loc").onclick = () => useMyLocation(false);
    $("#pc-form").addEventListener("submit", lookupPostcode);
    $("#seg-list").onclick = () => setView("list"); $("#seg-map").onclick = () => setView("map");
    $("#ess-reload").onclick = () => loadEssentials(true);
    window.addEventListener("online", () => { loadWeather(); if (state.current === "essentials") loadEssentials(true); });

    const saved = store.get("free:loc");
    if (saved && (saved.source === "area" || saved.source === "postcode") && Civic.inLondon(saved.lat, saved.lon)) {
      state.loc = { ...saved };
      $("#where-label").textContent = saved.label;
      if (saved.id) $("#area-pick").value = saved.id;
    }
    try {
      state.places = (await Civic.local("data/places.json")).filter((p) => p && p.id && CAT[p.category]);
    } catch {
      $("#open-now").append(el("div", { class: "card tint-bad" }, el("p", null, "The list of places could not load. Reload the page.")));
    }
    Civic.tabs({ today: $("#view-today"), explore: $("#view-explore"), essentials: $("#view-essentials"), saved: $("#view-saved") }, "today", (k) => {
      state.current = k;
      if (k === "today") renderToday();
      if (k === "explore") { renderExplore(); if (state.view === "map" && map) setTimeout(() => map.invalidateSize(), 50); }
      if (k === "essentials") loadEssentials(false);
      if (k === "saved") renderSaved();
    });
    renderAll();
    loadWeather();
    try {
      if (!hasLoc() && navigator.permissions) {
        const st = await navigator.permissions.query({ name: "geolocation" });
        if (st.state === "granted") useMyLocation(true);
      }
    } catch { /* permissions API unavailable */ }
    setInterval(() => { if (state.current === "today" && !sheetEls) renderToday(); }, 60000);
    Civic.registerSW("sw.js");
  }
  init();
})();
