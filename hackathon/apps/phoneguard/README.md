# PhoneGuard London

A free mobile web app (PWA) that helps people prevent phone theft in London and act fast if it happens. London Civic Hack 2026, district tag W1.

## Problem and evidence
- The Met Police recorded 71,391 mobile phone thefts and robberies in London in 2025, down 12.3% from 81,365 in 2024, but up 54% since 2022. Source: Mayor of London, Feb 2026: https://www.london.gov.uk/mayor-outlines-major-crackdown-mobile-phone-theft-new-mobile-phone-theft-command-cell-and-ps45m-more
- The Mayor set up a Mobile Phone Theft Command Cell with an extra £4.5m (Feb 2026, same source).
- Of 587,498 phones reported stolen in London from 2017 to Feb 2024, only 13,998 were reported recovered (about 2.4%). Reported by GLA/Met: https://www.london.gov.uk/met-seizes-hundreds-stolen-phones-thefts-hit-four-year-low (medium confidence).
- Met figures reported in the press: about 40% of thefts happen in Westminster and the West End, around 37 victims a day in the West End (medium confidence).

## Who it helps
Visitors, 16–34s, commuters and anyone in busy central areas. For the Met and MOPAC it supports prevention, faster SIM/IMEI blocking (less resale value and account takeover) and more complete crime reports.

## Features
- **Prepare**: "Phone armour" checklist for iPhone or Android plus shared items, saved on the device, with progress bar. "Street habits" card.
- **Hotspots**: live police.uk map (theft from the person, robbery), top 10 streets, area picker or own location, optional on-device Heads-up mode.
- **Stolen?**: eight calm numbered steps in English, Español, Français, العربية (RTL), 中文（简体）, Русский. Content in `data/stolen-steps.json`. Copy buttons, "Copy my action list", numbers card.
- **About**: evidence, data, privacy, attributions. Settings sheet: theme, text size, language.

## Data sources
- police.uk street-level crime API (`crimes-street-dates`, `crimes-street/theft-from-the-person`, `crimes-street/robbery`), Open Government Licence v3.0. Called from the user's browser, cached 7 days per category, area and month.
- Map tiles © OpenStreetMap contributors © CARTO. Leaflet 1.9.4 (bundled in shared kit).

## Privacy
No accounts, analytics, cookies or trackers. Location stays on the phone (map centring and Heads-up mode). police.uk receives only the rounded map centre point. Ticks, settings and language are stored in the browser.

## Offline and limits
Works offline: Prepare, Stolen?, About (cached by the service worker). Needs a connection: Hotspots (shows London-wide numbers when unavailable, never invented points). police.uk data is about two months behind and locations are anonymised. Menu names vary by phone and OS version.

## To verify before launch
- Menu paths and feature names for iOS (Stolen Device Protection, Control Centre setting) and Android (Theft protection, Find Hub, Identity Check, SIM card lock) against current OS versions.
- Phone numbers: 999, 112, 101, 61016, 0800 40 50 40 (British Transport Police), 159, 0800 555 111 (Crimestoppers).
- icloud.com/find, google.com/android/find, network home page URLs, gov.uk embassies list URL.
- Medium-confidence figures (2.4% recovery, 40% West End, 37 a day).
- Translations in five languages need native-speaker review.
- police.uk CORS and 1-mile radius behaviour (could not be tested from the build container).
