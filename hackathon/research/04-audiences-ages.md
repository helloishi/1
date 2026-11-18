# 04. Аудитории и возрасты: потребности, существующие бесплатные инструменты, разрывы

Аналитик №4 из 6. Дата отчёта: 2026-11-18. Метод: боли -> доказательства -> существующее -> разрыв -> гипотезы.

**Важно о качестве данных.** Инструмент поиска возвращает пересказы страниц. Все цифры ниже взяты из этих результатов, URL указаны из выдачи. Страницы целиком не открывались (WebFetch недоступен), поэтому уверенность проставлена так: **[В]** высокая (официальный источник/прямая цифра), **[С]** средняя (вторичное цитирование или смешанные данные), **[Н]** низкая (нет даты, косвенно, нужна перепроверка). Где данных нет, так и написано. Существующие приложения упоминаются как "известные из общих знаний" (не подтверждены поиском в этой сессии) и помечены **[знание]**.

---

## 0. Сквозные выводы (читать первыми)

1. **Самые сильные подтверждённые боли**: (а) цена жилья/аренды (London 41,6% дохода арендаторов, ONS 2024); (б) безопасность женщин и ночью (58% женщин чувствуют себя safe после тёмного времени против 68% всех, MOPAC 2025/26); (в) доступность транспорта (step-free ~ треть Tube при цели 50% к 2030); (г) детская бедность (37% детей <16 после housing costs, Trust for London 2024/25).
2. **Паттерн "инструмент есть, но не доходит/не работает"**: Pension Credit (£246,5 млн нетребованных в Лондоне), text 61016 (низкая отчётность, ~3% charge rate по VAWG на TfL), Sunflower lanyard (54% не знают), Zip Oyster (оформление родителем, платная карта).
3. **Много данных по конкретным группам старше 2024 или не по Лондону**: честно отмечено; для хакатона это означает, что нужно выбирать гипотезы, которые сами собирают данные.
4. **Главный продуктовый принцип**: агрегатор + проверка + подсказка действия на мобильном, а не ещё один "портал". Бесплатный, без регистрации, мультиязычный, с режимом простого интерфейса.

---

## 1. Дети 6-12 и их родители

**Боли с доказательствами**
1. *Оформление и стоимость проездного для самостоятельной дороги.* Под-11 едут бесплатно только с оплачивающим взрослым; для самостоятельной поездки по Tube/rail нужна фотокарта 5-10 Zip Oyster, заявку подаёт родитель, срок действия до дня перед 11-летием. Цены в источниках расходятся (£10 в старом листовке Newham, £11,50 в другом) [С] — https://www.TfL.gov.uk/fares/free-and-discounted-travel/5-10-zip-oyster-photocard ; https://newham.gov.uk/downloads/file/4883/ukraine-leaflet-travel-children-
2. *Нет бесплатных мест, где занять ребёнка: сокращение детско-молодёжных услуг.* Отчёты Sian Berry (London Assembly, 2021): из ~300 youth centres закрыто более 130, потеряно >600 штатных youth workers, финансирование -44% за десятилетие [С, 2021] — https://www.london.gov.uk/who-we-are/what-london-assembly-does/assembly-members/publications-sian-berry/publication-sian-berry-londons-youth-service-cuts-2011-2021-blighted-generation ; в выдаче есть и фраза про 81 закрытый центр 2010-2024 по данным City Hall (дата статьи не показана) [Н] — https://www.cypnow.co.uk/news/article/london-youth-services-funding-cut-by-240m-since-2011-riots-sian-berry-warns
3. *Бедность семей.* 680 000 детей <16 в бедности после housing costs (37%) в 2024/25; Tower Hamlets 47%, Richmond 15% [В] — https://trustforlondon.org.uk/news/poverty-in-london-2025/ ; Centre for London: >700 000 детей, около 300 000 из них в частном аренде — https://centreforlondon.org/blog/tackling-child-poverty-london/

**Что уже есть бесплатно**: TfL Zip Oyster; бесплатный проезд на автобусах для 5-10; Mayor's Holiday Hope (£6 млн на бесплатные летние активности и еду; дата объявления не показана) — https://www.london.gov.uk/mayor-launches-new-ps6m-holiday-hope-programme-young-people-summer-holidays-begin ; Young Londoners Fund (£45 млн, с 2018) — https://www.london.gov.uk/press-releases/mayoral/45million-fund-to-help-young-londoners [В, но 2018]. Карта активностей Мэра существовала в 2018, актуальность неизвестна.
**Чем плохо**: информация разбросана по сайтам Mayor/боро/TfL; нет единого "что бесплатно сегодня рядом и подходит по возрасту"; поиск актуальных детских активностей в выдаче по 2025 не подтверждён.

**Разрыв**: единая живая афиша бесплатных занятий для детей по возрасту/району + проверка "как оформить Zip Oyster и когда он нужен".

**Гипотезы**
- **H1.1 "Free Kids Near Me"**: бесплатные занятия/каникулярные программы/площадки по возрасту, расстоянию, доступности. Польза для группы: 5/5. Ценность для властей: 4/5 (агрегирует Holiday Hope, библиотеки, музеи, боро).
- **H1.2 "School Run Buddy"**: безопасный маршрут в школу пешком/автобусом (освещённость, переходы, дежурные места), напоминания про Zip Oyster. Польза: 4/5; ценность: 4/5 (Vision Zero, активный транспорт; нужны открытые данные TfL).
- **H1.3 мастер-помощник "какие льготы положены семье"** (см. раздел 11). Польза 4/5; ценность 4/5.

---

## 2. Подростки 13-17

**Боли**
1. *Страх насилия и ножей.* MOPAC Youth Survey 2021-22 (опубл. 2023): страх физического и ножевого нападения остаётся главной заботой молодёжи [С, дата данных 2021-22] — https://www.london.gov.uk/sites/default/files/2023-10/MOPAC%20Youth%20Survey%20202122%20FINAL.pdf . Реальность лучше восприятия: Mayor: -26% knife crime with injury (<25) за 12 мес. до июня 2025 против 12 мес. до мая 2016 (но Met предупреждает, что смена записи нарушила сопоставимость 2024/25) [С] — https://london.gov.uk/violent-crime-leading-injury-falling-every-london-borough ; teenage murders at 13-year low [Н, без даты] — https://www.inkl.com/news/teenage-murders-at-13-year-low-in-london-as-met-police-chief-insists-capital-s-streets-are-safer . Kiyan Prince Foundation 2025 (UK-wide): 83% из 1 030 16-24-летних обеспокоены уровнем youth violence — https://www.hellorayo.co.uk/downtown/uk/news/young-people-knife-crime [С].
2. *Закрытые молодёжные клубы*: см. раздел 1, те же цифры. Письмо Zoe Garbett Мэру о youth services от 21 ноября 2025 (содержание в выдаче не показано) — https://www.london.gov.uk/who-we-are/what-london-assembly-does/london-assembly-members/zoe-garbett/publications-zoe-garbett/letter-mayor-about-youth-services-london
3. *Ментальное здоровье и ожидание помощи.* Mind (на конец июля 2025): >500 000 направлений в CYPMHS ждут начала лечения, половина ждёт больше года; ONS через Mind: 27% детей с 3+ часами соцсетей в день имеют симптомы против 12% без соцсетей — https://www.mind.org.uk/news-campaigns/campaigns/children-and-young-peoples-mental-health/care-before-crisis-our-report-on-young-peoples-mental-health/ [С, общеанглийские]. Лондонское исследование "Best for You" (CNWL, 2 002 респондента, 1 500 из Лондона, фев-мар 2026) существует, но результаты не получены — https://www.cwplus.org.uk/wp-content/uploads/2026/06/CW-Best-for-You-Report.pdf [Н].

**Что есть**: бесплатный проезд на автобусах/трамваях с Zip Oyster 11-15 (и 16+ с оговорками, источники расходятся) [С]; Young Londoners Fund; Kooth/Shout/Childline **[знание]**.
**Чем плохо**: контент о безопасности подаётся через сайты взрослых, а не в Snapchat/TikTok-формате; подростки не доверяют полиции (в выдаче нет цифры для 13-17 по Лондону, отмечаю как пробел); "Local Youth Space" и "My Local Youth Offer" в выдаче 2025 не подтверждены.

**Разрыв**: нет мобильного, понятного подростку инструмента "куда пойти сейчас/к кому обратиться, анонимно", с картой безопасных мест (youth hubs, "Safe Havens", магазины-участники) **[знание: существуют локальные схемы Safe Havens/Ask for Angela для взрослых, единого лондонского подросткового слоя в выдаче нет]**.

**Гипотезы**
- **H2.1 "Safe Space Finder для teens"**: карта открытых безопасных мест и youth hubs, кнопка "я не уверен(а) в безопасности". Польза 5/5; ценность 5/5 (violence reduction).
- **H2.2 "Anonymous Report" в формате чата** (Crimestoppers/Fearless-подобный): подросток сообщает о ноже/угрозе без звонка. Польза 4/5; ценность 4/5 (разведданные для VRU, но юридические/приватные риски).
- **H2.3 "First Job London 16+"**: безопасные подработки и стажировки по району. Польза 4/5; ценность 3/5. Подтверждённых данных по подработкам подростков в выдаче нет [Н].

---

## 3. Студенты и 18-24

**Боли**
1. *Разрыв между доходом и расходами.* Save the Student 2025: средние расходы студента в Лондоне £1 269/мес против £1 142 по UK; дефицит ~£500/мес; 59% иногда пропускают еду — https://savethestudent.org/news/average-student-spending-per-month.html [С]. Аренда: Лондон £812/мес против £563 по UK (2025); KCL £876 — https://savethestudent.org/accommodation/universities-students-pay-the-most-rent.html [С]. HEPI/Unipol 2024/25: средняя PBSA в Лондоне £13 595/год, даже при макс. maintenance loan не хватает £247 — https://www.hepi.ac.uk/?p=29520 [В].
2. *Мошенничество с жильём.* Action Fraud/Home Office: ~5 000 сообщений и ~£9 млн потерь за 2024 (опубл. март 2025) — https://lbc.co.uk/tech/bdc318061ddc4001a87f2322575d3e48 [С]; пик в сентябре, 930 студенческих случаев за 4 года (недоучтено) — https://thenegotiator.co.uk/news/rental-scams-5-25m-a-year-says-action-fraud/ [С]; в августе 2025 City of London Police предупредили о фейковых объявлениях на базе настоящих Airbnb — https://www.actionfraud.police.uk/news/students-urged-to-watch-out-for-rental-scams [Н]. Лондон-специфичной разбивки нет.
3. *Безопасность ночью и spiking.* Met: >2 700 сообщений о spiking за декабрь 2024-ноябрь 2025 (~230 в месяц), истинный масштаб больше; 66% жертв в августе 2025 женщины — https://news.met.police.uk/news/mets-festive-crackdown-on-spiking-delivers-major-progress-with-a-125-per-cent-surge-in-charges-and-cutting-edge-tech-trials-504230 [В]; charge rate 3,2% по Met — https://www.londonworld.com/news/crime/drink-spiking-met-police-charge-just-32-of-offences-as-clubbers-avoid-nye-nights-out-3505628 [С]. 

**Что есть**: 16-25 Railcard, 18+ Student Oyster 30% скидка **[знание, не проверено поиском]**; Action Fraud/Report Fraud; Ask for Angela **[знание]**; Mayor's Women's Night Safety Charter [В] (см. раздел 10).
**Чем плохо**: проверка объявлений на жильё ложится на самого студента; нет проверки "реальный ли этот лэндлорд/агент"; нет единого лондонского бесплатного хаба "деньги студента".

**Разрыв**: проверка объявления об аренде (по адресу/агенту/цене), "карта безопасного возвращения" ночью, поиск бесплатных/дешёвых вещей для студента.

**Гипотезы**
- **H3.1 "Rental Check London"**: вставляешь ссылку/адрес/имя агента; приложение проверяет по открытым реестрам (Land Registry, Rent Smart-аналоги, Companies House, база мошеннических объявлений) и сигнализирует красные флаги + чек-лист. Польза 5/5; ценность 4/5 (Trading Standards, GLA Renters' Hub). Ограничение: нет надёжного списка лицензий агентов; риск ложных срабатываний.
- **H3.2 "Safe Night Home"**: маршрут домой с учётом освещённости/открытых мест/ночных автобусов, делиться поездкой с друзьями. Польза 5/5; ценность 4/5. Существующие приватные приложения (например, WalkSafe) в выдаче не подтверждены **[знание]**.
- **H3.3 "Student Lifeline"**: бесплатные еда, скидки, hardship funds по вузу и району. Польза 4/5; ценность 3/5.

---

## 4. Молодые специалисты 25-34

**Боли**
1. *Аренда.* ONS 2024: средняя аренда в Лондоне £1 957/мес = 41,6% дохода арендаторов (наименее доступный регион); 38,5-57% с 2016 — https://www.ons.gov.uk/peoplepopulationandcommunity/housing/bulletins/privaterentalaffordabilityengland/2024 [В]. 12 мес. до августа 2026: средняя £2 332, +3,5% к августу 2025 (Big Issue, дата выдачи не проверена) — https://www.bigissue.com/news/housing/rents-in-the-uk-are-rising-at-the-highest-rate-for-14-years-will-they-keep-going-up [С].
2. *Кражи телефонов.* Met: 71 867 краж/ограблений телефонов за 2025 против 81 439 за 2024 (-12%) — https://www.london.gov.uk/met-seizes-hundreds-stolen-phones-thefts-hit-four-year-low [С, источники расходятся на единицы]; Jan-May 2026 -20,6% [С]; в октябре 2025 разгромлена сеть, вывозившая ~40 000 телефонов в Китай (40% всех украденных) — https://www.goodmorningamerica.com/amp/news/story/uk-police-dismantle-phone-theft-network-accused-smuggling-126285417 [С].
3. *Одиночество.* Community Life Survey 2024/25 (England): 8% в 25-34 часто/всегда одиноки против 7% в среднем; косвенно 11% против 9% — https://gov.uk/government/statistics/community-life-survey-202425-annual-publication/community-life-survey-202425-loneliness-and-support-networks [В, но не Лондон]. Лондонская цифра 25-34 не найдена. Belonging Forum: "Londoners are lonelier than rest of country" (методология не видна) [Н] — https://belongingforum.org/londoners-are-lonelier-than-rest-of-country-survey-finds/

**Что есть**: Met "Report it" онлайн; TfL Santander Cycles; Meetup/Bumble BFF (коммерческие) **[знание]**. Mayor's Renters' Hub, London Rents Map — https://www.london.gov.uk/programmes-strategies/housing-and-land/improving-private-rented-sector/london-rents-map [В].
**Чем плохо**: нет бесплатного, некоммерческого, "безопасного" способа знакомиться/находить местное сообщество; телефонные кражи снижаются, но защитные действия (Find My, IMEI-блок) не объединены.

**Разрыв**: "что делать за 10 минут после кражи телефона" (блокировка, банк, IMEI, отчёт); бесплатные локальные события и клубы по интересам для одиноких.

**Гипотезы**
- **H4.1 "Phone Stolen? 10 Minutes"**: пошаговый чек-лист + прямые кнопки (блок SIM, банк, Find My, отчёт в Met/BTP). Польза 4/5; ценность 4/5 (качество улик, snatch-hotspots). 
- **H4.2 "Free Meetups Near Me"** (бесплатные сообщества: bookclubs, run clubs, библиотеки, парки). Польза 3/5; ценность 3/5 (loneliness strategy GLA).
- **H4.3 "Commute Planner"** с шумом/толпой/сиденьями. Польза 3/5; ценность 3/5. Подтверждения данных по нему в выдаче нет [Н].

---

## 5. Семьи с малышами

**Боли**
1. *Step-free и коляска.* Tube: 94 из 272 станций step-free (Colindale, декабрь 2025); цель 50% к 2030 [С] — https://tfl-newsroom.prgloo.com/news/tfl-rolls-out-new-fault-reporting-technology-in-tube-station-lifts-to-improve-journey-planning-for-people-with-access-needs ; другая трактовка: полностью "street to train" только 60 из 272 (22%) [С] — https://archive.londonreconnections.com/?p=40161 . Подтверждённых данных о жалобах родителей на автобусы/коляски за 2025 в выдаче нет [Н].
2. *Туалеты и пеленание.* TfL опубликовал в апреле 2025 Toilet Tube Map, включая baby changing — https://tfl-newsroom.prgloo.com/news/transport-for-london-announces-bold-plans-to-grow-and-improve-toilet-provision [В]; Age UK: рост закрытий публичных туалетов (см. раздел 6) — те же проблемы касаются родителей [С, вывод аналитика].
3. *Цена детского сада.* Coram 2025: Лондон на 29% дороже Англии; Inner London на 8% дороже Outer; Inner London <2 лет с учётом funded hours £274/нед. — https://data.london.gov.uk/economic-fairness/living-standards/childcare-costs ; Coram Childcare Survey 2025 — https://www.coramfamilyandchildcare.org.uk/research/childcare-survey-2025/ [С]. По Англии 2025: part-time <2 лет £70,51/нед., -56% к 2024 (из-за расширения funded hours) [В].

**Что есть**: TfL Step-free Tube Guide, Journey Planner "step-free" фильтр; Toilet Tube Map; Government Childcare Choices калькулятор **[знание]**.
**Чем плохо**: информация о лифтах неполная (до декабря 2025 не было автоматических fault-reporting, внедряется поэтапно); нет единой "family-friendly" маршрутизации (широкие двери автобуса, пеленальные, лифты в реальном времени) для мобильного.

**Разрыв**: маршрут "с коляской" в реальном времени (лифт работает? уклон/зазор? туалет с пеленальным?).

**Гипотезы**
- **H5.1 "Pram Route London"**: step-free + live lift status + пеленальные + кафе с кормлением. Польза 5/5; ценность 4/5 (открытые данные TfL, прямая польза для accessibility target).
- **H5.2 "Childcare Checker"**: сколько funded hours положено и как оформить (15/30 часов) + ближайшие места. Польза 4/5; ценность 4/5.

---

## 6. Пожилые 65+

**Боли**
1. *Цифровое исключение.* Age UK London "On the Edge" (июнь 2025, 300 респондентов): стоимость интернета повышает риск финансовой изоляции; длинные формы, digital-only заявки, нет понятных критериев — https://www.ageuk.org.uk/bp-assets/globalassets/london/campaigns/poverty-2025/on-the-edge-report---age-uk-london---june25.pdf [В]. Старая цифра: >200 000 лондонцев старше 75 не пользуются интернетом (2021) [С, 2021] — https://www.ageuk.org.uk/bp-assets/globalassets/london/campaigns/mind-the-digital-gap/ageuk_adii_final.pdf
2. *Туалеты, скамейки, возможность выходить.* Age UK London "Lifting the lid" (январь 2025): из 25 боро с данными 17 закрыли больше туалетов, чем открыли, 3 открыли больше, 5 без изменений; почти 100 закрытых за 10 лет — https://www.ageuk.org.uk/london/about-us/news/articles/2025/lifting-the-lid ; https://fitzrovianews.com/2025/01/20/nearly-100-public-toilets-closed-in-london-over-ten-years-says-age-uk/ [С, выборка FOI]. Данных про скамейки в выдаче нет [пробел].
3. *Деньги и мошенничество.* Нетребованный Pension Credit в Лондоне ~£246,5 млн/год; ~145 000 домохозяйств (оценки Mayor/Policy in Practice, 2023-24); кампания Mayor привела к >£17 млн полученных (октябрь 2024) — https://www.london.gov.uk/mayor-extends-successful-campaign-has-unlocked-over-ps17million-unclaimed-pension-credit-older ; https://policyinpractice.co.uk/blog/how-to-give-8500-londoners-up-to-3700-of-unclaimed-pension-credit/ [С, 2023-24, нет данных за 2025]. Courier fraud >£21 млн в 2025, в основном 70+, Лондон/Home Counties сильнее всего — https://www.cityoflondon.police.uk/news/city-of-london/news/2026/june/over-70s-targeted-as-courier-fraud-exceeds-21-million-in-2025-with-london-and-home-counties-hit-hardest/ [С]; 70+ >£51 млн из £93,8 млн abuse of position 2025/26 [С].
*Дополнительно*: давление на Freedom Pass/60+ Oyster (письмо 30 организаций, >10 000 подписей; London Councils пообещали продолжать финансирование) — https://www.london.gov.uk/motions/older-persons-freedom-pass ; https://www.ageuk.org.uk/cityoflondon/about-us/news/articles/2026/help-age-uk-london-to-protect-the-freedom-pass-and-60-oyster [С]. Падения: ~40% вызовов скорой для 65+ связаны с падениями (King's Fund, цитата в выдаче, без года) [Н]; LAS/RVS pilot -42% падений (2017-18) [С, старые].

**Что есть**: Freedom Pass; Age UK London Advice; Age-Friendly London plan — https://www.london.gov.uk/programmes-strategies/communities-and-social-justice/older-people/mayors-action-plan-age-friendly-london/towards-age-friendly-london-progress-report-2025 [В]; TfL Toilet Tube Map; London Loo Alliance.
**Чем плохо**: всё через сайт/форму; нет простого "пошаговый помощник голосом"; нет карты туалетов/скамеек/тёплых мест вне сети TfL.

**Разрыв**: простой, крупный, голосовой/телефонный интерфейс для "что мне положено, где туалет/скамейка рядом, это мошенничество?".

**Гипотезы**
- **H6.1 "Loo & Bench Finder"** (карта туалетов, скамеек, тёплых/прохладных мест с отзывами и открытыми часами). Польза 5/5; ценность 4/5 (Age-Friendly London; частично Toilet Tube Map). 
- **H6.2 "Is This a Scam?"**: вставь SMS/WhatsApp/скриншот, получи вердикт + кнопка "сообщить" + номер 159 **[знание]**. Польза 5/5; ценность 4/5 (City of London Police, Trading Standards).
- **H6.3 "Pension Credit & Benefits in 5 Questions"** (простая проверка прав + помощь заполнить). Польза 5/5; ценность 5/5 (£246,5 млн недополучено).

---

## 7. Люди с инвалидностью

**Боли**
1. *Недоступность сети и доверие к сервису.* London Assembly Transport Committee: нехватка step-free и слабое понимание поездок инвалидов; TfL "lacks depth and nuance" в вовлечении (публикация, дата в выдаче не показана) — https://www.london.gov.uk/who-we-are/what-london-assembly-does/london-assembly-publications/accessibility-transport-network-london ; https://www.hackneycitizen.co.uk/?p=266798 [С]. Transport for All: 45% ожидают ухудшения доступности в ближайшие 10 лет против 32% улучшения (исследование конец 2023) — https://www.londontravelwatch.org.uk/news/accessibility-and-transport-what-needs-to-change/ [С, 2023]. London Assembly: step-free 42% станций в Лондоне против 54% по стране [Н] (смешение определений).
2. *Слепые и слабовидящие.* RNIB "All aboard?" (май 2025, UK): менее половины могут совершать нужные поездки на автобусе; опрос февраль 2025 (1 197 респондентов); на вокзалах лишь 44% надёжно встречает помощь сотрудников — https://www.aop.org.uk/ot/news/2025/05/21/inaccessible-bus-travel-leaving-blind-and-partially-sighted-people-trapped-at-home-says-rnib ; https://www.aop.org.uk/ot/news/2026/01/22/three-quarters-of-people-with-sight-loss-cannot-rely-on-rail-staff-for-help-rnib-report-finds [С, UK-wide]. RNIB: половина слепых боится быть брошенными на станции [Н] — https://www.rnib.org.uk/news/half-of-blind-and-partially-sighted-people-fear-being-left-stranded-at-train-stations/ . Лондонская цифра 2025 не найдена; старая оценка: ~175 000 лондонцев с потерей зрения и >80 000 с тяжёлой потерей слуха (2016) [Н/старое].
3. *Нейроотличные и сенсорная перегрузка.* Mental Health Foundation: самая частая жалоба — шум метро/автобусов — https://www.mentalhealth.org.uk/our-work/research/transport-and-public-mental-health [С, 2023]; Autistica 2025 (май): барьеры — неопределённость, непоследовательность, перегруженная сенсорная среда — https://www.motabilityfoundation.org.uk/media/t5yowvej/autistica-transport-report-2025-final.pdf [С, не проверено лондонское содержание]; Opinium: 54% не знают о Sunflower lanyard [С, дата не указана].

**Что есть**: TfL Step-free Tube Guide; новые fault-reporting для лифтов (декабрь 2025) [В]; Sunflower lanyard / TfL "Please offer me a seat" badge **[знание]**; Wayfindr (пилот) [Н].
**Чем плохо**: лифтовые данные пока только внедряются; нет картографии "тихо/шумно/людно" и "сенсорного уровня маршрута"; нет единого слоя для слепых/глухих (аудио-визуальные объявления в автобусе не подтверждены в выдаче как проблема 2025).

**Разрыв**: слой "сенсорной и физической доступности" поверх маршрутизатора: live lifts, пик толпы, тихие ветки/комнаты, места, где реально есть помощь.

**Гипотезы**
- **H7.1 "Access Map London"**: live-статус лифтов + подтверждённые пользователями замеры (зазор, ступени, шум, туалет Changing Places). Польза 5/5; ценность 5/5.
- **H7.2 "Calm Route"**: маршруты с минимальным шумом/толпой, прогноз загрузки, "тихие места" рядом. Польза 4/5; ценность 4/5 (нейроотличные, сенсорные). 
- **H7.3 "Hidden Disability Pass"**: цифровой эквивалент lanyard, который виден персоналу (QR/экран), без обязательного раскрытия диагноза. Польза 4/5; ценность 4/5.

---

## 8. Новоприбывшие, мигранты, беженцы

**Боли**
1. *Регистрация у GP.* Mayor commissioned scoping report on failed GP registration (системные барьеры) — https://www.london.gov.uk/programmes-strategies/communities-and-social-justice/migrants-and-refugees/barriers-gp-registration [В]. Healthwatch Waltham Forest / Doctors of the World (февраль 2025): 53% GP требовали фото-ID — https://nds.healthwatch.co.uk/sites/default/files/reports_library/20250218_Waltham_Forest_Safe%20surgeries%20-%20GP%20registration%20for%20vulnerable%20groups.pdf [С, одно боро]. Prospect (ноябрь 2025): отказы без ID/адреса — https://www.prospectmagazine.co.uk/politics/policy/immigration/71625/migrants-nhs-hostile-environment [С].
2. *Язык/ESOL/сложность системы.* Birmingham (2022): главные барьеры — непонимание системы и прав, бюрократия, язык [С, 2022] — https://www.birmingham.ac.uk/news-archive/2022/vulnerable-migrants-unable-to-access-healthcare-face-wellbeing-threat . Данные по очередям ESOL в Лондоне: **не найдены**. NI number: **не найдено**.
3. *Мошенничество и права.* Оценка ~397 000 нелегальных мигрантов в Лондоне (из 674 000 по UK) в одной статье PMC [Н, дата и метод не видны] — https://rcastoragev2.blob.core.windows.net/fd1f7079b4b5180cbe1da19ea355bd0b/PMC8813121.pdf . Прямых цифр мошенничества против мигрантов в Лондоне в выдаче нет.

**Что есть**: Mayor's Migrant Londoners Hub — https://www.london.gov.uk/programmes-strategies/communities-and-social-justice/migrant-londoners-hub/health-and-wellbeing/access-healthcare ; Doctors of the World "Safe Surgeries" ; Citizens Advice **[знание]**; NHS App/GP registration online.
**Чем плохо**: страницы на английском и сложные; пользователь не знает, "что можно требовать, а что нельзя" (ID не обязателен по закону); нет единого "первых 30 дней в Лондоне".

**Разрыв**: мультиязычный простой чек-лист и шаблон письма для GP ("ID и адрес не обязательны для регистрации", с ссылкой на правила NHS England **[знание]**).

**Гипотезы**
- **H8.1 "First 30 Days London"**: пошагово GP, NI number, банк, школа, ESOL, права, скам-красные флаги; 10+ языков, офлайн. Польза 5/5; ценность 4/5.
- **H8.2 "GP Registration Helper"**: карта Safe Surgeries + шаблон отказа/жалобы + "ID не требуется". Польза 5/5; ценность 4/5 (NHS, health inequalities). Нужны данные о фактических практиках.
- **H8.3 "ESOL Finder"**: бесплатные курсы английского, расписание, свободные места. Польза 4/5; ценность 4/5. Пробел: данных об очередях нет [Н].

---

## 9. Ночные и сменные работники

**Боли**
1. *Небезопасная дорога домой.* UCL "Data After Dark" (декабрь 2025): ночные работники (18:00-06:00) ~ четверть из 5,3 млн рабочей силы Лондона; 20% опрошенных чувствуют небезопасно добираться после наступления темноты; сообщают о преследовании, кражах и дискриминации — https://www.ucl.ac.uk/social-historical-sciences/news/2025/dec/night-workers-face-inequalities-pay-health-safety-and-dignity [В].
2. *Транспортная зависимость от ночных автобусов.* TfL via RGS: 51% ночных автобусных поездок это поездки на/с работы; 57% пользователей из домохозяйств <£20 000 в год [С, год не указан] — https://www.rgs.org/about-us/press-and-media/recent-press-releases/london-s-night-time-workers-struggling-to-access-transport-despite-new-night-tube/ . Опрос London Assembly: чувствуют себя в безопасности 62% (автобус), 72% (Tube) ночью, дата не ясна [Н] — https://www.mayorwatch.co.uk/city-hall-poll-reveals-londoners-feel-less-safe-when-travelling-at-night
3. *Низкая оплата и нестабильность.* Citizens UK/Trust for London "London after dark": ночные работники чаще имеют низкую оплату и нестабильные часы — https://trustforlondon.org.uk/research/london-after-dark-the-reality-of-working-at-night-in-the-capital/ [С]. Еда ночью: в выдаче данных нет [пробел].

**Что есть**: Night Tube, ночные автобусы, Night Czar; TfL Journey Planner **[знание]**.
**Чем плохо**: нет инструмента "последний автобус/ночной маршрут + безопасные места по пути + открытая еда".

**Гипотезы**
- **H9.1 "Night Shift Companion"**: ночной маршрут, live статус, открытые заведения 24/7 по пути (еда, аптека, туалет), "поделиться поездкой". Польза 5/5; ценность 4/5.
- **H9.2 "Safe Stop"**: карта "безопасных остановок" (магазины, станции с персоналом, hubs), SOS в один жест. Польза 4/5; ценность 4/5.

---

## 10. Женщины и девушки

**Боли**
1. *Небезопасность ночью.* GLA/MOPAC: в Q3 2025/26 68% лондонцев чувствуют себя в безопасности, гуляя одни после темноты, среди женщин 58% — https://apps.london.gov.uk/state-of-london/report/crime [В]; MOPAC PAS VAWG Q1 25-26 — https://data.london.gov.uk/download/236kk/zj9/MOPAC%20Public%20Attitude%20Survey%20VAWG%20and%20Female%20Safety%20Q1%2025-26.pdf [В]. London TravelWatch/Yonder (июль 2025, 1 003 респондента): двое из пяти небезопасно ходить одним ночью, женщины стресс выше — https://www.londontravelwatch.org.uk/wp-content/uploads/2025/10/Making-space-research-slides-1.pdf [В].
2. *VAWG на транспорте и низкий результат.* London Assembly: 4 593 VAWG-преступлений на сети TfL в 2025, ~3% закончились обвинением — https://www.london.gov.uk/who-we-are/what-london-assembly-does/london-assembly-publications/hate-crime-and-violence-against-women-and-girls-londons-public-transport [С]. BTP (UK): сексуальные преступления против женщин на железных дорогах 2 246 -> 2 475 (+10%, годовой отчёт 2024); от девушек-подростков 663 -> 886 (2022-23) — https://www.swlondoner.co.uk/?p=163388 [С].
3. *Недоотчётность и недоверие.* Опрос мусульманских женщин (1 155; Muslim Census/Muslims in Rail): 45,3% небезопасно в поездках против 8% женщин по стране; оценка ~12,5% происшествий сообщается; 69% сообщивших не уверены, что их примут всерьёз [С, не репрезентативно] — https://hyphenonline.com/2025/11/25/women-only-tube-carriages-london-underground-muslim-harassment/ . ITV (июнь 2025): 10% женщин доверяют Met [Н].

**Что есть**: BTP text 61016 (все службы кроме автобусов; автобусы -> Met 101; возможна небольшая плата) — https://tfl.gov.uk/travel-information/safety/report-it-to-stop-it [В]; Guardian Railway app; Women's Night Safety Charter; Ask for Angela **[знание]**.
**Чем плохо**: каналы разные по режимам, SMS не подходит для всех (язык, неуверенность, плата); обратная связь о результате слабая; TfL ещё рассматривает ежегодный публичный опрос по VAWG (рекомендация Police and Crime Committee) [С].

**Гипотезы**
- **H10.1 "One Report" для транспорта**: единая кнопка для Tube, rail и автобуса, автоматически направляет в BTP/Met, вкл. геолокацию, остановку, номер маршрута, статус дела; мультиязычно, без платы. Польза 5/5; ценность 5/5 (VAWG strategy; данные для hot-spots).
- **H10.2 "Walk With Me Home"**: поделиться маршрутом, таймер безопасности, приоритет освещённых улиц. Польза 5/5; ценность 4/5.
- **H10.3 "Safer Journey Map"** на основе открытых данных (инциденты, освещённость, персонал станции). Польза 4/5; ценность 5/5. Риск стигматизации районов.

---

## 11. Малообеспеченные семьи

**Боли**
1. *Бедность после housing costs.* 37% детей <16 (Trust for London 2024/25); Tower Hamlets 47%; 20% before housing costs против 38% after (Childhood Trust, цифры разных вариантов) — https://childhoodtrust.org.uk/update/new-ways-to-measure-poverty-dont-mask-the-reality-london-is-trapping-at-least-a-third-of-children-in-poverty/ [С].
2. *Недополученные льготы.* Pension Credit £246,5 млн (см. раздел 6). Данных по Universal Credit/Child Benefit/Healthy Start take-up в Лондоне в выдаче нет [пробел]; GLA ведёт "Benefit uptake campaigns" — https://www.london.gov.uk/programmes-strategies/communities-and-social-justice/financial-hardship/benefit-uptake-campaigns [В].
3. *Фудбанки и холод.* Данных Trussell по Лондону за 2025 в выдаче нет [пробел]. London Councils (2022): 45% не включали отопление, когда обычно включили бы; 39% реже общаются — https://beta.londoncouncils.gov.uk/news/2022/boroughs-step-cost-living-worries-reach-new-heights [С, 2022]. Четверть лондонцев с трудом платит за базовые счета (London Councils, дата не видна) [Н] — https://inkl.com/news/quarter-of-londoners-struggling-to-pay-basic-bills

**Что есть**: Mayor's Cost of Living Hub (Warmer Spaces directory) [В]; GLA Pension Credit/benefit uptake campaigns; Entitledto/Turn2us **[знание]**.
**Чем плохо**: поиск "что мне положено" требует 10+ вопросов на нескольких сайтах; нет локального "что бесплатно вокруг сегодня" (еда, одежда, тепло) в одном месте.

**Гипотезы**
- **H11.1 "Benefit Finder London"**: 5 вопросов -> список положенного (Pension Credit, UC, Healthy Start, Free School Meals, council tax support, Warm Home Discount) + локальная помощь. Польза 5/5; ценность 5/5 (прямая экономия, доходы боро).
- **H11.2 "Free Help Today"**: фудбанки, community fridges, одежда, warm/cool spaces с часами работы и "нужна ли направление". Польза 5/5; ценность 4/5.
- **H11.3 "Bill Shock Alert"**: напоминания о праве на льготы, тарифах, school uniform grants. Польза 3/5; ценность 3/5.

---

## 12. ЛГБТК+ и религиозные сообщества

**Боли**
1. *Недоверие к полиции и недоотчётность (ЛГБТК+).* MOPAC: доверие Met 60% у LGBT+ против 75% у не-LGBT+ (сентябрь 2025); LGBT+ жертвы менее довольны сервисом с июня 2020 — https://data.london.gov.uk/download/236kk/zcc/Q3_2526_Public%20Voice%20results%20pack_FINAL.pdf [В]. Октябрь 2025: Met прекращает расследовать non-crime hate incidents, Galop критикует — https://galop.org.uk/news/met-police-to-stop-investigating-non-crime-hate-incidents [В]. LGBTQ+ в Лондоне: 1 из 5 пережил hate crime в транспорте за год (опрос London TravelWatch >600, дата не указана) — https://londontravelwatch.org.uk/campaigns/personal-security/out-in-london [С].
2. *Рост ненависти по религиозным признакам.* Met, май 2026: 255 антисемитских hate crime против 148 в апреле (+72%), исламофобных 179 против 135 (+33%) — https://www.jewishnews.co.uk/met-police-confirm-72-increase-in-antisemitic-hate-crimes-in-may/ [С]. Home Office, год до марта 2025: 45% религиозных hate crimes против мусульман (исключая Met из-за смены записи) — https://www.newarab.com/news/muslims-make-45-hate-crime-victims-england-and-wales [С]; Tell Mama (первое полугодие 2026) уже превысило весь 2023 — https://www.arabnews.pk/world/islamophobic-incidents-in-london-surged-in-first-half-of-2026-2655191 [Н, общественная статистика]. TfL: 1 667 hate crime offences июль-декабрь 2025 (+9,8%) [С].
3. *Места для молитвы/безопасные пространства*: в выдаче данных нет [пробел]; гипотезы только качественные.

**Что есть**: True Vision; Galop helpline; Community Security Trust; Tell Mama **[знание]**.
**Чем плохо**: разрозненные каналы по группам; недоверие к полиции мешает отчётности; отчёты не показывают пользователю статус дела.

**Гипотезы**
- **H12.1 "Report Hate, Choose Your Channel"**: единая форма, отправляющая в выбранную организацию (Galop, CST, Tell Mama, Met), с анонимным режимом. Польза 4/5; ценность 4/5. Риск: юридические/приватные вопросы.
- **H12.2 "Safe & Welcoming Places"** (подтверждённые сообществом безопасные места, места для молитвы, тихие комнаты). Польза 4/5; ценность 3/5. Данные собирать с нуля.

---

## 13. Матрица "сегмент x тема"

Обозначения: ●●● боль сильнейшая; ●● значимая; ● слабая/косвенная; — данных нет или не относится. Оценка аналитика на основе найденных данных (не измеряет интенсивность количественно).

| Сегмент | Транспорт | Безопасность | Бесплатное/досуг | Здоровье | Деньги | Жильё | Инфо/права |
|---|---|---|---|---|---|---|---|
| 1 Дети 6-12 и родители | ●● | ●● | ●●● | ● | ●●● | ● | ●● |
| 2 Подростки 13-17 | ●● | ●●● | ●●● | ●●● | ●● | — | ●● |
| 3 Студенты 18-24 | ●● | ●●● | ●● | ●● | ●●● | ●●● | ●● |
| 4 Молодые спец. 25-34 | ●● | ●● | ●● | ●● | ●● | ●●● | ● |
| 5 Семьи с малышами | ●●● | ● | ●● | ● | ●●● | ● | ●● |
| 6 Пожилые 65+ | ●●● | ●● | ●● | ●●● | ●●● | ● | ●●● |
| 7 Инвалидность | ●●● | ●● | ● | ●●● | ●● | ●● | ●●● |
| 8 Мигранты/беженцы | ●● | ●● | ● | ●●● | ●●● | ●● | ●●● |
| 9 Ночные работники | ●●● | ●●● | ● | ●● | ●●● | ● | ● |
| 10 Женщины и девушки | ●●● | ●●● | ● | ● | ● | ● | ●● |
| 11 Малообеспеченные | ●● | ● | ●●● | ●● | ●●● | ●●● | ●●● |
| 12 ЛГБТК+ и религ. | ●● | ●●● | ● | ● | — | — | ●●● |

Самая "горячая" точка пересечения: безопасность x женщины/подростки/ночные/ЛГБТК+; деньги/жильё x студенты/спец./малообеспеченные; транспорт x инвалидность/семьи/пожилые.

---

## 14. Пять решений, полезных сразу многим сегментам

1. **"One Report": единая кнопка сообщить о преступлении/харассменте/ненависти** (транспорт, улица, онлайн-мошенничество). Сегменты: 2, 3, 6, 8, 9, 10, 12 (и все остальные). Сводит BTP 61016, Met, 159, Galop/CST/Tell Mama, показывает статус. Ценность для властей: данные для hot-spots, рост отчётности.
2. **"Access & Calm Map": доступность, сенсорная нагрузка, туалеты, скамейки, тёплые места, лифты в реальном времени**. Сегменты: 1, 5, 6, 7, 11 (и 4 для комфорта). Опирается на открытые данные TfL (fault-reporting лифтов, Toilet Tube Map).
3. **"Benefit & Help Finder": 5 вопросов -> положенные льготы + бесплатная еда/тепло/одежда рядом**. Сегменты: 1, 3, 6, 8, 11, 5. Закрывает £246,5 млн нетребованного Pension Credit и др.
4. **"Safe Route Home" (ночной компаньон)**: маршрут с учётом освещённости/ночных автобусов/открытых мест, поделиться поездкой, SOS. Сегменты: 2, 3, 9, 10, 12, 4, 6.
5. **"Scam & Rental Check": проверка сообщения/объявления/агента перед платежом**. Сегменты: 3, 4, 6, 8. Эффект: снижение потерь (£9 млн rental fraud 2024; £21 млн courier fraud 2025), поддержка Trading Standards.

*Общие требования ко всем пяти:* бесплатно, без регистрации по умолчанию, 10+ языков, крупный шрифт и голос, офлайн-режим, соответствие WCAG, опора на открытые данные TfL/GLA/MOPAC.

---

## 15. Пробелы в данных (честно)

Не найдено в выдаче: Лондон-специфичное хроническое одиночество 25-34; очереди ESOL; данные по NI number; Trussell по Лондону 2025; статистика скамеек; свежие данные падений 65+ (только 2003-2018); данные TfL по жалобам на лифты/автобусы с колясками; результаты опроса "Best for You"; опросы подростков 13-17 по Лондону 2025; данные по местам для молитвы. Эти пункты нужны для следующей итерации (запросы в TfL, GLA Datastore, MOPAC, Age UK London, Trust for London).
