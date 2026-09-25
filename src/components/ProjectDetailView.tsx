import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Printer, 
  Calendar, 
  Users, 
  Award, 
  FileText, 
  CheckCircle, 
  CheckCircle2, 
  Clock, 
  Share2, 
  SlidersHorizontal,
  Layers,
  BookOpen
} from 'lucide-react';
import { MilestonesTab } from './MilestonesTab';
import { KanbanTab } from './KanbanTab';
import { MeetingsTab } from './MeetingsTab';
import { EvaluationTab } from './EvaluationTab';

interface ProjectDetailViewProps {
  onOpenReportModal: () => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ onOpenReportModal }) => {
  const { activeProject, setActiveProject, setCurrentView, currentRole } = useApp();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'milestones' | 'tasks' | 'meetings' | 'evaluation'
  >('milestones');

  if (!activeProject) {
    return (
      <div className="text-center py-20 bg-white border border-slate-200 rounded-lg p-6">
        <p className="text-slate-500 text-sm mb-4">لم يتم تحديد مشروع أكاديمي لعرضه.</p>
        <button
          onClick={() => setCurrentView('projects')}
          className="px-4 py-2 text-xs font-semibold text-white bg-teal-800 rounded-lg"
        >
          العودة لقائمة المشاريع
        </button>
      </div>
    );
  }

  const p = activeProject;

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => {
            setActiveProject(null);
            setCurrentView('projects');
          }}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>الرجوع إلى دليل المشاريع</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-md transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-teal-800" />
            <span>طباعة الوثيقة الأكاديمية الرسمية</span>
          </button>
        </div>
      </div>

      {/* Project Master Header */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2 max-w-4xl">
            {/* Meta tags - unboxed text per zero-pill rule */}
            <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <span className="font-mono tabular-nums font-bold text-teal-800 text-sm">
                {p.code}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-slate-700">{p.department}</span>
              <span aria-hidden="true">·</span>
              <span>{p.term}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{p.academicYear}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {p.title}
            </h1>

            {p.titleEn && (
              <p className="text-xs text-slate-500 font-sans tracking-wide">
                {p.titleEn}
              </p>
            )}
          </div>

          {/* Overall Progress Gauge */}
          <div className="lg:text-left bg-slate-50 border border-slate-200 p-4 rounded-lg shrink-0 min-w-[180px]">
            <div className="text-xs text-slate-500 font-medium mb-1">
              معدل الإنجاز التراكمي
            </div>
            <div className="text-3xl font-bold font-mono tabular-nums text-slate-900 mb-2">
              {p.progressPercentage}%
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-teal-700 h-2 rounded-full transition-all duration-500"
                style={{ width: `${p.progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Supervision & Students Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
          {/* Supervisor Info */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/70">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
              {p.supervisor.avatar ? (
                <img
                  src={p.supervisor.avatar}
                  alt={p.supervisor.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-slate-600">
                  {p.supervisor.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="text-2xs text-slate-400 font-medium">المشرف الأكاديمي الرئيسي:</div>
              <div className="font-bold text-slate-900 text-sm">{p.supervisor.name}</div>
              <div className="text-2xs text-slate-500">{p.supervisor.title}</div>
            </div>
          </div>

          {/* Student Team Info */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70 space-y-1">
            <div className="text-2xs text-slate-400 font-medium">فريق البحث والطلاب ({p.students.length}):</div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {p.students.map((student) => (
                <div key={student.id} className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-teal-800 text-white text-2xs flex items-center justify-center font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-slate-900">{student.name}</span>
                  <span className="text-2xs text-slate-400 font-mono">({student.studentId})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'milestones', label: `خارطة المراحل والتسليمات (${p.milestones.length})` },
          { id: 'tasks', label: `لوحة المهام (${p.tasks.length})` },
          { id: 'meetings', label: `سجل الجلسات الإرشادية (${p.supervisoryMeetings.length})` },
          { id: 'evaluation', label: `مصفوفة التقييم والدرجات (${p.evaluations.length})` },
          { id: 'overview', label: 'المستخلص والأهداف والمنهجية' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 px-3 transition-colors whitespace-nowrap border-b-2 ${
              activeTab === tab.id
                ? 'border-teal-800 text-teal-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'milestones' && <MilestonesTab project={p} />}
        {activeTab === 'tasks' && <KanbanTab project={p} />}
        {activeTab === 'meetings' && <MeetingsTab project={p} />}
        {activeTab === 'evaluation' && <EvaluationTab project={p} />}
        {activeTab === 'overview' && (
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-6 text-xs leading-relaxed">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">المستخلص الأكاديمي (Abstract):</h3>
              <p className="text-slate-600 text-justify text-sm leading-relaxed">
                {p.abstract}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">الأهداف الرئيسية للمشروع:</h3>
              <ul className="space-y-2">
                {p.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700">
                    <span className="text-teal-800 font-bold font-mono tabular-nums">{i + 1}.</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">المنهجية العلمية المتبعة:</h3>
              <p className="text-slate-600 text-justify leading-relaxed">
                {p.methodology}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">الكلمات المفتاحية والتصنيفات:</h3>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                {p.tags.map((tag, i) => (
                  <span key={i} className="bg-slate-100 px-2 py-1 rounded text-slate-700 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
