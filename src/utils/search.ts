import type { ConditionSummary } from '../types/ruqya';

export function normalizeQuery(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '') // strip Arabic tashkeel/diacritics
    .replace(/[‘’'`´]/g, '') // strip apostrophes/ayn marks so "та‘тыль" == "татыль"
    .replace(/ё/g, 'е')
    .trim();
}

export function searchConditions(
  conditions: ConditionSummary[],
  query: string
): ConditionSummary[] {
  const normQ = normalizeQuery(query);
  if (!normQ) return conditions;

  return conditions.filter((item) => {
    const haystack = normalizeQuery(
      [
        item.titleRu,
        item.hookRu,
        item.arabicTerm,
        item.transliteration,
        ...item.keywords,
      ].join(' ')
    );
    return haystack.includes(normQ);
  });
}
