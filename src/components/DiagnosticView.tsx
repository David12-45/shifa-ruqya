import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Compass,
  Layers,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  ALL_CONDITIONS,
  CATEGORIES,
  MULTI_DAY_PACKS,
} from '../data/ruqyaCatalog';
import type {
  CategoryId,
  DiagnosticAnswers,
  MultiDayPack,
  SavedDiagnosticResult,
} from '../types/ruqya';

interface DiagnosticViewProps {
  savedResult: SavedDiagnosticResult | null;
  onSaveResult: (result: SavedDiagnosticResult | null) => void;
  onSelectCondition: (id: number) => void;
  onLoadPackToTracker: (pack: MultiDayPack) => void;
}

const TRIGGER_OPTIONS: {
  id: DiagnosticAnswers['keyTrigger'];
  label: string;
  sub: string;
}[] = [
  {
    id: 'chest-grief',
    label: 'Сжатие в груди, тоска, ком слез',
    sub: 'Мысли о конкретном человеке, утрате или сильная обида',
  },
  {
    id: 'throat-freeze',
    label: 'Спазм в горле и «ступор» при разговоре',
    sub: 'Боязнь конфликта, не могу ответить сразу, страх осуждения',
  },
  {
    id: 'brain-fog',
    label: 'Туман в голове, уход в мечты или навязчивый васвас',
    sub: 'Уход от реальности в фантазии или сомнения в омовении/мыслях',
  },
  {
    id: 'dopamine-loop',
    label: 'Опускаются руки, срывы в игры/экраны и откладывание',
    sub: 'Хроническая прокрастинация и быстрый дофамин вместо дела',
  },
  {
    id: 'blocked-doors',
    label: 'Срыв сделок на 99% и утечка денег (та‘тыль)',
    sub: 'Долги, поломки, застой в работе или в создании семьи',
  },
  {
    id: 'prayer-heaviness',
    label: 'Тяжесть при вставании на намаз и потеря вкуса к Корану',
    sub: 'Рассеянность в такбире, свинцовые ноги перед молитвой',
  },
  {
    id: 'body-pain',
    label: 'Спазмы в теле, травмы в спорте, желудок, зубы или глаза',
    sub: 'Внезапный физический спад после похвалы или нагрузок',
  },
  {
    id: 'night-pressure',
    label: 'Сонный паралич (джасум), кошмары, давление дома',
    sub: 'Ночное беспокойство, ссоры на пустом месте, повторяющиеся беды',
  },
];

function computeDiagnosticRecommendation(answers: DiagnosticAnswers): SavedDiagnosticResult {
  const recommendedIds = new Set<number>();

  // Match trigger directly to detailed conditions
  switch (answers.keyTrigger) {
    case 'chest-grief':
      recommendedIds.add(1);
      recommendedIds.add(2);
      recommendedIds.add(20);
      break;
    case 'throat-freeze':
      recommendedIds.add(3);
      recommendedIds.add(14);
      recommendedIds.add(21);
      break;
    case 'brain-fog':
      recommendedIds.add(4);
      recommendedIds.add(16);
      recommendedIds.add(22);
      break;
    case 'dopamine-loop':
      recommendedIds.add(10);
      recommendedIds.add(7);
      recommendedIds.add(15);
      break;
    case 'blocked-doors':
      recommendedIds.add(6);
      recommendedIds.add(13);
      recommendedIds.add(24);
      break;
    case 'prayer-heaviness':
      recommendedIds.add(11);
      recommendedIds.add(25);
      recommendedIds.add(7);
      break;
    case 'body-pain':
      recommendedIds.add(9);
      recommendedIds.add(12);
      recommendedIds.add(26);
      break;
    case 'night-pressure':
      recommendedIds.add(17);
      recommendedIds.add(8);
      recommendedIds.add(19);
      break;
    default:
      recommendedIds.add(6);
      recommendedIds.add(4);
  }

  // Refine with lifeSphere if different
  if (answers.lifeSphere) {
    const sphereMatch = ALL_CONDITIONS.find(
      (c) => c.categoryId === answers.lifeSphere && c.isDetailed && !recommendedIds.has(c.id)
    );
    if (sphereMatch && recommendedIds.size < 3) {
      recommendedIds.add(sphereMatch.id);
    }
  }

  // Refine with Quran reaction
  if (answers.quranReaction === 'irritation') {
    recommendedIds.add(8);
  } else if (answers.quranReaction === 'yawning-sleep' && answers.lifeSphere === 'body-health-sport') {
    recommendedIds.add(9);
  }

  const finalIds = Array.from(recommendedIds).slice(0, 3);

  // Pick matching pack
  let packId = 'pack-1-tatyl-rizq';
  if (answers.lifeSphere === 'heart-grief' || answers.keyTrigger === 'chest-grief') {
    packId = 'pack-2-heart-healing';
  } else if (
    answers.lifeSphere === 'confidence-boundaries' ||
    answers.keyTrigger === 'throat-freeze'
  ) {
    packId = 'pack-4-boundaries-voice';
  } else if (
    answers.lifeSphere === 'body-health-sport' ||
    answers.keyTrigger === 'body-pain'
  ) {
    packId = 'pack-5-athlete-shield';
  } else if (
    answers.lifeSphere === 'mind-focus' ||
    answers.lifeSphere === 'willpower-habits' ||
    answers.keyTrigger === 'brain-fog' ||
    answers.keyTrigger === 'dopamine-loop'
  ) {
    packId = 'pack-3-clarity-focus';
  }

  const onsetText =
    answers.onsetType === 'sudden'
      ? 'Резкое начало после похвалы или события указывает на высокую вероятность сглаза (‘айн) или острого стрессового узла.'
      : answers.onsetType === 'cyclical'
        ? 'Волнообразное повторение сценария характерно для незавершенного цикла (таби‘а) или закрепленной поведенческой петли.'
        : 'Длительное хроническое течение требует спокойной системной работы в течение 14 дней без резких скачков.';

  const reactionText =
    answers.quranReaction === 'yawning-sleep'
      ? 'Зевота и сонливость на Коране — частый признак выхода сглаза или переутомления нервной системы.'
      : answers.quranReaction === 'irritation'
        ? 'Раздражение при чтении — сигнал, что нужно начинать с коротких спокойных отрезков и суры «Аль-Бакара» дома.'
        : answers.quranReaction === 'tingling-tears'
          ? 'Слезы и тепло в теле — мягкий признак отклика сердца и снятия эмоционального зажима.'
          : 'Спокойное восприятие Корана — отличная база для быстрого закрепления дисциплины и тахсина.';

  const timePlan =
    answers.dailyTime === '15min'
      ? 'Утром: 5 мин азкары + 1 стакан начитанной воды. Днем: 10–15 мин экспресс-рукъя + 1 микро-действие. Вечером: 3 последние суры и Аят аль-Курси.'
      : 'Утром: полные азкары + 20 мин чтения/слушания Корана. Днем: 1 реальный шаг по делу. Вечером: глубокий сеанс рукъи (40–45 мин), вода/оливковое масло и сура «Аль-Бакара» дома раз в 3 дня.';

  return {
    completedAt: new Date().toISOString(),
    answers,
    recommendedConditionIds: finalIds,
    recommendedPackId: packId,
    summaryTitle: 'Персональный маршрут исцеления и тахсина',
    summaryText: `${onsetText} ${reactionText}`,
    dailyPlan: [
      timePlan,
      'Отслеживайте ежедневные реакции (легкость, зевота, ясность ума) в 14-дневном трекере.',
      'Соблюдайте принцип «Двух крыльев»: при стойких телесных симптомах подключите врача или психотерапевта.',
    ],
  };
}

export const DiagnosticView: React.FC<DiagnosticViewProps> = ({
  savedResult,
  onSaveResult,
  onSelectCondition,
  onLoadPackToTracker,
}) => {
  const [step, setStep] = React.useState<number>(savedResult ? 6 : 1);
  const [answers, setAnswers] = React.useState<DiagnosticAnswers>(
    savedResult?.answers || {
      lifeSphere: '',
      onsetType: '',
      keyTrigger: '',
      quranReaction: '',
      dailyTime: '',
    }
  );

  const conditionMap = React.useMemo(
    () => new Map(ALL_CONDITIONS.map((c) => [c.id, c])),
    []
  );

  const activeResult = savedResult;

  const handleRestart = () => {
    onSaveResult(null);
    setAnswers({
      lifeSphere: '',
      onsetType: '',
      keyTrigger: '',
      quranReaction: '',
      dailyTime: '',
    });
    setStep(1);
  };

  const handleFinish = (finalAnswers: DiagnosticAnswers) => {
    const result = computeDiagnosticRecommendation(finalAnswers);
    onSaveResult(result);
    setStep(6);
  };

  if (step === 6 && activeResult) {
    const matchedPack =
      MULTI_DAY_PACKS.find((p) => p.id === activeResult.recommendedPackId) ||
      MULTI_DAY_PACKS[0];

    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-16">
        <div className="bg-[#0F3D3E] text-white rounded-3xl p-6 sm:p-8 shadow-elevated space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-[#FBF6E8] border border-[#C59B27]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              Результат диагностики сохранен
            </span>
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Пройти заново
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold">
            {activeResult.summaryTitle}
          </h1>
          <p className="text-sm sm:text-base text-white/85 leading-relaxed">
            {activeResult.summaryText}
          </p>
        </div>

        {/* Recommended 2-3 Protocols */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#1E293B]">
            Рекомендованные протоколы для вас ({activeResult.recommendedConditionIds.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeResult.recommendedConditionIds.map((cid) => {
              const cond = conditionMap.get(cid);
              if (!cond) return null;
              return (
                <div
                  key={cid}
                  className="bg-white border border-[#E8E4DC] rounded-2xl p-5 shadow-soft flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EBF3F2] text-[#0F3D3E]">
                      {cond.sessionFormat}
                    </span>
                    <h3 className="font-bold text-base text-[#1E293B] leading-snug">
                      {cond.titleRu}
                    </h3>
                    <p className="font-arabic text-base text-[#0F3D3E]">{cond.arabicTerm}</p>
                    <p className="text-xs text-[#64748B] leading-relaxed">{cond.hookRu}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectCondition(cid)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0F3D3E] hover:bg-[#165B5C] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5"
                  >
                    Открыть протокол
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Recommended Multi-Day Pack */}
        <section className="bg-gradient-to-br from-[#FBF6E8] to-white border border-[#C59B27]/40 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9A7616]">
              <Layers className="w-4 h-4" />
              Подходящий пошаговый курс • {matchedPack.durationDays} дней
            </div>
            <h2 className="text-xl font-bold text-[#1E293B]">
              Пакет №{matchedPack.number}: {matchedPack.title}
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed">
              {matchedPack.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onLoadPackToTracker(matchedPack)}
            className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#0F3D3E] hover:bg-[#165B5C] text-white text-sm font-semibold shadow-soft transition-colors"
          >
            <CalendarCheck className="w-4 h-4 text-[#C59B27]" />
            Загрузить в 14-дневный трекер
          </button>
        </section>

        {/* Daily Action Plan */}
        <section className="bg-white border border-[#E8E4DC] rounded-3xl p-6 sm:p-8 shadow-soft space-y-4">
          <h2 className="text-lg font-bold text-[#1E293B]">
            Ваш ежедневный план действий
          </h2>
          <ul className="space-y-3">
            {activeResult.dailyPlan.map((stepText, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] text-sm text-[#1E293B]"
              >
                <CheckCircle2 className="w-5 h-5 text-[#0F3D3E] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{stepText}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C59B27]">
          <Compass className="w-4 h-4" />
          Диагностический навигатор
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">
          Подобрать протокол за 5 шагов
        </h1>
        <p className="text-sm text-[#64748B]">
          Шаг {step} из 5 — выберите наиболее точный отклик на текущее состояние.
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-[#E8E4DC] overflow-hidden pt-0">
          <div
            className="h-full bg-[#0F3D3E] transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white border border-[#E8E4DC] rounded-3xl p-6 sm:p-8 shadow-soft space-y-6">
        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#1E293B]">
              1. Какая жизненная сфера сейчас пострадала сильнее всего?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => {
                const selected = answers.lifeSphere === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        lifeSphere: cat.id as CategoryId,
                      }));
                      setStep(2);
                    }}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      selected
                        ? 'bg-[#EBF3F2] border-[#0F3D3E] text-[#0F3D3E]'
                        : 'bg-[#FAF8F5] border-[#E8E4DC] hover:border-[#0F3D3E]/40 text-[#1E293B]'
                    }`}
                  >
                    <div className="font-bold text-sm">{cat.titleRu}</div>
                    <div className="text-xs text-[#64748B] mt-1 line-clamp-2">
                      {cat.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#1E293B]">
              2. Как давно и при каких обстоятельствах это началось?
            </h2>
            <div className="space-y-3">
              {[
                {
                  id: 'sudden' as const,
                  title: 'Резко после похвалы, публикации, конфликта или конкретного события',
                  desc: 'Все было хорошо, а потом как будто «выключили свет» за пару дней.',
                },
                {
                  id: 'chronic' as const,
                  title: 'Тянется хронически годами',
                  desc: 'Давно привык к этому состоянию, но устал так жить и хочу выйти из застоя.',
                },
                {
                  id: 'cyclical' as const,
                  title: 'Повторяется волнами / по одному и тому же сценарию',
                  desc: 'Начинаю с воодушевлением, но в одной и той же точке все срывается.',
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, onsetType: opt.id }));
                    setStep(3);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    answers.onsetType === opt.id
                      ? 'bg-[#EBF3F2] border-[#0F3D3E]'
                      : 'bg-[#FAF8F5] border-[#E8E4DC] hover:border-[#0F3D3E]/40'
                  }`}
                >
                  <div className="font-bold text-sm sm:text-base text-[#1E293B]">
                    {opt.title}
                  </div>
                  <div className="text-xs sm:text-sm text-[#64748B] mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#1E293B]">
              3. Какой ключевой физический или эмоциональный триггер ближе всего?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TRIGGER_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, keyTrigger: opt.id }));
                    setStep(4);
                  }}
                  className={`text-left p-4 rounded-2xl border transition-all ${
                    answers.keyTrigger === opt.id
                      ? 'bg-[#EBF3F2] border-[#0F3D3E]'
                      : 'bg-[#FAF8F5] border-[#E8E4DC] hover:border-[#0F3D3E]/40'
                  }`}
                >
                  <div className="font-bold text-sm text-[#1E293B]">{opt.label}</div>
                  <div className="text-xs text-[#64748B] mt-1">{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#1E293B]">
              4. Как вы обычно реагируете при чтении или прослушивании Корана / рукъи?
            </h2>
            <div className="space-y-3">
              {[
                {
                  id: 'calm' as const,
                  title: 'Спокойствие и тишина',
                  desc: 'Слушаю ровно, без сильных телесных колебаний.',
                },
                {
                  id: 'yawning-sleep' as const,
                  title: 'Внезапная зевота, слезятся глаза или клонит в сон',
                  desc: 'Сложно дослушать без зевоты даже днем, когда выспался.',
                },
                {
                  id: 'irritation' as const,
                  title: 'Раздражение, скука, желание срочно выключить запись',
                  desc: 'Появляется внутреннее сопротивление или беспокойство в теле.',
                },
                {
                  id: 'tingling-tears' as const,
                  title: 'Тепло, покалывание в пальцах/груди или слезы облегчения',
                  desc: 'Ощущается движение тепла и последующий глубокий вздох.',
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, quranReaction: opt.id }));
                    setStep(5);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    answers.quranReaction === opt.id
                      ? 'bg-[#EBF3F2] border-[#0F3D3E]'
                      : 'bg-[#FAF8F5] border-[#E8E4DC] hover:border-[#0F3D3E]/40'
                  }`}
                >
                  <div className="font-bold text-sm sm:text-base text-[#1E293B]">
                    {opt.title}
                  </div>
                  <div className="text-xs sm:text-sm text-[#64748B] mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#1E293B]">
              5. Сколько времени вы готовы уделять практике ежедневно?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  const next = { ...answers, dailyTime: '15min' as const };
                  setAnswers(next);
                  handleFinish(next);
                }}
                className="text-left p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] hover:border-[#0F3D3E] hover:bg-[#EBF3F2]/50 transition-all space-y-2"
              >
                <div className="text-base font-bold text-[#0F3D3E]">
                  До 15 минут в день (Экспресс-ритм)
                </div>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  Короткие целевые аяты, утренние/вечерние азкары, вода и 1 микро-шаг без перегруза.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  const next = { ...answers, dailyTime: '45min' as const };
                  setAnswers(next);
                  handleFinish(next);
                }}
                className="text-left p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] hover:border-[#0F3D3E] hover:bg-[#EBF3F2]/50 transition-all space-y-2"
              >
                <div className="text-base font-bold text-[#0F3D3E]">
                  45+ минут в день (Глубокий курс)
                </div>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  Полноценный аудиосеанс рукъи, сура «Аль-Бакара» в доме, обливание/масло и 14-дневный трекер.
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Back Button */}
        {step > 1 && (
          <div className="pt-2 border-t border-[#E8E4DC] flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#64748B] hover:text-[#1E293B]"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
