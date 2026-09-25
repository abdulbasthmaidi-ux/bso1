import React from 'react';
import { useApp, AppView } from '../context/AppContext';
import { Plus, UserCheck } from 'lucide-react';
import { UserRole } from '../types';

interface TopNavbarProps {
  onOpenNewProject: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onOpenNewProject }) => {
  const { currentView, setCurrentView, setActiveProject, currentRole, setRole } = useApp();

  const handleNavClick = (view: AppView) => {
    setActiveProject(null);
    setCurrentView(view);
  };

  const navItems: { id: AppView; label: string }[] = [
    { id: 'dashboard', label: 'الرئيسية' },
    { id: 'projects', label: 'المشاريع' },
    { id: 'defense_schedule', label: 'المناقشات' },
    { id: 'reports', label: 'التقارير' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('dashboard')}
          className="text-xl font-bold tracking-tight text-slate-900 hover:text-teal-700 transition-colors whitespace-nowrap text-right"
        >
          مسار الأكاديمي
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="flex items-center gap-6 sm:gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-1 transition-colors whitespace-nowrap text-sm ${
                  isActive
                    ? 'text-teal-700 font-semibold border-b-2 border-teal-700'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Role selector segmented control */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-lg text-xs font-medium">
            <button
              onClick={() => setRole('student')}
              className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap ${
                currentRole === 'student'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              طالب
            </button>
            <button
              onClick={() => setRole('supervisor')}
              className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap ${
                currentRole === 'supervisor'
                  ? 'bg-white text-teal-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              مشرف
            </button>
            <button
              onClick={() => setRole('committee')}
              className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap ${
                currentRole === 'committee'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              لجنة الحكم
            </button>
          </div>

          <button
            onClick={onOpenNewProject}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>مقترح جديد</span>
          </button>
        </div>
      </div>
    </header>
  );
};
