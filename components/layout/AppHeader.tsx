import React from 'react';
import { ArrowLeft, Search, LayoutDashboard, Calendar, Clock, Kanban, Users, Calculator, MonitorPlay, Briefcase, ClipboardList, Receipt, BarChart3, HelpCircle, Settings, LogOut, Paintbrush, Play } from 'lucide-react';
import { useTranslation } from '@/i18n/LanguageContext';

export const AppHeader = ({
  onBack,
  canGoBack,
  title = "Interior Estimate Form",
  currentScreen,
  onNavigate,
  onLogout,
  onboardingProgress = 100,
  onStartTour,
  createFlowSource = 'estimate'
}: {
  onBack?: () => void,
  canGoBack?: boolean,
  title?: string,
  currentScreen?: string,
  onNavigate?: (screen: any) => void,
  onLogout?: () => void,
  onboardingProgress?: number, // 0 to 100
  onStartTour?: () => void,
  createFlowSource?: 'estimate' | 'invoice'
}) => {
  const { t } = useTranslation();

  // `domId` keeps the ids the onboarding tour spotlights.
  const navItems = [
    { id: 'dashboard', domId: 'nav-dashboard', label: t('nav.dashboard'), icon: LayoutDashboard, isActive: currentScreen === 'dashboard' },
    { id: 'calendar', domId: 'nav-calendar', label: t('nav.calendar'), icon: Calendar, isActive: currentScreen === 'calendar' },
    { id: 'job_scheduling', domId: 'nav-scheduling', label: t('nav.scheduling'), icon: Clock, isActive: currentScreen === 'job_scheduling' },
    { id: 'leads', domId: 'nav-leads', label: t('nav.leads'), icon: Kanban, isActive: currentScreen === 'leads' || currentScreen === 'lead_detail' },
    { id: 'contacts', domId: 'nav-contacts', label: t('nav.contacts'), icon: Users, isActive: currentScreen === 'contacts' || currentScreen === 'contact_detail' },
    { id: 'estimates', domId: 'nav-estimates', label: t('nav.estimates'), icon: Calculator, isActive: (currentScreen === 'estimates' || currentScreen === 'estimate') && createFlowSource !== 'invoice' },
    { id: 'presentation_builder', domId: 'nav-presentations', label: t('nav.presentationBuilder'), icon: MonitorPlay, isActive: currentScreen === 'presentation_builder' || currentScreen === 'presentation_editor' },
    { id: 'jobs', domId: 'nav-jobs', label: t('nav.jobs'), icon: Briefcase, isActive: currentScreen === 'jobs' || currentScreen === 'job_detail' },
    { id: 'workorders', domId: 'nav-workorders', label: t('nav.workOrders'), icon: ClipboardList, isActive: currentScreen === 'workorders' || currentScreen === 'workorder_detail' },
    { id: 'invoices', domId: 'nav-invoices', label: t('nav.invoices'), icon: Receipt, isActive: currentScreen === 'invoices' || currentScreen === 'invoice_detail' || (currentScreen === 'estimate' && createFlowSource === 'invoice') },
    { id: 'reports', domId: 'nav-reports', label: t('nav.reports'), icon: BarChart3, isActive: currentScreen === 'reports' },
  ];

  const iconButton = (isActive: boolean) => `p-2 rounded-lg transition-colors ${
    isActive
      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
  }`;

  return (
  <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 shadow-sm print:hidden transition-colors">
    {/* Top bar: brand, page context, search, account actions */}
    <div className="h-16 px-4 md:px-6 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <button onClick={() => onNavigate && onNavigate('dashboard')} className="flex items-center gap-3 shrink-0">
          <div className="aspect-square h-10 rounded-lg flex items-center justify-center bg-gray-900 dark:bg-gray-800 text-white shadow-lg">
            <Paintbrush className="w-5 h-5" />
          </div>
          <div className="hidden sm:flex flex-col justify-center text-left">
            <span className="font-black text-gray-900 dark:text-white uppercase tracking-tight leading-none text-base text-nowrap">Estimate Master</span>
            <span className="font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest leading-none text-[0.55rem] mt-0.5">{t('sidebar.tagline')}</span>
          </div>
        </button>

        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 shrink-0"></div>

        {/* Back Button + Title */}
        <div className="flex items-center gap-2 min-w-0">
          <button
             onClick={canGoBack ? onBack : undefined}
             disabled={!canGoBack}
             className={`p-2 rounded-full transition-colors shrink-0 ${canGoBack ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 cursor-pointer' : 'text-gray-200 dark:text-gray-700 cursor-not-allowed'}`}
          >
             <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-gray-900 dark:text-white font-bold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm px-2 md:px-3 py-1 rounded-lg text-sm md:text-base truncate">{title}</span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1 md:gap-2 shrink-0">
        <div className="w-56 xl:w-64 hidden lg:block mr-2">
          <div className="relative group">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
             <input
               type="text"
               placeholder={t('layout.AppHeader.searchPlaceholder')}
               className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-transparent group-hover:bg-white dark:group-hover:bg-gray-700 group-hover:border-gray-200 dark:group-hover:border-gray-600 rounded-lg text-base focus:bg-white dark:focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400 text-gray-900 dark:text-white transition-all"
             />
          </div>
        </div>

        {onboardingProgress < 100 && (
          <button
            onClick={onStartTour}
            className="hidden md:flex items-center gap-2 px-3 py-2 mr-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-100 dark:border-primary-800 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
            title={t('sidebar.resumeTour')}
          >
            <Play className="w-3 h-3 fill-current" />
            {t('sidebar.setupProgress')} {onboardingProgress}%
          </button>
        )}

        <button id="nav-support" onClick={() => onNavigate && onNavigate('support')} className={iconButton(currentScreen === 'support')} title={t('sidebar.help')}>
          <HelpCircle className="w-5 h-5" />
        </button>
        <button id="nav-settings" onClick={() => onNavigate && onNavigate('settings')} className={iconButton(currentScreen === 'settings')} title={t('sidebar.settings')}>
          <Settings className="w-5 h-5" />
        </button>
        <button onClick={onLogout} className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors" title={t('sidebar.logout')}>
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>

    {/* Main navigation */}
    <nav className="px-2 md:px-4 flex items-center gap-1 overflow-x-auto no-scrollbar">
      {navItems.map((item) => (
        <button
          key={item.id}
          id={item.domId}
          onClick={() => onNavigate && onNavigate(item.id)}
          className={`flex items-center gap-2 px-3 py-3 border-b-2 text-sm whitespace-nowrap transition-colors ${
            item.isActive
              ? 'border-primary-600 text-primary-700 dark:text-primary-300 font-bold'
              : 'border-transparent text-gray-500 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <item.icon className={`w-4 h-4 shrink-0 ${item.isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'}`} />
          {item.label}
        </button>
      ))}
    </nav>
  </header>
  );
};

export default AppHeader;
