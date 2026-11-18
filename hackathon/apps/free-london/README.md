# Free London Today

A free, installable mobile web app that answers: **What can I do for free, near me, right now?** It also shows free essentials: water, toilets and libraries. Built by Team 5 at London Civic Hack 2026. District tag: WC1B (the British Museum's postcode district).

## The problem (with sources)

- 26% of Londoners (about 2.3m) live in poverty after housing costs; 35% of children (Trust for London, 2025).
- 31% of 16-29-year-olds in Great Britain report feeling lonely (ONS).
- 59% of students sometimes skip meals (student surveys cited in hackathon research, medium confidence).
- More than 4,500 free tap-water Refill points in London, up from about 200 in 2018 (Mayor of London).
- At least 97 public toilets closed and 32 opened in London in a decade (Age UK London, Jan 2025).
- VisitBritain cut its 2026 forecast to 44.2m visits (Aug 2026), so value for money matters.

**Value to authorities:** supports GLA cost-of-living, culture and loneliness goals; spreads visitors beyond Zone 1; makes full use of public assets that already exist.

## Who it helps

Low-income families, students, lonely people, older people, budget visitors and parents on rainy days.

## Features

- **Today:** weather banner (rain likely: indoor first; 28 C or more: shade, cool museums and free water first), "Open now near you" with distance and walk time, and "Make a free half-day" (three open places within about 1.5 km, with walking minutes).
- **Explore:** filters (open now, indoor, outdoor, kids, step-free, no booking, evening, beyond Zone 1), nine categories, list and map views.
- **Essentials:** live free drinking water, public toilets and libraries within 1 km (OpenStreetMap via Overpass), plus offline guidance on Refill cafés, libraries, Cool Spaces and Warm Spaces.
- **Saved:** save places on your phone.
- Settings sheet: theme, text size and About.
- All opening-hours logic uses London time. Missing hours always show "Check hours"; the app never assumes a place is open.

## Data

- `data/places.json`: 78 curated places, all believed free to enter and operating in 2025-26. Each has description, tip, official home-page link and, where known, typical hours. Where hours were uncertain they are `null` with a check note.
- Live: Open-Meteo (weather, CC BY 4.0), Overpass API / OpenStreetMap contributors (essentials), postcodes.io (optional postcode lookup), CARTO basemap tiles.

## Privacy

No accounts, analytics, cookies or trackers. Location is used on the device; only a map point is sent to Open-Meteo, Overpass and postcodes.io so they can answer. Saved places and the chosen area live in local storage on the device.

## Limits

- Hours are typical; bank holidays, events and closures change them.
- Coordinates marked `approx` are best estimates.
- Overpass data is volunteer-maintained and may be out of date.
- Without a connection: places, filters, half-day, saved places and guidance work; weather, live essentials, postcode lookup and map tiles do not.

## To verify before launch

- Every opening time in `places.json` against each official site (especially British Museum, National Portrait Gallery, Horniman, RAF Museum, Whitechapel Gallery, Soane, Borough Market).
- That each place is still free to enter, and which parts are paid (Horniman aquarium and butterfly house, Science Museum Wonderlab, exhibitions, Design Museum, Greenwich Observatory).
- London Museum Docklands, V&A East Storehouse, Young V&A, Hunterian Museum, Grant and Petrie Museums, Serpentine, Brunei Gallery: opening days and whether free entry needs booking.
- Sky Garden, Horizon 22, The Garden at 120, Barbican Conservatory: booking rules and opening days.
- Evensong times and public-access rules at Westminster Abbey and St Paul's; lunchtime concert days at St Martin-in-the-Fields.
- Houses of Parliament, Royal Courts of Justice, Old Bailey and Supreme Court public-gallery rules; Changing the Guard schedule.
- Farms (Mudchute, Hackney, Vauxhall, Spitalfields, Kentish Town, Surrey Docks): opening days and free entry.
- Woolwich Ferry and Greenwich Foot Tunnel lift and service status.
- All coordinates flagged `approx`, and all station names.
- Official links are home pages only; confirm each still resolves.
- The Refill, Cool Spaces and Warm Spaces guidance wording with the GLA.
