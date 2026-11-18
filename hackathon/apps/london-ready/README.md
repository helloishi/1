# London Ready

Free mobile web app (PWA) for visitors and new arrivals in London: before you fly, the first hours after landing, paying, and getting help. District tag: TW6 (Heathrow).

## Problem and evidence
First-timers fall into predictable traps: fake ETA sites, pricey airport transfers, touts, scams, and confusing tipping and payment rules.
- UK ETA official fee: £10 at launch, £16 from 9 April 2025, £20 from 8 April 2026. Unofficial sites charge up to $99 or €178 (Euronews, Nov 2025; NL Times, Nov 2025; Malwarebytes, Sep 2025; The Local, Feb 2026).
- Heathrow Express walk-up fares have been around £25 versus roughly £13 on the Elizabeth line (fares from different years; 2026 not verified).
- Contactless and Oyster charge the same fares with the same caps (TfL).
- 71,391 phone thefts and robberies in London in 2025 (Met, via Mayor of London, Feb 2026); about 40% in Westminster and the West End (reported, medium confidence).
- VisitBritain cut its 2026 forecast to 44.2m visits and £33.9bn spend (Aug 2026).

## Who it helps
First-time international and UK visitors, families, older travellers, people with luggage, new students and workers. Value to authorities: Home Office (official ETA route, fewer scams), TfL (contactless, fewer touts), Met (phone safety, scams), VisitBritain / London & Partners (trust, value), NHS (111 vs A&E).

## Features
- Before you fly: ETA picker, official-or-not link checker (hostname must be `gov.uk` or `*.gov.uk`), persistent checklist, book-ahead card.
- Arrive: six airports, typical times, price bands and contactless notes, optional live TfL fare, tout warning, first-hour tips.
- Pay & tips: contactless coach, 12.5% service charge calculator.
- Help: Emergency card in six languages (copy buttons), NHS for visitors, live line status, scams, Phone Guard link.
- Settings: theme, text size, Emergency language, About.

## Data sources
Curated content in `data/content.json`. Live (browser, online only): TfL Unified API (fare Heathrow T2&3 to Leicester Square; line status). Powered by TfL Open Data.

## Privacy
No accounts, analytics, cookies or trackers. Preferences and checklist ticks are in local storage only.

## Offline
Whole app, checker, calculator, checklist and Emergency card work offline (service worker). Live fare and line status need a connection and show a clear unavailable state.

## Limits
Not legal, immigration or medical advice. Passport lists are short and not exhaustive; unlisted nationalities see "Check GOV.UK".

## To verify before launch
- ETA nationality lists and £20 fee against GOV.UK.
- Visa-nationality list (China, India, Russia, Nigeria, Pakistan, South Africa, Turkey) against GOV.UK.
- Ireland exemption wording for Irish and British citizens.
- Airport journey times, price bands, step-free notes and contactless status per operator, including Greater Anglia contactless (March 2026).
- Heathrow Express and Elizabeth line fares for 2026.
- Tout, scam and NHS visitor-charge wording against official sources.
- Translations of the Emergency card by native speakers.
- URLs: skygarden.london, horizon22.co.uk, parliament.uk, gov.uk embassies page.
- Live fare parsing against the real TfL FareTo response (`cost` units).
