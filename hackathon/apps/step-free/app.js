/* Step-Free & Calm: lifts, Plan B, busyness. Vanilla JS on the shared Civic kit. */
(function () {
  "use strict";
  const { el, $, esc, store, icon } = Civic;
  const API = "https://api.tfl.gov.uk";
  const H24 = 24 * 3600 * 1000;
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const DAYS_LONG = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Line colours are data encoding only (no logos).
  const LINE_COL = {
    bakerloo: "#B36305", central: "#E32017", circle: "#FFD300", district: "#00782A", "hammersmith-city": "#F3A9BB",
    jubilee: "#A0A5A9", metropolitan: "#9B0056", northern: "#000000", piccadilly: "#003688", victoria: "#0098D4",
    "waterloo-city": "#95CDBA", elizabeth: "#6950A1", dlr: "#00A4A7", liberty: "#61686B", lioness: "#F1B41C",
    mildmay: "#437EC1", suffragette: "#39B97A", weaver: "#972861", windrush: "#EF4D5E", tram: "#84B817",
  };

  let DATA = null;           // stations.json
  const byId = {};
  let byNorm = {};
  let favs = store.get("sf:favs", []);
  let selId = store.get("sf:station", null);
  let quietId = store.get("sf:quiet", null);
  let renderedFor; // undefined until the first render, so an empty #station still renders its prompt
  let renderToken = 0;

  // ---------- helpers ----------
  const norm = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim();
  const lum = (hex) => {
    const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  function chipText(hex) {
    const L = lum(hex);
    return (1.05 / (L + 0.05)) >= ((L + 0.05) / 0.05) ? "#FFFFFF" : "#000000";
  }
  function lineChip(id) {
    const col = LINE_COL[id] || "#61686B";
    const name = (DATA.lines[id] && DATA.lines[id].name) || id;
    return el("span", { class: "lc", "data-line": id, style: `background:${col};color:${chipText(col)}` }, name);
  }
  const chips = (s) => el("span", { class: "lines" }, s.lines.map(lineChip));
  const tfl = (path, opts) => Civic.fetchJSON(API + path, opts || { timeout: 9000 });
  const pill = (kind, text) => el("span", { class: "pill " + kind }, text);
  const hhmm = (m) => String(Math.floor(m / 60) % 24).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
  const loading = (t) => el("p", { class: "muted small" }, t || "Checking with TfL…");
  const note = (kind, ...c) => el("div", { class: "banner " + kind }, el("div", null, ...c));

  // ---------- TfL parsing ----------
  function compactStop(j) {
    const out = [], seen = new Set();
    const add = (list) => (Array.isArray(list) ? list : []).forEach((p) => {
      if (!p || p.key == null) return;
      const k = String(p.category) + "|" + p.key;
      if (seen.has(k)) return;
      seen.add(k);
      out.push({ category: String(p.category || ""), key: String(p.key), value: String(p.value == null ? "" : p.value) });
    });
    add(j && j.additionalProperties);
    if (!out.length) {
      const walk = (n, d) => { if (!n || d > 2) return; add(n.additionalProperties); (n.children || []).forEach((c) => walk(c, d + 1)); };
      walk(j, 0);
    }
    return { name: (j && j.commonName) || "", props: out };
  }
  const getStop = (id) => Civic.cached("stop:" + id, H24, async () => compactStop(await tfl("/StopPoint/" + encodeURIComponent(id))));

  /** true = step-free/lift access reported, false = reported none, null = unknown */
  function stepFree(props) {
    let yes = false, no = false;
    for (const p of props || []) {
      const k = p.key.toLowerCase(), v = p.value.toLowerCase().trim();
      if (/accessvialift|step.?free/.test(k)) {
        if (/^(yes|true|y)\b/.test(v) || /lift|ramp|step.?free/.test(v)) yes = true;
        else if (/^(no|false|n)\b/.test(v)) no = true;
      } else if (k === "lifts" && Number(v) > 0) yes = true;
    }
    return yes ? true : no ? false : null;
  }

  const humanise = (k) => k.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").replace(/^./, (c) => c.toUpperCase());
  const LABELS = { accessvialift: "Step-free access via lift", lifts: "Lifts", escalators: "Escalators", toilets: "Toilets" };

  const textKeys = ["description", "message", "disruptionDescription", "details", "reason", "additionalInfo", "text", "lastUpdate"];
  function strings(o, d = 0, acc = []) {
    if (o == null || d > 3) return acc;
    if (typeof o === "string") acc.push(o);
    else if (typeof o === "number") acc.push(String(o));
    else if (Array.isArray(o)) o.forEach((x) => strings(x, d + 1, acc));
    else if (typeof o === "object") Object.values(o).forEach((x) => strings(x, d + 1, acc));
    return acc;
  }
  function pickText(o) {
    for (const k of textKeys) if (typeof o[k] === "string" && o[k].trim()) return o[k].trim();
    const s = Object.values(o).filter((v) => typeof v === "string" && v.length > 20).sort((a, b) => b.length - a.length);
    return s[0] ? s[0].trim() : "Lift problem reported for this station.";
  }
  /** Lift disruption feed: shape not verified, so parse defensively. */
  function parseLiftFeed(json, st) {
    const items = [];
    const take = (a) => a.forEach((x) => { if (x && typeof x === "object" && !Array.isArray(x)) items.push(x); });
    if (Array.isArray(json)) take(json);
    else if (json && typeof json === "object") {
      let any = false;
      Object.values(json).forEach((v) => { if (Array.isArray(v)) { any = true; take(v); } });
      if (!any) items.push(json);
    }
    const idl = st.id.toLowerCase();
    const name = norm(st.name);
    const re = name.length >= 3 ? new RegExp("(^|[^a-z0-9])" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "([^a-z0-9]|$)") : null;
    const found = [];
    for (const it of items) {
      const ss = strings(it);
      const hit = ss.some((s) => s.toLowerCase().includes(idl) || (re && re.test(norm(s))));
      if (hit) found.push(pickText(it));
    }
    return found;
  }
  function parseStopDisruption(json) {
    const arr = Array.isArray(json) ? json : [];
    return arr.filter((d) => d && /lift|escalator|step.?free/i.test(String(d.description || d.additionalInfo || "")))
      .map((d) => String(d.description || d.additionalInfo).trim());
  }
  let liftFeedP = null, liftFeedAt = 0;
  function liftFeed() {
    if (liftFeedP && Date.now() - liftFeedAt < 180000) return liftFeedP;
    liftFeedAt = Date.now();
    liftFeedP = tfl("/Disruptions/Lifts/v2/");
    liftFeedP.catch(() => { liftFeedP = null; });
    return liftFeedP;
  }
  async function checkLifts(st) {
    const [a, b] = await Promise.allSettled([liftFeed(), tfl(`/StopPoint/${encodeURIComponent(st.id)}/Disruption?getFamily=true&flattenResponse=true`)]);
    const items = [];
    let okCalls = 0;
    if (a.status === "fulfilled") { okCalls++; items.push(...parseLiftFeed(a.value, st)); }
    if (b.status === "fulfilled") { okCalls++; items.push(...parseStopDisruption(b.value)); }
    const uniq = [...new Set(items)];
    const status = uniq.length ? "bad" : okCalls ? "ok" : "unknown";
    return { status, items: uniq, okCalls };
  }

  const DOW = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  /** Typical crowding to {days:[ [ [start,end,v], ... ] x7 ]} */
  function parseTypical(j) {
    const days = (j && (j.daysOfWeek || j.DaysOfWeek)) || [];
    const out = [[], [], [], [], [], [], []];
    let n = 0;
    for (const d of Array.isArray(days) ? days : []) {
      const idx = DOW.indexOf(String(d.dayOfWeek || d.DayOfWeek || "").toUpperCase().slice(0, 3));
      if (idx < 0) continue;
      for (const b of d.timeBands || d.TimeBands || []) {
        const m = /(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/.exec(String(b.timeBand || b.TimeBand || ""));
        const v = Number(b.percentageOfBaseLine != null ? b.percentageOfBaseLine : b.percentageOfBaseline);
        if (!m || !isFinite(v) || (b.percentageOfBaseLine == null && b.percentageOfBaseline == null)) continue;
        const s = +m[1] * 60 + +m[2];
        let e = +m[3] * 60 + +m[4];
        if (e <= s) e += 1440;
        out[idx].push([s, e, v]);
        n++;
      }
      out[idx].sort((x, y) => x[0] - y[0]);
    }
    if (!n) throw new Error("nodata");
    return { days: out };
  }
  const getTypical = (id) => Civic.cached("crowd:" + id, 6 * 3600 * 1000, async () => parseTypical(await tfl("/crowding/" + encodeURIComponent(id))));
  function parseLive(j) {
    const o = Array.isArray(j) ? j[0] : j;
    if (!o || typeof o !== "object") return { available: false };
    const v = Number(o.percentageOfBaseline != null ? o.percentageOfBaseline : o.percentageOfBaseLine);
    const ok = o.dataAvailable !== false && (o.percentageOfBaseline != null || o.percentageOfBaseLine != null) && isFinite(v);
    return ok ? { available: true, pct: v, time: o.timeLocal || "" } : { available: false };
  }
  function hourly(bands) {
    const m = {};
    for (const [s, , v] of bands) { const h = Math.floor(s / 60) % 24; (m[h] = m[h] || []).push(v); }
    const out = {};
    for (const h of Object.keys(m)) out[h] = m[h].reduce((a, b) => a + b, 0) / m[h].length;
    return out;
  }
  /** Quietest window of at least 30 minutes starting within the next 3 hours (today). */
  function quietestWindow(bands, nowMin) {
    let best = null;
    for (let i = 0; i < bands.length; i++) {
      if (bands[i][0] < nowMin - 14 || bands[i][0] > nowMin + 180) continue;
      let dur = 0, sum = 0, w = 0, j = i;
      while (j < bands.length && dur < 30) {
        if (j > i && bands[j][0] !== bands[j - 1][1]) break;
        const len = bands[j][1] - bands[j][0];
        sum += bands[j][2] * len; w += len; dur += len; j++;
      }
      if (dur < 30) continue;
      const avg = sum / w;
      if (!best || avg < best.v) best = { start: bands[i][0], end: bands[i][0] + dur, v: avg };
    }
    return best;
  }

  // ---------- UI building blocks ----------
  function stationRow(s, onClick, side) {
    return el("button", { class: "row", type: "button", onclick: () => onClick(s) },
      el("div", { class: "grow" }, el("span", { class: "row-title" }, s.name), chips(s)),
      side || el("span", { class: "chev", "aria-hidden": "true" }, "›"));
  }
  function badgeFor(id) {
    const b = store.get("sf:lift:" + id);
    if (!b) return pill("neutral", "Not checked yet");
    const when = Civic.relTime(b.at);
    const p = b.status === "bad" ? pill("bad", "Lift problem") : b.status === "ok" ? pill("ok", "No problems") : pill("neutral", "Status unknown");
    return el("span", { class: "side" }, p, el("span", { class: "tiny muted" }, "Last known " + when));
  }
  function makeSearch(prefix, onPick, hint) {
    const input = el("input", { class: "input", id: prefix + "-q", type: "search", autocomplete: "off", autocapitalize: "off", spellcheck: "false", placeholder: "e.g. Colindale" });
    const out = el("div", { "aria-live": "polite" });
    const run = () => {
      const q = norm(input.value);
      out.replaceChildren();
      if (!q) { out.append(el("p", { class: "small muted" }, hint || "Type part of a station name.")); return; }
      const hits = DATA.stations.map((s) => ({ s, n: norm(s.name) })).filter((x) => x.n.includes(q))
        .sort((a, b) => (b.n.startsWith(q) - a.n.startsWith(q)) || a.n.localeCompare(b.n));
      if (!hits.length) { out.append(el("p", { class: "small muted" }, "No station matches that. Check the spelling or try fewer letters.")); return; }
      const shown = hits.slice(0, 30);
      out.append(el("p", { class: "small muted" }, hits.length > 30 ? "Showing 30 of " + hits.length + ". Keep typing to narrow it." : hits.length + (hits.length === 1 ? " station" : " stations")),
        el("div", { class: "list" }, shown.map((x) => stationRow(x.s, onPick))));
    };
    input.addEventListener("input", run);
    const node = el("div", { class: "field" }, el("label", { for: prefix + "-q" }, "Search stations"), el("div", { class: "search" }, el("span", { html: icon("search") }), input), out);
    run();
    return { node, input };
  }

  // ---------- Stations view ----------
  function openStation(s) {
    selId = s.id; store.set("sf:station", selId);
    location.hash = "station";
  }
  function renderFavs() {
    const out = $("#favs-out");
    out.replaceChildren();
    const list = favs.map((id) => byId[id]).filter(Boolean);
    if (!list.length) {
      out.append(el("p", { class: "muted" }, "No favourites yet. Open a station and choose Add to favourites. Its last known lift status will show here, even offline."));
      return;
    }
    out.append(el("div", { class: "list" }, list.map((s) => stationRow(s, openStation, badgeFor(s.id)))));
  }
  function setupStations() {
    const s = makeSearch("st", openStation, "Type part of a station name. Search works offline.");
    $("#search-card").append(s.node);
    // Busy interchanges where a broken lift strands the most people (real NaPTAN ids from the offline directory)
    const picks = ["940GZZLUKSX", "940GZZLUWLO", "940GZZLULNB", "940GZZLUSTD", "940GZZLUVIC", "940GZZLUGPK"].map((id) => byId[id]).filter(Boolean);
    if (picks.length) {
      $("#search-card").append(el("div", { class: "stack" },
        el("span", { class: "eyebrow" }, "Busy interchanges"),
        el("div", { class: "chips" }, picks.map((p) => el("button", { class: "chip", type: "button", onclick: () => openStation(p) }, p.name)))));
    }
    renderFavs();
    $("#near-btn").addEventListener("click", nearMe);
  }
  async function nearMe() {
    const out = $("#near-out"), btn = $("#near-btn");
    out.replaceChildren(loading("Finding your location…"));
    btn.disabled = true;
    try {
      const p = await Civic.geo();
      if (!Civic.inLondon(p.lat, p.lon)) { out.replaceChildren(note("info", "You seem to be outside London. Search for a station by name instead.")); return; }
      out.replaceChildren(loading("Looking for stations within 1 km…"));
      const url = `/StopPoint/?lat=${p.lat}&lon=${p.lon}&stopTypes=NaptanMetroStation,NaptanRailStation&radius=1000&modes=tube,elizabeth-line,dlr,overground`;
      const j = await tfl(url);
      const seen = new Set(), res = [];
      for (const sp of (j && j.stopPoints) || []) {
        let st = byId[sp.naptanId] || byId[sp.id];
        if (!st) st = byNorm[norm(String(sp.commonName || "").replace(/\s+(underground|rail|dlr|tram|overground|elizabeth line)?\s*station$/i, ""))];
        if (!st || seen.has(st.id)) continue;
        seen.add(st.id);
        res.push({ st, d: Number(sp.distance) });
      }
      res.sort((a, b) => (a.d || 0) - (b.d || 0));
      if (!res.length) { out.replaceChildren(note("info", "No stations from our list within 1 km. Search by name instead.")); return; }
      out.replaceChildren(el("div", { class: "list" }, res.slice(0, 8).map((r) =>
        stationRow(r.st, openStation, isFinite(r.d) ? el("span", { class: "side" }, el("span", { class: "small" }, Civic.fmtDistance(r.d)), el("span", { class: "tiny muted" }, Civic.walkMins(r.d) + " min walk")) : null))));
    } catch (e) {
      const m = e.message;
      const text = m === "denied" || m === "unsupported" || m === "unavailable" || m === "timeout"
        ? "We could not get your location. You can still search by name above."
        : "Nearby stations need a connection. You can still search by name above.";
      out.replaceChildren(note("info", text));
    } finally { btn.disabled = false; }
  }

  // ---------- Station view ----------
  function toggleFav(id) {
    favs = favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id];
    store.set("sf:favs", favs);
    renderFavs();
  }
  function renderStation() {
    const v = $("#view-station");
    v.replaceChildren();
    const st = byId[selId];
    renderedFor = selId;
    if (!st) {
      v.append(el("div", { class: "card" }, el("h2", null, "No station chosen"),
        el("p", null, "Pick a station to see its lifts, Plan B and busyness."),
        el("div", null, el("a", { class: "btn btn-accent", href: "#stations", "data-go": "stations" }, "Choose a station"))));
      return;
    }
    const token = ++renderToken;
    const alive = () => token === renderToken && selId === st.id;

    const pillSlot = el("div", { "aria-live": "polite" }, pill("neutral", "Checking lifts…"));
    const favBtn = el("button", { class: "btn btn-ghost", type: "button" });
    const syncFav = () => { favBtn.textContent = favs.includes(st.id) ? "Remove from favourites" : "Add to favourites"; };
    favBtn.addEventListener("click", () => { toggleFav(st.id); syncFav(); });
    syncFav();
    v.append(el("div", { class: "card raised" },
      el("span", { class: "eyebrow" }, "Station"), el("h2", null, st.name), chips(st), pillSlot,
      el("div", { class: "cluster" }, favBtn, el("a", { class: "btn btn-ghost", href: "#stations" }, "Change station"))));

    const setPill = (status) => {
      pillSlot.replaceChildren(status === "bad" ? pill("bad", "Lift problem reported") : status === "ok" ? pill("info", "No lift problems reported") : pill("neutral", "Lift status unavailable"));
    };

    // a) lifts & step-free
    const liftStatus = el("div", { class: "stack", "aria-live": "polite" }, loading("Checking lift status…"));
    const fac = el("div", { class: "stack", "aria-live": "polite" }, loading("Loading facilities…"));
    v.append(el("section", { class: "card", "aria-labelledby": "h-lifts" }, el("h3", { id: "h-lifts" }, "Lifts and step-free access"), liftStatus, el("hr", { class: "divider" }), fac));

    // b) Plan B
    const planOut = el("div", { class: "stack", "aria-live": "polite" });
    const planBtn = el("button", { class: "btn btn-accent", type: "button", onclick: () => runPlanB(st, planOut, planBtn, alive) }, "Find a step-free Plan B");
    v.append(el("section", { class: "card", "aria-labelledby": "h-plan" }, el("h3", { id: "h-plan" }, "Plan B"),
      el("p", { class: "small muted" }, "Nearby stations on the same lines that TfL says have lift or step-free access."),
      el("div", null, planBtn), planOut,
      el("div", { class: "banner info" }, el("div", { class: "stack" },
        el("p", null, "Ask staff at the gateline. They can help you plan another step-free route, and TfL may arrange other transport if a lift is out."),
        el("p", null, "Turn-up-and-go: staff help you board; you don't need to book.")))));

    // c) busyness
    const nowOut = el("div", { class: "stack", "aria-live": "polite" }, loading("Checking how busy it is now…"));
    const chartOut = el("div", { class: "stack", "aria-live": "polite" }, loading("Loading typical busyness…"));
    v.append(el("section", { class: "card", "aria-labelledby": "h-busy" }, el("h3", { id: "h-busy" }, "How busy"), nowOut, el("hr", { class: "divider" }), chartOut,
      el("p", { class: "tiny muted" }, "Based on TfL's typical busyness at this station's gates, not seats on trains.")));

    // d) line status
    const lineOut = el("div", { class: "stack", "aria-live": "polite" }, loading("Checking line status…"));
    v.append(el("section", { class: "card", "aria-labelledby": "h-line" }, el("h3", { id: "h-line" }, "Line status"), lineOut));

    // ---- load: facilities
    getStop(st.id).then((r) => {
      if (!alive()) return;
      fac.replaceChildren(...facilitiesView(r).filter(Boolean));
    }).catch(() => {
      if (!alive()) return;
      fac.replaceChildren(note("info", "Station facilities need a connection the first time you open a station. Plan B, the staff advice below and the station list still work."));
    });

    // ---- load: lift problems
    checkLifts(st).then((r) => {
      if (!alive()) return;
      store.set("sf:lift:" + st.id, { status: r.status, at: Date.now() });
      renderFavs();
      setPill(r.status);
      liftStatus.replaceChildren(...liftView(r, st).filter(Boolean)); // skip optional null parts (DOM would print "null")
      if (r.status === "bad") planBtn.click();
    });

    // ---- load: crowding
    const nowL = Civic.londonNow();
    let typical = null;
    const live = tfl("/crowding/" + encodeURIComponent(st.id) + "/Live").then(parseLive);
    const typ = getTypical(st.id);
    Promise.allSettled([live, typ]).then(([l, t]) => {
      if (!alive()) return;
      typical = t.status === "fulfilled" ? t.value : null;
      nowOut.replaceChildren(...liveView(l, nowL).filter(Boolean));
      chartOut.replaceChildren(...typicalView(t, nowL).filter(Boolean));
    });

    // ---- load: line status
    tfl("/Line/" + st.lines.map(encodeURIComponent).join(",") + "/Status").then((j) => {
      if (!alive()) return;
      const arr = Array.isArray(j) ? j : [];
      if (!arr.length) throw new Error("empty");
      lineOut.replaceChildren(el("div", { class: "list" }, arr.map((ln) => {
        const s0 = (ln.lineStatuses && ln.lineStatuses[0]) || {};
        const d = String(s0.statusSeverityDescription || "Unknown");
        const kind = /^good/i.test(d) ? "ok" : /closed|suspend|severe|not running|no service/i.test(d) ? "bad" : /unknown/i.test(d) ? "neutral" : "warn";
        return el("div", { class: "row", style: "cursor:default" },
          el("div", { class: "grow" }, lineChip(ln.id), s0.reason ? el("span", { class: "small" }, s0.reason) : null),
          pill(kind, d));
      })));
    }).catch(() => {
      if (!alive()) return;
      lineOut.replaceChildren(note("info", "Line status needs a connection. Station facilities and typical busyness saved on your phone still work."));
    });
  }

  function facilitiesView(r) {
    const props = (r.data.props || []).filter((p) => /accessib|facilit/i.test(p.category));
    const bits = [];
    if (r.fromCache && r.stale) bits.push(el("p", { class: "tiny muted" }, "Saved on your phone " + Civic.relTime(r.savedAt) + ". TfL could not be reached just now."));
    if (!props.length) {
      bits.push(el("p", { class: "muted" }, "TfL has no facility details listed for this station. Ask staff on arrival."));
      return bits;
    }
    const main = props.filter((p) => /lift|escalator|toilet|step|ramp|wheel|access/i.test(p.key));
    const more = props.filter((p) => !main.includes(p));
    const val = (p) => {
      const v = p.value.trim();
      if (/^(yes|true)$/i.test(v)) return pill("ok", "Yes");
      if (/^(no|false)$/i.test(v)) return pill("neutral", "No");
      return v || "Listed";
    };
    const dl = (list) => el("dl", { class: "kv" }, list.map((p) => el("div", null, el("dt", null, LABELS[p.key.toLowerCase()] || humanise(p.key)), el("dd", null, val(p)))));
    bits.push(el("h4", { class: "h3" }, "Facilities"));
    bits.push(main.length ? dl(main) : el("p", { class: "muted" }, "No lift or step-free details listed."));
    if (more.length) bits.push(el("details", null, el("summary", null, "More facilities (" + more.length + ")"), dl(more)));
    if (r.fromCache && !r.stale) bits.push(el("p", { class: "tiny muted" }, "Saved on your phone, updated " + Civic.relTime(r.savedAt) + "."));
    return bits;
  }
  function liftView(r, st) {
    const t = new Date().toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit" });
    if (r.status === "bad") {
      return [note("bad", el("div", { class: "stack" }, el("strong", null, "Lift problem reported at " + st.name),
        el("ul", { class: "alert-list" }, r.items.map((x) => el("li", null, x))))),
      el("p", { class: "small" }, "Plan B below shows nearby step-free stations. Staff can also help.")];
    }
    if (r.status === "ok") {
      return [note("info", "No lift problems reported by TfL at " + t + "."),
        el("p", { class: "tiny muted" }, (r.okCalls < 2 ? "One of TfL's two lift checks was unavailable. " : "") + "Only some lifts report faults automatically; others rely on staff reports, and a lift can fail between updates. Ask staff if unsure.")];
    }
    const last = store.get("sf:lift:" + st.id);
    return [note("info", "Live lift status needs a connection. Station facilities below are saved on your phone if you have opened this station before."),
      last && last.status !== "unknown" ? el("p", { class: "small muted" }, "Last known: " + (last.status === "bad" ? "a lift problem" : "no lift problems") + ", " + Civic.relTime(last.at) + ".") : null];
  }
  function liveView(l, nowL) {
    if (l.status === "rejected") return [note("info", "Live busyness needs a connection. Typical busyness below, and Plan B, may still work.")];
    const v = l.value;
    if (!v.available) return [note("info", "TfL has no live busyness for this station right now. Typical busyness is shown below.")];
    const q = v.pct < 0.85 ? "Quieter than usual" : v.pct > 1.15 ? "Busier than usual" : "About usual";
    const kind = v.pct < 0.85 ? "ok" : v.pct > 1.15 ? "warn" : "info";
    return [el("span", { class: "eyebrow" }, "Now"), el("p", { class: "status-big" }, q),
      el("div", { class: "cluster" }, pill(kind, Math.round(v.pct * 100) + "% of baseline")),
      el("p", { class: "tiny muted" }, "TfL live reading" + (v.time ? " at " + String(v.time).replace(/^.*T/, "").slice(0, 5) : "") + ".")];
  }
  function typicalView(t, nowL) {
    if (t.status === "rejected") {
      return [note("info", (t.reason && t.reason.message === "nodata" ? "TfL has no typical busyness for this station." : "Typical busyness needs a connection.") + " Lift information and Plan B still work.")];
    }
    const r = t.value;
    const bands = r.data.days[nowL.dow] || [];
    if (!bands.length) return [note("info", "TfL has no typical busyness for this station today.")];
    const rec = quietestWindow(bands, nowL.minutes);
    const out = [];
    if (rec) out.push(note("ok", el("div", null, el("strong", null, "Quietest time in the next 3 hours: " + hhmm(rec.start) + " to " + hhmm(rec.end)), el("div", { class: "small" }, "Typical level at the gates, not a live reading."))));
    else out.push(el("p", { class: "muted" }, "No typical data for the next 3 hours."));
    out.push(busyChart(bands, nowL.minutes, rec));
    out.push(el("div", { class: "legend" }, el("span", null, el("i", { style: "background:var(--thames);opacity:.7" }), "Typical"), el("span", null, el("i", { style: "background:var(--ink)" }), "Now"), rec ? el("span", null, el("i", { style: "background:var(--ok-bg);border:1.5px solid var(--ok)" }), "Quietest window") : null));
    if (r.fromCache && r.stale) out.push(el("p", { class: "tiny muted" }, "Saved on your phone " + Civic.relTime(r.savedAt) + "."));
    return out;
  }

  function busyChart(bands, nowMin, rec) {
    const hv = hourly(bands);
    const hrs = Object.keys(hv).map(Number).sort((a, b) => a - b);
    const lo = hrs[0], hi = hrs[hrs.length - 1];
    const W = 340, H = 150, padL = 4, padB = 20, padT = 8;
    const n = hi - lo + 1, bw = (W - padL * 2) / n;
    const max = Math.max(...hrs.map((h) => hv[h]), 0.0001);
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.setAttribute("class", "chart");
    svg.setAttribute("role", "img");
    const nowH = Math.floor(nowMin / 60);
    svg.setAttribute("aria-label", "Typical busyness by hour today, from " + hhmm(lo * 60) + " to " + hhmm((hi + 1) * 60) + "." + (rec ? " Quietest window " + hhmm(rec.start) + " to " + hhmm(rec.end) + "." : ""));
    const mk = (tag, attrs, text) => { const e = document.createElementNS(ns, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (text != null) e.textContent = text; return e; };
    const xOf = (min) => padL + ((min / 60) - lo) * bw;
    if (rec) {
      const x1 = Math.max(padL, xOf(rec.start)), x2 = Math.min(W - padL, xOf(rec.end));
      svg.append(mk("rect", { class: "rec", x: x1, y: padT - 4, width: Math.max(2, x2 - x1), height: H - padB - padT + 4, rx: 4 }));
    }
    for (const h of hrs) {
      const bh = Math.max(2, (hv[h] / max) * (H - padB - padT));
      const r = mk("rect", { class: "bar" + (h === nowH ? " now" : ""), x: padL + (h - lo) * bw + 1.5, y: H - padB - bh, width: bw - 3, height: bh, rx: 2 });
      r.append(mk("title", {}, hhmm(h * 60) + ": " + Math.round((hv[h] / max) * 100) + "% of today's busiest hour"));
      svg.append(r);
    }
    svg.append(mk("line", { class: "axis", x1: padL, x2: W - padL, y1: H - padB, y2: H - padB }));
    const step = n > 14 ? 3 : 2;
    for (let h = lo; h <= hi; h++) if ((h - lo) % step === 0) svg.append(mk("text", { x: padL + (h - lo) * bw + bw / 2, y: H - 6, "text-anchor": "middle" }, String(h).padStart(2, "0")));
    if (nowH >= lo && nowH <= hi) svg.append(mk("text", { x: padL + (nowH - lo) * bw + bw / 2, y: padT + 2, "text-anchor": "middle", style: "fill:var(--ink);font-weight:800" }, "now"));
    return svg;
  }

  async function runPlanB(st, out, btn, alive) {
    btn.disabled = true;
    out.replaceChildren(loading("Checking nearby stations…"));
    const seen = new Map();
    for (const lid of st.lines) {
      // routes = ordered station sequences, one per branch (lines[x].stations is only an unordered membership list)
      const routes = (DATA.lines[lid] && DATA.lines[lid].routes) || [];
      for (const arr of routes) {
        const i = arr.indexOf(st.id);
        if (i < 0) continue;
        for (let d = 1; d <= 3; d++) for (const j of [i - d, i + d]) {
          const sid = arr[j];
          if (!sid || sid === st.id) continue;
          const p = seen.get(sid);
          if (!p || p.steps > d) seen.set(sid, { id: sid, steps: d, line: lid });
        }
      }
    }
    const cands = [...seen.values()].sort((a, b) => a.steps - b.steps).slice(0, 14);
    if (!cands.length) { out.replaceChildren(note("info", "No neighbouring stations found on this station's lines. Ask staff for help.")); btn.disabled = false; return; }
    const res = await Promise.allSettled(cands.map((c) => getStop(c.id)));
    if (!alive()) return;
    btn.disabled = false;
    btn.textContent = "Check again";
    let good = [];
    res.forEach((r, i) => { if (r.status === "fulfilled" && stepFree(r.value.data.props) === true) good.push({ c: cands[i], name: r.value.data.name }); });
    // A candidate with its own reported lift problem is no Plan B: check live status for the nearest few.
    const top = good.slice(0, 4);
    const lifts = await Promise.allSettled(top.map(({ c }) => checkLifts(byId[c.id] || { id: c.id, name: c.id, lines: [c.line] })));
    if (!alive()) return;
    top.forEach((g, i) => { g.lift = lifts[i].status === "fulfilled" ? lifts[i].value.status : "unknown"; });
    good = top.filter((g) => g.lift !== "bad").concat(good.slice(4).map((g) => ({ ...g, lift: "unknown" })));
    const failed = res.filter((r) => r.status === "rejected").length;
    if (failed === res.length) { out.replaceChildren(note("info", "Plan B needs a connection to check nearby stations. Ask staff at the gateline. They can plan another step-free route.")); return; }
    if (!good.length) {
      out.replaceChildren(note("warn", "We could not confirm a step-free station within 3 stops on these lines." + (failed ? " Some stations could not be checked." : "") + " Ask staff for another route."));
      return;
    }
    out.replaceChildren(el("div", { class: "list" }, good.slice(0, 2).map(({ c, name, lift }) => {
      const s = byId[c.id] || { id: c.id, name: name || c.id, lines: [c.line] };
      return el("button", { class: "row", type: "button", onclick: () => { if (byId[c.id]) openStation(s); } },
        el("div", { class: "grow" }, el("span", { class: "row-title" }, s.name),
          el("span", { class: "small" }, c.steps + (c.steps === 1 ? " stop" : " stops") + " along the " + ((DATA.lines[c.line] || {}).name || c.line) + " line"),
          lift === "ok" ? pill("info", "Lift access listed · no problems reported") : pill("neutral", "Lift access listed · live status unknown")),
        el("span", { class: "chev", "aria-hidden": "true" }, "›"));
    })), el("p", { class: "tiny muted" }, "Stop counts are along the line, not a checked journey. Check whether access is to the platform or to the train, and ask staff before you rely on a lift." + (failed ? " Some stations could not be checked." : "")));
  }

  // ---------- Quiet times ----------
  function renderQuiet() {
    const pick = $("#quiet-pick");
    pick.replaceChildren();
    const ids = [...new Set([selId, ...favs].filter((x) => byId[x]))];
    if (ids.length) {
      pick.append(el("h3", null, "Your stations"),
        el("div", { class: "picks" }, ids.map((id) => el("button", { class: "chip", type: "button", "aria-pressed": String(id === quietId), onclick: () => chooseQuiet(id) }, byId[id].name))));
    }
    const s = makeSearch("qt", (st) => chooseQuiet(st.id), "Search for any station.");
    pick.append(s.node);
    if (!quietId && selId) quietId = selId;
    loadQuiet();
  }
  function chooseQuiet(id) { quietId = id; store.set("sf:quiet", id); renderQuiet(); }
  function loadQuiet() {
    const out = $("#quiet-out");
    out.replaceChildren();
    const st = byId[quietId];
    if (!st) { out.append(note("info", "Choose a station above to see its weekly pattern.")); return; }
    const sec = el("div", { class: "card" }, el("h3", null, st.name), loading("Loading typical busyness…"));
    out.append(sec);
    const id = quietId;
    getTypical(id).then((r) => {
      if (id !== quietId) return;
      sec.replaceChildren(...quietView(st, r).filter(Boolean));
    }).catch((e) => {
      if (id !== quietId) return;
      sec.replaceChildren(el("h3", null, st.name), note("info", (e.message === "nodata" ? "TfL has no typical busyness for this station." : "Typical busyness needs a connection.") + " Saved stations you have opened before still work offline."));
    });
  }
  function quietView(st, r) {
    const days = r.data.days;
    const hv = days.map(hourly);
    const all = new Set();
    hv.forEach((h) => Object.keys(h).forEach((k) => all.add(+k)));
    const hrs = [...all].sort((a, b) => a - b);
    const lo = hrs[0], hi = hrs[hrs.length - 1], n = hi - lo + 1;
    let max = 0.0001;
    hv.forEach((h) => Object.values(h).forEach((v) => { if (v > max) max = v; }));
    const W = 360, labW = 34, cw = (W - labW) / n, ch = 26, H = 7 * ch + 22;
    const ns = "http://www.w3.org/2000/svg";
    const mk = (tag, a, t) => { const e = document.createElementNS(ns, tag); for (const k in a) e.setAttribute(k, a[k]); if (t != null) e.textContent = t; return e; };
    const svg = mk("svg", { viewBox: `0 0 ${W} ${H}`, class: "chart", role: "img", "aria-label": "Weekly heatmap of typical busyness, days down, hours across. Stronger colour means busier. The list below gives the quietest times in words." });
    for (let d = 0; d < 7; d++) {
      svg.append(mk("text", { x: 0, y: d * ch + ch / 2 + 4 }, DAYS[d]));
      for (let h = lo; h <= hi; h++) {
        const v = hv[d][h];
        const c = mk("rect", { class: v == null ? "cell-empty" : "cell", x: labW + (h - lo) * cw, y: d * ch, width: cw, height: ch, rx: 2 });
        if (v != null) { c.setAttribute("fill-opacity", (0.08 + 0.92 * (v / max)).toFixed(2)); c.append(mk("title", {}, DAYS_LONG[d] + " " + hhmm(h * 60) + ": " + Math.round((v / max) * 100) + "% of the busiest hour")); }
        svg.append(c);
      }
    }
    for (let h = lo; h <= hi; h++) if ((h - lo) % 3 === 0) svg.append(mk("text", { x: labW + (h - lo) * cw + cw / 2, y: H - 6, "text-anchor": "middle" }, String(h).padStart(2, "0")));

    // summary: quietest hour per day between 07:00 and 21:59
    const rows = [];
    for (let d = 0; d < 7; d++) {
      const cand = Object.keys(hv[d]).map(Number).filter((h) => h >= 7 && h <= 21);
      if (!cand.length) continue;
      cand.sort((a, b) => hv[d][a] - hv[d][b]);
      rows.push({ d, h: cand[0], v: hv[d][cand[0]] });
    }
    const calmest = rows.slice().sort((a, b) => a.v - b.v)[0];
    const wk = [0, 1, 2, 3, 4].map((d) => hv[d]);
    const peak = (() => {
      let best = null;
      for (const h of hrs) {
        const vs = wk.map((x) => x[h]).filter((x) => x != null);
        if (!vs.length) continue;
        const a = vs.reduce((x, y) => x + y, 0) / vs.length;
        if (!best || a > best.a) best = { h, a };
      }
      return best;
    })();
    const kids = [el("h3", null, st.name), svg,
      el("div", { class: "legend" }, el("span", null, "Quieter ", el("span", { class: "ramp", "aria-hidden": "true" }), " Busier"), el("span", null, "Grey = no data")),
      el("h4", { class: "h3" }, "Quietest windows, 07:00 to 22:00")];
    if (calmest) kids.push(el("p", null, "The calmest time all week is usually " + DAYS_LONG[calmest.d] + ", " + hhmm(calmest.h * 60) + " to " + hhmm(calmest.h * 60 + 60) + "."));
    if (peak) kids.push(el("p", null, "Weekdays are typically busiest around " + hhmm(peak.h * 60) + " to " + hhmm(peak.h * 60 + 60) + "."));
    kids.push(el("ul", { class: "quiet-list" }, rows.map((x) => el("li", null, el("span", null, DAYS_LONG[x.d]), el("strong", { class: "num" }, hhmm(x.h * 60) + " to " + hhmm(x.h * 60 + 60))))));
    kids.push(el("p", { class: "tiny muted" }, "Based on TfL's typical busyness at this station's gates, not seats on trains." + (r.fromCache ? " Saved on your phone " + Civic.relTime(r.savedAt) + "." : "")));
    return kids;
  }

  // ---------- Settings sheet ----------
  function openSettings() {
    const opener = document.activeElement;
    const p = Civic.prefs.get();
    const theme = p.theme || "auto", size = p.size || "m";
    const mkSeg = (key, opts, cur) => {
      const wrap = el("div", { class: "seg", role: "group" });
      opts.forEach(([val, label]) => {
        const b = el("button", { class: "chip", type: "button", "aria-pressed": String(val === cur), onclick: () => {
          Civic.prefs.set({ [key]: val === "auto" || val === "m" ? null : val });
          wrap.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        } }, label);
        wrap.append(b);
      });
      return wrap;
    };
    const close = () => { back.remove(); sheet.remove(); document.removeEventListener("keydown", onKey); if (opener && opener.focus) opener.focus(); };
    const onKey = (e) => {
      if (e.key === "Escape") { close(); return; }
      if (e.key === "Tab") {
        const f = [...sheet.querySelectorAll("button,a[href],summary")].filter((x) => x.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const back = el("div", { class: "sheet-backdrop", onclick: close });
    const closeBtn = el("button", { class: "icon-btn", type: "button", "aria-label": "Close settings", onclick: close, html: icon("close") });
    const sheet = el("div", { class: "sheet", role: "dialog", "aria-modal": "true", "aria-labelledby": "set-h" },
      el("div", { class: "spread" }, el("h2", { id: "set-h" }, "Settings and about"), closeBtn),
      el("div", { class: "stack" }, el("h3", null, "Theme"), mkSeg("theme", [["auto", "Auto"], ["light", "Light"], ["dark", "Dark"]], theme)),
      el("div", { class: "stack" }, el("h3", null, "Text size"), mkSeg("size", [["m", "Standard"], ["l", "Large"], ["xl", "Extra large"]], size)),
      el("hr", { class: "divider" }),
      el("div", { class: "stack" }, el("h3", null, "Why this app exists"),
        el("ul", null,
          el("li", null, "Only 94 of 272 Tube stations are step-free (Colindale became the 94th in Dec 2025). The Mayor's target is 50% by 2030. ", el("span", { class: "src" }, "Source: TfL newsroom; CILT, 2026.")),
          el("li", null, "An independent tracker counted 45 lift outages lasting over a week in 80 days, Feb to Apr 2026. ", el("span", { class: "src" }, "Source: Tube Alerter, third party. Low confidence.")),
          el("li", null, "TfL's automatic lift fault reporting covers 93 lifts at 28 stations. ", el("span", { class: "src" }, "Source: TfL, Dec 2025.")),
          el("li", null, "Disabled Londoners make 5.84 trips a week, against 17 on average. ", el("span", { class: "src" }, "Source: TfL figures cited in hackathon research. Medium confidence.")),
          el("li", null, "London TravelWatch found Google Maps \"streets ahead\" of TfL for crowding information on the go. ", el("span", { class: "src" }, "Source: London TravelWatch, 2021.")))),
      el("div", { class: "stack" }, el("h3", null, "Privacy"),
        el("p", null, "No accounts, no analytics, no cookies, no trackers. Your location is used on your device only, to ask TfL for stations within 1 km. Favourites and saved station details stay in this browser.")),
      el("div", { class: "stack" }, el("h3", null, "Disclaimer"),
        el("p", null, "This is a hackathon prototype. Lift and crowding data can be late or wrong. Always check with station staff if you rely on a lift.")),
      el("div", { class: "foot" }, el("p", null, "Powered by TfL Open Data"),
        el("p", null, "Prototype from London Civic Hack 2026. Not affiliated with TfL, the Mayor of London, the Metropolitan Police or the NHS.")));
    document.body.append(back, sheet);
    document.addEventListener("keydown", onKey);
    closeBtn.focus();
  }

  // ---------- Boot ----------
  function setupTabs() {
    const nav = $("#tabnav");
    [["stations", "Stations", "list"], ["station", "Station", "lift"], ["quiet", "Quiet times", "calm"], ["help", "Help", "info"]].forEach(([k, label, ic]) => {
      nav.append(el("a", { class: "tab", href: "#" + k, "data-tab": k, html: icon(ic) + "<span>" + label + "</span>" }));
    });
    const views = { stations: $("#view-stations"), station: $("#view-station"), quiet: $("#view-quiet"), help: $("#view-help") };
    Civic.tabs(views, "stations", (key) => {
      if (key === "station" && renderedFor !== selId) renderStation();
      if (key === "quiet") renderQuiet();
    });
    $("#view-station").addEventListener("click", (e) => {
      const a = e.target.closest("[data-go]");
      if (a) { e.preventDefault(); location.hash = a.dataset.go; }
    });
  }

  async function boot() {
    $("#settings-btn").innerHTML = icon("settings");
    $("#settings-btn").addEventListener("click", openSettings);
    Civic.watchOnline($("#offline"));
    try {
      DATA = await Civic.local("../shared/data/stations.json");
    } catch {
      $("#view-stations").replaceChildren(el("div", { class: "banner bad" }, "The station list could not be loaded. Reload the page while online."));
      return;
    }
    DATA.stations.forEach((s) => { byId[s.id] = s; byNorm[norm(s.name)] = s; });
    favs = favs.filter((id) => byId[id]);
    if (selId && !byId[selId]) selId = null;
    setupStations();
    setupTabs();
    Civic.registerSW("sw.js");
  }
  boot();
})();
