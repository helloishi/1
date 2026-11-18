# Step-Free & Calm (Team 4, district tag N1C)

A free mobile web app for people for whom one broken lift or one packed platform ruins the journey: wheelchair users, parents with buggies, older people, travellers with luggage, autistic and anxious travellers, and people with hidden disabilities.

For any station it answers: are the lifts working, what is Plan B, how busy is it now, and when is it quiet.

## The problem, with evidence

- Only 94 of 272 Tube stations are step-free (Colindale became the 94th in Dec 2025). The Mayor's target is 50% by 2030. Source: TfL newsroom; CILT, 2026.
- An independent tracker counted 45 lift outages lasting over a week in 80 days, Feb to Apr 2026. Source: Tube Alerter (third party). **Low confidence.**
- TfL's automatic lift fault reporting covers 93 lifts at 28 stations. Source: TfL, Dec 2025.
- Disabled Londoners make 5.84 trips a week, against 17 on average. Source: TfL figures cited in hackathon research. **Medium confidence.**
- London TravelWatch (2021) found Google Maps "streets ahead" of TfL for crowding information on the go.

## Value to authorities

Supports TfL's accessibility goal (50% step-free by 2030), spreads demand into off-peak hours, means fewer stranded passengers, and puts TfL's new lift data in front of the people who need it.

## Features

- **Stations**: offline search (name, case and accent insensitive), line chips, "Near me", favourites with last known lift status.
- **Station**: live lift status, facilities from TfL, Plan B (nearest two step-free stations within 3 stops on the same lines), how busy now and typically (SVG chart, quietest 30-minute window in the next 3 hours), line status.
- **Quiet times**: weekly heatmap, plain-English quietest windows, calm-travel tips.
- **Help**: turn-up-and-go assistance, reporting a broken lift, TfL links, data limits.
- Settings: theme, text size, evidence, privacy, disclaimer.

## Data sources

TfL Unified API (`api.tfl.gov.uk`): StopPoint, StopPoint disruption, Disruptions/Lifts/v2, crowding (live and typical), Line status. Station list: `../shared/data/stations.json`. Powered by TfL Open Data.

## Privacy

No accounts, analytics, cookies or trackers. Location stays on the device and is only used to ask TfL for stations within 1 km. Favourites and cached station data live in the browser's local storage.

## Works offline / needs live data

Offline: station search, favourites with last known lift badge, cached station facilities (24 h cache, stale copy used when offline), cached typical busyness (6 h), help and tips. Live: lift status, Plan B checks of uncached stations, live busyness, line status, near me.

## Limits

- Lift feed shape (`Disruptions/Lifts/v2`) is not verified: it is parsed defensively by matching the station id or name in any text field.
- Plan B uses stop counts along the line, not a routed journey. Step-free status comes from TfL station properties.
- Busyness is at the gates, not on trains. "Quieter/busier than usual" thresholds (below 85% / above 115% of baseline) are our choice.
- "No lift problems reported" is not a guarantee.

## To verify before launch

- Live JSON shapes: Disruptions/Lifts/v2, crowding (live and typical) and the additionalProperties keys (AccessViaLift, Lifts, Escalators, Toilets).
- Whether crowding data exists for non-Tube stations (Elizabeth line, DLR, Overground).
- Link paths: https://tfl.gov.uk/transport-accessibility/ and https://tfl.gov.uk/help-and-contact.
- Evidence numbers against their sources, especially the third-party Tube Alerter count.
- Wording of the "Please offer me a seat" badge, Travel Support Card and Sunflower lanyard tips against TfL's current pages.
- That the claim "every Elizabeth line and DLR station is step-free" still holds.

*Prototype from London Civic Hack 2026. Not affiliated with TfL, the Mayor of London, the Metropolitan Police or the NHS.*
