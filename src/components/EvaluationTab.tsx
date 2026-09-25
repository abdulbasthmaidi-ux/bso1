import React, { useState } from 'react';
import { Project, CriteriaScores, ProjectEvaluation } from '../types';
import { useApp } from '../context/AppContext';
import { Award, CheckCircle2, Sliders, ShieldCheck, FileCheck, Star } from 'lucide-react';

interface EvaluationTabProps {
  project: Project;
}

export const EvaluationTab: React.FC<EvaluationTabProps> = ({ project }) => {
  const { currentRole, saveEvaluation, showNotification } = useApp();

  const [evaluatorName, setEvaluatorName] = useState(
    currentRole === 'supervisor' ? project.supervisor.name : 'د. حسام الشريف (رئيس اللجنة)'
  );
  const [evaluatorRole, setEvaluatorRole] = useState<
    'supervisor' | 'internal_examiner' | 'external_examiner' | 'committee_chair'
  >(currentRole === 'supervisor' ? 'supervisor' : 'committee_chair');

  const [scores, setScores] = useState<CriteriaScores>({
    problemSignificance: 14, // max 15
    literatureMethodology: 18, // max 20
    technicalImplementation: 32, // max 35
    documentationReport: 14, // max 15
    presentationDefense: 14, // max 15
  });

  const [feedback, setFeedback] = useState(
    'مشروع متميز ومكتمل العناصر، تميز الفريق في إتقان الجانب التطبيقي وجودة التوثيق.'
  );

  const totalScore =
    scores.problemSignificance +
    scores.literatureMethodology +
    scores.technicalImplementation +
    scores.documentationReport +
    scores.presentationDefense;

  const getLetterGrade = (num: number) => {
    if (num >= 95) return 'A+ (ممتاز مرتفع)';
    if (num >= 90) return 'A (ممتاز)';
    if (num >= 85) return 'B+ (جيد جداً مرتفع)';
    if (num >= 80) return 'B (جيد جداً)';
    if (num >= 75) return 'C+ (جيد مرتفع)';
    if (num >= 70) return 'C (جيد)';
    if (num >= 60) return 'D (مقبول)';
    return 'F (راسب)';
  };

  const handleScoreChange = (key: keyof CriteriaScores, value: number, max: number) => {
    const val = Math.min(max, Math.max(0, value));
    setScores((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveEvaluation(project.id, {
      evaluatorName,
      evaluatorRole,
      scores,
      totalScore,
      feedback,
    });
  };

  return (
    <div className="space-y-8">
      {/* Rubric Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            مصفوفة التقييم الأكاديمي الموزون (Standardized Academic Rubric)
          </h2>
          <div className="text-xs text-slate-500 mt-0.5">
            النموذج الرسمي المعتمد من مجلس الكلية لتقييم مشاريع التخرج والأطروحات
          </div>
        </div>

        {/* Live Total Score Pill */}
        <div className="flex items-center gap-3 bg-teal-50 border border-teal-200 px-4 py-2 rounded-lg text-left">
          <div>
            <div className="text-xs text-teal-800 font-semibold">المجموع الكلي الموزون:</div>
            <div className="text-xs text-teal-700 font-medium">{getLetterGrade(totalScore)}</div>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-teal-900">
            {totalScore}<span className="text-sm font-normal text-teal-600">/100</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Interactive Grading Form (2 cols) */}
        <form onSubmit={handleSave} className="lg:col-span-2 space-y-6">
          {/* Evaluator Identity */}
          <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-3">
            <div className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
              بيانات عضو لجنة التحكيم:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">اسم المحكّم:</label>
                <input
                  type="text"
                  required
                  value={evaluatorName}
                  onChange={(e) => setEvaluatorName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">الصفة في اللجنة:</label>
                <select
                  value={evaluatorRole}
                  onChange={(e) =>
                    setEvaluatorRole(
                      e.target.value as
                        | 'supervisor'
                        | 'internal_examiner'
                        | 'external_examiner'
                        | 'committee_chair'
                    )
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 font-medium"
                >
                  <option value="supervisor">المشرف الأكاديمي الرئيسي (30%)</option>
                  <option value="internal_examiner">الممتحن الداخلي بالقسم (35%)</option>
                  <option value="external_examiner">الممتحن الخارجي (35%)</option>
                  <option value="committee_chair">رئيس لجنة مشاريع التخرج</option>
                </select>
              </div>
            </div>
          </div>

          {/* Detailed 5 Criteria */}
          <div className="space-y-4">
            {/* Criterion 1 */}
            <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    1. أصالة المشكلة والأهمية التطبيقية (Problem Significance)
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    وضوح صياغة المشكلة، الجدوى الاقتصادية والمجتمعية، وابتكار الحل المقترح.
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <span className="font-mono tabular-nums font-bold text-base text-slate-900">
                    {scores.problemSignificance}
                  </span>
                  <span className="text-slate-400 font-mono"> / 15</span>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                value={scores.problemSignificance}
                onChange={(e) =>
                  handleScoreChange('problemSignificance', Number(e.target.value), 15)
                }
                className="w-full accent-teal-800 cursor-pointer"
              />
            </div>

            {/* Criterion 2 */}
            <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    2. المسح الأدبي والمنهجية العلمية (Literature & Methodology)
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    شمولية المراجع الأكاديمية الحديثة، دقة تصميم التجارب، وتوثيق الفرضيات.
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <span className="font-mono tabular-nums font-bold text-base text-slate-900">
                    {scores.literatureMethodology}
                  </span>
                  <span className="text-slate-400 font-mono"> / 20</span>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="20"
                step="0.5"
                value={scores.literatureMethodology}
                onChange={(e) =>
                  handleScoreChange('literatureMethodology', Number(e.target.value), 20)
                }
                className="w-full accent-teal-800 cursor-pointer"
              />
            </div>

            {/* Criterion 3 */}
            <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    3. التنفيذ البرمجي والهندسي والنتائج التجريبية (Implementation)
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    كفاءة الكود المصدري، معمارية النظام، الاختبارات والتحقق، والنموذج الفعلي الشغال.
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <span className="font-mono tabular-nums font-bold text-base text-slate-900">
                    {scores.technicalImplementation}
                  </span>
                  <span className="text-slate-400 font-mono"> / 35</span>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="35"
                step="0.5"
                value={scores.technicalImplementation}
                onChange={(e) =>
                  handleScoreChange('technicalImplementation', Number(e.target.value), 35)
                }
                className="w-full accent-teal-800 cursor-pointer"
              />
            </div>

            {/* Criterion 4 */}
            <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    4. التقرير الأكاديمي والتوثيق واللغة (Thesis Documentation)
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    الالتزام بدليل كتابة الرسائل، جودة المخططات والملاحق، ونسبة الاستلال المقبولة.
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <span className="font-mono tabular-nums font-bold text-base text-slate-900">
                    {scores.documentationReport}
                  </span>
                  <span className="text-slate-400 font-mono"> / 15</span>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                value={scores.documentationReport}
                onChange={(e) =>
                  handleScoreChange('documentationReport', Number(e.target.value), 15)
                }
                className="w-full accent-teal-800 cursor-pointer"
              />
            </div>

            {/* Criterion 5 */}
            <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    5. العرض التقديمي والمناقشة والدفاع الشفهي (Presentation & Viva)
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    وضوح الإلقاء، الرد على أسئلة اللجنة العلمية، وتوزيع الإجابات بين أعضاء الفريق.
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <span className="font-mono tabular-nums font-bold text-base text-slate-900">
                    {scores.presentationDefense}
                  </span>
                  <span className="text-slate-400 font-mono"> / 15</span>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                value={scores.presentationDefense}
                onChange={(e) =>
                  handleScoreChange('presentationDefense', Number(e.target.value), 15)
                }
                className="w-full accent-teal-800 cursor-pointer"
              />
            </div>
          </div>

          {/* Qualitative Feedback */}
          <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-2 text-xs">
            <label className="block font-bold text-slate-900">
              التقرير الوصفي وملاحظات لجنة التحكيم:
            </label>
            <textarea
              rows={3}
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
              placeholder="اكتب تقرير التحكيم العلمي والتوصيات الموجهة للطلاب..."
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors shadow-xs"
            >
              اعتماد ورصد استمارة التقييم الأكاديمي
            </button>
          </div>
        </form>

        {/* Right Column: Existing Evaluations Summary (1 col) */}
        <div className="space-y-4">
          <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900">
                التقييمات المعتمدة للمشروع ({project.evaluations.length})
              </h3>
            </div>

            {project.evaluations.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                لم يتم إيداع تقييمات رسمية بعد.
              </div>
            ) : (
              <div className="space-y-3">
                {project.evaluations.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{ev.evaluatorName}</span>
                      <span className="font-mono tabular-nums font-bold text-teal-800">
                        {ev.totalScore} / 100
                      </span>
                    </div>

                    <div className="text-2xs text-slate-500">
                      الصفة: {ev.evaluatorRole === 'supervisor' ? 'المشرف الرئيسي' : 'عضو لجنة التحكيم'} · تاريخ الرصد: {ev.submittedAt}
                    </div>

                    <p className="text-slate-600 text-2xs italic bg-white p-2 rounded border border-slate-100">
                      "{ev.feedback}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Defense readiness box */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-800" />
              <span>شروط الانتقال للاعتماد النهائي</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-2xs">
              يشترط حصول المشروع على متوسط تقييم لا يقل عن 60% من أعضاء اللجنة مجتمعين للموافقة على منحه درجة التخرج واعتماد التقرير في المكتبة الرقمية للجامعة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
