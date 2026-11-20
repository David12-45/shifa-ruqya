import type { SavedDiagnosticResult, TrackerDayEntry, TrackerState } from '../types/ruqya';

const TRACKER_KEY = 'shifa_ruqya_tracker_v1';
const BOOKMARKS_KEY = 'shifa_ruqya_bookmarks_v1';
const DIAGNOSTIC_KEY = 'shifa_ruqya_diagnostic_v1';

export function createEmptyDay(day: number): TrackerDayEntry {
  return {
    day,
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

export function createInitialTrackerState(): TrackerState {
  const days: Record<number, TrackerDayEntry> = {};
  for (let i = 1; i <= 14; i++) {
    days[i] = createEmptyDay(i);
  }
  return {
    currentDay: 1,
    activePackId: null,
    activePackTitle: null,
    days,
  };
}

export function loadTrackerState(): TrackerState {
  try {
    const raw = localStorage.getItem(TRACKER_KEY);
    if (!raw) return createInitialTrackerState();
    const parsed = JSON.parse(raw) as TrackerState;
    const base = createInitialTrackerState();
    return {
      currentDay: parsed.currentDay >= 1 && parsed.currentDay <= 14 ? parsed.currentDay : 1,
      activePackId: parsed.activePackId ?? null,
      activePackTitle: parsed.activePackTitle ?? null,
      days: { ...base.days, ...(parsed.days || {}) },
    };
  } catch {
    return createInitialTrackerState();
  }
}

export function saveTrackerState(state: TrackerState): void {
  try {
    localStorage.setItem(TRACKER_KEY, JSON.stringify(state));
  } catch {
    // ignore storage quota errors
  }
}

export function loadBookmarks(): number[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'number') : [];
  } catch {
    return [];
  }
}

export function saveBookmarks(ids: number[]): void {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function loadDiagnosticResult(): SavedDiagnosticResult | null {
  try {
    const raw = localStorage.getItem(DIAGNOSTIC_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedDiagnosticResult;
  } catch {
    return null;
  }
}

export function saveDiagnosticResult(result: SavedDiagnosticResult | null): void {
  try {
    if (!result) {
      localStorage.removeItem(DIAGNOSTIC_KEY);
    } else {
      localStorage.setItem(DIAGNOSTIC_KEY, JSON.stringify(result));
    }
  } catch {
    // ignore
  }
}
