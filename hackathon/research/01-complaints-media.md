# 01. Жалобы жителей Лондона и медиа (2023–2026) — отчёт аналитика №1

Дата: 2026-11-18. Метод: WebSearch (WebFetch недоступен), поэтому цифры взяты из сводок результатов поиска, а не из первоисточников. Первоисточники нужно перепроверить перед публичным использованием.

## 0. Ограничения (читать первым)

- Лимит WebSearch на сессию исчерпан после ~30 запросов. **Не исследованы:** food banks/продовольственная бедность, fuel poverty/энергия, психическое здоровье детей/CAMHS, опрос Transport for All по инвалидам, антисоциальное поведение/шум, пожилые и транспорт, туристы (бесплатные места, цены), ночной транспорт. Это пробелы, а не отсутствие проблемы. Их нужно добрать отдельным запуском.
- Отзывы App Store/Google Play прочитать напрямую не удалось. Есть только агрегаты и старый обзор London TravelWatch (2021).
- Reddit: конкретных тредов r/london найти не удалось. Reddit-вывод в отчёте отсутствует.
- Ряд источников — локальные СМИ, партийные релизы (Lib Dems) или SEO-агрегаторы. Помечено в уверенности.
- Скоринг в таблице (A×S×U, шкала 1–5) — **мой экспертный расчёт**, а не статистика.

## 1. ТОП-25 болей

Формула: A (сколько людей затронуто) × S (тяжесть) × U (насколько плохо решено сейчас). Максимум 125.

| # | Боль | A | S | U | Балл |
|---|------|---|---|---|------|
| 1 | Стоимость жилья и бедность после аренды | 5 | 5 | 4 | 100 |
| 2 | Запись к GP и админ-барьеры NHS | 5 | 4 | 4 | 80 |
| 3 | Насилие в отношении женщин и ненависть на транспорте (VAWG/hate crime) | 4 | 5 | 4 | 80 |
| 4 | Нет доступа к NHS-дантисту | 4 | 4 | 4 | 64 |
| 5 | Одиночество | 4 | 4 | 4 | 64 |
| 6 | Лифты и step-free доступ | 3 | 5 | 4 | 60 |
| 7 | Долгое ожидание в A&E | 4 | 5 | 3 | 60 |
| 8 | Поверхностные наводнения, подвальные квартиры | 3 | 5 | 4 | 60 |
| 9 | Медленные автобусы | 4 | 3 | 4 | 48 |
| 10 | Жара в метро | 4 | 3 | 4 | 48 |
| 11 | Нехватка общественных туалетов | 4 | 3 | 4 | 48 |
| 12 | Цифровое исключение | 3 | 4 | 4 | 48 |
| 13 | Забастовки метро | 5 | 3 | 3 | 45 |
| 14 | Spiking (подмешивание веществ) | 3 | 5 | 3 | 45 |
| 15 | Возвраты за задержки и штрафы (refunds, penalty fares) | 5 | 2 | 4 | 40 |
| 16 | Кражи телефонов | 4 | 3 | 3 | 36 |
| 17 | Двойное списание contactless (device clash) и сбои валидаторов | 4 | 3 | 3 | 36 |
| 18 | Стоимость детсадов и «обрыв» права на free hours | 3 | 4 | 3 | 36 |
| 19 | Ножевое насилие и страх молодёжи | 3 | 5 | 2 | 30 |
| 20 | Elizabeth line: давка и задержки | 3 | 3 | 3 | 27 |
| 21 | Fly-tipping | 4 | 2 | 3 | 24 |
| 22 | Ямы на дорогах | 4 | 2 | 3 | 24 |
| 23 | Кражи велосипедов и e-bikes | 3 | 2 | 4 | 24 |
| 24 | Туристы: мошенничество, переплаты, ориентация (слабая база) | 3 | 2 | 4 | 24 |
| 25 | Общие/аренда велосипедов: сбои, парковка Lime | 2 | 2 | 3 | 12 |

### Детали по каждой боли

**1. Жильё и бедность.**
- Доказательства: 26% лондонцев (≈2,3 млн) живут в бедности после housing costs (до housing costs 15%). 35% детей в бедности. Средняя однушка стоит 52% медианной зарплаты до налогов (42% в остальной Англии). Rents +7,3% за год, в среднем £2,252 (Londonist, июль 2025). State of London 2025 даёт £2,163 (разные методики). Источники: [Trust for London 2025](https://trustforlondon.org.uk/news/poverty-in-london-2025/), [Rent affordability](https://trustforlondon.org.uk/data/rent-affordability-borough/), [Londonist](https://londonist.com/london/housing/what-s-the-average-rent-in-each-london-borough), [State of London 2025](https://data.london.gov.uk/blog/the-state-of-london-report-2025), [4 in 10 Londoners cannot afford to live with dignity (2026)](https://fitzrovianews.com/2026/03/06/four-in-10-londoners-cannot-afford-to-live-with-dignity-new-research-shows/).
- Кого бьёт: арендаторы, семьи с детьми, пенсионеры (по Minimum Income Standard 2026 более трети пенсионеров ниже минимума).
- Что есть: Trust for London data, MIS, программы боро. Единого «калькулятора прав» в поиске не найдено.
- Разрыв: приложение не снизит ренту, но может снизить недополученные пособия и льготы.
- Приложение могло бы: проверка «что мне положено» (council tax reduction, free school meals, free hours, Healthy Start, Freedom Pass) на одной странице. Уверенность в идее: средняя (подтверждения нехватки таких данных в поиске нет).

**2. GP и NHS-админка.**
- Доказательства: King's Fund-анализ (2026) — около двух третей пациентов сообщают о проблемах с NHS admin (запись, результаты) несмотря на рост использования NHS App ([Digital Health, 2026](https://www.digitalhealth.net/2026/04/nhs-app-not-improving-patients-views-on-nhs-admin/)). Опрос NWL >100 000 жителей выявил трудности записи ([Healthwatch NWL](https://nds.healthwatch.co.uk/sites/default/files/reports_library/20240924_Westminster%20Brent_GP%20access%20in%20North%20West%20London.pdf)). Care Opinion: «called 4-5 times» ([пример](https://www.careopinion.org.uk/1286245)). С октября 2025 практики обязаны отвечать за один рабочий день.
- Кого бьёт: пожилые без цифровых навыков, люди с ограничениями, работающие.
- Что есть: NHS App, сайты практик, сторонние app практик (East Dulwich: жалобы на вынужденное приложение).
- Разрыв: разные сервисы в разных практиках, нет единой точки.
- Приложение могло бы: подсказка «куда идти» (111/pharmacy/GP/UTC) по симптому и району, статус доступа в практики. Уверенность: средняя.

**3. VAWG и hate crime на транспорте.**
- Доказательства: BTP зафиксировала 24 192 преступления на сети TfL в 2025 против докризисной нормы 16 544 (+46%). 1 667 hate crime в июле–декабре 2025 (+9,8%). 907 сексуальных преступлений в H1 2025 (879 годом ранее). YouGov/EVAW (дата не указана): 28% женщин vs 15% мужчин чувствуют себя небезопасно на bus/tube. Assembly Police and Crime Committee провёл слушание в декабре 2025, ответ TfL 10 февраля 2026. Источники: [TfL response (London Assembly)](https://www.london.gov.uk/about-us/londonassembly/meetings/documents/s122250/05a.%20Appendix%201%20-%20Output%20Response%20Director%20of%20Security%20Policing%20and%20Enforcement%20TfL%20received%2014%20.pdf), [Marie Claire](https://www.marieclaire.co.uk/news/women-feel-unsafe-on-london-transport-168562), [Police Professional](https://policeprofessional.com/?p=142388).
- Кого бьёт: женщины и девушки 16–35, ЛГБТ+, этнические и религиозные меньшинства.
- Что есть: Report it to Railway Text 61016, Women's Night Safety Charter (600+ площадок), Mayor's Transport Taskforce on hate crime (октябрь 2025).
- Разрыв: Assembly рекомендовал общелондонский опрос, т.е. данных об опыте не хватает; барьер сообщения (про under-reporting см. spiking).
- Приложение могло бы: «безопасный маршрут» с учётом освещения и времени, тихий репорт, share-my-journey. Уверенность: средняя.

**4. NHS-дантист.**
- Доказательства: >4,2 млн взрослых в Лондоне (60%) не были у NHS-дантиста за два года до июня 2024 ([London Assembly written evidence, 2025](https://www.london.gov.uk/sites/default/files/2025-01/Dentistry%20in%20London%20-%20written%20evidence%2C%20September%20-%20October%202024.pdf)). Доступ сильно разнится по боро. В NCL 25% безуспешно пытались записаться (2024, [Barnet Post](https://barnetpost.co.uk/2024/07/17/a-quarter-of-people-in-nhs-area-covering-barnet-struggle-to-get-dentist-appointment/)). Национально успех записи 78% в 2025 ([NHS England](https://england.nhs.uk/statistics/gp-patient-survey-dental-statistics-january-to-march-2025-england)).
- Что есть: NHS «find a dentist» (качество данных о приёме новых пациентов в поиске не оценено).
- Приложение могло бы: актуальная карта практик, принимающих NHS-пациентов, плюс подсказки по срочной помощи. Уверенность: средняя.

**5. Одиночество.**
- Доказательства: 35% лондонцев «often/some of the time» vs 28% по Британии (Belonging Forum, опубл. около 2024). Bethnal Green and Stepney — 39,8% «often» (самое высокое в стране). Официальный Survey of Londoners 2018–19 — 8% «often/always» (другое определение). Источники: [Belonging Forum](https://belongingforum.org/londoners-are-lonelier-than-rest-of-country-survey-finds/), [GLA](https://www.london.gov.uk/what-we-do/communities/loneliness-london).
- Уверенность: высокая в наличии проблемы, низкая в точных цифрах (разные методики, нет свежей официальной).
- Приложение могло бы: «что рядом и бесплатно сегодня» (клубы, кружки, прогулки), без дейтинг-механики. Для 65+ нужен офлайн-канал.

**6. Лифты и step-free.**
- Доказательства: TfL (декабрь 2025) — 93 лифта на 28 станциях Tube самоотчитываются о поломках. Phase 1 запущена в октябре 2025. Независимый трекер Tube Alerter: 45 отключений дольше недели за 80 дней (9 февраля–30 апреля 2026), 26 step-free станций с одним лифтом (источник — третья сторона). Pontoon Dock (DLR) почти 10 месяцев без рабочего лифта. Источники: [TfL newsroom](https://tfl-newsroom.prgloo.com/news/tfl-rolls-out-new-fault-reporting-technology-in-tube-station-lifts-to-improve-journey-planning-for-people-with-access-needs), [Tube Alerter](https://tubenotifications.co.uk/insights/london-tube-lift-reliability), [TfL Tech Forum](https://techforum.tfl.gov.uk/t/new-data-step-free-lift-status-and-accessible-routes-in-stations/1609), [London LibDems](https://www.londonlibdems.org.uk/news/article/pontoon-dock-dlr-station-effectively-inaccessible-as-another-lift-fails).
- Кого бьёт: колясочники, родители с колясками, пожилые, люди с чемоданами (туристы).
- Что есть: lift status в TfL Go (новое), Step-Free Disruptions API. Расхождение источников: 93 vs 94 станции.
- Разрыв: покрытие самоотчёта ограничено (~треть лифтов), планы на 2026+; альтернативные маршруты после сбоя на других видах транспорта не ясны.
- Приложение могло бы: push при сбое лифта на моём маршруте, готовый step-free план Б, краудсорс-подтверждения. Уверенность: высокая.

**7. A&E.**
- Доказательства: Англия: 10,1% тяжёлых пациентов ждали 12+ часов в 2025 (10,5% в 2024). Лондон: январь 2025 — 1 064 ожидающих >12 часов на east London trusts; Sutton Hospital назван среди худших (декабрь 2025). Источники: [PSLHub](https://www.pslhub.org/blogs/entry/9406-one-in-10-patients-spent-over-12-hours-in-ae-in-2025/), [Romford Recorder](https://www.romfordrecorder.co.uk/news/25860072.east-london-e-12-hour-waits-show-massive-increase/). Полных данных по Лондону за 2026 не найдено.
- Приложение могло бы: направить с не-неотложными случаями в UTC/аптеку/111 с указанием текущей загрузки. Уверенность: средняя.

**8. Поверхностные наводнения.**
- Доказательства: почти 320 000 объектов в Лондоне с высоким риском surface water flooding, включая ~56 000 подвальных квартир (EA, июль 2026). Свыше полумиллиона домов и бизнесов с высоким или средним риском (EA via Mayor). MPs: осведомлённость «dangerously low». Источники: [EA blog](https://environmentagency.blog.gov.uk/2026/07/15/five-years-on-remembering-the-july-2021-floods/), [Mayor](https://www.london.gov.uk/mayor-warns-londoners-basement-flood-risk-lcaw), [London Surface Water Strategy](https://www.london.gov.uk/programmes-strategies/environment-and-climate-change/climate-change/climate-adaptation/surface-water-flooding/london-surface-water-strategy).
- Кого бьёт: жильцы подвалов и цокольных этажей, арендаторы, пожилые.
- Приложение могло бы: персональный alert при грозе, чек-лист для подвала, маршрут эвакуации. Уверенность: средняя. (Перегрев жилья в поиске не покрыт.)

**9. Медленные автобусы.**
- Доказательства: средняя скорость 9,17 mph в 2024/25 (10,27 mph в 2020/21). City of London 6,6 mph, Westminster и Camden 7,1. 33% опрошенных London TravelWatch: медленные автобусы мешают пользоваться чаще. Поездки на автобусах −1,5% к прошлому году. Маршрут 14 — 5,7 mph (локальный источник, нужна проверка). Источники: [Greenwich Wire, Dec 2025](https://greenwichwire.co.uk/2025/12/10/slowest-buses-in-40-years-are-driving-londoners-away-city-hall-told/), [Assembly Transport Committee 09.12.2025](https://www.london.gov.uk/about-us/londonassembly/meetings/documents/s120722/Item%206%20-%20Transport%20Committee%2009.12.2025.pdf), [Putney News](https://putney.news/?p=29972). Причина спорна (20mph vs. трафик).
- Приложение могло бы: подсказывать самый быстрый реально сейчас вариант (автобус vs. пешком/Overground), показывая фактическую скорость. Уверенность: средняя.

**10. Жара в метро.**
- Доказательства: пик 34°C в вагонах Central line (до +5°C к улице), по данным Bloomberg (2025). Victoria line — 19 официальных жалоб на жару в 2024 (30 в 2023, 29 в 2022). Средняя температура сети 22,5°C (2021) → 23,8°C (2024). Источники: [Bloomberg, июнь 2025](https://www.bloomberg.com/news/articles/2025-06-30/how-hot-is-the-london-underground-train-network-in-a-heat-wave), [Time Out](https://www.timeout.com/london/news/revealed-these-are-officially-londons-hottest-tube-lines-090123), [Climate Change News](https://www.climatechangenews.com/?p=74990).
- Кого бьёт: беременные, пожилые, астматики, дети.
- Приложение могло бы: «холодный» маршрут и прогноз температуры линии по часам. Уверенность в данных линии: средняя (часть — модельная).

**11. Туалеты.**
- Доказательства: Age UK London (январь 2025): с 2013/14 закрыто 97 общественных туалетов, открыто 32 (ответили 30 из 33 боро). London Assembly «The Toilet Paper» (ноябрь 2021) и данные по «loo deserts» на Tube. Источники: [Age UK London](https://www.ageuk.org.uk/london/about-us/news/articles/2025/lifting-the-lid), [Fitzrovia News](https://fitzrovianews.com/2025/01/20/nearly-100-public-toilets-closed-in-london-over-ten-years-says-age-uk/), [London Assembly](https://www.london.gov.uk/press-releases/assembly/the-toilet-paper-improving-londons-loos).
- Кого бьёт: пожилые, родители с детьми, люди с ограничениями, курьеры, туристы.
- Что есть: Community Toilet Schemes (по сведениям из общих знаний, подтверждения в поиске нет — низкая уверенность).
- Приложение могло бы: карта доступных туалетов, часы работы, step-free, баррыер-фри. Уверенность: высокая в боли.

**12. Цифровое исключение.**
- Доказательства: GLA (февраль 2025) — 1 106 Digital Inclusion Hubs, свыше 100 000 охвачено. Age UK London (июль 2025, «Access Still Denied?») — почти треть боро не предлагали офлайн-способ подать на Housing Benefit или Council Tax reduction (по предыдущему отчёту). Старые данные: 270 000 без интернета, 1,6 млн без базовых навыков (LOTI 2021). Источники: [GLA release](https://www.london.gov.uk/Mayor%20urges%20more%20businesses%20to%20donate%20old%20IT%20equipment%20and%20help%20digitally%20excluded%20Londoners%20get%20online), [Age UK London](https://www.ageuk.org.uk/bp-assets/globalassets/london/campaigns/mind-the-digital-gap/ageuk_adii_final.pdf), [LOTI](https://loti.london/blog/the-era-of-digital-first-healthcare/).
- Следствие для хакатона: **любой продукт обязан иметь офлайн/голосовой/простой канал**, иначе усугубит разрыв.

**13. Забастовки метро.**
- Доказательства: RMT против перехода на четырёхдневную неделю. Суммарно восемь 24-часовых забастовок объявлены на ноябрь 2026–февраль 2027 (26 ноября, 17 и 19 декабря 2026 и пр.; Londonist, 6 ноября 2026 — перепроверить даты). Апрель 2026: около трети обычного сервиса. Экономических оценок потерь найти не удалось. Источники: [Londonist](https://londonist.com/london/transport/tube-strikes-london-christmas-2026-november-december-january-2027), [RailNews, апрель 2026](https://www.railnews.co.uk/news/2026/04/21-london-braces-for-first-underground.html), [RMT](https://www.rmt.org.uk/news/rmt-launches-tube-strike-action-over-imposed-four-day/).
- Что есть: TfL-сайт, Citymapper. Разрыв: персональный план на день забастовки с учётом перегруженных Elizabeth, Overground, DLR.
- Приложение могло бы: «strike-day planner» с подсказкой времени, пешими и велосипедными альтернативами. Уверенность: высокая в боли, средняя в необходимости нового продукта.

**14. Spiking.**
- Доказательства: >2 000 заявлений в Met с марта 2024 по март 2025 (≈150 в месяц, реальный масштаб выше). 66% жертв в августе 2025 — женщины, 17% приходятся на Westminster/West End. Рост обвинений на 125% по итогам рождественской операции. Источники: [Met Police](https://news.met.police.uk/news/met-police-tackle-spiking-across-london-from-nightclubs-to-party-boats-501451), [Met festive crackdown](https://news.met.police.uk/news/mets-festive-crackdown-on-spiking-delivers-major-progress-with-a-125-per-cent-surge-in-charges-and-cutting-edge-tech-trials-504230).
- Что есть: операции полиции, Charter, обучение персонала баров. Разрыв: у жертв нет простой пошаговой инструкции «что делать в первые часы» (общая оценка, подтверждения в поиске нет).
- Приложение могло бы: пошаговая помощь «меня, возможно, споили», быстрый путь к анализу и отчёту, buddy-check. Уверенность: средняя.

**15. Возвраты и штрафы.**
- Доказательства: TfL публикует Service Delay Refunds только по декабрь 2023 (в найденном PDF). Доли подающих по TfL не найдено. Национально только 45% с правом на компенсацию за задержку поезда подают (47% в 2023; Transport Focus, к Tube не относится напрямую). Для автобусов схемы нет. В обращениях в London TravelWatch 74–81% апелляций касаются penalty fares/revenue protection. Источники: [TfL refunds](https://tfl.gov.uk/corporate/publications-and-reports/refunds), [Transport Focus](https://www.transportfocus.org.uk/?p=38587), [LTW casework Q1 2025/26](https://www.londontravelwatch.org.uk/wp-content/uploads/2025/07/07a-Casework-Q1-202526-V2-LTW792.pdf), [LTW LTW809](https://www.londontravelwatch.org.uk/wp-content/uploads/2025/11/09-LTW-Casework-Report-LTW809.pdf).
- Гипотеза промпта «мало кто подаёт» по TfL **не подтверждена цифрой**. Нужен FOI.
- Приложение могло бы: автоподсказка «по этой поездке вам положен возврат» плюс одно касание для подачи. Уверенность: низкая-средняя.

**16. Кражи телефонов.**
- Доказательства: Met — кража и грабёж телефонов 81 365 (2024) → 71 391 (2025), −12,3%. Другой разрез (theft from person с телефоном): 70 249 → 61 292. Операция Reckoning (с 1 июня, 10 дней). West End почти вдвое меньше. Источники: [Met–Apple](https://www.mynewsdesk.com/uk/metpoliceuk/news/met-and-apple-join-forces-to-disrupt-global-criminal-networks-as-phone-theft-halved-in-westminster-510316), [Met warns tech firms](https://news.met.police.uk/news/met-warns-tech-firms-to-act-now-on-phone-theft-506982), [LBC](https://www.lbc.co.uk/article/phone-snatchers-london-met-police-courts-5HjdSQS_2/).
- Что есть: рост полицейских мер, сотрудничество с Apple. Тренд положительный, но объёмы всё равно огромные.
- Приложение могло бы: инструкции «украли телефон» (блокировка, IMEI, банки, 101), профилактика в hotspots. Уверенность: средняя.

**17. Device clash и сбои валидаторов.**
- Доказательства: London TravelWatch (май 2024): переплаты от device clash составляют менее 0,001% от ~£3 млрд contactless-выручки в год; выплачено около £200 000. Richmond (апрель 2025): массовые incomplete journeys и переплаты. Источники: [LTW 2024](https://www.londontravelwatch.org.uk/?p=37434), [Global Railway Review](https://www.globalrailwayreview.com/?p=172152), [Richmond NUB](https://richmond.nub.news/news/local-news/richmond-station-commuters-overcharged-after-tfl-contactless-payment-fault-257213).
- Приложение могло бы: напоминать «завершили ли вы поездку», подсказывать, на какой карте списание. Уверенность: средняя.

**18. Детсады.**
- Доказательства: Coram 2025 — London part-time 25 часов для имеющих право на working parent entitlement £84/нед (было £192), без права £210 (+10%). Лондон на 29% дороже Англии. После-школьный клуб £61/нед, childminder £127. Источники: [Coram Childcare Survey 2025](https://www.coramfamilyandchildcare.org.uk/research/childcare-survey-2025/), [City of London sufficiency report](https://www.fis.cityoflondon.gov.uk/asset-library/city-of-london-sufficiency-project-september-2025-report-vfinal.pdf). Данных Coram 2026 по ценам не получено.
- Приложение могло бы: калькулятор прав на free hours и поиск мест. Уверенность: средняя.

**19. Ножевое насилие.**
- Доказательства: 97 убийств в 2025 — минимум с 2014. 8 подростков-жертв (−73% с 2021). Данные о «knife crime» противоречивы (Full Fact: серьёзные ножевые правонарушения −11% до сентября 2025, но в тексте же +19% по другой мере). Стоп-обыск −56,4% с 2021/22 по 2024/25. Источники: [Mayor release](https://www.london.gov.uk/london-records-fewest-homicides-year-monthly-records-began), [Full Fact](https://fullfact.org/crime/esther-mcvey-knife-crime-london/), [ITV](https://www.itv.com/news/london/2025-09-03/london-records-fewest-homicides-in-summer-months-since-2018).
- Тренд улучшается, но восприятие страха у молодёжи и родителей остаётся (общая оценка). Приложение уместно как канал для молодёжных занятий и анонимного репорта (низкая уверенность).

**20. Elizabeth line.**
- Доказательства: по майскому репорту 2025 больше каждого пятого поезда задержан (низкая-средняя уверенность, сниппет без цифр). 2024: давка у Paddington, письмо MP, рост отмен. Источники: [London.gov.uk](https://www.london.gov.uk/print/pdf/node/1281464), [The Londoner](https://www.the-londoner.co.uk/the-elizabeth-line-promised-a-smooth-and-seamless-service-what-went-wrong/). Свежие 2025–26 данные не найдены.

**21. Fly-tipping.**
- Доказательства: Англия 1,26 млн случаев в 2024/25 (+~10%). Croydon 53 268, Camden 36 216 (2024/25). Лондон потратил ~£29 млн на уборку (DEFRA, 2023). Не менее 17 боро подняли штраф до £1 000. Источники: [Inside Croydon](https://insidecroydon.com/2026/02/25/croydon-has-worst-fly-tipping-record-in-whole-of-england/amp/), [Express & Star](https://www.expressandstar.com/uk-news/2026/02/25/fly-tipping-cases-jumped-nearly-10-last-year-to-new-highs-council-data-shows), [Ealing News](https://www.ealing.news/?p=14067). Часть цифр от партийных источников.

**22. Ямы.**
- Доказательства: бэклог ремонта в Лондоне £1,22 млрд, пятая часть дорог (>1 900 миль) с запасом прочности менее 5 лет (ALARM). 1 403 ям ждут ремонта на январь 2025 (ответили 27 из 32 боро). Выплаты TfL по потенциальным претензиям выросли на 42% (>£2 млн; год в сниппете не указан). Источники: [Inkl/ALARM London](https://www.inkl.com/news/no-end-in-sight-to-london-s-1-2bn-pothole-plague-report-says), [Full Fact](https://fullfact.org/politics/labour-pothole-challenge-council-reports/), [Transport Xtra](https://www.transportxtra.com/publications/local-transport-today/news/77457/tfl-paid-over-2m-in-pothole-compensation-as-number-of-claims-rise-by-42-).
- Репортинг-канал есть (FixMyStreet, сайты боро), поэтому польза нового приложения ограничена.

**23. Велосипеды и e-bikes.**
- Доказательства: e-bikes и powered cycles — 2 966 краж в 2025 vs 2 448 в 2024 (Met via Pelion, рекорд). Все кражи велосипедов: 23 856 (2020) → 14 147 (2025). Только 197 положительных исходов по всему Лондону в 2025. LCC: ~40 000 краж в год, возвращается 2%. Hackney — максимум (1 363, год до апреля 2025). Источники: [IT Brief](https://itbrief.co.uk/story/london-e-bike-thefts-hit-record-high-as-market-grows), [Lawtons](https://www.lawtonslaw.co.uk/resources/london-boroughs-with-the-highest-bike-thefts-revealed/), [Cycling Weekly](https://www.cyclingweekly.com/news/only-1-percent-of-london-bike-thefts-result-in-police-action-according-to-figures).
- Приложение могло бы: регистрация велосипеда, карта безопасных парковок, шаблон заявления. Уверенность: средняя.

**24. Туристы.**
- Доказательства слабые: коммерческий блог про мошенничество (без даты), общие предупреждения о device clash (TfL с 2013–14 советует не держать карты рядом). Данных о жалобах туристов за 2025 не найдено. Остальное (бесплатные места, цены) не изучено. Источники: [Evan Evans blog](https://evanevanstours.com/blog/9-street-scams-in-london-to-avoid/), [Barnet Post](https://barnetpost.co.uk/2024/05/08/contactless-travellers-warned-about-being-overcharged-when-cdevices-clash-with-payment-cards/). Уверенность: низкая.

**25. Общие велосипеды.**
- Доказательства: август 2025 — сбой неудачного обновления O2/ПО, более 12 000 велосипедов Santander недоступны через приложение и станции. Приложение/аккаунт обязателен (нельзя просто приложить банковскую карту). Спрос Santander −26% в 2023. Lime: жалобы на парковку (Islington, 2025). Источники: [Ground News](https://ground.news/article/santander-bikes-out-of-order-across-london-due-to-tech-error-tfl-says), [road.cc](https://road.cc/content/feature/santander-e-bikes-v-lime-tier-and-forest-304533), [BikeRadar](https://www.bikeradar.com/news/islington-council-lime-bikes-open-letter).

## 2. Десять болей, которые никто толком не решил

1. **Единая навигация по правам и льготам** (A из пункта 1, 18). Нет единого места «что мне положено» (идея; данных о существовании такого сервиса в поиске нет).
2. **Доступ к NHS-дантисту** — 60% взрослых не были 2 года (London Assembly evidence).
3. **Туалеты** — закрыто 97, открыто 32 за 10 лет (Age UK London). Карты есть только у отдельных организаций (подтверждения нет).
4. **Одиночество** — разные измерения 8% до 35%, нет сервиса «бесплатно рядом сегодня» для всех возрастов.
5. **Безопасность женщин на пути домой** — +46% преступлений на сети TfL против докризисной нормы, опыт женщин не измерен общелондонским опросом (Assembly просит).
6. **Помощь после spiking** — быстрые шаги и доступ к тестам не описаны в найденных материалах.
7. **Подвальные квартиры и наводнения** — ~56 000 подвальных домов, осведомлённость «dangerously low».
8. **Офлайн-доступ к услугам боро** — почти треть боро (по предыдущему отчёту Age UK) без офлайн-пути на Housing Benefit/CTR.
9. **Step-free план Б при сбое лифта** — самоотчёт покрывает примерно треть лифтов, остальные узнаются на месте.
10. **Strike-day и heat-day планирование** — 8 забастовок до февраля 2027, жара до 34°C, персонального плана нет.

## 3. Пять болей, где уже есть хорошее решение (не делать, или делать только как надстройку)

Уверенность во всех пунктах — средняя, т.к. отзывы я не читал.

1. **Базовое построение маршрута.** TfL Go: 4,8 из 5 на 11 тыс. оценок в App Store (Google Play агрегатор 4,3 на ~39,8 тыс.). Citymapper, Google Maps. Слабое место было crowding-инфо (London TravelWatch 2021, дата старая). [App Store](https://apps.apple.com/gb/app/tfl-go-plan-pay-travel/id1419541638), [LTW](https://www.londontravelwatch.org.uk/news/google-maps-is-streets-ahead-of-tfl-when-it-comes-to-crowding-information-on-the-go-says-london-travelwatch/).
2. **Статус лифтов.** TfL Go и Step-Free Disruptions API (с октября 2025) — реализовано, но покрытие частичное (см. боль 6). Делать только поверх API.
3. **Репортинг ям и fly-tipping.** FixMyStreet и сайты боро. Проблема в скорости ремонта, а не в канале.
4. **Прокат велосипедов.** Santander, Lime, Forest; контракт Serco до 2031, e-bike charging в доках. Проблемы — сбои и парковка.
5. **Качество воздуха.** Смертность связанная с загрязнением упала с 6 400–8 000 (2019) до 3 800–5 100 (2024), около −40% (Imperial College для GLA/TfL; причинность ULEZ не выделена). Пользовательский продукт нужен только для чувствительных групп. [LocalGov, июнь 2026](https://www.localgov.co.uk/London-air-pollution-deaths-fall-40-since-ULEZ-launch/64568).

## 4. Топ-10 для хакатона (по силе боли и осуществимости как бесплатного приложения)

1. Единый навигатор льгот и «что мне положено» (боли 1, 18, 12).
2. «Куда идти по здоровью» с картой дантистов и UTC (боли 2, 4, 7).
3. Безопасный маршрут и пост-инцидентная помощь (3, 14, 16).
4. Карта туалетов и «карманный» step-free помощник (6, 11).
5. «Что бесплатно рядом сегодня» против одиночества (5, 24).
6. Strike-day / heat-day персональный план (10, 13).
7. Алерты о подтоплении для подвалов (8).
8. Помощник возвратов и переплат TfL (15, 17).
9. Реестр велосипедов и безопасные парковки (23).
10. Любой продукт с офлайн-режимом для цифрово исключённых (12).

## 5. Что перепроверить по первоисточникам

- Доля подающих Service Delay Refunds именно в TfL (FOI/TfL Customer Report: [board paper Dec 2025](https://board.tfl.gov.uk/documents/s25404/csop20251204-item08b-part1-Appendix%201-Customer%20Report.pdf)).
- Цифры Met по телефонам: два определения дают разные числа.
- Даты и состав забастовок после 6 ноября 2026.
- Данные Tube Alerter (третья сторона).
- Отзывы TfL Go/Citymapper/NHS App в App Store и Google Play (не прочитаны).
- Эти пробелы: food banks, fuel poverty, CAMHS, инвалидность, ASB/шум, пожилые и транспорт, туристы (бесплатные места), ночной транспорт.
