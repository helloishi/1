# Аналитик №3: опросы, общественное мнение и официальная статистика (Лондон)

Дата подготовки: 2026-11-18. Метод: только результаты веб-поиска (WebFetch/curl недоступны; лимит поисковых запросов исчерпан на ~24-м запросе, поэтому часть источников — только по сниппетам и не открыта целиком).

**Правила чтения.** Каждая цифра привязана к году и URL из результатов поиска. Уверенность: **В** = цифра прямо в сниппете первичного/официального источника; **С** = через вторичный источник/пересказ; **Н** = противоречия, неясный год или метод. Цифры старше 2024 — только как контекст, помечены.

**Важное ограничение.** Не удалось получить сами таблицы: GLA/YouGov monthly polls, Crime on Transport (nov 2025), AI for Londoners (nov 2025), London Priorities Tracking (jun 2026), A Day Out in London (jan 2026), MOPAC Public Voice Q1 26-27, Travel in London 2025 (раздел customer satisfaction). Ссылки на них даны для команды хакатона — их стоит открыть вручную (см. раздел 5).

---

## 1. Таблица ключевых цифр

| # | Показатель | Год | Источник | URL | Что значит для продукта | Увер. |
|---|---|---|---|---|---|---|
| 1 | 43% лондонцев считают, что полиция хорошо работает локально — самый низкий квартальный результат за всю историю | 2024-25 Q2 | MOPAC Public Voice | https://data.london.gov.uk/download/mopac-surveys/37c1ba93-4ff5-4f1f-8b92-7a6b94734ffb/Q2_2425_Public | Дефицит доверия: ценны сервисы, дающие прозрачность и самостоятельные инструменты (отчёты о проблемах, карты безопасности) | В (через пересказ поиска) |
| 2 | 47% — «good job» к Q4 2024-25 (на 2 п.п. ниже, чем годом ранее) | 2024-25 Q4 | MOPAC Public Voice | https://data.london.gov.uk/download/236kk/ab5a4357-1f92-454b-9a08-7cb488f33497/Q4_2425_Public%20Voice%20results%20pack_FINAL.pdf | Доверие не восстановилось | В |
| 3 | 48% (MPS/CoLP) vs 45% (MOPAC PAS) согласны, что полиция хорошо работает локально; 70% «могут доверять местной полиции» (скользящие 12 мес.) | Q1 2026-27 | MOPAC Public Voice headlines | https://data.london.gov.uk/download/236kk/jql/Public%20Voice%20quarterly%20headlines%20Q1%2026-27.docx | Две методики дают разные цифры — продукту нельзя опираться на одну метрику | С |
| 4 | 44% лондонцев беспокоятся о преступности, 43% — об anti-social behaviour | окт. 2025 | State of London (GLA) | https://apps.london.gov.uk/state-of-london/report/crime | Почти каждый второй тревожен — спрос на «ощущение безопасности», а не только на статистику | С |
| 5 | Меньше всего безопасно в town centres, pubs/clubs, parks и на общественном транспорте; больше всего — дома, на работе, онлайн | 2024-25 | MOPAC PAS (пересказ) | https://data.london.gov.uk/download/236kk/eqr/MOPAC%20Public%20Attitude%20Survey%20Victimisation%20in%20London%202024-25.pdf | Главные «точки тревоги» — транспорт и ночные места | С |
| 6 | 5,2% участников PAS пережили преступление в предыдущем квартале | 2024-25 | MOPAC PAS Victimisation | https://data.london.gov.uk/download/236kk/eqr/MOPAC%20Public%20Attitude%20Survey%20Victimisation%20in%20London%202024-25.pdf | Реальный риск ниже воспринимаемого (см. раздел 4) | С |
| 7 | Женщины: 65% чувствуют себя безопасно днём против 87% мужчин | 2023-24 Q2 (контекст) | MOPAC Public Voice | https://data.london.gov.uk/download/236kk/1473ddb8-0655-48d8-8256-d72a02c350bd/Q2_2324_Public%20Voice%20results%20pack_FINAL.pdf | Гендерный разрыв в безопасности — устойчивая тема; нужны свежие цифры | С/Н |
| 8 | 57% женщин не чувствуют себя безопасно на улицах Лондона; 47% подвергались преследованию; 68% у 18–24 (Survation/ITV; атрибуция и год неясны) | н/д | Police Professional / London the Inside | https://policeprofessional.com/news/more-than-half-of-women-do-not-feel-safe-on-london-streets-survey-reveals/ | Сильный сигнал, но надо проверить год и методику | Н |
| 9 | «Почти 4 из 10» чувствовали тревогу в транспорте Лондона; ~10% пассажиров TfL были отпугнуты инцидентом | н/д (по TfL; год не подтверждён) | Yahoo/Standard пересказ данных TfL | https://ca.news.yahoo.com/four-10-fear-travelling-londons-071839672.html | Прямая боль: безопасность в метро/автобусах | Н |
| 10 | До 38% женщин vs 21% мужчин беспокоятся о харассменте/hate crime в транспорте | н/д | сниппет поиска (первоисточник не определён) | https://www.london.gov.uk/sites/default/files/2026-03/1813%20-%20PCC%20-%20Hate%20Crime%20and%20VAWG%20on%20Public%20Transport.pdf | Гендерный разрыв ×1,8 — сервисы для женщин (поездка домой, «друг на связи») | Н |
| 11 | 31% лондонцев отпугивает от транспорта ASB (старый пресс-релиз GLA, год не указан) | н/д | GLA | https://www.london.gov.uk/sites/default/files/crime_on_public_transport.pdf | Контекст; нужна свежая версия (Crime on Transport nov 2025) | Н |
| 12 | 67% лондонцев согласны «TfL cares about its customers» (YTD) при цели 60%, прогноз года 63% | 2025/26 Q2 | TfL Customer Report | https://board.tfl.gov.uk/documents/s25404/csop20251204-item08b-part1-Appendix%201-Customer%20Report.pdf | Базовая удовлетворённость стабильна — прорыв требует решения конкретных болей, не общего «улучшения» | В |
| 13 | Customer Satisfaction Score: «очень стабильный квартал»; шкала 0–10 переводится в 0–100 (6,62 → 66) | 2025/26 Q2 | TfL Customer Report | https://board.tfl.gov.uk/documents/s25404/csop20251204-item08b-part1-Appendix%201-Customer%20Report.pdf | Метрика не двигается — ищем продукты, меняющие опыт, а не усредняющие его | В |
| 14 | Цель London TravelWatch/TfL: 66% по «cares about customers» к 2030 | 2026 | London TravelWatch | https://www.londontravelwatch.org.uk/wp-content/uploads/2026/03/10-Transport-in-London-monitor-mr.pdf | Власти заинтересованы в метрике «забота о клиенте» | С |
| 15 | Уклонение от оплаты проезда 3,8% (2023-24) → 3,5% (2025-26) | 2025-26 | London TravelWatch monitor LTW834 | https://www.londontravelwatch.org.uk/wp-content/uploads/2026/07/06-Transport-in-London-monitor-LTW834.pdf | Низкий приоритет для пользователя; релевантно только для TfL | В |
| 16 | Бумажные билеты могут стоить до 200% дороже, чем tap-in; заморозка автобусного тарифа до 1 нояб. 2026, затем +10p до £1,85 | 2025–2026 | LTW / ianvisits | https://www.ianvisits.co.uk/articles/bus-fares-freeze-extended-to-november-2026-90904/ | Цена проезда — боль малообеспеченных; ценны «умные» оптимизаторы тарифов (cap, Railcard) | С |
| 17 | Пассажиропоток 2024/25: 3,6 млрд поездок (на 7% ниже 2019/20); Underground 1 216 млн; автобусы 1 842 млн; Elizabeth line 231 млн (+10,1%) | 2024/25 | TfL Travel in London 2025 | https://content.tfl.gov.uk/travel-in-london-2025-annual-overview-acc.pdf | Масштаб рынка; транспорт ещё не вернулся к допандемии | С |
| 18 | Пешие поездки — 38% всех поездок; 1,50 млн велоэтапов/день (+12,7%) | 2025 | TfL Travel in London 2025 | https://content.tfl.gov.uk/travel-in-london-2025-annual-overview-acc.pdf | Пешеходная навигация/маршруты — массовый сценарий, не только метро | С |
| 19 | 45% disabled-лондонцев ждут ухудшения доступности транспорта за 10 лет vs 32% — улучшения | конец 2023 (опубл.), представлено в 2024 | Transport for All | https://www.london.gov.uk/about-us/londonassembly/meetings/documents/s113030/Appendix 1 - Transport Committee 3 September 2024 - Panel 1.pdf | Недоверие к обещаниям доступности — нужна реальная, актуальная информация | С |
| 20 | Только 42% станций Лондона step-free (54% по стране); 10 из 270 станций метро полностью step-free от улицы до поезда | 2024–25 | London Assembly / Transport for All (пересказ) | https://www.london.gov.uk/who-we-are/what-london-assembly-does/london-assembly-publications/accessibility-transport-network-london | Информация о доступности маршрута (лифты, платформы) — критична | С |
| 21 | 72% disabled-людей поддерживают приоритет дешёвых решений (step-free переходы) (Англия) | 2025 | Sustrans / Transport for All | https://www.sustrans.org.uk/media/vlhdxpur/250708-transforming-mobility-report-v13_digital_v3a.pdf | Контекст; не London-only | С |
| 22 | Disabled-люди делают в среднем 5,84 поездок/нед. vs 17 в среднем по стране (Англия) | 2025 | Transport for All | https://www.sustrans.org.uk/media/vlhdxpur/250708-transforming-mobility-report-v13_digital_v3a.pdf | «Подавленный спрос» — многие не едут вовсе | С |
| 23 | 1,5 млн пожилых и людей с инвалидностью рискуют остаться за бортом «digital first» билетов и планирования | 2025 | London TravelWatch (пересказ в прессе) | https://www.onlondon.co.uk/london-boroughs-must-act-to-end-digital-exclusion-of-older-londoners-from-council-services-says-report/ | Приложение не должно быть единственным каналом | С |
| 24 | ~200 000 лондонцев старше 75 никогда не были онлайн | 2025 | Age UK London | https://www.ageuk.org.uk/london/about-us/news/articles/2025/access-denied-ii/ | Доступные офлайн-/голосовые/«помощь родственника» режимы | С |
| 25 | >1,6 млн лондонцев не имеют базовых цифровых навыков | 2025 | London Councils / LOTI (пересказ) | https://www.onlondon.co.uk/london-boroughs-must-act-to-end-digital-exclusion-of-older-londoners-from-council-services-says-report/ | Простота интерфейса, минимум текста, языки | С |
| 26 | 2,2 млн взрослых в UK полностью офлайн; ещё 34 млн онлайн, но с барьерами; 8 млн без базовых навыков; офлайн-люди в 2,5 раза чаще на низком доходе | 2026 | Good Things Foundation, Digital Nation 2026 | https://www.goodthingsfoundation.org/discover/our-news/our-news-2026/digital-nation-2026-data-launch | «Только 1 из 3 комфортно онлайн» — не надо считать всех пользователей смартфонов продвинутыми | В |
| 27 | 3,7 млн семей ниже минимального цифрового стандарта жизни; 2,3 млн домохозяйств с трудом платят за мобильный контракт | 2025 | Good Things Foundation | https://www.goodthingsfoundation.org/discover/digital-inclusion-insights/digital-inclusion-insights-2025/measuring-progress-on-digital-inclusion | Лёгкие приложения, офлайн-режим, экономия трафика | С |
| 28 | Бедность в Лондоне: 26% (≈2,3 млн) — самая высокая в стране (после жилья); до жилья — 15% | 2025 | Trust for London | https://trustforlondon.org.uk/news/poverty-in-london-2025/ | Бесплатные/дешёвые сервисы — не «приятное дополнение», а необходимость | В |
| 29 | Новая оценка: 27% (≈2,5 млн), самая высокая в стране второй год подряд (только top-level) | 2026 | Trust for London | https://trustforlondon.org.uk/news/poverty-2026-london-has-highest-poverty-rate-in-the-country-for-second-year-in-a-row/ | Тренд ухудшения | С |
| 30 | Каждый третий ребёнок в Лондоне живёт в бедности; бангладешцы — 62% бедности; 20 из 32 боро выше среднего по Англии | 2025 | Trust for London | https://trustforlondon.org.uk/news/10-charts-to-help-us-understand-poverty-in-london-2025/ | Сегментация: семьи, этнические общины, боро | С |
| 31 | 15%+ лондонцев на out-of-work benefits (май 2025); безработица растёт 2022–2025, особенно среди молодёжи | 2025 | Trust for London | https://trustforlondon.org.uk/news/poverty-in-london-2025/ | Молодёжь 18–24: сервисы поиска работы/подработки, бесплатные навыки | С |
| 32 | 73% родителей планируют растить детей в Лондоне до 18 лет | окт.–нояб. 2025 | GLA/YouGov, London Assembly «Children in London» (n=202 родителей 0–16) | https://www.london.gov.uk/sites/default/files/2025-12/London%20Assembly%20-%20Children%20in%20London%20Polling%20Oct%2025%20for%20publishing.pdf | Малая выборка родителей (202) — осторожно | В |
| 33 | Лишь 41% лондонцев (40% родителей) считают Лондон подходящим для детей; 58% родителей называют школы главным фактором; 55% будущих родителей хотели бы растить детей в Лондоне | 2025 | то же | https://www.london.gov.uk/sites/default/files/2025-12/London%20Assembly%20-%20Children%20in%20London%20Polling%20Oct%2025%20for%20publishing.pdf | Семейные сервисы (школы, детские места) — ценность для удержания семей | В |
| 34 | Стоимость полного дня детсада для ребёнка до 2 лет в Англии: £148,82/нед. при 30 «бесплатных» часах vs £372,06 без права (−39% к 2025) | 2026 | Coram Childcare Survey 2026 | https://www.coram.org.uk/wp-content/uploads/2026/03/Childcare-Survey-2026.pdf | Лондон остаётся самым дорогим регионом; не-eligible семьи платят в ×2,5 | В |
| 35 | Лондон, 2-летние, неполная неделя: Inner London £222,18 (без финансирования) / £180,69 (с 30 ч.); Outer £213,99 / £172,62; Англия £174,85 / £140,72 | 2026 | daynurseries.co.uk (ссылается на Coram) | https://www.daynurseries.co.uk/news/article.cfm/id/1563511/childcare-how-uk-compares-europe | Лондон ≈ +27% к среднему по Англии; цифры вторичные | С |
| 36 | 47% лондонцев задумывались о переезде из Лондона; 54% среди 18–34 (n=500, ±4,4%) | нояб. 2025 | City AM / Freshwater Strategy | https://www.cityam.com/?p=2383378 | Малая выборка; но сигнал «чувство неподъёмности города» сильный | С |
| 37 | 2 из 5 лондонцев 18–30 вероятно уедут в течение 5 лет; 81% говорят, что город дороже ожиданий | н/д (2025–26) | Public First | https://www.publicfirst.co.uk/why-young-londoners-are-rethinking-life-in-the-capital | Молодёжь ищет способы жить дешевле — бесплатные/дешёвые досуг и транспорт | С |
| 38 | 2/3 лондонцев 25–45 занимают на покрытие жилья (кредитки/payday) | сент. 2025 | Pocket Living survey (n=1000) | https://www.propertyreporter.co.uk/two-thirds-of-londoners-aged-25-45-now-borrowing-to-cover-housing-costs.html | Заказной опрос застройщика — возможна предвзятость | С/Н |
| 39 | Citizens Advice: 407 416 человек с долгами (+44% к 2021); средний долг £8 900; 35% с проблемными долгами не смогли купить еду; 20% — отключили услуги (Англия и Уэльс) | 2025 | Citizens Advice / Opinium | https://www.citizensadvice.org.uk/about-us/media-centre/press-releases/citizens-advice-issues-stark-warning-as-2-670-people-seek-debt-help-every/ | Не London-only; сигнал финансовой уязвимости | В |
| 40 | Cost of living — главная проблема Лондона: 80% арендаторов говорят, что доступного жилья мало | окт. 2024 | Ipsos Survey of Londoners 2024 (n=1000) | https://www.londoncouncils.gov.uk/sites/default/files/2025-02/24_060116_01_survey_of_londoners_2024_public.pdf | Дорого = главный приоритет; бесплатное/экономия — ценность | В |
| 41 | 65% довольны районом; 69% сильно чувствуют принадлежность к нему | окт. 2024 | Ipsos Survey of Londoners 2024 | https://www.londoncouncils.gov.uk/sites/default/files/2025-02/24_060116_01_survey_of_londoners_2024_public.pdf | База — лондонцы любят свой район: «хайперлокальные» продукты | В |
| 42 | 46% поддерживают передачу большего числа полномочий Лондону (21% против); 61% — по транспорту и жилью | 2024 | Ipsos | https://x.com/Ipsos_in_the_UK/status/1886826030511350030 | Власти заинтересованы в доверии к услугам | С |
| 43 | 59% указывают cost of living среди главных проблем, 41% — crime & policing, 34% — housing (мэрская кампания) | 2024 | YouGov (пересказ) | https://yougov.com/en-gb/articles/35736-housing-and-crime-most-pressing-issues-facing-new- | Исторический контекст приоритетов | Н (год/источник по сниппету) |
| 44 | 42% считают, что Хан хорошо работает, 47% — плохо; негативные оценки по преступности и жилью, разделённые — по транспорту | 2026 | YouGov | https://yougov.com/en-gb/articles/55398-where-do-londoners-stand-on-sadiq-khan-after-10-years-as-mayor | Транспорт — наименее конфликтная область для властей | В |
| 45 | Roads & parking — 37%, economy/cost of living — 35% как топ-локальные проблемы (UK-wide) | 2026 | YouGov | https://yougov.com/en-gb/articles/54552-what-do-britons-see-as-the-top-issues-locally-ahead-of-2026-local-mayoral-and-devolved-elections | Не Лондон; контекст | С |
| 46 | Crime and safety — самый частый ответ на вопрос, куда направить деньги precept; | 2026-27 бюджет | GLA Talk London (консультация, не опрос) | https://www.london.gov.uk/talk-london/topics/economy/funding-londons-priorities/updates/1244 | Политический приоритет мэра — безопасность | С/Н |
| 47 | Лишь 15% лондонцев считают, что у молодых мужчин достаточно позитивных ролевых моделей; 62% — «manosphere» вредна | май 2025 | GLA/YouGov (n=1085) | https://data.london.gov.uk/gla-opinion-research/reports-and-analysis/online-safety-young-men-polling-may-oct-2025 | Власти активно работают с этой темой — спрос на позитивный онлайн-контент | В/С |
| 48 | 52% (или 55%) считают соцсети вредными для <18 vs 6% полезными; 71% мужчин 18–24 чувствуют давление маскулинности | 2025 | GLA/YouGov | https://www.london.gov.uk/mayor-london-warns-lost-generation-young-men-he-takes-manosphere | Подростки/онлайн-безопасность — тема мэра; цифры расходятся между источниками | Н |
| 49 | 31% адультов 16–29 одиноки «always/often/some of the time» vs 16% 70+ (GB) | апр. 2025 | ONS OPN (через SW Londoner) | https://www.swlondoner.co.uk/?p=181493 | Одиночество чаще среди молодых — сервисы «бесплатно встретиться» | С |
| 50 | Chronic loneliness: 3,83 млн (GB); 16–29 в 2 раза чаще, чем 70+ (данные до 2023) | 2023 (контекст) | Campaign to End Loneliness | https://campaigntoendloneliness.org/wp-content/uploads/The-State-of-Loneliness-2023-ONS-data-on-loneliness-in-Britain_compressed.pdf | Лондонских цифр нет | С |
| 51 | London Youth/Speak Up! 2025: «Safety feels uneven» (без %); London United: 100 проектов, 31 боро, >30 000 детей | 2025 | Speak Up! / London United | https://www.palaceforlife.org/wp-content/uploads/2025/10/Keeping-Londoners-Safe_October-2025.pdf | Нет надёжных %: см. пробелы | С |
| 52 | Age UK London: онлайн-опрос >25 000 пожилых; 1 372 ответа по эйджизму во всех 33 боро; транспорт среди мест эйджизма | 2024–2026 | Age UK London | https://www.ageuk.org.uk/bp-assets/globalassets/london/campaigns/ageism/age-uk-london---ageism-survey-findings---april-2026.pdf | Старшие Londoners сталкиваются с финансовой/цифровой уязвимостью | С |
| 53 | 2/5 жителей Большого Лондона: страх/опыт public sexual harassment мешает делать привычное (маршрут домой, спорт); 43% — государство не воспринимает серьёзно | н/д (Opinium для Plan UK) | Plan International UK | https://swlondoner.co.uk/?p=95803 | Год не определён; старые данные | Н |
| 54 | 66% девушек 14–21 пережили нежелательное внимание в общественном месте; 20% — помощь была полезной (UK) | 2018 (контекст) | Plan International UK | https://plan-uk.org/node/2708 | Старые; для сравнения | В (но старые) |
| 55 | Только 1 из 10 лондонцев не имеет доступа к транспорту (PTAL-анализ, ссылка на отчёт) | н/д | Motability Foundation / PTAL | https://www.motabilityfoundation.org.uk/media/4w1erfiz/rpt_public-transport-accessibility-level-review_150124-clean_accessible.pdf | Только заголовок; проверить | Н |
| 56 | Advising Londoners: 70 000 лондонцев помогли, £32 млн улучшений финансов; 24 400 на cost-of-living events | июнь 2025 | Advising Londoners Partnership | https://londonlegalsupporttrust.org.uk/wp-content/uploads/2025/07/Infographic-June-2025.pdf | Власти уже финансируют финансовую помощь — каналы доставки нужны | С |
| 57 | Культурный досуг: cost — главная причина неучастия (41%) | янв. 2016 (контекст) | GLA Telephone Poll | https://data.london.gov.uk/download/gla-poll-results-2016/85653115-40c4-4677-a9c8-51d51879e7cb/GLA%2520Telephone%2520Poll%2520Topline%2520Results%2520January%25202016%2520for%2520web.pdf | Очень старые; нужна свежая версия (A Day Out in London Jan 2026) | В (но старые) |
| 58 | Half of Londoners (не год) бросили бы машину, если бы общественный транспорт был дешевле | н/д | Savanta/Centre for London | https://enfielddispatch.co.uk/half-of-londoners-would-ditch-cars-if-public-transport-was-cheaper-survey-suggests/ | Цена — барьер перехода к транспорту | Н |

> Всего 58 строк; из них «В/С» с годом 2024–2026 — около 40.

---

## 2. Инсайты по сегментам

Для каждого сегмента даны только выводы, которые поддерживаются цифрами из таблицы; где данных нет — прямо написано.

- **Дети.** Прямых опросов детей Лондона в результатах нет. Косвенно: безопасность детей — тема London Assembly; школы — главный фактор для родителей (58%, #33). Пробел: нет данных о том, что хотят сами дети 5–12.
- **Подростки (13–17).** Мэрская повестка — онлайн-вред: 52–55% лондонцев считают соцсети вредными для <18 (#48). Speak Up! 2025 — «Safety feels uneven», но без процентов (#51). Нет проверяемых данных о приложениях, которые подростки сами хотят. Данные неполные.
- **Студенты / 18–24.** Безработица среди молодых растёт (#31); 54% 18–34 задумывались об отъезде (#36); 31% 16–29 одиноки (#49); 68% женщин 18–24 не чувствуют себя безопасно (#8, низкая надёжность). Сигнал: дорого, одиноко, тревожно ночью. Нужен бесплатный/дешёвый досуг и безопасность поездки.
- **Молодые специалисты 25–34.** 2/3 25–45 занимают на жильё (#38, заказной опрос); 81% — «Лондон дороже ожиданий» (#37). Ценность — экономия и оптимизация расходов (тарифы, бесплатные события).
- **Родители маленьких детей.** Детсад: £148,82 vs £372,06 в нед. по Англии (#34); Лондон дороже (#35). Только 41% считают Лондон подходящим для детей (#33). Ценность — информация о финансировании (30 часов), бесплатные детские места, школы.
- **35–64 (ездят на работу).** Специфических цифр нет; общие: satisfaction стабильно (#12–13), поток 3,6 млрд (#17), тарифы растут (#16). Пробел: нет данных о точности информации о задержках и сбоях.
- **65+.** ~200 000 75+ не были онлайн (#24); 1,5 млн старших и инвалидов рискуют «digital first» (#23); эйджизм в транспорте (#52). Вывод: офлайн/голосовые/«помощник семьи» режимы обязательны.
- **Люди с инвалидностью.** 42% станций step-free (#20); 45% ждут ухудшения (#19); 5,84 поездок/нед. против 17 (#22). Боль №1 — информация о доступности «от двери до двери» и доверие к ней.
- **Малообеспеченные семьи.** Бедность 26–27% (#28–29); 1 из 3 детей (#30); 3,7 млн семей ниже цифрового минимума (#27). Вывод: офлайн-режим, малый трафик, бесплатность, без рекламы.
- **Новоприбывшие / мигранты.** В найденных результатах нет ни одной лондонской цифры. Косвенно: бангладешцы — 62% бедности (#30). Пробел — важный (языки, навигация, права, NHS).
- **Ночные / сменные работники.** Опросных данных по ним в результатах не найдено. Косвенно: ночью небезопасно в пабах/клубах, парках, транспорте (#5), женщины — особенно (#7, #10). Пробел.
- **Женщины (безопасность).** Разрыв ~1,8× по тревоге в транспорте (38% vs 21%, #10), 65% vs 87% безопасно днём (#7), 2/5 меняют маршрут/активность (#53). Но: год и метод ряда источников неясны (#8, #9, #10, #53) — перед использованием в питче проверить свежие MOPAC PAS «VAWG and Female Safety Q1 25-26».

---

## 3. ТОП-10 сигналов: чего люди хотят больше всего (по данным, не по мнениям)

Ранжирование — моё, по числу независимых источников, масштабу и свежести (уверенность: средняя).

1. **Меньше расходов — «cost of living» главная тема** (#40, #43, #28–29, #16, #34). Любой бесплатный продукт, экономящий деньги, находит сразу понятную ценность.
2. **Чувство безопасности в общественных местах и транспорте** (#4, #5, #9, #10): ~44% тревожны о преступности, ~4 из 10 тревожны в транспорте (оба с оговорками).
3. **Доверие к службам низкое и держится на ~45–48%** (#1–3): людям нужны прозрачные каналы.
4. **Доступность транспорта для инвалидов и пожилых** (#19, #20, #22–24): пробел «подавленного спроса» значителен.
5. **Цифровая инклюзия**: приложение не должно исключать (#24–27). Вывод для дизайна: офлайн, простота, помощь.
6. **Семьям нужны доступные дети-сервисы**: детсад, школы, места для детей (#33–35).
7. **Молодёжь ищет, как жить в Лондоне дешевле и менее одиноко** (#36, #37, #49).
8. **Безопасность онлайн для молодёжи** (#47–48) — приоритет мэра; запрос власти > запроса пользователей.
9. **Базовая удовлетворённость TfL стабильна, но не растёт** (#12–13): рост только через конкретные боли.
10. **Хайперлокальность**: 65% довольны районом, 69% чувствуют принадлежность (#41) — продукт на уровне района.

---

## 4. Критический раздел

### 4.1 Где данные расходятся с популярными нарративами
- **«Лондон страшный».** Реально: 5,2% жителей пережили преступление за квартал (#6), при этом 44% тревожатся (#4). Тревога выше реального риска. Продукту надо работать с *воспринимаемой* безопасностью, но без фиктивных страхов. (Уверенность средняя: разные методики.)
- **«TfL ненавидят».** Сатисфакция стабильная, 67% согласны, что TfL «заботится» (#12). Недовольство локализовано (доступность, цена, безопасность), а не общее.
- **«Все лондонцы уезжают».** 47% «задумывались», но выборка 500 и вопрос про мысли, а не решения (#36). Другая цифра: 73% родителей планируют остаться (#32).
- **«Детсады дорожают».** В 2026 Coram зафиксировал падение −39% для eligible родителей (#34) — нарратив устарел для тех, кто имеет право; для остальных £372 в неделю.
- **«Доверие к полиции упало в ноль».** 43% — исторический минимум, но к 2026 — 45–48% (#1–3), и 70% «могут доверять» — зависит от формулировки.
- **«Все онлайн».** 2,2 млн полностью офлайн, 34 млн — с барьерами (#26): «цифровой» — не значит «доступный всем».
- **Расхождения между источниками:** 1,6 млн (Lloyds 2024) vs 2,2 млн (GTF 2026) офлайн — разные методики; 52% vs 55% по соцсетям (#48) — расхождение внутри ресурсов GLA.

### 4.2 Каких данных не хватает (и что делать)
| Пробел | Что делать |
|---|---|
| Текст таблиц GLA/YouGov: Crime on Transport (нояб. 2025), AI for Londoners (нояб. 2025), A Day Out in London (янв. 2026), London Priorities Tracking (июнь 2026) | Открыть xlsx/ods на data.london.gov.uk и взять топ-3 приоритета и вопросы о досуге, ИИ |
| MOPAC PAS «VAWG and Female Safety Q1 25-26» — свежие %, женщины/ночь | Открыть PDF: https://data.london.gov.uk/download/236kk/zj9/MOPAC%20Public%20Attitude%20Survey%20VAWG%20and%20Female%20Safety%20Q1%2025-26.pdf |
| Travel in London 2025 — satisfaction по режимам, безопасность/тревога, доступность | Открыть https://content.tfl.gov.uk/travel-in-london-2025-annual-overview-acc.pdf |
| Лондонские данные по одиночеству (ONS) | ONS FOI-2025-3175: https://www.ons.gov.uk/aboutus/transparencyandgovernance/freedomofinformationfoi/lonelinessbylondonborough |
| Дети 5–17: что им нужно (не родителям) | Нет в найденном; опросы London Youth, Mayor's Speak Up! 2025 |
| Студенты, ночные/сменные работники, мигранты (языки, права) | Нет в найденном; нужны отдельные поиски (UCL/King's SU, Unite/USDAW, Migrant Voice) |
| Туристы: безопасность, мошенничество, цена | Не искал из-за лимита; нужен VisitBritain/London & Partners |
| Which?, YouGov по приложениям/мошенничеству | Лимит запросов исчерпан до этих запросов |
| Психическое здоровье молодёжи (NHS, MH Foundation, London-level) | Лимит запросов исчерпан |
| Раздельные оценки «насколько люди готовы пользоваться новым приложением» | Нет вообще: опросы измеряют «боли» и «настроения», не спрос на продукт — проверять интервью/пилотами |

### 4.3 Общие оговорки
- Лимит поиска: 24 запроса прошли, остальные отклонены. Часть цифр — только из сниппетов (помечены «С»).
- Многие GLA-опросы небольшие (n≈1 000–1 400); подвыборки (родители: n=202) очень шумные.
- Заказные опросы (Pocket Living, Freshwater/City AM) — потенциальная предвзятость.
- «Хочет» ≠ «будет пользоваться»: рейтинг в разделе 3 — оценка тем с высокими болями, не спрос на приложения.

---

## 5. Первоисточники, которые стоит открыть вручную (приоритет)
1. GLA Poll Results 2025/2026: https://data.london.gov.uk/dataset/gla-poll-results-2025-2r761 и https://data.london.gov.uk/gla-poll-results/2026-2
2. Crime on Transport polling Nov 2025: https://data.london.gov.uk/dataset/crime-on-transport-polling-nov-2025-vdx0n
3. AI for Londoners polling Nov 2025: https://www.data.gov.uk/dataset/f5bb4f6c-f8f3-4ab3-b7c2-1d1bbb274876/ai-for-londoners-polling-nov-2025
4. A Day Out in London Polling January 2026: https://www.data.gov.uk/dataset/7df796ca-92f6-4654-b949-2b33febd65f2/a-day-out-in-london-polling-january-2026
5. London Priorities Tracking Jun 2026: https://data.london.gov.uk/download/249dn/m6d/London%20Priorities%20Tracking%20Jun%202026%20v1.pdf
6. MOPAC Public Voice Q2 25-26 / Q4 25-26: https://data.london.gov.uk/download/236kk/dkw/Q2_2526_Public%20Voice%20results%20pack_FINAL.pdf ; https://data.london.gov.uk/download/236kk/3wp/Q4_2526_Public_Voice%20results%20pack_FINAL.pdf
7. Coram Childcare Survey 2026: https://www.coram.org.uk/wp-content/uploads/2026/03/Childcare-Survey-2026.pdf
8. Good Things Foundation Digital Nation 2026: https://www.goodthingsfoundation.org/dam/jcr:390b43e1-854f-4a5a-a7f0-7864795ef51a/Digital%20Nation%202026%20-%20Good%20Things%20Foundation.pdf
