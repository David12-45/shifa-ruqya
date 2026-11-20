import React from 'react';
import {
  ArrowRight,
  Compass,
  Layers,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import {
  ALL_CONDITIONS,
  CATEGORIES,
  MULTI_DAY_PACKS,
} from '../data/ruqyaCatalog';
import type { CategoryId, ConditionSummary } from '../types/ruqya';
import { searchConditions } from '../utils/search';
import { CategoryIcon } from './CategoryIcon';

interface HomeViewProps {
  onSelectCondition: (conditionId: number) => void;
  onSelectCategory: (categoryId: CategoryId) => void;
  onNavigateDiagnostic: () => void;
  onNavigatePacks: () => void;
  onNavigateCatalogWithSearch: (query: string) => void;
  onNavigateHandbook: () => void;
}

const POPULAR_SEARCH_PILLS = [
  'не могу забыть человека',
  'боюсь конфликтов',
  'деньги утекают сквозь пальцы',
  'опускаю руки и ухожу в мечты',
  'сглаз на спортивные достижения',
  'та‘тыль',
  'васвас',
  'التعطيل',
  'الحسد',
];

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectCondition,
  onSelectCategory,
  onNavigateDiagnostic,
  onNavigatePacks,
  onNavigateCatalogWithSearch,
  onNavigateHandbook,
}) => {
  const [query, setQuery] = React.useState('');

  const searchResults: ConditionSummary[] = React.useMemo(() => {
    if (!query.trim()) return [];
    return searchConditions(ALL_CONDITIONS, query).slice(0, 8);
  }, [query]);

  const totalSearchMatches = React.useMemo(() => {
    if (!query.trim()) return 0;
    return searchConditions(ALL_CONDITIONS, query).length;
  }, [query]);

  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of ALL_CONDITIONS) {
      counts[c.categoryId] = (counts[c.categoryId] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="space-y-14 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-[#0F3D3E] text-white px-6 py-10 sm:px-10 sm:py-14 shadow-elevated">
        {/* Subtle decorative geometric arc */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full border border-[#C59B27]/20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-20 w-72 h-72 rounded-full bg-[#165B5C]/60 blur-2xl"
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C59B27]/40 text-xs sm:text-sm text-[#FBF6E8]">
            <span className="font-arabic text-base text-[#C59B27]">بِسْمِ اللَّهِ</span>
            <span>Проблемно-ориентированный навигатор по Корану и Сунне</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Навигатор шариатской рукъи и духовного исцеления
          </h1>

          <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            Системная база из {ALL_CONDITIONS.length} состояний: от сглаза, блокировки дел
            (та‘тыль) и тревоги до боли утраты и потери веры в себя.
          </p>

          {/* Live Instant Search Bar */}
          <div className="relative max-w-2xl mx-auto pt-2 text-left">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#64748B] absolute left-4 pointer-events-none" />
              <input
                id="hero-instant-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Опишите состояние, симптом, термин (та‘тыль, васвас, التعطيل)..."
                className="w-full pl-12 pr-28 py-4 rounded-2xl bg-white text-[#1E293B] placeholder:text-[#64748B] text-sm sm:text-base shadow-elevated focus:outline-none focus:ring-2 focus:ring-[#C59B27]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-24 p-1.5 text-[#64748B] hover:text-[#1E293B]"
                  aria-label="Очистить поиск"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => onNavigateCatalogWithSearch(query)}
                className="absolute right-2 px-3.5 py-2 rounded-xl bg-[#0F3D3E] hover:bg-[#165B5C] text-white text-xs sm:text-sm font-medium transition-colors"
              >
                Найти
              </button>
            </div>

            {/* Instant Search Dropdown */}
            {query.trim().length > 0 && (
              <div className="mt-2 rounded-2xl bg-white text-[#1E293B] border border-[#E8E4DC] shadow-elevated overflow-hidden">
                {searchResults.length === 0 ? (
                  <div className="p-5 text-center space-y-2">
                    <p className="text-sm font-medium text-[#1E293B]">
                      По запросу «{query}» точных совпадений не найдено.
                    </p>
                    <p className="text-xs text-[#64748B]">
                      Попробуйте пройти диагностику из 5 вопросов или выберите категорию ниже.
                    </p>
                    <button
                      type="button"
                      onClick={onNavigateDiagnostic}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F3D3E] hover:underline"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      Пройти диагностический подбор
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="px-4 py-2.5 bg-[#FAF8F5] border-b border-[#E8E4DC] flex items-center justify-between text-xs text-[#64748B]">
                      <span>Найдено состояний: {totalSearchMatches}</span>
                      {totalSearchMatches > 8 && (
                        <button
                          type="button"
                          onClick={() => onNavigateCatalogWithSearch(query)}
                          className="font-semibold text-[#0F3D3E] hover:underline"
                        >
                          Показать все в каталоге →
                        </button>
                      )}
                    </div>
                    <ul className="divide-y divide-[#E8E4DC] max-h-80 overflow-y-auto scrollbar-thin">
                      {searchResults.map((item) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => onSelectCondition(item.id)}
                            className="w-full px-4 py-3 text-left hover:bg-[#EBF3F2]/50 transition-colors flex items-start justify-between gap-3"
                          >
                            <div className="space-y-0.5">
                              <div className="font-semibold text-sm text-[#1E293B]">
                                {item.titleRu}
                              </div>
                              <div className="text-xs text-[#64748B] line-clamp-1">
                                {item.hookRu}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="font-arabic text-base text-[#0F3D3E] leading-snug">
                                {item.arabicTerm}
                              </div>
                              <div className="text-[11px] text-[#64748B]">
                                {item.transliteration}
                              </div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Quick-Click Popular Search Pills */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-white/70 mr-1">Частые запросы:</span>
              {POPULAR_SEARCH_PILLS.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  onClick={() => setQuery(pill)}
                  className="px-3 py-1 rounded-full text-xs bg-white/10 hover:bg-white/20 text-[#FAF8F5] border border-white/15 transition-colors"
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8-Category Directory Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#C59B27]">
              Навигация по жизненной задаче
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-1">
              8 сфер исцеления и защиты
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigateCatalogWithSearch('')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F3D3E] hover:text-[#165B5C]"
          >
            Открыть все {ALL_CONDITIONS.length} состояний
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className="group text-left bg-white border border-[#E8E4DC] rounded-2xl p-5 shadow-soft hover:shadow-elevated hover:border-[#0F3D3E]/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF3F2] text-[#0F3D3E] flex items-center justify-center group-hover:bg-[#0F3D3E] group-hover:text-white transition-colors">
                      <CategoryIcon name={cat.iconName} className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAF8F5] text-[#0F3D3E] border border-[#E8E4DC]">
                      {count} состояний
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#1E293B] text-base leading-snug group-hover:text-[#0F3D3E] transition-colors">
                      {cat.titleRu}
                    </h3>
                    <p className="font-arabic text-base text-[#165B5C] mt-1 leading-normal">
                      {cat.arabicTerm}
                    </p>
                  </div>

                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E4DC]/70 flex items-center justify-between text-xs font-semibold text-[#0F3D3E]">
                  <span>Смотреть протоколы</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Diagnostic Navigator CTA */}
      <section className="rounded-3xl bg-gradient-to-br from-[#FBF6E8] to-white border border-[#C59B27]/35 p-6 sm:p-10 shadow-soft">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9A7616]">
              <Compass className="w-4 h-4" />
              Интерактивный подбор за 1 минуту
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">
              Не знаете, с какого протокола начать?
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              Ответьте на 5 точных вопросов о том, как давно появилась проблема, какие телесные
              триггеры возникают и как вы реагируете на чтение Корана — алгоритм подберет 2–3
              точных протокола, курс и план на каждый день.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={onNavigateDiagnostic}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0F3D3E] hover:bg-[#165B5C] text-white font-semibold text-sm sm:text-base shadow-soft transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#C59B27]" />
              Подобрать протокол (5 шагов)
            </button>
            <button
              type="button"
              onClick={onNavigateHandbook}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white border border-[#E8E4DC] hover:border-[#0F3D3E]/40 text-[#1E293B] font-semibold text-sm transition-all"
            >
              Изучить 4 причины и симптомы
            </button>
          </div>
        </div>
      </section>

      {/* Featured Multi-Day Packs Preview */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#C59B27]">
              Системные программы
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-1">
              Пошаговые курсы и пакеты (7–14 дней)
            </h2>
          </div>
          <button
            type="button"
            onClick={onNavigatePacks}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F3D3E] hover:text-[#165B5C]"
          >
            Все 5 пакетов
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MULTI_DAY_PACKS.slice(0, 3).map((pack) => (
            <div
              key={pack.id}
              className="bg-white border border-[#E8E4DC] rounded-2xl p-6 shadow-soft flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EBF3F2] text-[#0F3D3E]">
                    <Layers className="w-3.5 h-3.5" />
                    Пакет №{pack.number}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FBF6E8] text-[#9A7616] border border-[#C59B27]/30">
                    {pack.durationDays} дней
                  </span>
                </div>

                <h3 className="font-bold text-lg text-[#1E293B] leading-snug">
                  {pack.title}
                </h3>

                <p className="font-arabic text-base text-[#165B5C] leading-normal">
                  {pack.arabicBadge}
                </p>

                <p className="text-sm text-[#64748B] leading-relaxed">
                  {pack.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={onNavigatePacks}
                className="w-full py-2.5 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#0F3D3E] text-[#0F3D3E] hover:text-white border border-[#E8E4DC] hover:border-[#0F3D3E] text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                Открыть программу пакета
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
