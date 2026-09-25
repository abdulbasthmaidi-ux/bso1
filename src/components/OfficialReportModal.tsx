import React from 'react';
import { Project } from '../types';
import { Printer, X, Award, CheckCircle, ShieldCheck } from 'lucide-react';

interface OfficialReportModalProps {
  project: Project | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export const OfficialReportModal: React.FC<OfficialReportModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !project) return null;

  const handlePrint = () => {
    window.print();
  };

  const avgEval = project.evaluations.length > 0
    ? Math.round(
        project.evaluations.reduce((sum, e) => sum + e.totalScore, 0) /
          project.evaluations.length
      )
    : 95;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl border border-slate-200 max-w-4xl w-full p-8 shadow-2xl my-8 space-y-6 text-slate-900">
        {/* Modal Controls (Hidden in print) */}
        <div className="no-print flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Printer className="w-4 h-4 text-teal-800" />
            <span>معاينة وثيقة اعتماد وتحكيم مشروع التخرج الرسمية (جاهزة للطباعة والتصدير)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-md transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة المستند الرسمي</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Area */}
        <div className="space-y-6 border border-slate-300 p-8 rounded-lg bg-white text-right font-serif">
          {/* Official Academic Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-800 pb-5 text-xs">
            <div className="space-y-1">
              <div className="font-bold text-sm text-slate-900">المملكة العربية السعودية</div>
              <div className="font-bold text-slate-800">وزارة التعليم العالي والبحث العلمي</div>
              <div className="font-bold text-slate-800">كلية علوم الحاسب والمعلومات</div>
              <div className="text-slate-600">لجنة مشاريع التخرج والدراسات العليا</div>
            </div>

            <div className="text-center space-y-1">
              <div className="w-14 h-14 mx-auto rounded-full border-2 border-teal-800 flex items-center justify-center font-bold text-teal-900 text-xs">
                شعار الجامعة
              </div>
              <div className="text-2xs font-sans text-slate-500 font-mono">جامعة الملك سعود</div>
            </div>

            <div className="text-left space-y-1 font-mono text-2xs text-slate-700">
              <div>الرقم المرجعي: <strong className="text-slate-900">{project.code}</strong></div>
              <div>العام الجامعي: <strong>{project.academicYear}</strong></div>
              <div>الفصل: <strong>{project.term}</strong></div>
              <div>تاريخ الإصدار: <strong>{new Date().toISOString().split('T')[0]}</strong></div>
            </div>
          </div>

          {/* Document Title */}
          <div className="text-center space-y-1 py-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              محضر اعتماد وتحكيم مشروع التخرج النهائي (Defense & Viva Verdict)
            </h2>
            <div className="text-xs text-slate-600">
              استمارة التقييم الأكاديمي الشامل وقرار لجنة التحكيم العلمي
            </div>
          </div>

          {/* Project Details Box */}
          <div className="border border-slate-300 p-4 rounded text-xs space-y-2 bg-slate-50/50">
            <div>
              <span className="font-bold text-slate-800">عنوان المشروع بالعربية: </span>
              <span className="font-semibold text-slate-900">{project.title}</span>
            </div>
            {project.titleEn && (
              <div>
                <span className="font-bold text-slate-800">English Title: </span>
                <span className="font-sans text-slate-700">{project.titleEn}</span>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-6 pt-1 text-2xs text-slate-600">
              <div>القسم: <strong className="text-slate-800">{project.department}</strong></div>
              <div>المشرف الأكاديمي: <strong className="text-slate-800">{project.supervisor.name}</strong></div>
              <div>نسبة إنجاز المعالم: <strong className="font-mono">{project.progressPercentage}%</strong></div>
            </div>
          </div>

          {/* Students Table */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-900">بيانات الفريق الطلابي الباحث:</div>
            <table className="w-full text-xs border border-slate-300 divide-y divide-slate-300">
              <thead className="bg-slate-100 font-semibold text-slate-800">
                <tr>
                  <th className="px-3 py-2 text-right">#</th>
                  <th className="px-3 py-2 text-right">اسم الطالب</th>
                  <th className="px-3 py-2 text-right">الرقم الجامعي</th>
                  <th className="px-3 py-2 text-right">الدور المنجز بالمشروع</th>
                  <th className="px-3 py-2 text-center">التوقيع</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {project.students.map((std, i) => (
                  <tr key={std.id}>
                    <td className="px-3 py-2 font-mono">{i + 1}</td>
                    <td className="px-3 py-2 font-semibold text-slate-900">{std.name}</td>
                    <td className="px-3 py-2 font-mono">{std.studentId}</td>
                    <td className="px-3 py-2 text-slate-600">{std.role}</td>
                    <td className="px-3 py-2 text-center text-slate-400 font-serif italic text-2xs">
                      تم التوقيع إلكترونياً
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rubric Grades Matrix */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-900">مصفوفة توزيع درجات التقييم الأكاديمي المعتمدة:</div>
            <table className="w-full text-xs border border-slate-300 divide-y divide-slate-300">
              <thead className="bg-slate-100 font-semibold text-slate-800">
                <tr>
                  <th className="px-3 py-2 text-right">معيار التقييم الأكاديمي</th>
                  <th className="px-3 py-2 text-center">الوزن الأقصى</th>
                  <th className="px-3 py-2 text-center">الدرجة المحتسبة</th>
                  <th className="px-3 py-2 text-right">ملاحظات التحكيم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-3 py-1.5 font-medium">1. أصالة المشكلة والأهمية التطبيقية</td>
                  <td className="px-3 py-1.5 text-center font-mono">15</td>
                  <td className="px-3 py-1.5 text-center font-mono font-bold">14.5</td>
                  <td className="px-3 py-1.5 text-slate-600 text-2xs">حل تقني مبتكر ومستوفي للحاجة المحلية</td>
                </tr>
                <tr>
                  <td className="px-3 py-1.5 font-medium">2. المسح الأدبي والمنهجية العلمية</td>
                  <td className="px-3 py-1.5 text-center font-mono">20</td>
                  <td className="px-3 py-1.5 text-center font-mono font-bold">19.0</td>
                  <td className="px-3 py-1.5 text-slate-600 text-2xs">مراجع حديثة موثقة بأسلوب IEEE</td>
                </tr>
                <tr>
                  <td className="px-3 py-1.5 font-medium">3. التنفيذ البرمجي والهندسي والنتائج التجريبية</td>
                  <td className="px-3 py-1.5 text-center font-mono">35</td>
                  <td className="px-3 py-1.5 text-center font-mono font-bold">33.5</td>
                  <td className="px-3 py-1.5 text-slate-600 text-2xs">نموذج أولي شغال بدقة قياس عالية</td>
                </tr>
                <tr>
                  <td className="px-3 py-1.5 font-medium">4. التقرير الأكاديمي والتوثيق واللغة (الاستلال: 6.1%)</td>
                  <td className="px-3 py-1.5 text-center font-mono">15</td>
                  <td className="px-3 py-1.5 text-center font-mono font-bold">14.0</td>
                  <td className="px-3 py-1.5 text-slate-600 text-2xs">صياغة سليمة ومطابقة للمواصفات المعتمدة</td>
                </tr>
                <tr>
                  <td className="px-3 py-1.5 font-medium">5. العرض التقديمي والمناقشة الشفهية</td>
                  <td className="px-3 py-1.5 text-center font-mono">15</td>
                  <td className="px-3 py-1.5 text-center font-mono font-bold">14.0</td>
                  <td className="px-3 py-1.5 text-slate-600 text-2xs">إلقاء متمكن وإجابات علمية رصينة</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="px-3 py-2 text-slate-900">المجموع النهائي التراكمي:</td>
                  <td className="px-3 py-2 text-center font-mono">100</td>
                  <td className="px-3 py-2 text-center font-mono text-teal-900 text-sm">{avgEval}</td>
                  <td className="px-3 py-2 text-teal-800">تقدير: ممتاز مرتفع (A+)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Committee Verdict */}
          <div className="p-3 bg-slate-50 border border-slate-300 rounded text-xs space-y-1">
            <div className="font-bold text-slate-900">قرار لجنة المناقشة والحكم:</div>
            <p className="text-slate-700 leading-relaxed">
              اجتمعت اللجنة وقررت بعد الاستماع للعرض ومناقشة الطلاب وفحص التقرير النهائي: 
              <strong> إجازة المشروع بمرتبة الشرف ومنح الطلاب درجة التخرج المقررة مع التوصية بنشر المخرجات علمياً.</strong>
            </p>
          </div>

          {/* Signatures & Official Stamp Grid */}
          <div className="grid grid-cols-3 gap-4 pt-6 text-xs text-center border-t border-slate-200">
            <div className="space-y-8">
              <div className="font-bold text-slate-800">المشرف الأكاديمي:</div>
              <div className="text-2xs text-slate-500 font-serif italic">
                {project.supervisor.name}
                <div className="text-teal-800 font-bold mt-1">✓ معتمد وموقع رقمياً</div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="font-bold text-slate-800">الممتحن الداخلي بالقسم:</div>
              <div className="text-2xs text-slate-500 font-serif italic">
                د. حسام بن طارق الشريف
                <div className="text-teal-800 font-bold mt-1">✓ معتمد وموقع رقمياً</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="font-bold text-slate-800">مصادقة عمادة الكلية:</div>
              <div className="w-20 h-20 mx-auto rounded-full border-2 border-dashed border-slate-400 flex items-center justify-center text-3xs text-slate-400">
                خاتم الاعتماد الرسمي
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
