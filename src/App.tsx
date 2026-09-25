import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopNavbar } from './components/TopNavbar';
import { DashboardView } from './components/DashboardView';
import { ProjectsListView } from './components/ProjectsListView';
import { ProjectDetailView } from './components/ProjectDetailView';
import { DefenseScheduleView } from './components/DefenseScheduleView';
import { ReportsView } from './components/ReportsView';
import { NewProjectModal } from './components/NewProjectModal';
import { OfficialReportModal } from './components/OfficialReportModal';
import { CheckCircle2, Info } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, activeProject, notification } = useApp();
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-teal-700 selection:text-white">
      {/* Top Navbar complying with Top Bar Contract */}
      <TopNavbar onOpenNewProject={() => setIsNewProjectOpen(true)} />

      {/* Real-time feedback notification toast */}
      {notification && (
        <div className="fixed bottom-5 left-5 z-50 flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-lg border border-slate-700 transition-all animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === 'dashboard' && (
          <DashboardView onOpenNewProject={() => setIsNewProjectOpen(true)} />
        )}
        {currentView === 'projects' && (
          <ProjectsListView onOpenNewProject={() => setIsNewProjectOpen(true)} />
        )}
        {currentView === 'project_detail' && (
          <ProjectDetailView onOpenReportModal={() => setIsReportModalOpen(true)} />
        )}
        {currentView === 'defense_schedule' && <DefenseScheduleView />}
        {currentView === 'reports' && (
          <ReportsView onOpenReportModal={() => setIsReportModalOpen(true)} />
        )}
      </main>

      {/* Clean quiet academic footer */}
      <footer className="no-print mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            مسار الأكاديمي · منظومة إدارة ومتابعة مشاريع التخرج والأبحاث العلمية
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>وكالة الكلية للشؤون الأكاديمية</span>
            <span aria-hidden="true">·</span>
            <span>العام الجامعي 2026/2027</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <NewProjectModal
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
      />

      <OfficialReportModal
        project={activeProject}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
