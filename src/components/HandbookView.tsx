import React from 'react';
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Compass,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import {
  HANDBOOK_24H_CHECK,
  HANDBOOK_CLASSIFICATION,
  HANDBOOK_ETHICS,
  HANDBOOK_REACTIONS_COMPARISON,
  HANDBOOK_ROOT_CAUSES,
} from '../data/ruqyaCatalog';

interface HandbookViewProps {
  onNavigateDiagnostic: () => void;
  onNavigateCatalogSearch: (query: string) => void;
}

export const HandbookView: React.FC<HandbookViewProps> = ({
  onNavigateDiagnostic,
  onNavigateCatalogSearch,
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C59B27]">
          <BookOpen className="w-4 h-4" />
          Методология и шариатская база
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">
          Справочник симптомов, классификации и реакций
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] max-w-3xl">
          Системное руководство по различению духовных причин и психосоматики без суеверий,
          страха и сомнительных практик.
        </p>
      </div>

      {/* 1. The 4 Root Causes */}
      <section className="space-y-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
            1. Четыре коренные духовные причины (по Корану и Сунне)
          </h2>
          <p className="text-sm text-[#64748B] mt-1">
            Любое духовное беспокойство сводится к одному из четырех корней — важно знать их маркеры.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {HANDBOOK_ROOT_CAUSES.map((cause) => (
            <article
              key={cause.id}
              className="bg-white border border-[#E8E4DC] rounded-3xl p-6 shadow-soft space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-baseline justify-between gap-2 border-b border-[#E8E4DC] pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#0F3D3E]">{cause.titleRu}</h3>
                    <span className="text-xs text-[#64748B] italic">
                      ({cause.transliteration})
                    </span>
                  </div>
                  <span className="font-arabic text-2xl text-[#0F3D3E]" dir="rtl">
                    {cause.arabic}
                  </span>
                </div>

                <p className="text-sm text-[#1E293B] leading-relaxed">{cause.summary}</p>

                <ul className="space-y-1.5 text-xs sm:text-sm text-[#64748B]">
                  {cause.signs.map((sign, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] mt-2 shrink-0" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] p-3 text-xs text-[#0F3D3E] font-medium">
                {cause.propheticNote}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 2. Diagnostic Classification Table */}
      <section className="space-y-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
            2. Диагностическая таблица классических терминов
          </h2>
          <p className="text-sm text-[#64748B] mt-1">
            Нажмите на любой термин, чтобы найти соответствующие протоколы в каталоге.
          </p>
        </div>

        <div className="bg-white border border-[#E8E4DC] rounded-3xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E8E4DC] text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  <th className="py-4 px-5">Термин / Арабский</th>
                  <th className="py-4 px-5">Суть состояния</th>
                  <th className="py-4 px-5">Ключевой маркер</th>
                  <th className="py-4 px-5">Тактика работы</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4DC] text-sm">
                {HANDBOOK_CLASSIFICATION.map((row) => (
                  <tr
                    key={row.termRu}
                    className="hover:bg-[#EBF3F2]/30 transition-colors"
                  >
                    <td className="py-4 px-5 align-top">
                      <button
                        type="button"
                        onClick={() => onNavigateCatalogSearch(row.translit)}
                        className="text-left group"
                      >
                        <div className="font-bold text-[#0F3D3E] group-hover:underline">
                          {row.termRu}
                        </div>
                        <div className="font-arabic text-lg text-[#165B5C]">
                          {row.arabic}
                        </div>
                      </button>
                    </td>
                    <td className="py-4 px-5 align-top text-[#1E293B]">{row.meaning}</td>
                    <td className="py-4 px-5 align-top text-[#64748B]">{row.keyMarker}</td>
                    <td className="py-4 px-5 align-top text-[#0F3D3E] font-medium">
                      {row.primaryApproach}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. Reactions During Ruqya Guide */}
      <section className="space-y-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
            3. Реакции во время рукъи: реальное освобождение или имитация?
          </h2>
          <p className="text-sm text-[#64748B] mt-1">
            Как отличить подлинное облегчение от временного затаивания или маскировки симптома.
          </p>
        </div>

        <div className="bg-white border border-[#E8E4DC] rounded-3xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E8E4DC] text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 px-5 text-[#64748B]">Критерий</th>
                  <th className="py-4 px-5 text-[#0F3D3E]">Реальное освобождение</th>
                  <th className="py-4 px-5 text-[#9A7616]">Имитация и затаивание</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4DC] text-sm">
                {HANDBOOK_REACTIONS_COMPARISON.map((row, i) => (
                  <tr key={i}>
                    <td className="py-4 px-5 font-semibold text-[#1E293B] align-top">
                      {row.aspect}
                    </td>
                    <td className="py-4 px-5 text-[#1E293B] bg-[#EBF3F2]/25 align-top">
                      {row.genuine}
                    </td>
                    <td className="py-4 px-5 text-[#64748B] bg-[#FBF6E8]/40 align-top">
                      {row.masking}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 24-Hour Verification Check */}
        <div className="bg-[#EBF3F2]/60 border border-[#0F3D3E]/20 rounded-3xl p-6 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F3D3E]">
            <Sparkles className="w-4 h-4 text-[#C59B27]" />
            24-часовая проверка результата
          </div>
          <ul className="space-y-2 text-sm text-[#1E293B]">
            {HANDBOOK_24H_CHECK.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0F3D3E] shrink-0 mt-1" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Shariah Ethics & Safe Sharing Guidelines */}
      <section className="bg-[#FBF6E8] border border-[#C59B27]/40 rounded-3xl p-6 sm:p-8 shadow-soft space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9A7616]">
          <ShieldAlert className="w-4 h-4" />
          4. Шариатская этика, таухид и безопасная помощь людям
        </div>
        <h2 className="text-xl font-bold text-[#1E293B]">
          Границы дозволенного в рукъе и передаче знаний
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HANDBOOK_ETHICS.map((rule, idx) => (
            <div
              key={idx}
              className="bg-white/90 border border-[#E8E4DC] rounded-2xl p-4 flex items-start gap-3 text-sm text-[#1E293B]"
            >
              <AlertCircle className="w-4 h-4 text-[#C59B27] shrink-0 mt-1" />
              <span className="leading-relaxed">{rule}</span>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onNavigateDiagnostic}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F3D3E] hover:bg-[#165B5C] text-white text-sm font-semibold transition-colors"
          >
            <Compass className="w-4 h-4 text-[#C59B27]" />
            Подобрать протокол по своим симптомам
          </button>
        </div>
      </section>
    </div>
  );
};
