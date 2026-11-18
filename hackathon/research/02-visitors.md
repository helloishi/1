# Аналитик №2: Туристы и гости Лондона — до поездки и во время неё

Дата отчёта: 2026-11-18. Метод: целевые веб-поиски (WebSearch). WebFetch/curl недоступны, а лимит поисковых запросов исчерпан раньше, чем планировалось. Поэтому цифры взяты из сниппетов поисковой выдачи, а не из первоисточников. Всё, что не подтверждено первоисточником, помечено.

Шкала уверенности: **[В]** высокая (официальный источник или несколько согласующихся), **[С]** средняя (качественная пресса или вторичное цитирование), **[Н]** низкая (блог, коммерческий источник, сниппет без даты, противоречия).

## 0. Что не удалось сделать (честно)

- Не найдено прямых данных Reddit (r/london, r/travel, r/uktravel) и TripAdvisor с числом упоминаний. Сигналы оттуда косвенные (Time Out о рейтинге Reddit, гайды «ошибки туристов»).
- Нет свежего (2025–26) опроса VisitBritain/L&P о болях гостей Лондона. Нашлись только старые перцепционные данные и общие выводы.
- Нет данных по Airbnb, Amadeus; Euromonitor и Mastercard получены частично.
- Нет цифр о том, сколько иностранных гостей используют Alipay/WeChat в Лондоне в 2025–26. Есть лишь данные 2017–2020.
- Нет подтверждённых цен Heathrow Express/Elizabeth line на 2026 (тарифы меняются каждый январь).
- Нет данных о долях гостей в Лондоне по сегментам (семьи, 60+, инвалидность) за 2025–26.

## 1. Контекст рынка

| Факт | Значение | Год | Источник | Увер. |
|---|---|---|---|---|
| Прогноз VisitBritain на 2026 | 44,2 млн визитов, £33,9 млрд расходов (в январе было 45,5 млн / £35,7 млрд); пересмотр вниз, риск «Gulf war» | 2026 | https://www.visitbritain.org/research-insights/inbound-tourism-forecast ; https://www.travelmole.com/news/visit-britain-predictions-2026 | С |
| Первоначальный прогноз на 2026 | +4% инбаунд-визитов | 2025/26 | https://www.travelextra.ie/visit-britain-forecasts-4pc-inbound-tourism-growth-for-2026/ | С |
| Расходы в Лондоне | 2025: примерно +2%; Q1 2026: +3%; визиты воздушным транспортом в Лондон в 2025: −1% | 2025–26 | https://www.visitbritain.org/research-insights/inbound-tourism-forecast | С |
| Лондон 2024 | около 20,9 млн инбаунд-визитов (2019: 21,7 млн) | 2024 | https://data.london.gov.uk/download/2j81l/sg4/Tourism-in-London-Recent-Trends.pdf | С |
| Топ-рынки Лондона 2024 | США, Франция, Германия; США в Лондоне 3,75 млн визитов и £4,2 млрд | 2024 | тот же PDF GLA | С |
| Топ по расходам, UK 2025 (карточные данные) | США, Франция, Саудовская Аравия, ОАЭ, Германия | 2025 | VisitBritain (media/5563, media/6079, https://www.visitbritain.org/research-insights/inbound-tourism-forecast) | Н (пути к документам из выдачи без заголовков) |
| Средний расход за визит UK | £390 (без изменений к 2024, −3% в реальном выражении) | 2025 | VisitBritain (там же) | С |
| Слабые рынки по расходам | Южная Корея −16%, Китай −10%, Индия −8% (2025); Q1 2026: Индия, Катар, Южная Корея −17% | 2025–26 | VisitBritain (там же) | С |
| Евромонитор: Лондон | 18-е место в Top 100 City Destinations 2025 (в других источниках 13-е; противоречие); 3-е по международным прибытиям, 22,7 млн; слаб по tourism policy, health & safety, sustainability | 2025 | https://www.euromonitor.com/newsroom/press-releases/december-2025/euromonitor-international-unveils-worlds-top-100-city-destinations-for-2025 ; https://www.yahoo.com/lifestyle/articles/cities-led-global-jet-setting-221853580.html ; https://www.timeout.com/london/news/london-has-plummeted-down-a-ranking-of-the-100-greatest-cities-in-the-world-020426 | С |
| WTTC | Сектор UK £286 млрд (10% ВВП) в 2024; потеря более £2,2 млрд экспортной выручки из-за недобора иностранных расходов vs 2019; призыв вернуть tax-free shopping и отменить урезание VisitBritain | 2024–25 | https://wttc.org/news/uk-economy-loses-more-than-2-2bn-from-international-traveller-spend | В |
| Война в Персидском заливе | Tourism Economics: прибытия на Ближнем Востоке −11…−27% в 2026; в сентябре 2026 прогноз по Gulf inbound −38%; VisitBritain отмечает провал бронирований из Gulf и Индии | 2026 | https://www.tourismeconomics.com/research/tourism-and-iran-war/ ; https://www.agbi.com/analysis/leisure-hospitality/2026/09/uae-hit-hardest-in-gulf-tourisms-lost-year/ | С |
| ETA | 23,2 млн ETA выдано за июль 2025 — июнь 2026; 25,1 млн за апрель 2025 — март 2026 (разные окна, вторичные источники) | 2025–26 | https://visasnews.com/en/uk-23-2-million-etas-issued-in-one-year-americans-remain-far-ahead/ ; https://visasnews.com/en/uk-25-1-million-etas-issued-in-one-year-with-europeans-at-the-forefront/ | Н (проверять по Home Office ETA_D01/D02) |
| Мэр | В июне 2026 анонсирована кампания £7 млн для международного туризма и инвестиций, в том числе против «онлайн-дезинформации» о Лондоне | 2026 | https://www.london.gov.uk/mayor-announces-new-ps7m-international-tourism-and-investment-campaign-promote-london-and-fight-back | В |

Вывод: Лондон теряет долю и ценит каждого гостя; главные источники дохода (США, Gulf, Европа) делают именно эти сегменты приоритетом. При этом Gulf-рынок сейчас просел из-за войны, так что любое решение для него нужно строить как «готово к возврату», а не как опору.

## 2. ТОП-20 болей гостей

Ранжирование авторское: по сочетанию масштаба, силы эмоции, наличия официального интереса и «пустоты» в существующих приложениях. Уверенность относится к доказательной базе.

### 1. Путаница с ETA и сайты-посредники, берущие до 5–10x
- Официальная цена: £10 на старте → £16 (9 апр. 2025) → £20 (8 апр. 2026). Посредники берут $99, до 178 евро, в Австрии сообщали до 900 евро; в Нидерландах — «в 10 раз дороже».
- Источники: https://www.euronews.com/travel/2025/11/18/visitors-to-the-uk-will-soon-need-a-12-visa-waiver-heres-how-to-avoid-eta-scams ; https://nltimes.nl/2025/11/17/dutch-still-falling-sites-offering-get-uk-entry-visas-10-times-cost ; https://tripprof.com/en/blog/uk-eta-scam-austrian-travelers/ (блог, [Н]) ; https://www.malwarebytes.com/pt/blog/news/2025/09/travelers-to-the-uk-targeted-in-eta-scams ; https://www.thelocal.dk/20260207/uk-to-hike-price-of-electronic-travel-authorisation-for-foreign-travellers ; Home Office: https://homeofficemedia.blog.gov.uk/electronic-travel-authorisation-eta-factsheet-april-2025
- Сегменты: EU-граждане (ETA с 2 апр. 2025 для европейцев), США, Австралия, Япония, Корея. Кто не должен подавать: граждане GCC в 2025 вводились по ETA с февраля 2025 (не проверено поиском; [Н]).
- Масштаб: десятки миллионов заявок (см. выше). Уверенность: [В] по существованию боли, [С] по размерам переплат.
- Власть: Home Office (ETA), Trading Standards, NCSC; прямой интерес.

### 2. Кража телефонов: Лондон как «столица краж телефонов»
- Met: около 71 тыс. краж/грабежей телефонов в 2025 (−12% к 2024: 81,4 тыс.); около 37 пострадавших в день в Вест-Энде; Вестминстер — наибольшая доля; «около 40% краж в Вестминстере и Вест-Энде»; Met изъяла 1000 краденых телефонов, 230 арестов в одной операции (февр. 2025). Возврат крайне низкий: за 2017 — февр. 2024 возвращено 13 998 из 587 498 (без City).
- Источники: https://www.london.gov.uk/met-seizes-hundreds-stolen-phones-thefts-hit-four-year-low ; https://www.thenationalnews.com/news/uk/2025/02/06/police-seize-1000-stolen-phones-in-london-crackdown-on-tourist-hotspot-crime ; https://news.met.police.uk/news/met-warns-tech-firms-to-act-now-on-phone-theft-506982 ; https://www.london.gov.uk/mayor-outlines-major-crackdown-mobile-phone-theft-new-mobile-phone-theft-command-cell-and-ps45m-more ; https://thepeninsulaqatar.com/article/28/04/2026/on-patrol-with-london-police-battling-rampant-phone-theft
- Сегменты: все, особенно Gulf, США и молодые группы, сторонние данные по туристам не отделяются (Met не выделяет туристов). Уверенность: [В] по общему числу, [Н] по туристической доле.
- Власть: Mayor/MOPAC, Met (выделены средства и «mobile phone theft command cell»).

### 3. Грабежи ради часов (Mayfair/Knightsbridge), гости из Gulf
- ITV (16 окт. 2026): 97 грабежей часов (включая попытки) за период; нож виден или подразумевался в 20% случаев за 6 мес.; «£1 млн часов в месяц в Вест-Энде» (по данным суда). Нападения на гостей из Саудовской Аравии и ОАЭ; МИД ОАЭ советовал избегать части центра (дата не подтверждена), Met ответил «нигде в Лондоне не нужно избегать».
- Источники: https://www.itv.com/news/london/2026-10-16/1m-worth-of-watches-stolen-in-londons-west-end-every-month-court-told ; https://gulfbusiness.com/?p=53040 ([Н], без даты) ; https://www.arabnews.pk/world/stabbing-of-saudi-visitor-highlights-need-for-vigilance-among-arab-tourists-in-london-3000410 ; https://www.thenationalnews.com/news/uk/2025/06/24/rolex-rippers-jailed-after-attack-outside-mayfair-rolls-royce-showroom
- Сегменты: GCC, богатые гости. Уверенность: [С]. Ценность для власти: высокая (репутационный и торговый риск, GCC в топе по расходам).

### 4. Уличные аферы (напёрстки / shell game, «ice cream» ловушки) на Westminster Bridge
- Операция Met «Batman and Robin» 15 февр. 2025, обвинение в организации азартных игр; игры управляются в основном румынскими группами по всей Европе. Mother/daughter преследовалась от Westminster station.
- Источники: https://news.met.police.uk/news/batman-and-robin-arrest-two-men-on-westminster-bridge-496277 ; https://www.londoncentric.media/p/westminster-bridge-ice-cream-vans-illegal-gambling
- Уверенность: [В] по существованию, масштаба нет (поиск не дал числа).

### 5. Contactless vs Oyster vs Visitor Oyster
- Тарифы и дневные капы одинаковы у contactless и Oyster; Visitor Oyster не может загружать 7-дневные Travelcard; цена карты по разным источникам £5/£7, ненадёжно. Путаницу подтверждает массовый «гайдовый» контент и TfL «Best ways for visitors to pay». Коммерческий блог 2026-03 называет это «ошибкой, которую туристы всё ещё делают».
- Источники: https://tfl.gov.uk/travel-information/visiting-london/getting-around-london/best-ways-for-visitors-to-pay ; https://www.visitlondon.com/traveller-information/getting-around-london/oyster-faqs ; https://yourmileagemayvary.com/2026/03/14/visitor-oyster-card-vs-contactless-london-underground/ ([Н])
- Сегменты: все, кроме жителей UK; особенно Китай, Индия, Япония (нет глобальных карт), мульти-карточные пары (разные карты разные капы — известная ловушка, [Н], в этой сессии не подтверждена поиском).
- Не найдено: данные о комиссии foreign transaction fee и о том, сколько гостей реально «переплачивают» из-за нескольких карт в одной группе. Это гипотеза, не факт.

### 6. Аэропортовые трансферы: ценовые ловушки (Heathrow Express), touts
- Walk-up Heathrow Express около £25 vs Elizabeth line около £12,80–15,50 (разные годы; в 2026 точные цены не проверены); Piccadilly line дешевле всего; персонал аэропорта «активно продаёт Express» (блог). Незаконные minicab touts в Heathrow; Мэр заявил, что специальной анти-тауtинг команды не планируется.
- Источники: https://www.cityam.com/?p=1879518 ; https://www.taxi-point.co.uk/post/no-dedicated-anti-touting-taxi-team-planned-for-heathrow-confirms-mayor-of-london ; https://www.taxi-point.co.uk/post/heathrow-airport-taxi-touting-concerns-continue-as-tfl-signage-review-remains-incomplete
- Сегменты: первая поездка, дальнемагистральные гости, семьи с багажом, пожилые. Уверенность: [С]. Данных по Gatwick/Stansted/Luton/City в поиске не получено.

### 7. Связь/eSIM
- Данные касаются в основном британцев за рубежом: BICS — 18% использовали eSIM, 56% рассмотрели бы после объяснения; GSMA — 12% международных путешественников в 11 странах использовали eSIM в поездке. По инбаундным гостям Лондона данных нет (в т. ч. по ценам роуминга для приезжих).
- Источники: https://techradar.com/pro/more-than-half-of-uk-consumers-say-they-would-use-an-esim-if-they-knew-about-it ; https://www.gsmaintelligence.com/blogs/travel-esim-shifting-roaming-shifting-experience
- Уверенность: [Н] для Лондона. Бесплатный публичный Wi-Fi и справочник «как подключиться» — гипотеза без доказательств спроса.

### 8. Забастовки на метро
- RMT: 8 (по другим подсчётам до 11) 24-часовых забастовок машинистов, ноябрь 2026 — февраль 2027: 26 нояб., 17 и 19 дек. 2026, 4 и 6 янв. 2027, затем 17, 23, 25 февр. 2027; Elizabeth line работает, но переполнена.
- Источники: https://londonist.com/london/transport/tube-strikes-london-christmas-2026-november-december-january-2027 ; https://www.cityam.com/?p=2475136
- Сегменты: все, в особенности пересадочные туристы, рождественский пик (США, Европа). Уверенность: [В] по датам, [Н] по ущербу для гостей.

### 9. Service charge и непонятные чаевые
- Типичная 12,5% «discretionary» надбавка растёт до 15% (Time Out, окт. 2025); опрос HOSPA/UKHospitality: 53% британцев стесняются просить убрать (цитата из Time Out, [С]); Which?: четверть потребителей оставили чаевые при плохом сервисе. Australian-turists истории про «авто-12,5%». Visit London публикует гайд по чаевым 2026.
- Источники: https://www.timeout.com/london/news/why-are-so-many-london-restaurants-now-charging-a-15-service-charge-031025 ; https://www.which.co.uk/news/article/tipping-do-you-know-where-your-money-really-goes-aPE9G4P9jaoA ; https://au.news.yahoo.com/warning-to-aussie-tourists-over-small-detail-on-restaurant-receipts-074228858.html ; https://visitlondon.com/traveller-information/essential-information/money/tipping
- Сегменты: США (привыкли к чаевым и могут платить дважды), Австралия/Япония/Корея (не привыкли). Уверенность: [С].

### 10. Безналичный город и платёжные системы Китая
- Данные устарели: 2017 — WeChat Pay в Camden, Alipay у Eye/Madame Tussauds/Harrods; опрос mystery shopper: в 4 из 5 непремиальных магазинов на Oxford/Regent/Bond St нельзя было платить Alipay/WeChat (дата примерно 2019–20, [Н]).
- Источники: https://www.engadget.com/2017/11/22/tencent-wechat-pay-camden-uk-launch/ ; https://www.theindustry.fashion/uk-high-street-not-geared-up-for-boom-in-chinese-tourism/
- Сегмент: Китай, отчасти Индия (UPI) и Корея. Спрос падает: расходы китайских гостей −10% в 2025. Уверенность: [Н], нужна проверка 2025–26.

### 11. Нет tax-free shopping
- Схема VAT Retail Export Scheme отменена в 2021 (даты расходятся в источниках); индустрия оценивает потерю в £1,5 млрд (AIR, [Н]); в сентябре 2026 Консерваторы обещали вернуть; Cebr для Heart of London готовит оценку.
- Источники: https://www.retailgazette.co.uk/blog/2026/09/tories-pledge-to-restore-tax-free-shopping-for-overseas-visitors/ ; https://visitlondon.com/traveller-information/essential-information/money/tax-free ; https://wttc.org/news/uk-economy-loses-more-than-2-2bn-from-international-traveller-spend
- Сегменты: GCC, Китай, Индия, США. Это политическая, а не продуктовая проблема; продукт может лишь сравнивать цены и показывать, где какие скидки.

### 12. Что бронировать заранее (Sky Garden и т. п.)
- Sky Garden бесплатно, но по timed-билету; слоты на выходные и закат разлетаются за часы; сведения о дате выхода билетов противоречат друг другу (от 7 дней до 4 недель, [Н]); официальный сайт рекомендует бронировать. Жалоба Trustpilot: переплата £19 при покупке «театра» через Visit London сайт.
- Источники: https://skygarden.london/booking ; https://uk.trustpilot.com/review/visitlondon.com
- Сегменты: первая поездка, семьи, пары. Уверенность: [С].

### 13. NHS и медпомощь иностранцам
- A&E бесплатно только в отделении неотложной помощи; последующая госпитализация, амбулатория платные; цены не могут быть отменены; страховка обычно требует оплаты вперёд, а NHS surcharge не заменяет страховку.
- Источники: https://www.gov.uk/government/publications/how-the-nhs-charges-overseas-visitors-for-nhs-hospital-care/how-the-nhs-charges-overseas-visitors-for-nhs-hospital-care (помечена как withdrawn, заменена документом NHS cost recovery) ; https://nat.org.uk/wp-content/uploads/2024/06/Who-has-to-pay.pdf
- Сегменты: пожилые, семьи, США (нет подобной системы). Количественного опроса не нашлось. Уверенность: [С].

### 14. Туалеты
- Age UK London (янв. 2025): минимум 97 закрытых общественных туалетов с 2013/14, закрытий в 3 раза больше, чем открытий (по запросам FOI в 30 из 33 советов); YouGov 2024: 74% лондонцев за больше туалетов на метро; Мэр заявил о £3 млн в год на туалеты на станциях (по пересказу Barnet Post, [Н]).
- Источники: https://www.localgov.co.uk/Age-UK-London-calls-for-immediate-action-on-toilet-provision/61773 ; https://barnetpost.co.uk/2024/02/13/green-mayoral-candidate-would-prioritise-toilets-on-tube/
- Сегменты: семьи с детьми, пожилые, инвалиды, беременные, все. Уверенность: [В] по тренду.

### 15. Камеры хранения
- Нет самообслуживаемых шкафчиков на большинстве вокзалов, нет left luggage на станциях метро; Euston ориентировочно £7,50 за вещь на 3 часа (старый пример); Tower of London не принимает крупный багаж; частные сети (Stasher, Radical Storage и др.) закрывают дыру, но это коммерческие источники.
- Источники: https://freetoursbyfoot.com/luggage-storage-london/ ; https://stasher.com/luggage-storage/united-kingdom/london
- Сегменты: все в день заезда/выезда; бюджетные, студенты, пересадки Eurostar. Уверенность: [Н].

### 16. Доступность (инвалидность, возраст, коляски)
- Часть станций метро без step-free (цифры разнятся: «более 90» и 84 станции step-free «улица–платформа»; на 2014–2016 устарело; [Н]); у TfL есть step-free карта и аудиокарта; Elizabeth line и DLR полностью step-free, 60 станций Overground; Apple Store у Visit London app: «разработчик не указал функции доступности».
- Источники: https://www.visitlondon.com/traveller-information/getting-around-london/accessible-public-transport ; https://apps.apple.com/us/app/-/id847534124
- Нет данных по числу гостей с инвалидностью. Уверенность: [С] по существованию инфо, [Н] по пробелу.

### 17. Толпы и «overtourism»
- Time Out о подборке Reddit: Лондон среди «over-touristed» мест UK (январь 2025); гайды советуют избегать Oxford Street и Borough Market. Мэр открыт к туристическому сбору, когда закон позволит (по немецкому источнику, ноябрь 2025, [Н]). Прямых опросов жителей нет.
- Источники: https://www.timeout.com/uk/news/the-most-over-touristed-places-in-the-uk-according-to-reddit-012925
- Парадокс: Лондон активно ищет рост, поэтому «overtourism» скорее проблема точечных хотспотов (Westminster, Oxford St, Borough), а не города в целом. Уверенность: [Н].

### 18. Halal и молельные пространства
- Опрос 2018 (35 тыс. мусульманских путешественников): 61,3% хотят halal в отелях, 61,1% — список мечетей рядом, 55,2% — halal-рестораны; в Лондоне 462 мечети (halalbooking), в Zabihah 60 проверенных ресторанов и 63 мечети/молельных пространства, только 1 ресторан с молельной зоной; 2014: 2,08 млн мусульманских гостей в UK (6,6%).
- Источники: https://salaamgateway.com/story/muslim-friendly-tourism-gaining-market-share-in-uks-32-billion-travel-industry ; https://www.zabihah.com/halal-restaurants/london-greater-london-gb
- Данные устарели (2014, 2018). Уверенность: [Н]; спрос на это вполне логичен для GCC, Индонезии, Пакистана, Индии.

### 19. Безопасность женщин и одиночных путешественниц
- WSP 2023: 54% британок чувствуют себя небезопасно при одиночной поездке, 62% на остановке; London TravelWatch 2021: 65% считают самым небезопасным время после 22:00; Centre for London: женщины платят больше, чтобы не ехать на автобусе ночью; InsureMyTrip 2024: Лондон среди топ-городов для одиночных путешественниц. Нет опроса именно туристок.
- Источники: https://www.transportxtra.com/publications/transit/news/74118/most-female-passengers-feel-unsafe-on-public-transport-wsp-survey-reveals ; https://centreforlondon.org/blog/women-safety-travelling-in-london/ ; https://londonworld.com/news/london-solo-female-travellers-safety-cost-what-to-do-4491362
- Уверенность: [С] по резидентам, [Н] по туристкам. Мэр: Women's Night Safety Charter.

### 20. Стоимость города и поиск бесплатного
- Лондон ассоциируется с дороговизной; VisitBritain признаёт value-for-money слабым местом бренда («Achilles Heel»; данные 2022, [Н]); Visit London публикует «101 free things» и списки бесплатных музеев; нет независимого опроса бюджета гостей. Лондон 35-й по value for money в опросе Tripadvisor (75 тыс. респондентов; дата не уточнена, [Н]).
- Источники: https://visitlondon.com/tag/free-attractions-in-london ; https://www.visitbritain.org/media/5 ([Н])
- Сегменты: студенты, бюджетные, семьи, Индия (расходы −8%).

## 3. Разбивка по происхождению и типу

| Сегмент | Главные боли (номера выше) | Заметки и доказательства |
|---|---|---|
| UK-domestic | 2, 8, 14, 17, 20 | Мэр запускал домашний туристический консорциум (2019) — контекст. Данных о болях в 2025–26 не найдено. |
| США | 1, 2, 5, 6, 9, 12 | Крупнейший рынок: 3,75 млн визитов в Лондон в 2024. Ошибки с чаевыми, ETA (посредники), фиксированные переплаты. |
| ЕС | 1, 5, 8 | ETA с апреля 2025; жалобы в NL, AT, DE, BE; рынок Западной Европы растёт на 6% в 2026 (VisitBritain, https://www.visitbritain.org/research-insights/inbound-tourism-forecast). |
| Gulf/GCC | 3, 2, 18, 11, 1 | Топ по расходам; грабежи часов; halal/молитва; сейчас спрос просел из-за войны. |
| Китай | 10, 11, 5 | Расходы −10% в 2025; платёжные системы; «не готовы» магазины (старые данные). |
| Индия | 20, 5, 1 | Самый высокий AI-adoption в путешествиях (86%, Skyscanner), расходы −8% (2025), −17% (Q1 2026). |
| Япония/Корея | 9, 5, 6 | Расход за визит около £1 056–1 093 (2024, IPS); Корея −16% (2025). Языковой барьер (прямых данных нет). |
| Австралия | 9, 6, 20 | Расход £1 358 за визит (2024); −10% YTD 2026 (карточные данные). |
| Семьи с детьми | 14, 15, 6, 12 | Туалеты, багаж, трансфер. Прямых данных нет. |
| Пожилые | 13, 16, 6, 14 | Доступность и NHS. Прямых данных нет. |
| Женщины/соло | 19, 2 | Ночной транспорт и телефоны. |
| Люди с инвалидностью | 16, 14 | Step-free данные есть, но разрозненные. |
| Студенты/бюджет | 20, 15, 7 | Бесплатное, камеры хранения, eSIM. |
| Бизнес | 8, 6, 7 | Забастовки, трансферы. |
| Впервые/повторно | 1, 5, 6, 12 | У впервые больше всего информационных ловушек. |

## 4. Что волнует власти

- **Home Office (ETA):** прямой интерес: защита от мошеннических посредников, правильный адрес gov.uk/официальное приложение, повышение сбора до £20 (апрель 2026). Тема активно освещается, ссылки в пункте 1. Власть сказала бы «это ценно» по любому продукту, который ведёт гостя на официальную страницу.
- **TfL:** соотношение contactless/Oyster, снижение «ошибочных» покупок Visitor Oyster; TfL Go обновляется (май 2026: видно достижение кэпа в истории поездок, https://tfl-newsroom.prgloo.com/news/tfl-go-londons-official-travel-app-gets-further-updates-to-make-getting-around-london-even-easier); аккаунт TfL Go вне UK/Европы по отзыву не работает ([Н], https://apps.apple.com/app/1419541638); забастовки; touting (TfL/Met).
- **Met/MOPAC/Mayor:** приоритет — кража телефонов (снижение на 12% в 2025 и новый «command cell»), грабежи часов, мошеннические игры. Им нужны: сообщения пострадавших, превентивные советы для гостей, снижение рынка краденых телефонов.
- **VisitBritain/London & Partners:** падение прогноза на 2026, поддержка value-for-money, возвращение Gulf и дальних рынков; Мэр: £7 млн кампания и «борьба с дезинформацией» о Лондоне (прямо про имидж безопасности).
- **NHS:** тема платных услуг иностранцам и страхования; больницы имеют юридическую обязанность взимать плату.
- **Indirect:** Treasury (tax-free), DCMS, WTTC-лобби.

## 5. Тренды 2026–2030, создающие возможности

| Тренд | Данные | Что это даёт | Источник |
|---|---|---|---|
| AI-планирование | Skyscanner: уверенность в AI 47%→54% (2025 vs 2024), Индия 86%, Gen Z 72%; ожидается «agentic AI» от вдохновения до изменений маршрута в поездке | Место для AI-помощника «в поездке» | https://www.ttgasia.com/2025/11/04/travellers-seek-more-personal-purposeful-journeys-in-2026-skyscanner/ ; https://www.travelmole.com/news/skyscanner-travel-trends-2026 |
| Разрыв доверия к AI | Expedia (апр. 2026, США/UK/Индия, 5 700 респондентов): только 8% в США/UK используют чат-ботов для планирования; 59% — поисковики; 68% предпочитают бронировать у доверенного бренда | Ценность у бренда с «официальным» статусом (мэрия, TfL) | https://www.businesswire.com/news/home/20260414532485/en/Expedia-Group-Reveals-The-AI-Trust-Gap-Travelers-Embrace-AI-for-Planning-but-Rely-on-Trusted-Brands-to-Book |
| Индивидуализация | Booking.com Travel Predictions 2026 (29 тыс. респондентов, 33 страны): «Era of YOU», 10 трендов (romantasy, PastPorts, quiet nature и др.) | Персональные маршруты, set-jetting | https://en.10minhotel.com/2025/10/15/booking-com-releases-findings-from-annual-travel-predictions-research |
| Опыт вместо вещей | Mastercard: доля расходов европейцев на впечатления 20,4% в 2025 (19,9% в 2024); AI направляет к менее известным местам | Распределение потока от хотспотов | https://www.mastercard.com/europe/en/news-and-trends/press/2026/may/European-travel-in-2026.html |
| Expedia Unpack '26 | 24 тыс. путешественников; тренды вроде Set-Jetting, Fan Voyage, Hotel Hop | Тематические маршруты (кино, фанат-путешествия) | https://www.travelagentcentral.com/data-trends/expedia-unveils-2026-travel-trends-and-emerging-destinations (числа трендов расходятся, [Н]) |
| Геополитика | Война в заливе меняет маршруты и спрос; Западная Европа +6% (прогноз VisitBritain 2026) | Фокус на европейских гостях и дальних США | см. раздел 1 |
| Платёжная и ID-цифровизация | 23–25 млн ETA в год; Visitor Oyster уступает contactless | Единый «слой приезда» | см. раздел 1 |

В поиске не найдено: Airbnb, Amadeus.

## 6. Разрывы: чего нет у существующих приложений

Основано на сниппетах; прямых функциональных аудитов приложений не проводилось, поэтому уверенность в целом [Н]–[С].

- **Visit London (L&P):** FAQ предупреждает о расходе мобильных данных и отсутствии нативного iPad; отзыв о разряде батареи из-за геолокации; в App Store не указаны функции доступности; оценка около 4,7 (3 121 отзыв по AppFollow, https://apps.apple.com/us/app/-/id847534124 ; https://www.visitlondon.com/app/faqs). Нет данных о защите от мошенничества, ETA, телефонах, вокзалах. Билеты через сайт Visit London дороже театра (одна жалоба на Trustpilot, https://uk.trustpilot.com/review/visitlondon.com).
- **TfL Go:** по ссылке ниже у иностранцев не работает аккаунт вне UK/Европы; в отзывах 2024 нет совместимости с Visitor Oyster ([Н]); unitq отмечает деградацию качества (https://unitq.com/unitq-scorecards/tflgo, содержание не проверено).
- **Citymapper / Google Maps:** по ним в этой сессии не найдено подтверждённых сведений (лимит поиска). Из общих знаний, не проверено: они не показывают платные трансферные ловушки (Heathrow Express vs Elizabeth), нет «безопасной зоны» и модуля платежей. Считать гипотезой.
- **Нет единого «слоя приезда»:** ETA + eSIM + карта + трансфер + первые 24 часа (камера хранения, туалеты, банкомат).
- **Нет проверки «настоящий ли это официальный сайт/билет».**
- **Нет русскоязычных, арабоязычных, китайских, хинди, японских, корейских локальных гайдов с офлайн-режимом (из поиска не выявлено; гипотеза).**

## 7. Десять продуктовых гипотез

Все должны быть бесплатными для гостя. Для каждой указаны боли, потенциальный «одобряющий» орган и главный риск. Гипотезы, а не доказанные факты.

1. **«Official or not»: проверка ETA и билетов.** Вставляешь ссылку/скриншот — получаешь вердикт (gov.uk/официальный магазин или нет) и цену официальной версии. Боли 1, 12. Одобряет Home Office, Trading Standards, VisitBritain. Риск: список официальных доменов нужно поддерживать, источник правды у Home Office/L&P.
2. **Arrival Pack: «первые 3 часа» из аэропорта.** Выбор Heathrow/Gatwick/Stansted/Luton/City → лучший маршрут по цене/времени/багажу, предупреждение о Heathrow Express и touts, только licensed cabs, контактлесс-карта вместо Visitor Oyster. Боли 5, 6. Одобряет TfL, Heathrow, Mayor. Риск: актуальные цены; нужны открытые данные TfL.
3. **Contactless Coach (одна карта на человека).** Показывает, что карта/телефон одного человека использовать для всех поездок в день, как не платить дважды, что такое кэп. Боль 5. Одобряет TfL. Риск: вмешательство в продукт TfL Go; проверить, что мульти-карточная ловушка реальна.
4. **Safe Zones & Phone Guard.** Карта точек риска (Westminster Bridge, Oxford St, Mayfair/Knightsbridge) в реальном времени + напоминания «убери телефон на выходе из метро» + мини-инструкция по блокировке и подаче заявления в Met. Боли 2, 3, 4. Одобряет Met, MOPAC, Mayor. Риск: стигматизация районов (Met: «нигде не нужно избегать»); данные должны быть публичные и без обвинений.
5. **Gulf Guest Companion (арабский, офлайн).** Безопасность часов/наличных, halal и молельные места, женские сервисы, Arabic-speaking help. Боли 3, 18, 11. Одобряет VisitBritain/L&P, Met. Риск: рынок сейчас просел (−38% Gulf inbound в 2026), поэтому делать как «модуль» общего продукта.
6. **Tipping & Service Charge Explainer + калькулятор.** Фото чека → «что это за 12,5%, обязательно ли, как попросить убрать, сколько добавить по культуре страны». Боль 9. Одобряет VisitBritain, Which?/Trading Standards. Риск: юридическая формулировка («discretionary»).
7. **Strike & Crowd Radar для гостей.** Сочетает даты забастовок, переполненность хотспотов и альтернативы («Sky Garden полон — вот Horizon 22/Garden at 120», бесплатные альтернативы Oxford St). Боли 8, 17, 12. Одобряет TfL, L&P, Westminster Council. Риск: данные в реальном времени о толпах; можно начать со статических расписаний.
8. **Free & Low-cost Day Planner (по бюджету и профилю).** Бесплатные музеи, видовые точки с бронированием, маршруты по возрасту/доступности. Боли 12, 20. Одобряет L&P, Mayor. Риск: в рынке уже много списков; ценность только в персонализации и интеграции с доступностью/туалетами.
9. **Loo & Locker Finder (туалеты, камеры хранения, step-free).** Единая карта туалетов (в т. ч. Community Toilet Scheme), шкафчиков/сданного багажа и step-free маршрутов. Боли 14, 15, 16. Одобряет Mayor, TfL, Age UK London. Риск: актуальность данных; нужны открытые данные от советов и партнёров.
10. **Care Navigator: «куда идти, если заболел» для иностранца.** A&E vs urgent treatment vs pharmacy, что платно, как работает страховка (платите сразу), номера, переводчик. Боль 13. Одобряет NHS England/ICB London, Home Office-совместимо. Риск: медицинская ответственность; нужны рецензия NHS и disclaimers.

Приоритет для хакатона (авторское мнение, не измерено): 1, 2, 4 и 9 — самые «одобряемые» властью и наименее зависимые от закрытых данных. 5 стоит строить как языковой/культурный модуль.

## 8. Рекомендации по следующему шагу (чтобы закрыть пробелы)

1. Проверить по Home Office ETA_D01/D02 числа заявок и отказов; уточнить, нужна ли ETA гостям из GCC (в этой сессии не подтверждено).
2. Получить Inbound Perceptions Tracker VisitBritain и последний Overseas Visitor Survey L&P.
3. Пройти по r/london, r/travel, r/uktravel вручную и посчитать частоту тем (ETA, Oyster/contactless, Heathrow, телефоны, чаевые).
4. Проверить функциональные пробелы Citymapper, Google Maps, TfL Go прямым использованием.
5. Уточнить текущие цены Heathrow Express/Elizabeth line/Gatwick Express/Stansted Express/Luton DART на 2026 (после январской индексации).
6. Найти данные о доступности для туристов с инвалидностью (опросы Euan's Guide, Visit Britain accessible tourism).
