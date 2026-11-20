import React from 'react';
import type { AppView, CategoryId, MultiDayPack, SavedDiagnosticResult, TrackerState } from './types/ruqya';
import {
  loadBookmarks,
  loadDiagnosticResult,
  loadTrackerState,
  saveBookmarks,
  saveDiagnosticResult,
  saveTrackerState,
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { CatalogView } from './components/CatalogView';
import { ProtocolView } from './components/ProtocolView';
import { PacksView } from './components/PacksView';
import { DiagnosticView } from './components/DiagnosticView';
import { TrackerView } from './components/TrackerView';
import { HandbookView } from './components/HandbookView';

export function App() {
  const [activeView, setActiveView] = React.useState<AppView>('home');
  const [selectedConditionId, setSelectedConditionId] = React.useState<number>(1);
  const [catalogCategory, setCatalogCategory] = React.useState<CategoryId | 'all'>('all');
  const [catalogSearch, setCatalogSearch] = React.useState<string>('');
  const [onlySavedCatalog, setOnlySavedCatalog] = React.useState<boolean>(false);

  const [bookmarks, setBookmarks] = React.useState<number[]>(() => loadBookmarks());
  const [tracker, setTracker] = React.useState<TrackerState>(() => loadTrackerState());
  const [diagnosticResult, setDiagnosticResult] = React.useState<SavedDiagnosticResult | null>(() =>
    loadDiagnosticResult()
  );

  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleToggleBookmark = (id: number) => {
    setBookmarks((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      saveBookmarks(next);
      showToast(exists ? 'Удалено из избранного' : 'Протокол сохранен в избранное');
      return next;
    });
  };

  const handleUpdateTracker = (next: TrackerState) => {
    setTracker(next);
    saveTrackerState(next);
  };

  const handleSaveDiagnostic = (result: SavedDiagnosticResult | null) => {
    setDiagnosticResult(result);
    saveDiagnosticResult(result);
  };

  const handleSelectCondition = (id: number) => {
    setSelectedConditionId(id);
    setActiveView('protocol');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (catId: CategoryId) => {
    setCatalogCategory(catId);
    setOnlySavedCatalog(false);
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateCatalogWithSearch = (query: string) => {
    setCatalogSearch(query);
    setCatalogCategory('all');
    setOnlySavedCatalog(false);
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSavedCatalog = () => {
    setCatalogCategory('all');
    setCatalogSearch('');
    setOnlySavedCatalog(true);
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadPackToTracker = (pack: MultiDayPack) => {
    const nextTracker: TrackerState = {
      ...tracker,
      activePackId: pack.id,
      activePackTitle: `Пакет №${pack.number}: ${pack.title}`,
      currentDay: 1,
    };
    handleUpdateTracker(nextTracker);
    setActiveView('tracker');
    showToast(`Пакет №${pack.number} загружен в 14-дневный трекер`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: AppView) => {
    if (view === 'catalog') {
      setOnlySavedCatalog(false);
    }
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const trackerProgressPercent = React.useMemo(() => {
    let completed = 0;
    const total = 14 * 6;
    for (let d = 1; d <= 14; d++) {
      const day = tracker.days[d];
      if (!day) continue;
      if (day.morningAdhkar) completed++;
      if (day.eveningAdhkar) completed++;
      if (day.targetedRuqya) completed++;
      if (day.waterAndOil) completed++;
      if (day.baqarahHome) completed++;
      if (day.microAction) completed++;
    }
    return Math.round((completed / total) * 100);
  }, [tracker.days]);

  return (
    <div className="min-h-screen parchment-surface flex flex-col">
      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        bookmarkCount={bookmarks.length}
        trackerProgressPercent={trackerProgressPercent}
        onOpenSavedCatalog={handleOpenSavedCatalog}
      />

      {toastMessage && (
        <div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#0F3D3E] text-white text-sm font-medium shadow-elevated border border-[#C59B27]/40">
          {toastMessage}
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-20 lg:pb-12">
        {activeView === 'home' && (
          <HomeView
            onSelectCondition={handleSelectCondition}
            onSelectCategory={handleSelectCategory}
            onNavigateDiagnostic={() => handleNavigate('diagnostic')}
            onNavigatePacks={() => handleNavigate('packs')}
            onNavigateCatalogWithSearch={handleNavigateCatalogWithSearch}
            onNavigateHandbook={() => handleNavigate('handbook')}
          />
        )}

        {activeView === 'catalog' && (
          <CatalogView
            selectedCategory={catalogCategory}
            onChangeCategory={setCatalogCategory}
            searchQuery={catalogSearch}
            onChangeSearchQuery={setCatalogSearch}
            onlySaved={onlySavedCatalog}
            onToggleOnlySaved={setOnlySavedCatalog}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onSelectCondition={handleSelectCondition}
          />
        )}

        {activeView === 'protocol' && (
          <ProtocolView
            key={selectedConditionId}
            conditionId={selectedConditionId}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onBackToCatalog={() => handleNavigate('catalog')}
            onSelectCategory={handleSelectCategory}
            onSelectCondition={handleSelectCondition}
            onStartTracker={() => handleNavigate('tracker')}
          />
        )}

        {activeView === 'packs' && (
          <PacksView
            activePackId={tracker.activePackId}
            onLoadPackToTracker={handleLoadPackToTracker}
            onSelectCondition={handleSelectCondition}
          />
        )}

        {activeView === 'diagnostic' && (
          <DiagnosticView
            savedResult={diagnosticResult}
            onSaveResult={handleSaveDiagnostic}
            onSelectCondition={handleSelectCondition}
            onLoadPackToTracker={handleLoadPackToTracker}
          />
        )}

        {activeView === 'tracker' && (
          <TrackerView
            tracker={tracker}
            onUpdateTracker={handleUpdateTracker}
            onOpenPacks={() => handleNavigate('packs')}
          />
        )}

        {activeView === 'handbook' && (
          <HandbookView
            onNavigateDiagnostic={() => handleNavigate('diagnostic')}
            onNavigateCatalogSearch={handleNavigateCatalogWithSearch}
          />
        )}
      </main>

      <footer className="border-t border-[#E8E4DC] bg-white/80 py-8 px-4 sm:px-6 lg:px-8 mb-14 lg:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs sm:text-sm text-[#64748B]">
          <div className="space-y-1">
            <div className="font-bold text-[#0F3D3E]">
              SHIFA &amp; RUQYA — Навигатор шариатской рукъи и духовного исцеления
            </div>
            <p>
              Принцип «Двух крыльев»: материалы носят образовательный характер и дополняют — но не заменяют — обращение к квалифицированным врачам и психотерапевтам.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0 font-medium text-[#0F3D3E]">
            <button type="button" onClick={() => handleNavigate('catalog')} className="hover:underline">
              Каталог 110
            </button>
            <button type="button" onClick={() => handleNavigate('diagnostic')} className="hover:underline">
              Диагностика
            </button>
            <button type="button" onClick={() => handleNavigate('tracker')} className="hover:underline">
              Трекер 14 дней
            </button>
            <button type="button" onClick={() => handleNavigate('handbook')} className="hover:underline">
              Этика и справочник
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
