import React, { useState } from 'react';
import { Project, Deliverable, Milestone, UserRole } from '../types';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Upload, 
  FileText, 
  Download, 
  MessageSquare, 
  Check, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface MilestonesTabProps {
  project: Project;
}

export const MilestonesTab: React.FC<MilestonesTabProps> = ({ project }) => {
  const { currentRole, submitDeliverable, reviewDeliverable, showNotification } = useApp();

  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState<Deliverable | null>(null);

  // Submit form state
  const [delivTitle, setDelivTitle] = useState('');
  const [delivVersion, setDelivVersion] = useState('1.0');
  const [fileName, setFileName] = useState('');
  const [plagiarismSimilarity, setPlagiarismSimilarity] = useState(5.4);

  // Review form state
  const [reviewGrade, setReviewGrade] = useState(95);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewStatus, setReviewStatus] = useState<'approved' | 'needs_revision'>('approved');

  const handleOpenSubmit = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setDelivTitle(`تقرير: ${milestone.title}`);
    setFileName(`${project.code}_${milestone.id}_Doc.pdf`);
    setShowSubmitModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMilestone) return;

    submitDeliverable(project.id, {
      milestoneId: selectedMilestone.id,
      title: delivTitle,
      submittedBy: project.students[0]?.name || 'الطالب الباحث',
      submittedAt: new Date().toISOString().split('T')[0],
      version: delivVersion,
      fileName: fileName || `${project.code}_Deliverable.pdf`,
      fileSize: '8.4 MB',
      plagiarismSimilarity: Number(plagiarismSimilarity),
    });

    setShowSubmitModal(false);
    setDelivTitle('');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showReviewModal) return;

    reviewDeliverable(
      project.id,
      showReviewModal.id,
      reviewStatus,
      reviewNotes,
      reviewGrade
    );

    setShowReviewModal(null);
    setReviewNotes('');
  };

  return (
    <div className="space-y-8">
      {/* Milestones Road Map Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              خارطة المراحل الأكاديمية ونقاط التقييم (Milestones Roadmap)
            </h2>
            <div className="text-xs text-slate-500 mt-0.5">
              متابعة تسليمات ومحطات المشروع مع الأوزان النسبية للدرجات
            </div>
          </div>
          <div className="text-xs text-slate-500 font-mono tabular-nums">
            إجمالي الوزن: 100%
          </div>
        </div>

        <div className="space-y-3">
          {project.milestones.map((ms, index) => {
            const isCompleted = ms.status === 'completed';
            const isInProgress = ms.status === 'in_progress';
            const relatedDeliverables = project.deliverables.filter(
              (d) => d.milestoneId === ms.id
            );

            return (
              <div
                key={ms.id}
                className={`p-4 rounded-lg border transition-all ${
                  isCompleted
                    ? 'bg-white border-slate-200'
                    : isInProgress
                    ? 'bg-teal-50/40 border-teal-200'
                    : 'bg-white border-slate-200/80 opacity-90'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">المرحلة {index + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums font-medium text-teal-800">
                        الوزن الأكاديمي: {ms.weightPercentage}%
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>تاريخ الاستحقاق: {ms.dueDate}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      {ms.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ms.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 sm:self-center">
                    <span className="text-xs font-medium text-slate-600">
                      {isCompleted && (
                        <span className="text-teal-700 font-semibold">مكتملة ومعتمدة ✓</span>
                      )}
                      {isInProgress && (
                        <span className="text-teal-900 font-semibold">قيد التنفيذ والمراجعة</span>
                      )}
                      {ms.status === 'upcoming' && 'مرحلة قادمة'}
                    </span>

                    {/* Action button */}
                    {ms.deliverableRequired && (
                      <button
                        onClick={() => handleOpenSubmit(ms)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-md transition-colors bg-white border border-slate-300 text-slate-700 hover:text-teal-800 hover:border-teal-700 flex items-center gap-1 shadow-2xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>إيداع مخرج</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Sub-deliverables for this milestone */}
                {relatedDeliverables.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                    <div className="text-xs text-slate-500 font-medium">المخرجات والتقارير المودعة لهذه المرحلة:</div>
                    {relatedDeliverables.map((deliv) => (
                      <div
                        key={deliv.id}
                        className="p-3 bg-slate-50 rounded border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 font-medium text-slate-900">
                            <FileText className="w-3.5 h-3.5 text-teal-700" />
                            <span>{deliv.title}</span>
                            <span className="text-slate-400 font-mono">(v{deliv.version})</span>
                          </div>
                          <div className="text-slate-500 flex items-center gap-2 text-2xs">
                            <span>الملف: {deliv.fileName}</span>
                            <span aria-hidden="true">·</span>
                            <span>الحجم: {deliv.fileSize}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums">
                              الاستلال: <strong>{deliv.plagiarismSimilarity}%</strong>
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>قدمه: {deliv.submittedBy} في {deliv.submittedAt}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {deliv.grade !== undefined && (
                            <span className="font-mono tabular-nums font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                              الدرجة: {deliv.grade}/100
                            </span>
                          )}

                          <span className={`font-semibold ${deliv.status === 'approved' ? 'text-teal-700' : 'text-amber-700'}`}>
                            {deliv.status === 'approved' ? 'معتمد رسمي' : 'بانتظار التحكيم'}
                          </span>

                          <button
                            onClick={() => showNotification(`بدء تنزيل الملف المرجعي: ${deliv.fileName}`)}
                            className="p-1.5 text-slate-600 hover:text-slate-900 rounded transition-colors"
                            title="تحميل الملف"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>

                          {/* Supervisor / Committee Review Action */}
                          {(currentRole === 'supervisor' || currentRole === 'committee') && (
                            <button
                              onClick={() => {
                                setShowReviewModal(deliv);
                                setReviewGrade(deliv.grade || 95);
                              }}
                              className="px-2.5 py-1 text-2xs font-semibold rounded bg-teal-800 text-white hover:bg-teal-900 transition-colors"
                            >
                              تحكيم واعتماد
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Deliverable Upload Modal */}
      {showSubmitModal && selectedMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  إيداع مخرج / تقرير أكاديمي
                </h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  المرحلة: {selectedMilestone.title}
                </div>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  عنوان الوثيقة أو التقرير الأكاديمي:
                </label>
                <input
                  type="text"
                  required
                  value={delivTitle}
                  onChange={(e) => setDelivTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                  placeholder="مثال: المسودة النهائية للتقرير الفني والتنفيذي"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    رقم الإصدار (Version):
                  </label>
                  <input
                    type="text"
                    required
                    value={delivVersion}
                    onChange={(e) => setDelivVersion(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 font-mono"
                    placeholder="1.0"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    نسبة الاستلال العلمي (% Similarity):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    required
                    value={plagiarismSimilarity}
                    onChange={(e) => setPlagiarismSimilarity(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  اسم ملف المستند (PDF / ZIP):
                </label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 font-mono"
                  placeholder="Project_Report.pdf"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                  <span>معايير الاعتماد الأكاديمي</span>
                </div>
                <p>
                  يتم فحص الوثيقة تلقائياً عبر بنك الأبحاث الجامعية للتحقق من عدم تجاوز نسبة الاستلال الحد الأقصى المعتمد (15%).
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:text-slate-800"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-md transition-colors shadow-xs"
                >
                  تأكيد الإيداع والإرسال
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review and Grade Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  تحكيم واعتماد المخرج الأكاديمي
                </h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  {showReviewModal.title} (الاستلال: {showReviewModal.plagiarismSimilarity}%)
                </div>
              </div>
              <button
                onClick={() => setShowReviewModal(null)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  قرار التحكيم:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setReviewStatus('approved')}
                    className={`py-2 px-3 rounded border font-medium text-center transition-colors ${
                      reviewStatus === 'approved'
                        ? 'bg-teal-800 text-white border-teal-800'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    اعتماد المخرج (مقبول)
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewStatus('needs_revision')}
                    className={`py-2 px-3 rounded border font-medium text-center transition-colors ${
                      reviewStatus === 'needs_revision'
                        ? 'bg-amber-700 text-white border-amber-700'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    إعادة للتعديل (ملاحظات)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  الدرجة التقييمية للمخرج (من 100):
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={reviewGrade}
                  onChange={(e) => setReviewGrade(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 font-mono tabular-nums text-sm font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ملاحظات المشرف والتوصيات التوجيهية للطلاب:
                </label>
                <textarea
                  rows={4}
                  required
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="أدخل توجيهاتك المنهجية أو نقاط التحسين المطلوبة في الفصول..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(null)}
                  className="px-4 py-2 font-medium text-slate-600 hover:text-slate-800"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-md transition-colors shadow-xs"
                >
                  حفظ القرار ورصد الدرجة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
