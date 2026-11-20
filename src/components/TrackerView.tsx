import React from 'react';
import {
  CalendarCheck,
  Check,
  CheckSquare,
  Layers,
  RotateCcw,
  Sparkles,
  Square,
  X,
} from 'lucide-react';
import type { TrackerDayEntry, TrackerState } from '../types/ruqya';

interface TrackerViewProps {
  tracker: TrackerState;
  onUpdateTracker: (next: TrackerState) => void;
  onOpenPacks: () => void;
}

const DAILY_TASKS: {
  key: keyof Pick<
    TrackerDayEntry,
    | 'morningAdhkar'
    | 'eveningAdhkar'
    | 'targetedRuqya'
    | 'waterAndOil'
    | 'baqarahHome'
    | 'microAction'
  >;
  label: string;
  hint: string;
}[] = [
  {
    key: 'morningAdhkar',
    label: 'Утренние азкары + 3x «Бисмилляхи-ллязи ля ядурру...»',
    hint: 'Защита от внезапного вреда на весь световой день (после Фаджра).',
  },
  {
    key: 'eveningAdhkar',
    label: 'Вечерние азкары + 3 последние суры (по 3 раза)',
    hint: 'Аль-Ихлас, Аль-Фаляк и Ан-Нас после Асра/Магриба и перед сном.',
  },
  {
    key: 'targetedRuqya',
    label: 'Прослушивание целевой рукъи или чтение аятов протокола',
    hint: '15–45 минут в спокойной обстановке без отвлечения на соцсети.',
  },
  {
    key: 'waterAndOil',
    label: 'Вода / оливковое масло с начитанными аятами',
    hint: 'Питье воды с нафсом и легкое растирание груди/висков перед сном.',
  },
  {
    key: 'baqarahHome',
    label: 'Сура «Аль-Бакара» дома (напоминание каждые 3 дня)',
    hint: 'Живое чтение или спокойная запись в доме (особенно в дни 1, 4, 7, 10, 13).',
  },
  {
    key: 'microAction',
    label: '1 реальное физическое микро-действие (заземление)',
    hint: 'Конкретный шаг в реальности против иллюзий, прокрастинации или застоя.',
  },
];

const SYMPTOM_TAGS = [
  'Легкость',
  'Ясность ума',
  'Зевота/слезы',
  'Тяжесть',
  'Спокойный сон',
];

export const TrackerView: React.FC<TrackerViewProps> = ({
  tracker,
  onUpdateTracker,
  onOpenPacks,
}) => {
  const currentDay = tracker.currentDay;
  const entry = tracker.days[currentDay] || {
    day: currentDay,
    morningAdhkar: false,
    eveningAdhkar: false,
    targetedRuqya: false,
    waterAndOil: false,
    baqarahHome: false,
    microAction: false,
    symptomTags: [],
    note: '',
  };

  const totalCheckboxes = 14 * DAILY_TASKS.length;
  const completedCheckboxes = React.useMemo(() => {
    let count = 0;
    for (let d = 1; d <= 14; d++) {
      const dayData = tracker.days[d];
      if (!dayData) continue;
      for (const task of DAILY_TASKS) {
        if (dayData[task.key]) count++;
      }
    }
    return count;
  }, [tracker.days]);

  const overallPercent = Math.round((completedCheckboxes / totalCheckboxes) * 100);

  const isBaqarahReminderDay = [1, 4, 7, 10, 13].includes(currentDay);

  const toggleTask = (
    key: keyof Pick<
      TrackerDayEntry,
      | 'morningAdhkar'
      | 'eveningAdhkar'
      | 'targetedRuqya'
      | 'waterAndOil'
      | 'baqarahHome'
      | 'microAction'
    >
  ) => {
    const updatedDay: TrackerDayEntry = {
      ...entry,
      [key]: !entry[key],
    };
    onUpdateTracker({
      ...tracker,
      days: {
        ...tracker.days,
        [currentDay]: updatedDay,
      },
    });
  };

  const toggleSymptomTag = (tag: string) => {
    const exists = entry.symptomTags.includes(tag);
    const nextTags = exists
      ? entry.symptomTags.filter((t) => t !== tag)
      : [...entry.symptomTags, tag];
    onUpdateTracker({
      ...tracker,
      days: {
        ...tracker.days,
        [currentDay]: {
          ...entry,
          symptomTags: nextTags,
        },
      },
    });
  };

  const handleNoteChange = (note: string) => {
    onUpdateTracker({
      ...tracker,
      days: {
        ...tracker.days,
        [currentDay]: {
          ...entry,
          note,
        },
      },
    });
  };

  const handleResetTracker = () => {
    const freshDays: Record<number, TrackerDayEntry> = {};
    for (let i = 1; i <= 14; i++) {
      freshDays[i] = {
        day: i,
        morningAdhkar: false,
        eveningAdhkar: false,
        targetedRuqya: false,
        waterAndOil: false,
        baqarahHome: false,
        microAction: false,
        symptomTags: [],
        note: '',
      };
    }
    onUpdateTracker({
      currentDay: 1,
      activePackId: null,
      activePackTitle: null,
      days: freshDays,
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header & Overall Progress */}
      <div className="bg-white border border-[#E8E4DC] rounded-3xl p-6 sm:p-8 shadow-soft space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C59B27]">
              <CalendarCheck className="w-4 h-4" />
              Ежедневная дисциплина (сохраняется автоматически)
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">
              Трекер 14-дневного тахсина
            </h1>
            <p className="text-sm text-[#64748B]">
              Постоянство в малом — главный секрет духовной защиты и восстановления ясности.
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetTracker}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF8F5] hover:bg-red-50 border border-[#E8E4DC] hover:border-red-200 text-xs font-semibold text-[#64748B] hover:text-red-700 transition-colors self-start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Сбросить прогресс
          </button>
        </div>

        {/* Active Pack Banner */}
        {tracker.activePackTitle ? (
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-[#EBF3F2] border border-[#0F3D3E]/20">
            <div className="flex items-center gap-2 text-sm text-[#0F3D3E]">
              <Layers className="w-4 h-4 text-[#C59B27] shrink-0" />
              <span>
                Активный курс: <strong>{tracker.activePackTitle}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                onUpdateTracker({
                  ...tracker,
                  activePackId: null,
                  activePackTitle: null,
                })
              }
              className="text-xs font-semibold text-[#64748B] hover:text-[#1E293B] inline-flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Отвязать курс
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC]">
            <span className="text-xs sm:text-sm text-[#64748B]">
              Вы можете привязать к трекеру любой из 5 пошаговых пакетов.
            </span>
            <button
              type="button"
              onClick={onOpenPacks}
              className="text-xs font-semibold text-[#0F3D3E] hover:underline"
            >
              Выбрать пакет →
            </button>
          </div>
        )}

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-semibold text-[#1E293B]">
              Общий прогресс за 14 дней
            </span>
            <span className="font-bold text-[#0F3D3E]">
              {completedCheckboxes} / {totalCheckboxes} шагов ({overallPercent}%)
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-[#FAF8F5] border border-[#E8E4DC] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0F3D3E] to-[#165B5C] transition-all duration-300"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>

        {/* 14-Day Selector Grid */}
        <div className="grid grid-cols-7 gap-2 pt-2">
          {Array.from({ length: 14 }, (_, i) => i + 1).map((dayNum) => {
            const dData = tracker.days[dayNum];
            const doneCount = dData
              ? DAILY_TASKS.filter((t) => dData[t.key]).length
              : 0;
            const isSelected = currentDay === dayNum;
            const isFull = doneCount === DAILY_TASKS.length;

            return (
              <button
                key={dayNum}
                type="button"
                onClick={() => onUpdateTracker({ ...tracker, currentDay: dayNum })}
                className={`relative flex flex-col items-center justify-center py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[#0F3D3E] border-[#0F3D3E] text-white shadow-soft scale-[1.03]'
                    : isFull
                      ? 'bg-[#EBF3F2] border-[#0F3D3E]/40 text-[#0F3D3E]'
                      : doneCount > 0
                        ? 'bg-[#FBF6E8] border-[#C59B27]/40 text-[#9A7616]'
                        : 'bg-[#FAF8F5] border-[#E8E4DC] text-[#64748B] hover:border-[#0F3D3E]/30'
                }`}
              >
                <span>Д{dayNum}</span>
                <span className="text-[10px] font-medium opacity-80 mt-0.5">
                  {isFull ? <Check className="w-3 h-3" /> : `${doneCount}/6`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Checklist & Symptom Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white border border-[#E8E4DC] rounded-3xl p-6 sm:p-8 shadow-soft space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E8E4DC]">
            <h2 className="text-xl font-bold text-[#1E293B]">
              День {currentDay}: Ежедневный щит
            </h2>
            {isBaqarahReminderDay && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-[#FBF6E8] text-[#9A7616] border border-[#C59B27]/40">
                <Sparkles className="w-3.5 h-3.5" />
                Сегодня день суры «Аль-Бакара» дома
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            {DAILY_TASKS.map((task) => {
              const checked = entry[task.key];
              return (
                <button
                  key={task.key}
                  type="button"
                  onClick={() => toggleTask(task.key)}
                  className={`w-full text-left flex items-start gap-3.5 p-4 rounded-2xl border transition-all ${
                    checked
                      ? 'bg-[#EBF3F2]/70 border-[#0F3D3E]/40'
                      : 'bg-[#FAF8F5] border-[#E8E4DC] hover:border-[#0F3D3E]/30'
                  }`}
                >
                  {checked ? (
                    <CheckSquare className="w-5 h-5 text-[#0F3D3E] shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-5 h-5 text-[#64748B] shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-0.5">
                    <div
                      className={`font-semibold text-sm sm:text-base ${
                        checked ? 'text-[#0F3D3E]' : 'text-[#1E293B]'
                      }`}
                    >
                      {task.label}
                    </div>
                    <div className="text-xs text-[#64748B]">{task.hint}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Symptom & Release Log */}
        <section className="bg-white border border-[#E8E4DC] rounded-3xl p-6 shadow-soft space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-[#1E293B]">
                Дневник реакций (День {currentDay})
              </h2>
              <p className="text-xs text-[#64748B] mt-1">
                Отмечайте ощущения во время и после практики, чтобы видеть динамику.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {SYMPTOM_TAGS.map((tag) => {
                const active = entry.symptomTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleSymptomTag(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      active
                        ? 'bg-[#0F3D3E] border-[#0F3D3E] text-white'
                        : 'bg-[#FAF8F5] border-[#E8E4DC] text-[#1E293B] hover:border-[#0F3D3E]/40'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="tracker-day-note"
                className="text-xs font-semibold text-[#64748B] block"
              >
                Краткая заметка о дне и снах:
              </label>
              <textarea
                id="tracker-day-note"
                rows={5}
                value={entry.note}
                onChange={(e) => handleNoteChange(e.target.value)}
                placeholder="Например: после начитанной воды ушла тяжесть в плечах, сделал звонок по работе..."
                className="w-full rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] p-3.5 text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#0F3D3E]/30 focus:border-[#0F3D3E]"
              />
            </div>
          </div>

          <div className="text-xs text-[#64748B] bg-[#FBF6E8] border border-[#C59B27]/30 rounded-xl p-3">
            Совет: не прерывайте 14-дневный цикл, если на 2–3 день почувствовали сильную зевоту или облегчение — закрепите щит до конца.
          </div>
        </section>
      </div>
    </div>
  );
};
