import type {
  CategoryId,
  ConditionSummary,
  ProtocolDetail,
  QuranicPrescription,
  AudioSession,
} from '../types/ruqya';
import {
  CATEGORIES,
  MULTI_DAY_PACKS,
  HANDBOOK_ROOT_CAUSES,
  HANDBOOK_CLASSIFICATION,
  HANDBOOK_REACTIONS_COMPARISON,
  HANDBOOK_24H_CHECK,
  HANDBOOK_ETHICS,
} from './categoriesAndPacks';
import { DETAILED_PROTOCOLS_PART_1 } from './detailedProtocolsPart1';
import { DETAILED_PROTOCOLS_PART_2 } from './detailedProtocolsPart2';
import { ADDITIONAL_CONDITIONS } from './additionalConditions';

export const DETAILED_PROTOCOLS: ProtocolDetail[] = [
  ...DETAILED_PROTOCOLS_PART_1,
  ...DETAILED_PROTOCOLS_PART_2,
];

const DETAILED_BY_ID = new Map<number, ProtocolDetail>(
  DETAILED_PROTOCOLS.map((item) => [item.id, item])
);

export const ALL_CONDITIONS: ConditionSummary[] = [
  ...DETAILED_PROTOCOLS.map(
    ({
      id,
      slug,
      categoryId,
      titleRu,
      arabicTerm,
      transliteration,
      hookRu,
      difficulty,
      sessionFormat,
      keywords,
      isDetailed,
    }) => ({
      id,
      slug,
      categoryId,
      titleRu,
      arabicTerm,
      transliteration,
      hookRu,
      difficulty,
      sessionFormat,
      keywords,
      isDetailed,
    })
  ),
  ...ADDITIONAL_CONDITIONS,
].sort((a, b) => a.id - b.id);

interface CategoryFallbackTemplate {
  spiritualMechanics: string;
  psychosomaticMechanics: string;
  audioSessions: AudioSession[];
  prescriptions: QuranicPrescription[];
  carrierNotes: string;
  expectedReactions: string[];
  ethicsNote: string;
  microAction: string;
}

const CATEGORY_TEMPLATES: Record<CategoryId, CategoryFallbackTemplate> = {
  'heart-grief': {
    spiritualMechanics:
      'Сердечные зажимы, обиды и затянувшаяся тоска открывают уязвимость для наущений шайтана (хазан) и замедляют приток сакины. Коран врачует грудь через возвращение опоры на Милостивого Аллаха и освобождение сердца от невольных узлов.',
    psychosomaticMechanics:
      'Длительное переживание душевной боли удерживает грудную диафрагму в спазме, повышает базовый уровень кортизола и нарушает глубину ночного восстановления.',
    audioSessions: [
      {
        id: 'fb-hg-1',
        reciter: 'Ахмад ан-Нуфайс',
        reciterArabic: 'أحمد النفيس',
        title: 'Аяты Сакины — глубокое успокоение и раскрытие груди',
        duration: '15 мин',
        format: 'Экспресс до 15 мин',
        youtubeUrl:
          'https://www.youtube.com/results?search_query=%D8%A3%D8%AD%D9%85%D8%AF+%D8%A7%D9%84%D9%86%D9%81%D9%8A%D8%B3+%D8%A2%D9%8A%D8%A7%D8%AA+%D8%A7%D9%84%D8%B3%D9%83%D9%8A%D9%86%D8%A9',
        focusNote: 'Слушать спокойно с ладонью на сердце.',
      },
      {
        id: 'fb-hg-2',
        reciter: 'Аль-Гариб аль-Мавсили',
        reciterArabic: 'الغريب الموصلي',
        title: 'Рукъя исцеления сердца от тоски, обид и привязанностей',
        duration: '38 мин',
        format: 'Глубокий сеанс 45 мин',
        youtubeUrl:
          'https://www.youtube.com/results?search_query=%D8%A7%D9%84%D8%BA%D8%B1%D9%8A%D8%A8+%D8%A7%D9%84%D9%85%D9%88%D8%B5%D9%84%D9%8A+%D8%B1%D9%82%D9%8A%D8%A9+%D8%A7%D9%84%D9%82%D9%84%D8%A8+%D9%88%D8%A7%D9%84%D8%AD%D8%B2%D9%86',
        focusNote: 'Для глубокого очищения эмоций.',
      },
    ],
    prescriptions: [
      {
        id: 'fb-hg-p1',
        surahRef: 'Коран, 13:28 + 94:1–2 (Успокоение и раскрытие груди)',
        arabicText:
          'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ۝ أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ ۝ وَوَضَعْنَا عَنكَ وِزْرَكَ',
        transcriptionRu:
          'А-ля́ би-зи́кри-Лля́хи татмаи́нну-ль-кулю́б. А-ля́м на́шрах ля́ка са́драк, ва вада‘на́ ‘а́нка ви́зрак.',
        translationRu:
          'Разве не поминанием Аллаха утешаются сердца? Разве Мы не раскрыли для тебя грудь твою и не сняли с тебя ношу твою?',
        recitationInstruction: 'Положить правую руку на центр груди и прочитать 7 раз на спокойном выдохе.',
        repeatCount: '7 раз утром и перед сном',
      },
    ],
    carrierNotes: 'Пейте начитанную воду с аятами Сакины и делайте легкую 20-минутную прогулку на свежем воздухе.',
    expectedReactions: [
      'Глубокий вдох, слезы мягкого освобождения и тепло в области груди.',
    ],
    ethicsNote:
      'Если душевная боль не снижается неделями или мешает сну и работе, обратитесь также к грамотному психотерапевту.',
    microAction: 'Сделайте искреннее дуа за благо для своего сердца и совершите 1 маленькое доброе дело без ожидания ответа.',
  },
  'confidence-boundaries': {
    spiritualMechanics:
      'Неуверенность перед людьми и страх защищать границы возникают, когда оценка творений заслоняет опору на Творца. Шайтан внушает мнимую слабость, чтобы верующий не мог твердо свидетельствовать истину и беречь свои права.',
    psychosomaticMechanics:
      'В ответ на социальное давление нервная система переходит в режим оцепенения («замри»), сжимая мышцы гортани и плечевого пояса.',
    audioSessions: [
      {
        id: 'fb-cb-1',
        reciter: 'Шейх Омар аль-Атифи',
        reciterArabic: 'عمر العاطفي',
        title: 'Рукъя от страха, робости и зажимов в речи',
        duration: '15 мин',
        format: 'Экспресс до 15 мин',
        youtubeUrl:
          'https://www.youtube.com/results?search_query=%D8%B9%D9%85%D8%B1+%D8%A7%D9%84%D8%B9%D8%A7%D8%B7%D9%81%D9%8A+%D8%B1%D9%82%D9%8A%D8%A9+%D8%A7%D9%84%D8%AE%D9%88%D9%81+%D9%88%D8%A7%D9%84%D8%AB%D9%82%D8%A9',
        focusNote: 'Слушать перед сложными диалогами и выходами в люди.',
      },
      {
        id: 'fb-cb-2',
        reciter: 'Абу Муджахид',
        reciterArabic: 'أبو مجاهد',
        title: 'Аяты силы духа и защиты от притеснения',
        duration: '30 мин',
        format: 'Глубокий сеанс 45 мин',
        youtubeUrl:
          'https://www.youtube.com/results?search_query=%D8%A3%D8%A8%D9%88+%D9%85%D8%AC%D8%A7%D9%87%D8%AF+%D8%B1%D9%82%D9%8A%D8%A9+%D8%A7%D9%84%D8%B4%D8%AC%D8%A7%D8%B9%D8%A9+%D9%88%D8%B1%D9%81%D8%B9+%D8%A7%D9%84%D8%AE%D9%88%D9%81',
        focusNote: 'Укрепляет внутренний стержень.',
      },
    ],
    prescriptions: [
      {
        id: 'fb-cb-p1',
        surahRef: 'Коран, 20:25–28 + 3:173',
        arabicText:
          'رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي ۝ وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي ۝ حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
        transcriptionRu:
          'Ра́бби-шра́х ли са́дри, ва я́ссир ли а́мри, ва-хлю́ль ‘у́кдатан мин лиса́ни. Ха́сбуна-Лла́ху ва ни‘ма-ль-Ваки́ль.',
        translationRu:
          'Господь мой! Раскрой для меня грудь мою, облегчи мое дело и развяжи узел на языке моем. Достаточно нам Аллаха, и прекрасный Он Покровитель!',
        recitationInstruction: 'Коснуться горла и верхней части груди, произнести четко вслух 7 раз.',
        repeatCount: '7 раз перед разговором',
      },
    ],
    carrierNotes: 'Распрямляйте плечи и говорите медленнее на выдохе — это сразу снижает адреналиновый спазм.',
    expectedReactions: [
      'Освобождение голоса, расслабление шеи и челюстей, ощущение спокойного достоинства.',
    ],
    ethicsNote:
      'Смелость по Сунне — это справедливость и твердость без хамства. При глубокой социальной тревоге полезны тренинги ассертивности и КПТ.',
    microAction: 'Озвучьте одну свою границу или просьбу спокойно, прямо и без лишних оправданий.',
  },
  'mind-focus': {
    spiritualMechanics:
      'Шайтан действует через навязчивый шепот (васвас), туман и беспечность (гафлят), чтобы человек тратил энергию ума на сомнения или бесплодные фантазии вместо присутствия перед Аллахом.',
    psychosomaticMechanics:
      'Информационная перегрузка и тревога истощают рабочую память префронтальной коры, провоцируя зацикленные мысли и умственную усталость.',
    audioSessions: [
      {
        id: 'fb-mf-1',
        reciter: 'Шейх Халид аль-Хабаши',
        reciterArabic: 'خالد الحبشي',
        title: 'Рукъя от васваса, тумана в голове и ментального давления',
        duration: '40 мин',
        format: 'Глубокий сеанс 45 мин',
        youtubeUrl:
          'https://www.youtube.com/results?search_query=%D8%AE%D8%A7%D9%84%D8%AF+%D8%A7%D9%84%D8%AD%D8%A8%D8%B4%D9%8A+%D8%B1%D9%82%D9%8A%D8%A9+%D8%A7%D9%84%D9%88%D8%B3%D9%88%D8%A7%D8%B3+%D9%88%D8%AA%D8%B4%D8%AA%D8%AA+%D8%A7%D9%84%D8%B0%D9%87%D9%86',
        focusNote: 'Слушать сидя с открытыми глазами, не споря с мыслями.',
      },
      {
        id: 'fb-mf-2',
        reciter: 'Ахмад ан-Нуфайс',
        reciterArabic: 'أحمد النفيس',
        title: 'Аяты ясности и спокойствия разума',
        duration: '15 мин',
        format: 'Экспресс до 15 мин',
        youtubeUrl:
          'https://www.youtube.com/results?search_query=%D8%A3%D8%AD%D9%85%D8%AF+%D8%A7%D9%84%D9%86%D9%81%D9%8A%D8%B3+%D8%A2%D9%8A%D8%A7%D8%AA+%D8%A7%D9%84%D8%B3%D9%83%D9%8A%D9%86%D8%A9',
        focusNote: 'Помогает перезагрузить внимание.',
      },
    ],
    prescriptions: [
      {
        id: 'fb-mf-p1',
        surahRef: 'Коран, 23:97–98 + Сура 114',
        arabicText:
          'رَّبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ ۝ وَأَعُوذُ بِكَ رَبِّ أَن يَحْضُرُونِ ۝ قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        transcriptionRu:
          'Ра́бби а‘у́зу би́ка мин хамаза́ти-ш-шаяты́н, ва а‘у́зу би́ка Ра́бби ан яхдуру́н. Куль а‘у́зу би-Ра́бби-н-на́с...',
        translationRu:
          'Господи! Я прибегаю к Тебе от наваждений шайтанов, и прибегаю к Тебе, Господи, чтобы они не приближались ко мне.',
        recitationInstruction: 'Произнести с ладонью на лбу и сразу переключить фокус на конкретное физическое дело.',
        repeatCount: '3–7 раз при навязчивости',
      },
    ],
    carrierNotes: 'Прохладная начитанная вода на лицо и затылок быстро возвращает ясность внимания.',
    expectedReactions: [
      'Ощущение прояснения взгляда и спадания внутреннего ментального шума.',
    ],
    ethicsNote:
      'При стойком ОКР, панических атаках или длительном мозговом тумане обратитесь к врачу (анализ крови на дефициты) и психотерапевту.',
    microAction: 'Отключите уведомления на 45 минут и выполните 1 простую задачу руками без экрана.',
  },
  'willpower-habits': {
    spiritualMechanics:
      'Шайтан удерживает человека через два рычага: «тасвиф» (вечное откладывание на завтра) и привязку к дешевым удовольствиям (лягв), похищающим волю и благодать времени.',
    psychosomaticMechanics:
      'Быстрые стимулы (сладкое, ленты, игры) истощают дофаминовую систему вознаграждения, делая полезные действия субъективно тяжелыми.',
    audioSessions: [
      {
        id: 'fb-wh-1',
        reciter: 'Абу Муджахид',
        reciterArabic: 'أبو مجاهد',
        title: 'Рукъя от лени, прокрастинации и слабости воли',
        duration: '15 мин',
        format: 'Экспресс до 15 мин',
        youtubeUrl:
          'https://www.youtube.com/results?search_query=%D8%A3%D8%A8%D9%88+%D9%85%D8%AC%D8%A7%D9%87%D8%AF+%D8%B1%D9%82%D9%8A%D8%A9+%D8%A7%D9%84%D9%83%D8%B3%D9%84+%D9%88%D8%A7%D9%84%D8%AA%D8%B3%D9%88%D9%8A%D9%81',
        focusNote: 'Включать утром сразу после пробуждения.',
      },
      {
        id: 'fb-wh-2',
        reciter: 'Шейх Омар аль-Атифи',
        reciterArabic: 'عمر العاطفي',
        title: 'Укрепление решимости и освобождение от зависимостей',
        duration: '34 мин',
        format: 'Глубокий сеанс 45 мин',
        youtubeUrl:
          'https://www.youtube.com/results?search_query=%D8%B9%D9%85%D8%B1+%D8%A7%D9%84%D8%B9%D8%A7%D8%B7%D9%81%D9%8A+%D8%B1%D9%82%D9%8A%D8%A9+%D8%A7%D9%84%D8%B9%D8%B2%D9%8A%D9%85%D8%A9+%D9%88%D8%A7%D9%84%D8%AE%D9%85%D9%88%D9%84',
        focusNote: 'Для выхода из длительного застоя.',
      },
    ],
    prescriptions: [
      {
        id: 'fb-wh-p1',
        surahRef: 'Сунна: Дуа от бессилия и лени',
        arabicText:
          'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ العَجْزِ وَالكَسَلِ ۝ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
        transcriptionRu:
          'Алла́хумма и́нни а‘у́зу би́ка ми́на-ль-‘а́джзи ва-ль-ка́саль. Ля ха́уля ва ля ку́ввата и́лля би-Лля́х.',
        translationRu:
          'О Аллах, прибегаю к Тебе от бессилия и лени! Нет силы и мощи, кроме как от Аллаха.',
        recitationInstruction: 'Произнести вслух 7 раз, умыться прохладной водой и сразу приступить к действию.',
        repeatCount: '7 раз утром и перед задачей',
      },
    ],
    carrierNotes: 'Прохладная начитанная вода на затылок снимает утреннюю сонливость и «узлы» инерции.',
    expectedReactions: [
      'Прилив ясности и готовность сделать первый короткий шаг без внутреннего торга.',
    ],
    ethicsNote:
      'Соблюдайте режим сна, уменьшайте вечерний экран и при поведенческих зависимостях используйте четкие внешние ограничения.',
    microAction: 'Поставьте таймер на 10 минут и начните отложенное дело с самого маленького шага.',
  },
  'rizq-tatyl': {
    spiritualMechanics:
      'Блокировка дел (та‘тыль) и утечка бараката часто связаны с завистью, сглазом на успехи, оглаской незавершенных планов или небрежностью в истигфаре. Аллах — аль-Фаттах, Открывающий закрытые врата.',
    psychosomaticMechanics:
      'Хроническая тревога из-за финансов или карьерного застоя парализует инициативу и усиливает страх отказа.',
    audioSessions: [
      {
        id: 'fb-rt-1',
        reciter: 'Шейх Халид аль-Хабаши',
        reciterArabic: 'خالد الحبشي',
        title: 'Рукъя снятия блокировки дел и узлов удела (رقية التعطيل)',
        duration: '44 мин',
        format: 'Глубокий сеанс 45 мин',
        youtubeUrl:
          'https://www.youtube.com/results?search_query=%D8%AE%D8%A7%D9%84%D8%AF+%D8%A7%D9%84%D8%AD%D8%A8%D8%B4%D9%8A+%D8%B1%D9%82%D9%8A%D8%A9+%D8%A7%D9%84%D8%AA%D8%B9%D8%B7%D9%8A%D9%84+%D9%88%D8%A7%D9%84%D8%B1%D8%B2%D9%82',
        focusNote: 'Слушать курсом 14 дней, сочетая с сурой «Аль-Бакара».',
      },
      {
        id: 'fb-rt-2',
        reciter: 'Аль-Гариб аль-Мавсили',
        reciterArabic: 'الغريب الموصلي',
        title: 'Рукъя от сглаза на работу, торговлю и достаток',
        duration: '38 мин',
        format: 'Глубокий сеанс 45 мин',
        youtubeUrl:
          'https://www.youtube.com/results?search_query=%D8%A7%D9%84%D8%BA%D8%B1%D9%8A%D8%A8+%D8%A7%D9%84%D9%85%D9%88%D8%B5%D9%84%D9%8A+%D8%B1%D9%82%D9%8A%D8%A9+%D8%A7%D9%84%D8%B1%D8%B2%D9%82+%D9%88%D8%A7%D9%84%D8%B9%D9%8A%D9%86',
        focusNote: 'Открывает ясность в делах.',
      },
    ],
    prescriptions: [
      {
        id: 'fb-rt-p1',
        surahRef: 'Коран, 35:2 + 71:10–11',
        arabicText:
          'مَّا يَفْتَحِ اللَّهُ لِلنَّاسِ مِن رَّحْمَةٍ فَلَا مُمْسِكَ لَهَا ۝ فَقُلْتُ اسْتَغْفِرُوا رَبَّكُمْ إِنَّهُ كَانَ غَفَّارًا',
        transcriptionRu:
          'Ма я́фтахи-Лла́ху ли-н-на́си мин ра́хматин фа-ля́ му́мсика ля́ха. Фа-ку́льту-стагфиру́ Ра́ббакум и́ннаху кя́на Гаффа́ра.',
        translationRu:
          'Никто не удержит милость, которую Аллах открывает людям. Просите у вашего Господа прощения, ведь Он — Всепрощающий!',
        recitationInstruction: 'Соединять чтение с 100-кратным истигфаром и тихой садакой.',
        repeatCount: '7 раз утром + 100 истигфар',
      },
    ],
    carrierNotes: 'Не делитесь планами и суммами сделок до их завершения; начитывайте воду с аятами Фатха.',
    expectedReactions: [
      'Спадание тяжести в груди и возвращение деловой собранности.',
    ],
    ethicsNote:
      'Рукъя устраняет духовные преграды, но требует земных усилий: обновления навыков, честного учета и качества работы.',
    microAction: 'Совершите 1 конкретный деловой шаг (звонок, письмо, отклик) в полной тишине без огласки.',
  },
  'ibadah-steadiness': {
    spiritualMechanics:
      'Поклонение — главная мишень шайтана: он приносит тяжесть в ноги перед намазом, отвлекает в молитве (Хинзаб) или внушает ложное отчаяние после ошибок. Постоянство в малом — ключ по Сунне.',
    psychosomaticMechanics:
      'Информационная перегрузка и нехватка сна перед утренней молитвой делают переключение в тишину намаза физически трудным.',
    audioSessions: [
      {
        id: 'fb-is-1',
        reciter: 'Шейх Омар аль-Атифи',
        reciterArabic: 'عمر العاطفي',
        title: 'Рукъя от лени в поклонении и возвращения вкуса к зикру',
        duration: '20 мин',
        format: 'Экспресс до 15 мин',
        youtubeUrl:
          'https://www.youtube.com/results?search_query=%D8%B9%D9%85%D8%B1+%D8%A7%D9%84%D8%B9%D8%A7%D8%B7%D9%81%D9%8A+%D8%B1%D9%82%D9%8A%D8%A9+%D8%A7%D9%84%D8%AB%D9%82%D9%84+%D8%B9%D9%86+%D8%A7%D9%84%D8%B5%D9%84%D8%A7%D8%A9',
        focusNote: 'Прослушать перед временем намаза.',
      },
      {
        id: 'fb-is-2',
        reciter: 'Ахмад ан-Нуфайс',
        reciterArabic: 'أحمد النفيس',
        title: 'Аяты смягчения сердца и любви к Корану',
        duration: '15 мин',
        format: 'Экспресс до 15 мин',
        youtubeUrl:
          'https://www.youtube.com/results?search_query=%D8%A3%D8%AD%D9%85%D8%AF+%D8%A7%D9%84%D9%86%D9%81%D9%8A%D8%B3+%D8%A3%D9%84%D9%85+%D9%8A%D8%A3%D9%86+%D9%84%D9%84%D8%B0%D9%8A%D9%86+%D8%A2%D9%85%D9%86%D9%88%D8%A7',
        focusNote: 'Оживляет сердце.',
      },
    ],
    prescriptions: [
      {
        id: 'fb-is-p1',
        surahRef: 'Сунна: Дуа помощи в поклонении (Абу Дауд)',
        arabicText:
          'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
        transcriptionRu:
          'Алла́хумма а‘и́нни ‘аля́ зи́крика ва шу́крика ва ху́сни ‘иба́датик.',
        translationRu:
          'О Аллах, помоги мне поминать Тебя, благодарить Тебя и поклоняться Тебе наилучшим образом!',
        recitationInstruction: 'Произносить в конце каждого намаза перед салямом.',
        repeatCount: 'После каждого намаза',
      },
    ],
    carrierNotes: 'Неспешное прохладное вуду за 5 минут до азана возвращает собранность.',
    expectedReactions: [
      'Смягчение груди, тихое желание постоять в намазе чуть дольше.',
    ],
    ethicsNote:
      'Помните о физическом отдыхе: истощенному телу нужен здоровый ночной сон, чтобы сердце легко просыпалось на Фаджр.',
    microAction: 'Отложите телефон за 10 минут до следующего намаза и прочитайте 5 аятов Корана.',
  },
  'body-health-sport': {
    spiritualMechanics:
      'Тело — доверенный нам аманат. Сглаз (‘айн) и зависть чаще всего поражают то, что заметно людям: силу, спорт, кожу, глаза, зубы или пищеварение. Шариатская рукъя снимает духовный узел с органа.',
    psychosomaticMechanics:
      'Стресс переводит организм в хронический спазм сосудов, мышц и ЖКТ, замедляя регенерацию тканей.',
    audioSessions: [
      {
        id: 'fb-bh-1',
        reciter: 'Аль-Гариб аль-Мавсили',
        reciterArabic: 'الغريب الموصلي',
        title: 'Рукъя исцеления тела и снятия сглаза со здоровья и силы',
        duration: '36 мин',
        format: 'Глубокий сеанс 45 мин',
        youtubeUrl:
          'https://www.youtube.com/results?search_query=%D8%A7%D9%84%D8%BA%D8%B1%D9%8A%D8%A8+%D8%A7%D9%84%D9%85%D9%88%D8%B5%D9%84%D9%8A+%D8%B1%D9%82%D9%8A%D8%A9+%D8%A7%D9%84%D8%B9%D9%8A%D9%86+%D9%81%D9%8A+%D8%A7%D9%84%D8%AC%D8%B3%D8%AF',
        focusNote: 'Положить правую руку на беспокоящую область.',
      },
      {
        id: 'fb-bh-2',
        reciter: 'Шейх Халид аль-Хабаши',
        reciterArabic: 'خالد الحبشي',
        title: 'Аяты Шифа — комплексное восстановление тела',
        duration: '32 мин',
        format: 'Глубокий сеанс 45 мин',
        youtubeUrl:
          'https://www.youtube.com/results?search_query=%D8%AE%D8%A7%D9%84%D8%AF+%D8%A7%D9%84%D8%AD%D8%A8%D8%B4%D9%8A+%D8%A2%D9%8A%D8%A7%D8%AA+%D8%A7%D9%84%D8%B4%D9%81%D8%A7%D8%A1',
        focusNote: 'Сочетать с начитанной водой и оливковым маслом.',
      },
    ],
    prescriptions: [
      {
        id: 'fb-bh-p1',
        surahRef: 'Сунна при боли в теле (Сахих Муслим)',
        arabicText:
          'بِسْمِ اللَّهِ (٣) أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ (٧)',
        transcriptionRu:
          'Бисми-Лля́х (3x). А‘у́зу би-Лля́хи ва ку́дратихи мин ша́рри ма а́джиду ва уха́зир (7x).',
        translationRu:
          'С именем Аллаха (3 раза). Прибегаю к Аллаху и Его могуществу от зла того, что я ощущаю и чего опасаюсь (7 раз).',
        recitationInstruction: 'Держать правую ладонь на больном участке во время чтения.',
        repeatCount: 'Утром и вечером',
      },
    ],
    carrierNotes: 'Питье и обтирание начитанной водой, мягкий массаж проблемной зоны начитанным оливковым маслом.',
    expectedReactions: [
      'Зевота, тепло в конечностях и уменьшение локального спазма.',
    ],
    ethicsNote:
      'Обязательное крыло медицины: при любых телесных симптомах и болях пройдите обследование у профильного врача.',
    microAction: 'Пройдите профильное обследование у врача и обеспечьте телу 8 часов сна и чистую воду.',
  },
  'hidden-shield': {
    spiritualMechanics:
      'Скрытые воздействия (‘арид, таби‘а, джасум, беспокойство в доме) питаются страхом человека и пропусками в ежедневном тахсине. Последовательность в азкарах и суре «Аль-Бакара» делает верующего неуязвимым с позволения Аллаха.',
    psychosomaticMechanics:
      'Ночная тревога и ожидание опасности держат нервную систему в гипертонусе; четкий ритуал защиты перед сном восстанавливает ощущение безопасности.',
    audioSessions: [
      {
        id: 'fb-hs-1',
        reciter: 'Шейх Халид аль-Хабаши',
        reciterArabic: 'خالد الحبشي',
        title: 'Комплексная рукъя тахсина и разрушения скрытых воздействий',
        duration: '45 мин',
        format: 'Глубокий сеанс 45 мин',
        youtubeUrl:
          'https://www.youtube.com/results?search_query=%D8%AE%D8%A7%D9%84%D8%AF+%D8%A7%D9%84%D8%AD%D8%A8%D8%B4%D9%8A+%D8%B1%D9%82%D9%8A%D8%A9+%D8%A7%D9%84%D8%AA%D8%AD%D8%B5%D9%8A%D9%86+%D9%88%D8%A7%D9%84%D8%A8%D9%8A%D8%AA',
        focusNote: 'Слушать спокойно, не поддаваясь страху.',
      },
      {
        id: 'fb-hs-2',
        reciter: 'Шейх Омар аль-Атифи',
        reciterArabic: 'عمر العاطفي',
        title: 'Защита дома, детей и сна — сильный щит тахсина',
        duration: '25 мин',
        format: 'На ночь',
        youtubeUrl:
          'https://www.youtube.com/results?search_query=%D8%B9%D9%85%D8%B1+%D8%A7%D9%84%D8%B9%D8%A7%D8%B7%D9%81%D9%8A+%D8%B1%D9%82%D9%8A%D8%A9+%D8%A7%D9%84%D8%AA%D8%AD%D8%B5%D9%8A%D9%86',
        focusNote: 'Подходит для ежедневного вечернего укрепления.',
      },
    ],
    prescriptions: [
      {
        id: 'fb-hs-p1',
        surahRef: 'Сунна: 3x Защита от всякого вреда + Аят аль-Курси',
        arabicText:
          'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
        transcriptionRu:
          'Бисми-Лля́хи-ллязи́ ля яду́рру ма‘а-сми́хи ша́й’ун фи-ль-а́рди ва ля фи-с-сама́и ва Ху́ва-с-Сами́‘у-ль-‘Али́м.',
        translationRu:
          'С именем Аллаха, с именем Которого ничто не причинит вреда ни на земле, ни на небе, и Он — Слышащий, Знающий!',
        recitationInstruction: 'Читать 3 раза утром и 3 раза вечером без пропусков, дополняя Аятом аль-Курси.',
        repeatCount: '3 раза утром и вечером',
      },
    ],
    carrierNotes: 'Сура «Аль-Бакара» в доме каждые 3 дня, уборка порогов и проветривание комнат.',
    expectedReactions: [
      'Тишина в доме, спокойный сон без ночных вздрагиваний и уход чувства тяжести.',
    ],
    ethicsNote:
      'Остерегайтесь суеверий, гадалок и амулетов. При тяжелых неврологических или психических симптомах обращайтесь к врачу.',
    microAction: 'Включите суру «Аль-Бакара» в доме и прочитайте вечерние азкары перед сном.',
  },
};

export function resolveProtocolDetail(idOrSlug: number | string): ProtocolDetail | null {
  const condition = ALL_CONDITIONS.find((c) =>
    typeof idOrSlug === 'number' ? c.id === idOrSlug : c.slug === idOrSlug
  );
  if (!condition) return null;

  const detailed = DETAILED_BY_ID.get(condition.id);
  if (detailed) return detailed;

  const tpl = CATEGORY_TEMPLATES[condition.categoryId];

  return {
    ...condition,
    symptoms: [
      condition.hookRu,
      'Состояние усиливается при усталости, пропуске утренних/вечерних азкаров или после напряженного общения.',
      'Внутреннее сопротивление при попытке спокойно переключиться на полезное действие или намаз.',
    ],
    spiritualMechanics: tpl.spiritualMechanics,
    psychosomaticMechanics: tpl.psychosomaticMechanics,
    audioSessions: tpl.audioSessions,
    prescriptions: tpl.prescriptions,
    carrierProtocol: {
      waterInstructions:
        'Налейте 1 литр чистой воды, прочитайте суру «Аль-Фатиха» (7 раз), Аят аль-Курси (3 раза) и три последние суры (по 3 раза) с легким сухим дуновением (нафс). Пейте небольшими глотками в течение дня.',
      oilInstructions:
        'Начитайте те же аяты на чистое оливковое масло первого отжима и слегка нанесите на область груди, висков или беспокоящую зону перед сном.',
      keySurahs: ['Аль-Фатиха (7x)', 'Аят аль-Курси (3x)', 'Аль-Ихлас / Аль-Фаляк / Ан-Нас (3x)'],
      notes: tpl.carrierNotes,
    },
    expectedReactions: tpl.expectedReactions,
    ethicsNote: tpl.ethicsNote,
    physicalMicroAction: tpl.microAction,
  };
}

export {
  CATEGORIES,
  MULTI_DAY_PACKS,
  HANDBOOK_ROOT_CAUSES,
  HANDBOOK_CLASSIFICATION,
  HANDBOOK_REACTIONS_COMPARISON,
  HANDBOOK_24H_CHECK,
  HANDBOOK_ETHICS,
};
