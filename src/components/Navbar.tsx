import React from 'react';
import {
  BookOpen,
  Bookmark,
  CalendarCheck,
  Compass,
  Grid,
  Home,
  Layers,
  Menu,
  X,
} from 'lucide-react';
import type { AppView } from '../types/ruqya';

interface NavbarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  bookmarkCount: number;
  trackerProgressPercent: number;
  onOpenSavedCatalog: () => void;
}

const NAV_ITEMS: { id: AppView; label: string; shortLabel: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'Главная', shortLabel: 'Главная', icon: <Home className="w-4 h-4" /> },
  { id: 'catalog', label: 'Каталог (110)', shortLabel: 'Каталог', icon: <Grid className="w-4 h-4" /> },
  { id: 'diagnostic', label: 'Подобрать протокол', shortLabel: 'Подбор', icon: <Compass className="w-4 h-4" /> },
  { id: 'packs', label: 'Курсы и пакеты', shortLabel: 'Пакеты', icon: <Layers className="w-4 h-4" /> },
  { id: 'tracker', label: 'Трекер 14 дней', shortLabel: 'Трекер', icon: <CalendarCheck className="w-4 h-4" /> },
  { id: 'handbook', label: 'Справочник', shortLabel: 'Справка', icon: <BookOpen className="w-4 h-4" /> },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  bookmarkCount,
  trackerProgressPercent,
  onOpenSavedCatalog,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleSelect = (view: AppView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Brand */}
            <button
              type="button"
              onClick={() => handleSelect('home')}
              className="flex items-center gap-3 text-left group shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0F3D3E] text-[#FAF8F5] flex items-center justify-center shadow-soft group-hover:bg-[#165B5C] transition-colors">
                <span className="font-arabic text-xl leading-none text-[#C59B27]">ش</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold tracking-tight text-[#0F3D3E] text-base sm:text-lg">
                    SHIFA &amp; RUQYA
                  </span>
                  <span className="hidden sm:inline-block text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#FBF6E8] text-[#9A7616] border border-[#C59B27]/30">
                    Коран и Сунна
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B] hidden sm:block">
                  Навигатор духовного исцеления и самопомощи
                </p>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Основная навигация">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  activeView === item.id ||
                  (activeView === 'protocol' && item.id === 'catalog');
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#0F3D3E] text-white shadow-soft'
                        : 'text-[#1E293B] hover:bg-[#EBF3F2] hover:text-[#0F3D3E]'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.id === 'tracker' && trackerProgressPercent > 0 && (
                      <span
                        className={`ml-0.5 text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[#EBF3F2] text-[#0F3D3E]'
                        }`}
                      >
                        {trackerProgressPercent}%
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenSavedCatalog}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-white border border-[#E8E4DC] text-[#1E293B] hover:border-[#0F3D3E]/40 hover:text-[#0F3D3E] transition-all shadow-soft"
                title="Сохраненные протоколы"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    bookmarkCount > 0 ? 'fill-[#C59B27] text-[#C59B27]' : 'text-[#64748B]'
                  }`}
                />
                <span className="hidden sm:inline">Избранное</span>
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold bg-[#FAF8F5] text-[#0F3D3E] border border-[#E8E4DC]">
                  {bookmarkCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="lg:hidden p-2 rounded-xl bg-white border border-[#E8E4DC] text-[#1E293B]"
                aria-label="Открыть меню"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8E4DC] bg-white px-4 py-3 space-y-1 shadow-elevated">
            {NAV_ITEMS.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? 'bg-[#0F3D3E] text-white'
                      : 'text-[#1E293B] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {item.icon}
                    {item.label}
                  </span>
                  {item.id === 'tracker' && trackerProgressPercent > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#FBF6E8] text-[#9A7616]">
                      {trackerProgressPercent}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Mobile Bottom Tab Bar */}
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E4DC] px-1 py-1.5 flex items-center justify-around shadow-elevated"
        aria-label="Мобильная навигация"
      >
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const isActive =
            activeView === item.id ||
            (activeView === 'protocol' && item.id === 'catalog');
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                isActive ? 'text-[#0F3D3E] font-semibold' : 'text-[#64748B]'
              }`}
            >
              <span
                className={`p-1 rounded-lg ${
                  isActive ? 'bg-[#EBF3F2] text-[#0F3D3E]' : ''
                }`}
              >
                {item.icon}
              </span>
              <span className="truncate max-w-[68px]">{item.shortLabel}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
