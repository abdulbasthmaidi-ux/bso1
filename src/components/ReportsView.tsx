import React from 'react';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS } from '../data/initialData';
import { 
  FileText, 
  Download, 
  RefreshCw, 
  BarChart3, 
  CheckCircle2, 
  Users, 
  Award,
  Layers,
  Printer
} from 'lucide-react';

interface ReportsViewProps {
  onOpenReportModal: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ onOpenReportModal }) => {
  const { projects, setActiveProject, resetAllData, showNotification } = useApp();

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `masar_academic_projects_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('تم تصدير قاعدة بيانات المشاريع الأكاديمية بصيغة JSON');
  };

  const handleExportCSV = () => {
    const headers = ['رمز المشروع', 'العنوان', 'القسم الأكاديمي', 'المشرف', 'عدد الطلاب', 'نسبة الإنجاز', 'الحالة'];
    const rows = projects.map((p) => [
      p.code,
      `"${p.title.replace(/"/g, '""')}"`,
      p.department,
      p.supervisor.name,
      p.students.length,
      `${p.progressPercentage}%`,
      p.status,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `masar_projects_summary_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showNotification('تم تحميل تقرير ملخص المشاريع الأكاديمية بصيغة CSV');
  };

  // Departmental breakdown
  const deptStats = DEPARTMENTS.filter((d) => d !== 'جميع الأقسام الأكاديمية').map((dept) => {
    const deptProjects = projects.filter((p) => p.department === dept);
    const avgProg = deptProjects.length > 0
      ? Math.round(deptProjects.reduce((s, p) => s + p.progressPercentage, 0) / deptProjects.length)
      : 0;
    return {
      name: dept,
      count: deptProjects.length,
      avgProgress: avgProg,
    };
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            مركز التقارير والإحصائيات الأكاديمية
          </h1>
          <div className="text-xs text-slate-500 mt-1">
            مؤشرات الإنجاز على مستوى الكلية والأقسام الأكاديمية، والنسخ الاحتياطية
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white border border-slate-200 hover:border-slate-300 text-slate-800 rounded-lg transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-teal-800" />
            <span>تصدير ملف CSV</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تصدير نسخة احتياطية (JSON)</span>
          </button>
        </div>
      </div>

      {/* Department Performance Matrix */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          مؤشرات الأداء وتوزيع المشاريع بحسب الأقسام العلمية
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deptStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 bg-white border border-slate-200 rounded-lg shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3 text-xs">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{stat.name}</h3>
                  <div className="text-slate-500 mt-0.5">
                    {stat.count} مشاريع مسجلة هذا الفصل
                  </div>
                </div>
                <div className="text-left font-mono tabular-nums font-bold text-base text-teal-800">
                  {stat.avgProgress}%
                  <div className="text-2xs text-slate-400 font-sans font-normal">متوسط الإنجاز</div>
                </div>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-teal-700 h-2 rounded-full"
                  style={{ width: `${stat.avgProgress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Project Transcripts Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="text-base font-bold text-slate-900">
            طباعة المحاضر الرسمية للمشاريع
          </h2>
          <div className="text-xs text-slate-500">
            مستندات التخرج المعتمدة الصالحة للتقديم لعمادة القبول وشؤون الخريجين
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto shadow-xs">
          <table className="w-full text-xs text-right divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-semibold">
              <tr>
                <th className="px-4 py-3">رمز المشروع</th>
                <th className="px-4 py-3">عنوان المشروع</th>
                <th className="px-4 py-3">المشرف</th>
                <th className="px-4 py-3">الطلاب</th>
                <th className="px-4 py-3 text-left">الإنجاز</th>
                <th className="px-4 py-3 text-center">الوثيقة الرسمية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-teal-800 whitespace-nowrap">
                    {proj.code}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900 max-w-xs truncate">
                    {proj.title}
                  </td>
                  <td className="px-4 py-3 text-slate-700 whitespace-nowrap">
                    {proj.supervisor.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                    {proj.students.map((s) => s.name.split(' ')[0]).join('، ')}
                  </td>
                  <td className="px-4 py-3 text-left font-mono tabular-nums font-bold text-slate-800 whitespace-nowrap">
                    {proj.progressPercentage}%
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => {
                        setActiveProject(proj.id);
                        onOpenReportModal();
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-2xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded border border-teal-200 transition-colors"
                    >
                      <Printer className="w-3 h-3" />
                      <span>معاينة وطباعة</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* System Administration and Reset */}
      <section className="p-5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div>
          <div className="font-bold text-slate-900">إدارة قاعدة البيانات التجريبية</div>
          <div className="text-slate-500 mt-0.5">
            يمكنك استعادة بيانات المشاريع الأكاديمية الأولية ومسح أية تعديلات مخزنة محلياً.
          </div>
        </div>

        <button
          onClick={resetAllData}
          className="flex items-center gap-1.5 px-3.5 py-2 font-medium text-slate-600 hover:text-red-700 bg-white border border-slate-200 rounded-md transition-colors self-start sm:self-center"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>استعادة البيانات الافتراضية</span>
        </button>
      </section>
    </div>
  );
};
