# Report It Right

A free mobile web app that sends any London problem to the right place first time: "no wrong door" for 32 boroughs and the City, TfL, the Met, British Transport Police (BTP), City of London Police, the NHS and utilities. Prototype from London Civic Hack 2026 (Team 2). District tag: E16.

## Problem and evidence

London has no single "311". Services are split across 32 boroughs, the City of London, TfL, the Met, BTP, City of London Police, NHS and utilities (hackathon research synthesis).

- Singapore OneService: over 620,000 users and 2.5m+ reports (MND Singapore, 2024).
- NYC311: 36.5m contacts in 2025, 2.6m via the app (NYC Mayor's Management Report 2026).
- UK FixMyStreet: over 1.1m reports in 2025 (SocietyWorks).
- 4,593 violence-against-women-and-girls offences were recorded on the TfL network in 2025 and about 3% led to a charge (London Assembly figures reported in 2026, medium confidence). BTP's discreet text service 61016 exists but under-reporting is high.

## Who it helps

Everyone, especially women and girls, older people (scams), LGBTQ+ and faith communities (hate incidents), newcomers, and people who do not want to phone. For authorities: fewer misdirected 999/101 calls, more reporting of under-reported crime, better data, and a complement to FixMyStreet.

## Features

- Report: emergency gate (999, 112, Silent Solution, emergencySMS), describe-in-your-own-words with offline keyword matching (up to 3 suggestions), 20 categories, 0 or 1 quick question, then a result card: who handles it, fastest way, other ways, what to include, support. Copy buttons on every number. "Save to My reports".
- Council finder for borough-dependent categories: geolocation or postcode via postcodes.io, or a borough dropdown (works offline).
- Text BTP: builds a concise 61016 message (type, line/station from `../shared/data/stations.json`, heading, carriage, time in London time, person) with live character count. Copy text always works; "Open messages" (`sms:61016?&body=`) is a convenience.
- My reports: stored on the device only; editable reference and notes; delete; copy all as text.
- About, settings (theme, text size), Quick exit (below).
- Optional "Ask Claude to suggest": shown only if `window.claude.use("sample")` returns non-null; called only on click; the reply must be strict JSON `{"category": "<id>"}` and the id is validated. A rejection hides the button.

## Quick exit

Domestic abuse and Exploitation results show a fixed "Quick exit" button (top-right, safe-area aware) that runs `location.replace("https://www.bbc.co.uk/weather")`. Pressing Escape twice quickly does the same on any screen. `replace` removes the page from the back-button chain, but a web page cannot fully clear browser history, cache or the address-bar suggestions. People at risk should also use a private window and clear history in the browser settings. Saved reports in My reports are on the device and can be deleted there.

## Data sources

All facts are in `data/channels.json` and come from the team brief. Postcode lookup by postcodes.io (live, only when requested). Station names: shared TfL topology file.

## Privacy

No accounts, analytics, cookies or trackers. Nothing leaves the phone except the postcodes.io lookup when the user asks. Saved reports and the chosen borough are in localStorage on the device.

## Limits

Does not file reports on the user's behalf. Keyword matching is simple and English only. Numbers can change.

## To verify before launch

- CST (antisemitism) number 0800 032 3263: marked "check" in the app.
- Action Fraud https://www.actionfraud.police.uk and 0300 123 2040: may now be the Report Fraud service (marked "check").
- TfL lost property path https://tfl.gov.uk/help-and-contact/lost-property (marked "check").
- Claude integration (`window.claude.use`, completion method) is written defensively but untested against a real host.
- Which water company serves which part of outer London (we link Thames Water and name the others, no numbers).
- Live postcodes.io calls could not be tested from the build container (blocked).
- Silent Solution wording, emergencySMS, ANI scheme and 61016 details should be rechecked with the Met, BTP and Home Office.
