import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  FolderKanban, 
  CheckCircle2, 
  CalendarClock, 
  Users, 
  ArrowUpRight, 
  FileCheck2, 
  Clock, 
  Award,
  ChevronLeft
} from 'lucide-react';

interface DashboardViewProps {
  onOpenNewProject: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onOpenNewProject }) => {
  const { 
    projects, 
    setActiveProject, 
    setCurrentView, 
    currentRole, 
    setRole 
  } = useApp();

  const totalProjects = projects.length;
  const readyForDefense = projects.filter((p) => p.status === 'ready_for_defense' || p.defenseSchedule).length;
  const totalMeetings = projects.reduce((acc, p) => acc + p.supervisoryMeetings.length, 0);
  const totalDeliverables = projects.reduce((acc, p) => acc + p.deliverables.length, 0);
  const pendingDeliverables = projects.reduce(
    (acc, p) => acc + p.deliverables.filter((d) => d.status === 'pending_review').length,
    0
  );
  const avgProgress = Math.round(
    projects.reduce((acc, p) => acc + p.progressPercentage, 0) / (totalProjects || 1)
  );

  return (
    <div className="space-y-8">
      {/* Editorial Hero Banner */}
      <section className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-900 text-white shadow-xs">
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/hero_academic_research_1790356318152.jpg"
            alt="مركز أبحاث المشاريع الأكاديمية"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />
        </div>

        <div className="relative px-6 py-10 sm:px-10 sm:py-12 max-w-3xl">
          <div className="text-xs font-semibold tracking-wider text-teal-400 mb-2">
            منظومة المتابعة والتحكيم الأكاديمي الموحدة · الفصل الجامعي 2026/2027
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 text-balance">
            إدارة متكاملة لمسار مشاريع التخرج والأبحاث العلمية
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 max-w-2xl">
            منصة تيسر التواصل الأكاديمي بين الطلاب والأساتذة المشرفين ولجان التحكيم العلمي؛
            بدءاً من إيداع المقترحات البحثية وحتى جلسات الدفاع والتقييم النهائي.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentView('projects')}
              className="px-4 py-2 text-xs font-semibold text-slate-900 bg-white rounded-lg hover:bg-slate-100 transition-colors shadow-xs"
            >
              استعراض كافة المشاريع
            </button>
            <button
              onClick={onOpenNewProject}
              className="px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-600 rounded-lg transition-colors border border-teal-600"
            >
              تقديم مقترح مشروع جديد
            </button>
            <button
              onClick={() => setCurrentView('defense_schedule')}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              جدول لجان المناقشة ←
            </button>
          </div>
        </div>
      </section>

      {/* Role Banner Callout */}
      <div className="p-4 bg-teal-50/60 border border-teal-200/80 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-teal-950">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-teal-700 shrink-0" />
          <span>
            أنت تتصفح المنصة حالياً بصفة: <strong className="font-semibold text-teal-900">
              {currentRole === 'student' && 'طالب باحث (عبدالله السعيد)'}
              {currentRole === 'supervisor' && 'أستاذ مشرف (أ.د. ريم الخالدي)'}
              {currentRole === 'committee' && 'رئيس لجنة المشاريع والقسم (د. حسام الشريف)'}
            </strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">تبديل المنظور:</span>
          <button
            onClick={() => setRole('student')}
            className={`px-2 py-0.5 rounded text-xs transition-colors ${currentRole === 'student' ? 'bg-teal-700 text-white font-medium' : 'text-teal-800 hover:underline'}`}
          >
            طالب
          </button>
          <span>·</span>
          <button
            onClick={() => setRole('supervisor')}
            className={`px-2 py-0.5 rounded text-xs transition-colors ${currentRole === 'supervisor' ? 'bg-teal-700 text-white font-medium' : 'text-teal-800 hover:underline'}`}
          >
            مشرف
          </button>
          <span>·</span>
          <button
            onClick={() => setRole('committee')}
            className={`px-2 py-0.5 rounded text-xs transition-colors ${currentRole === 'committee' ? 'bg-teal-700 text-white font-medium' : 'text-teal-800 hover:underline'}`}
          >
            رئيس اللجنة
          </button>
        </div>
      </div>

      {/* High-Level Academic Stats Matrix */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">المشاريع النشطة</div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">{totalProjects}</div>
          <div className="text-xs text-slate-500 mt-2">
            موزعة على 4 أقسام تخصصية
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">متوسط نسبة الإنجاز العام</div>
          <div className="text-2xl font-bold text-teal-800 tabular-nums">{avgProgress}%</div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div 
              className="bg-teal-600 h-1.5 rounded-full" 
              style={{ width: `${avgProgress}%` }}
            />
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">مخرجات بانتظار الاعتماد</div>
          <div className="text-2xl font-bold text-amber-700 tabular-nums">{pendingDeliverables}</div>
          <div className="text-xs text-slate-500 mt-2">
            من إجمالي {totalDeliverables} تقريراً مسلماً
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-xs">
          <div className="text-xs text-slate-500 font-medium mb-1">جلسات الإرشاد الموثقة</div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">{totalMeetings}</div>
          <div className="text-xs text-slate-500 mt-2">
            جلسة بمحاضر موقعة رقمياً
          </div>
        </div>
      </section>

      {/* Main Split Section: Urgent Attention & Featured Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Featured Projects Table / Cards (2 cols) */}
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">المشاريع الأكاديمية تحت الإشراف</h2>
              <div className="text-xs text-slate-500 mt-0.5">
                تحديثات التقدم ومخرجات المسار الدراسي
              </div>
            </div>
            <button
              onClick={() => setCurrentView('projects')}
              className="text-xs font-semibold text-teal-800 hover:text-teal-900 transition-colors flex items-center gap-1"
            >
              <span>عرض الدليل كاملاً</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg bg-white overflow-hidden shadow-xs">
            {projects.slice(0, 4).map((project) => (
              <div
                key={project.id}
                onClick={() => setActiveProject(project.id)}
                className="p-5 hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <div className="text-xs text-slate-500 mb-1 flex items-center gap-2">
                      <span className="font-mono tabular-nums">{project.code}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.department}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.term}</span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 group-hover:text-teal-800 transition-colors leading-snug">
                      {project.title}
                    </h3>
                  </div>
                  <div className="text-left shrink-0">
                    <div className="text-base font-bold text-slate-900 tabular-nums">
                      {project.progressPercentage}%
                    </div>
                    <div className="text-xs text-slate-400">إنجاز</div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {project.abstract}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-700 font-medium">المشرف: {project.supervisor.name}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.students.length} طلاب</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-slate-700">
                      {project.status === 'ready_for_defense' && 'جاهز للمناقشة العلنية'}
                      {project.status === 'in_progress' && 'قيد التنفيذ والتقييم'}
                      {project.status === 'proposal_approved' && 'تم اعتماد المقترح'}
                      {project.status === 'proposal_submitted' && 'مقترح قيد المراجعة'}
                      {project.status === 'defended_passed' && 'تمت المناقشة بنجاح'}
                    </span>
                    <span className="text-teal-800 font-medium group-hover:underline flex items-center gap-0.5">
                      فتح الملف ←
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Schedule & Action Items (1 col) */}
        <section className="space-y-6">
          {/* Upcoming Viva & Defense Sessions */}
          <div className="border border-slate-200 rounded-lg bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-teal-800" />
                <h3 className="text-sm font-bold text-slate-900">جلسات المناقشة القادمة</h3>
              </div>
              <button
                onClick={() => setCurrentView('defense_schedule')}
                className="text-xs text-teal-800 hover:underline"
              >
                الجدول
              </button>
            </div>

            <div className="space-y-3">
              {projects
                .filter((p) => p.defenseSchedule)
                .map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setActiveProject(p.id)}
                    className="p-3 bg-slate-50 rounded-md hover:bg-teal-50/50 transition-colors cursor-pointer border border-slate-200/60"
                  >
                    <div className="text-xs text-teal-800 font-semibold mb-1 flex items-center justify-between">
                      <span>{p.defenseSchedule?.date}</span>
                      <span>{p.defenseSchedule?.time}</span>
                    </div>
                    <div className="text-xs font-medium text-slate-900 line-clamp-1 mb-1">
                      {p.title}
                    </div>
                    <div className="text-xs text-slate-500">
                      القاعة: {p.defenseSchedule?.hall}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Recent Deliverables Pending Review */}
          <div className="border border-slate-200 rounded-lg bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-teal-800" />
                <h3 className="text-sm font-bold text-slate-900">آخر التقارير المسلمة</h3>
              </div>
            </div>

            <div className="space-y-3">
              {projects
                .flatMap((p) =>
                  p.deliverables.map((d) => ({
                    ...d,
                    projectTitle: p.title,
                    projectId: p.id,
                  }))
                )
                .slice(0, 3)
                .map((deliv) => (
                  <div
                    key={deliv.id}
                    onClick={() => setActiveProject(deliv.projectId)}
                    className="p-3 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="font-mono">نسخة {deliv.version}</span>
                      <span>تشابه: {deliv.plagiarismSimilarity}%</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-900 mb-1 line-clamp-1">
                      {deliv.title}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center justify-between">
                      <span>قدمه: {deliv.submittedBy}</span>
                      <span className={`font-medium ${deliv.status === 'approved' ? 'text-teal-700' : 'text-amber-700'}`}>
                        {deliv.status === 'approved' ? 'معتمد' : 'قيد المراجعة'}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Quick Academic Guidelines Card */}
          <div className="border border-slate-200 rounded-lg bg-slate-50 p-4 text-xs text-slate-600 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-800" />
              <span>مواعيد أكاديمية حاسمة</span>
            </div>
            <p className="leading-relaxed">
              آخر موعد لإيداع مسودات مشاريع التخرج 2 عبر المنصة هو <strong>15 فبراير 2027</strong>. يجب ألا تتجاوز نسبة الاستلال العلمي 15% كشرط للمناقشة.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
