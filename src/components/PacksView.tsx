import React from 'react';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ALL_CONDITIONS, MULTI_DAY_PACKS } from '../data/ruqyaCatalog';
import type { MultiDayPack } from '../types/ruqya';

interface PacksViewProps {
  activePackId: string | null;
  onLoadPackToTracker: (pack: MultiDayPack) => void;
  onSelectCondition: (id: number) => void;
}

export const PacksView: React.FC<PacksViewProps> = ({
  activePackId,
  onLoadPackToTracker,
  onSelectCondition,
}) => {
  const conditionMap = React.useMemo(
    () => new Map(ALL_CONDITIONS.map((c) => [c.id, c])),
    []
  );

  return (
    <div className="space-y-8 pb-16">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#C59B27]">
          Пошаговые программы (7–14 дней)
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-1">
          Курсы и целевые пакеты исцеления
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] mt-1 max-w-3xl">
          Готовые поэтапные маршруты, соединяющие аудио-рукъю, ежедневные цели зикра и реальные
          земные микро-действия. Загрузите любой пакет в свой 14-дневный трекер одним кликом.
        </p>
      </div>

      <div className="space-y-6">
        {MULTI_DAY_PACKS.map((pack) => {
          const isActiveInTracker = activePackId === pack.id;
          return (
            <section
              key={pack.id}
              className="bg-white border border-[#E8E4DC] rounded-3xl p-6 sm:p-8 shadow-soft space-y-6"
            >
              {/* Top Pack Header */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 pb-5 border-b border-[#E8E4DC]">
                <div className="space-y-2.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#0F3D3E] text-white">
                      <Layers className="w-3.5 h-3.5 text-[#C59B27]" />
                      Пакет №{pack.number}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FBF6E8] text-[#9A7616] border border-[#C59B27]/30">
                      Длительность: {pack.durationDays} дней
                    </span>
                    <span className="font-arabic text-base text-[#0F3D3E] ml-1">
                      {pack.arabicBadge}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
                    {pack.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                    {pack.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#1E293B] bg-[#FAF8F5] px-4 py-2.5 rounded-xl border border-[#E8E4DC]">
                    <strong>Кому подходит:</strong> {pack.targetAudience}
                  </p>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => onLoadPackToTracker(pack)}
                    className={`w-full lg:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all shadow-soft ${
                      isActiveInTracker
                        ? 'bg-[#EBF3F2] text-[#0F3D3E] border border-[#0F3D3E]/40'
                        : 'bg-[#0F3D3E] hover:bg-[#165B5C] text-white'
                    }`}
                  >
                    {isActiveInTracker ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#0F3D3E]" />
                        Активен в трекере (Открыть)
                      </>
                    ) : (
                      <>
                        <CalendarCheck className="w-4 h-4 text-[#C59B27]" />
                        Загрузить в мой 14-дневный трекер
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Day-by-Day Timeline */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                  Поэтапный план прохождения:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pack.timeline.map((phase, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] p-5 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#0F3D3E] text-white">
                            {phase.dayRange}
                          </span>
                          <span className="text-xs text-[#64748B] font-medium">
                            {phase.dailyAudioReciter}
                          </span>
                        </div>
                        <h4 className="font-bold text-base text-[#1E293B]">
                          {phase.phaseTitle}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                          {phase.goal}
                        </p>

                        <div className="pt-2 space-y-1.5 text-xs text-[#1E293B]">
                          <div className="flex items-start gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mt-0.5" />
                            <span>
                              <strong>Зикр:</strong> {phase.dhikrTarget}
                            </span>
                          </div>
                          <div className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0F3D3E] shrink-0 mt-0.5" />
                            <span>
                              <strong>Действие:</strong> {phase.microAction}
                            </span>
                          </div>
                        </div>
                      </div>

                      <a
                        href={phase.dailyAudioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E8E4DC] hover:border-[#0F3D3E]/40 text-xs font-semibold text-[#0F3D3E] transition-colors"
                      >
                        <span className="truncate">{phase.dailyAudioTitle}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Linked Conditions */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[#64748B] mr-1">
                  Включенные протоколы:
                </span>
                {pack.linkedConditionIds.map((cid) => {
                  const cond = conditionMap.get(cid);
                  if (!cond) return null;
                  return (
                    <button
                      key={cid}
                      type="button"
                      onClick={() => onSelectCondition(cid)}
                      className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-xl bg-[#EBF3F2]/70 hover:bg-[#0F3D3E] text-[#0F3D3E] hover:text-white transition-colors"
                    >
                      <span>{cond.titleRu}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
