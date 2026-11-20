import React from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Copy,
  Droplets,
  ExternalLink,
  Headphones,
  HeartPulse,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import {
  ALL_CONDITIONS,
  CATEGORIES,
  resolveProtocolDetail,
} from '../data/ruqyaCatalog';
import type { CategoryId, QuranicPrescription } from '../types/ruqya';

interface ProtocolViewProps {
  conditionId: number;
  bookmarks: number[];
  onToggleBookmark: (id: number) => void;
  onBackToCatalog: () => void;
  onSelectCategory: (cat: CategoryId) => void;
  onSelectCondition: (id: number) => void;
  onStartTracker: () => void;
}

export const ProtocolView: React.FC<ProtocolViewProps> = ({
  conditionId,
  bookmarks,
  onToggleBookmark,
  onBackToCatalog,
  onSelectCategory,
  onSelectCondition,
  onStartTracker,
}) => {
  const protocol = React.useMemo(
    () => resolveProtocolDetail(conditionId),
    [conditionId]
  );

  const [checkedSymptoms, setCheckedSymptoms] = React.useState<Record<number, boolean>>({});
  const [carrierExpanded, setCarrierExpanded] = React.useState(true);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [conditionId]);

  if (!protocol) {
    return (
      <div className="bg-white border border-[#E8E4DC] rounded-2xl p-10 text-center space-y-4">
        <p className="text-lg font-semibold text-[#1E293B]">Протокол не найден</p>
        <button
          type="button"
          onClick={onBackToCatalog}
          className="px-4 py-2 rounded-xl bg-[#0F3D3E] text-white text-sm font-semibold"
        >
          Вернуться в каталог
        </button>
      </div>
    );
  }

  const category = CATEGORIES.find((c) => c.id === protocol.categoryId);
  const isBookmarked = bookmarks.includes(protocol.id);

  const relatedConditions = ALL_CONDITIONS.filter(
    (c) => c.categoryId === protocol.categoryId && c.id !== protocol.id
  ).slice(0, 3);

  const handleCopyPrescription = async (p: QuranicPrescription) => {
    const text = [
      p.surahRef,
      '',
      p.arabicText,
      '',
      `Транскрипция: ${p.transcriptionRu}`,
      `Смысл: ${p.translationRu}`,
      `Инструкция: ${p.recitationInstruction} (${p.repeatCount})`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedId(p.id);
    window.setTimeout(() => {
      setCopiedId((prev) => (prev === p.id ? null : prev));
    }, 2400);
  };

  const toggleSymptom = (idx: number) => {
    setCheckedSymptoms((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Toast confirmation */}
      {copiedId && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0F3D3E] text-white text-sm font-medium shadow-elevated border border-[#C59B27]/40">
          <Check className="w-4 h-4 text-[#C59B27]" />
          Текст на арабском и транскрипция скопированы
        </div>
      )}

      {/* Breadcrumbs */}
      <nav aria-label="Хлебные крошки" className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-[#64748B]">
        <button
          type="button"
          onClick={onBackToCatalog}
          className="inline-flex items-center gap-1 hover:text-[#0F3D3E] font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Каталог 110
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        {category && (
          <>
            <button
              type="button"
              onClick={() => onSelectCategory(category.id)}
              className="hover:text-[#0F3D3E] truncate max-w-[240px]"
            >
              {category.titleRu}
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
          </>
        )}
        <span className="text-[#1E293B] font-medium truncate max-w-[260px]">
          #{protocol.id} {protocol.titleRu}
        </span>
      </nav>

      {/* 1. Header Product Card */}
      <section className="bg-white border border-[#E8E4DC] rounded-3xl p-6 sm:p-8 shadow-soft space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {category && (
              <button
                type="button"
                onClick={() => onSelectCategory(category.id)}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EBF3F2] text-[#0F3D3E] hover:bg-[#0F3D3E] hover:text-white transition-colors"
              >
                {category.titleRu}
              </button>
            )}
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#FAF8F5] text-[#64748B] border border-[#E8E4DC]">
              {protocol.sessionFormat}
            </span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#FBF6E8] text-[#9A7616] border border-[#C59B27]/30">
              Уровень: {protocol.difficulty}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onToggleBookmark(protocol.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              isBookmarked
                ? 'bg-[#FBF6E8] border-[#C59B27] text-[#9A7616]'
                : 'bg-[#FAF8F5] border-[#E8E4DC] text-[#1E293B] hover:border-[#0F3D3E]/40'
            }`}
          >
            <Bookmark
              className={`w-4 h-4 ${
                isBookmarked ? 'fill-[#C59B27] text-[#C59B27]' : 'text-[#64748B]'
              }`}
            />
            {isBookmarked ? 'Сохранено в избранном' : 'Сохранить протокол'}
          </button>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E293B] leading-tight">
            {protocol.titleRu}
          </h1>
          <div className="flex flex-wrap items-baseline gap-3 pt-1">
            <span className="font-arabic text-2xl sm:text-3xl text-[#0F3D3E]" dir="rtl">
              {protocol.arabicTerm}
            </span>
            <span className="text-sm text-[#64748B] italic">
              ({protocol.transliteration})
            </span>
          </div>
          <p className="text-base text-[#64748B] leading-relaxed pt-2">
            {protocol.hookRu}
          </p>
        </div>
      </section>

      {/* 2. "Узнаете ли вы себя?" (Symptom Checklist) */}
      <section className="bg-white border border-[#E8E4DC] rounded-3xl p-6 sm:p-8 shadow-soft space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-[#1E293B]">
            Узнаете ли вы себя? (Чек-лист симптомов)
          </h2>
          <span className="text-xs text-[#64748B]">
            Отметьте пункты, которые откликаются
          </span>
        </div>

        <ul className="space-y-2.5">
          {protocol.symptoms.map((sym, idx) => {
            const checked = Boolean(checkedSymptoms[idx]);
            return (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => toggleSymptom(idx)}
                  className={`w-full text-left flex items-start gap-3 p-3.5 rounded-2xl border transition-all ${
                    checked
                      ? 'bg-[#EBF3F2]/60 border-[#0F3D3E]/40 text-[#0F3D3E]'
                      : 'bg-[#FAF8F5] border-[#E8E4DC] text-[#1E293B] hover:border-[#0F3D3E]/25'
                  }`}
                >
                  <CheckCircle2
                    className={`w-5 h-5 shrink-0 mt-0.5 ${
                      checked ? 'text-[#0F3D3E]' : 'text-[#C59B27]'
                    }`}
                  />
                  <span className="text-sm sm:text-base leading-relaxed">{sym}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 3. Духовная и психосоматическая механика */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-[#E8E4DC] rounded-3xl p-6 shadow-soft space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0F3D3E]">
            <Sparkles className="w-4 h-4 text-[#C59B27]" />
            Духовная механика (Коран и Сунна)
          </div>
          <h3 className="text-lg font-bold text-[#1E293B]">
            Узлы, васвас и точка уязвимости
          </h3>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
            {protocol.spiritualMechanics}
          </p>
        </div>

        <div className="bg-white border border-[#E8E4DC] rounded-3xl p-6 shadow-soft space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#165B5C]">
            <HeartPulse className="w-4 h-4 text-[#C59B27]" />
            Психосоматика и физиология
          </div>
          <h3 className="text-lg font-bold text-[#1E293B]">
            Реакция нервной системы и мозга
          </h3>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
            {protocol.psychosomaticMechanics}
          </p>
        </div>
      </section>

      {/* 4. Curated Audio Sessions (YouTube Ruqya Links) */}
      <section className="bg-white border border-[#E8E4DC] rounded-3xl p-6 sm:p-8 shadow-soft space-y-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C59B27]">
            <Headphones className="w-4 h-4" />
            Аудиосеансы рукъи
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
            Проверенные чтецы и целевые записи
          </h2>
          <p className="text-sm text-[#64748B]">
            Слушайте в состоянии омовения, без фонового шума. Можно приложить правую ладонь к груди или проблемной зоне.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {protocol.audioSessions.map((session) => (
            <div
              key={session.id}
              className="rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-[#0F3D3E] px-2.5 py-1 rounded-lg bg-[#EBF3F2]">
                    {session.format}
                  </span>
                  <span className="text-[#64748B] font-medium">
                    Длительность: {session.duration}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#1E293B] leading-snug">
                  {session.title}
                </h3>
                <p className="text-sm text-[#0F3D3E] font-medium">
                  Чтец: {session.reciter}{' '}
                  <span className="font-arabic text-base text-[#64748B] ml-1">
                    ({session.reciterArabic})
                  </span>
                </p>
                <p className="text-xs text-[#64748B]">{session.focusNote}</p>
              </div>

              <a
                href={session.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#0F3D3E] hover:bg-[#165B5C] text-white text-sm font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                Открыть запись на YouTube
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Quranic Verse & Sunnah Dua Box */}
      <section className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#C59B27]">
            Коран и достоверная Сунна
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] mt-1">
            Аяты и дуа для самостоятельного чтения
          </h2>
        </div>

        <div className="space-y-4">
          {protocol.prescriptions.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-[#E8E4DC] rounded-3xl p-6 sm:p-8 shadow-soft space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8E4DC]">
                <div>
                  <span className="text-sm font-bold text-[#0F3D3E]">{p.surahRef}</span>
                  <span className="ml-2 text-xs px-2.5 py-0.5 rounded-full bg-[#FBF6E8] text-[#9A7616] border border-[#C59B27]/30 font-medium">
                    {p.repeatCount}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyPrescription(p)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EBF3F2] border border-[#E8E4DC] text-xs sm:text-sm font-semibold text-[#0F3D3E] transition-colors"
                >
                  {copiedId === p.id ? (
                    <>
                      <Check className="w-4 h-4 text-[#0F3D3E]" />
                      Скопировано
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Скопировать текст и транскрипцию
                    </>
                  )}
                </button>
              </div>

              {/* Large readable Arabic with tashkeel */}
              <div
                dir="rtl"
                lang="ar"
                className="font-arabic text-2xl sm:text-3xl text-[#0F3D3E] bg-[#FAF8F5] rounded-2xl p-5 sm:p-6 border border-[#E8E4DC]/80 text-right leading-[2.2]"
              >
                {p.arabicText}
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                    Транскрипция (с ударениями):
                  </span>
                  <p className="text-sm sm:text-base font-medium text-[#1E293B] mt-1 leading-relaxed">
                    {p.transcriptionRu}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                    Смысловой перевод:
                  </span>
                  <p className="text-sm text-[#64748B] mt-1 leading-relaxed">
                    {p.translationRu}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#EBF3F2]/60 border border-[#0F3D3E]/15 p-4 text-sm text-[#0F3D3E]">
                  <strong>Как читать:</strong> {p.recitationInstruction}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Self-Help Carrier Protocol (Water & Olive Oil) */}
      <section className="bg-white border border-[#E8E4DC] rounded-3xl shadow-soft overflow-hidden">
        <button
          type="button"
          onClick={() => setCarrierExpanded((v) => !v)}
          className="w-full px-6 sm:px-8 py-5 flex items-center justify-between gap-4 text-left hover:bg-[#FAF8F5]/60 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3F2] text-[#0F3D3E] flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#1E293B]">
                Протокол самопомощи: вода и оливковое масло с начитанными аятами
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B]">
                Аль-Фатиха ×7, Аят аль-Курси ×3, Аль-Ихлас / Аль-Фаляк / Ан-Нас ×3 с легким сухим дуновением (нафс)
              </p>
            </div>
          </div>
          {carrierExpanded ? (
            <ChevronUp className="w-5 h-5 text-[#64748B] shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#64748B] shrink-0" />
          )}
        </button>

        {carrierExpanded && (
          <div className="px-6 sm:px-8 pb-6 pt-2 border-t border-[#E8E4DC] space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] space-y-1.5">
                <h3 className="font-bold text-sm text-[#0F3D3E]">1. Питьевая вода (нафс)</h3>
                <p className="text-sm text-[#1E293B] leading-relaxed">
                  {protocol.carrierProtocol.waterInstructions}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] space-y-1.5">
                <h3 className="font-bold text-sm text-[#0F3D3E]">2. Оливковое масло первого отжима</h3>
                <p className="text-sm text-[#1E293B] leading-relaxed">
                  {protocol.carrierProtocol.oilInstructions}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-[#64748B]">Базовый набор сур:</span>
              {protocol.carrierProtocol.keySurahs.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-lg bg-[#EBF3F2] text-[#0F3D3E] font-medium"
                >
                  {s}
                </span>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-[#64748B] italic">
              Примечание: {protocol.carrierProtocol.notes}
            </p>
          </div>
        )}
      </section>

      {/* 7. Expected Reactions, Physical Micro-Action & Two-Wings Ethics */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-[#E8E4DC] rounded-3xl p-6 shadow-soft space-y-4">
          <h2 className="text-lg font-bold text-[#1E293B]">
            Ожидаемые реакции освобождения
          </h2>
          <ul className="space-y-2 text-sm text-[#64748B]">
            {protocol.expectedReactions.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#C59B27] mt-2 shrink-0" />
                <span className="leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-[#E8E4DC] space-y-2">
            <h3 className="text-sm font-bold text-[#0F3D3E]">
              1 реальное микро-действие сегодня (заземление):
            </h3>
            <p className="text-sm text-[#1E293B] bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E8E4DC]">
              {protocol.physicalMicroAction}
            </p>
          </div>
        </div>

        <div className="bg-[#FBF6E8] border border-[#C59B27]/40 rounded-3xl p-6 shadow-soft flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9A7616]">
              <Stethoscope className="w-4 h-4" />
              Этика «Двух крыльев» (Коран + Медицина)
            </div>
            <h2 className="text-lg font-bold text-[#1E293B]">
              Важное шариатское и медицинское напоминание
            </h2>
            <p className="text-sm text-[#1E293B]/90 leading-relaxed">
              {protocol.ethicsNote}
            </p>
            <div className="flex items-start gap-2 text-xs text-[#9A7616] pt-1">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Шариатская рукъя укрепляет дух и не заменяет обращение к врачу или психотерапевту. Остерегайтесь колдунов, гадалок и амулетов.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onStartTracker}
            className="w-full py-3 px-4 rounded-xl bg-[#0F3D3E] hover:bg-[#165B5C] text-white text-sm font-semibold transition-colors inline-flex items-center justify-center gap-2"
          >
            <CalendarCheck className="w-4 h-4 text-[#C59B27]" />
            Отслеживать практику в 14-дневном трекере
          </button>
        </div>
      </section>

      {/* Related Conditions */}
      {relatedConditions.length > 0 && (
        <section className="space-y-4 pt-2">
          <h2 className="text-lg font-bold text-[#1E293B]">
            Похожие состояния из этой категории
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedConditions.map((rel) => (
              <button
                key={rel.id}
                type="button"
                onClick={() => onSelectCondition(rel.id)}
                className="text-left bg-white border border-[#E8E4DC] rounded-2xl p-4 shadow-soft hover:border-[#0F3D3E]/40 transition-all space-y-2"
              >
                <div className="font-bold text-sm text-[#1E293B]">{rel.titleRu}</div>
                <div className="font-arabic text-sm text-[#0F3D3E]">{rel.arabicTerm}</div>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F3D3E]">
                  Открыть <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
