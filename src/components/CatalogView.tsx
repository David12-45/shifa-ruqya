import React from 'react';
import {
  ArrowRight,
  Bookmark,
  Clock,
  Filter,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { ALL_CONDITIONS, CATEGORIES } from '../data/ruqyaCatalog';
import type { CategoryId, DifficultyLevel, SessionFormat } from '../types/ruqya';
import { searchConditions } from '../utils/search';

interface CatalogViewProps {
  selectedCategory: CategoryId | 'all';
  onChangeCategory: (cat: CategoryId | 'all') => void;
  searchQuery: string;
  onChangeSearchQuery: (q: string) => void;
  onlySaved: boolean;
  onToggleOnlySaved: (val: boolean) => void;
  bookmarks: number[];
  onToggleBookmark: (id: number) => void;
  onSelectCondition: (id: number) => void;
}

const DIFFICULTIES: ('Все' | DifficultyLevel)[] = [
  'Все',
  'Начальный',
  'Средний',
  'Глубокий',
];

const FORMATS: ('Все' | SessionFormat)[] = [
  'Все',
  'Экспресс до 15 мин',
  'Глубокий сеанс 45 мин',
  'На ночь',
];

export const CatalogView: React.FC<CatalogViewProps> = ({
  selectedCategory,
  onChangeCategory,
  searchQuery,
  onChangeSearchQuery,
  onlySaved,
  onToggleOnlySaved,
  bookmarks,
  onToggleBookmark,
  onSelectCondition,
}) => {
  const [difficultyFilter, setDifficultyFilter] = React.useState<'Все' | DifficultyLevel>('Все');
  const [formatFilter, setFormatFilter] = React.useState<'Все' | SessionFormat>('Все');

  const categoryMap = React.useMemo(
    () => new Map(CATEGORIES.map((c) => [c.id, c])),
    []
  );

  const categoryCounts = React.useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of ALL_CONDITIONS) {
      map[c.categoryId] = (map[c.categoryId] || 0) + 1;
    }
    return map;
  }, []);

  const filteredConditions = React.useMemo(() => {
    let list = searchQuery.trim()
      ? searchConditions(ALL_CONDITIONS, searchQuery)
      : ALL_CONDITIONS;

    if (selectedCategory !== 'all') {
      list = list.filter((item) => item.categoryId === selectedCategory);
    }
    if (difficultyFilter !== 'Все') {
      list = list.filter((item) => item.difficulty === difficultyFilter);
    }
    if (formatFilter !== 'Все') {
      list = list.filter((item) => item.sessionFormat === formatFilter);
    }
    if (onlySaved) {
      list = list.filter((item) => bookmarks.includes(item.id));
    }
    return list;
  }, [
    searchQuery,
    selectedCategory,
    difficultyFilter,
    formatFilter,
    onlySaved,
    bookmarks,
  ]);

  const resetFilters = () => {
    onChangeCategory('all');
    onChangeSearchQuery('');
    setDifficultyFilter('Все');
    setFormatFilter('Все');
    onToggleOnlySaved(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#C59B27]">
            Полный справочник проблем и состояний
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-1">
            Каталог {ALL_CONDITIONS.length} состояний
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Ищите по жизненной ситуации, симптому, арабскому термину или транскрипции.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleOnlySaved(!onlySaved)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
              onlySaved
                ? 'bg-[#FBF6E8] border-[#C59B27] text-[#9A7616]'
                : 'bg-white border-[#E8E4DC] text-[#1E293B] hover:border-[#0F3D3E]/40'
            }`}
          >
            <Bookmark
              className={`w-4 h-4 ${
                onlySaved ? 'fill-[#C59B27] text-[#C59B27]' : 'text-[#64748B]'
              }`}
            />
            Избранное ({bookmarks.length})
          </button>
        </div>
      </div>

      {/* Filter & Search Box */}
      <div className="bg-white border border-[#E8E4DC] rounded-2xl p-5 shadow-soft space-y-5">
        <div className="relative">
          <Search className="w-4 h-4 text-[#64748B] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            id="catalog-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onChangeSearchQuery(e.target.value)}
            placeholder="Поиск по каталогу: например, та‘тыль, сглаз на спорт, не могу забыть, الحسد..."
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] text-sm text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#0F3D3E]/30 focus:border-[#0F3D3E]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onChangeSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#1E293B]"
              aria-label="Сбросить строку поиска"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B]">
            <Filter className="w-3.5 h-3.5" />
            <span>Категория:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onChangeCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#0F3D3E] text-white shadow-soft'
                  : 'bg-[#FAF8F5] text-[#1E293B] border border-[#E8E4DC] hover:border-[#0F3D3E]/40'
              }`}
            >
              Все ({ALL_CONDITIONS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onChangeCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#0F3D3E] text-white shadow-soft'
                    : 'bg-[#FAF8F5] text-[#1E293B] border border-[#E8E4DC] hover:border-[#0F3D3E]/40'
                }`}
              >
                {cat.titleRu} ({categoryCounts[cat.id] || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Depth & Session Format */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#E8E4DC]/70">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#64748B] block">
              Глубина проработки:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {DIFFICULTIES.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setDifficultyFilter(lvl)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    difficultyFilter === lvl
                      ? 'bg-[#165B5C] text-white'
                      : 'bg-[#FAF8F5] text-[#1E293B] border border-[#E8E4DC] hover:border-[#165B5C]/40'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#64748B] block">
              Формат сеанса:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {FORMATS.map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormatFilter(fmt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    formatFilter === fmt
                      ? 'bg-[#165B5C] text-white'
                      : 'bg-[#FAF8F5] text-[#1E293B] border border-[#E8E4DC] hover:border-[#165B5C]/40'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-[#64748B]">
        <span>
          Показано протоколов: <strong className="text-[#1E293B]">{filteredConditions.length}</strong> из {ALL_CONDITIONS.length}
        </span>
        {(selectedCategory !== 'all' ||
          searchQuery ||
          difficultyFilter !== 'Все' ||
          formatFilter !== 'Все' ||
          onlySaved) && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-xs font-semibold text-[#0F3D3E] hover:underline"
          >
            Сбросить фильтры
          </button>
        )}
      </div>

      {/* Cards Grid */}
      {filteredConditions.length === 0 ? (
        <div className="bg-white border border-[#E8E4DC] rounded-2xl p-10 text-center space-y-3">
          <p className="text-base font-semibold text-[#1E293B]">
            По выбранным фильтрам состояния не найдены
          </p>
          <p className="text-sm text-[#64748B]">
            Попробуйте сбросить часть фильтров или проверьте вкладку «Избранное».
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-[#0F3D3E] text-white text-sm font-semibold"
          >
            Показать все 110 состояний
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredConditions.map((item) => {
            const cat = categoryMap.get(item.categoryId);
            const isSaved = bookmarks.includes(item.id);
            return (
              <article
                key={item.id}
                className="bg-white border border-[#E8E4DC] rounded-2xl p-5 shadow-soft hover:shadow-elevated hover:border-[#0F3D3E]/35 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#FAF8F5] text-[#64748B] border border-[#E8E4DC]">
                        #{item.id} • {cat?.titleRu}
                      </span>
                      {item.isDetailed && (
                        <span
                          className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FBF6E8] text-[#9A7616] border border-[#C59B27]/30"
                          title="Расширенный авторский разбор"
                        >
                          <Sparkles className="w-3 h-3" />
                          Полный разбор
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleBookmark(item.id)}
                      className="p-1.5 rounded-lg hover:bg-[#FAF8F5] transition-colors shrink-0"
                      aria-label={isSaved ? 'Удалить из избранного' : 'Сохранить в избранное'}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          isSaved ? 'fill-[#C59B27] text-[#C59B27]' : 'text-[#64748B]'
                        }`}
                      />
                    </button>
                  </div>

                  <div>
                    <h2
                      onClick={() => onSelectCondition(item.id)}
                      className="font-bold text-base sm:text-lg text-[#1E293B] leading-snug cursor-pointer hover:text-[#0F3D3E] transition-colors"
                    >
                      {item.titleRu}
                    </h2>
                    <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
                      <span className="font-arabic text-base text-[#0F3D3E] leading-snug">
                        {item.arabicTerm}
                      </span>
                      <span className="text-xs text-[#64748B] italic">
                        ({item.transliteration})
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {item.hookRu}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#E8E4DC]/80 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EBF3F2] text-[#0F3D3E] font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {item.sessionFormat}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] text-[#64748B] border border-[#E8E4DC] font-medium">
                      Уровень: {item.difficulty}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectCondition(item.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0F3D3E] hover:bg-[#165B5C] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    Открыть протокол
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
