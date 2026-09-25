import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Clock, MapPin, Users, Award, CheckCircle, ChevronLeft, Plus } from 'lucide-react';
import { DefenseSession, Project } from '../types';

export const DefenseScheduleView: React.FC = () => {
  const { projects, setActiveProject, scheduleDefense, currentRole, showNotification } = useApp();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projects.find((p) => p.status === 'ready_for_defense')?.id || projects[0]?.id || ''
  );
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Form states
  const [defenseDate, setDefenseDate] = useState('2027-02-20');
  const [defenseTime, setDefenseTime] = useState('10:00 صباحاً');
  const [defenseHall, setDefenseHall] = useState('قاعة ابن الهيثم - الدور الثالث');
  const [headOfCommittee, setHeadOfCommittee] = useState('أ.د. ريم بنت عبدالعزيز الخالدي');
  const [internalExaminer, setInternalExaminer] = useState('د. حسام بن طارق الشريف');
  const [externalExaminer, setExternalExaminer] = useState('أ.د. ماجد بن سعود السبيعي');
  const [verdict, setVerdict] = useState<
    'pass_with_honors' | 'pass' | 'minor_revisions' | 'major_revisions'
  >('pass_with_honors');
  const [recommendations, setRecommendations] = useState(
    'توصي اللجنة بنشر ورقة بحثية مستخلصة من مخرجات المشروع في مجلة علمية مصنفة Q1.'
  );

  const projectsWithDefense = projects.filter((p) => p.defenseSchedule);
  const eligibleProjects = projects.filter((p) => !p.defenseSchedule || p.status === 'ready_for_defense');

  const handleSaveDefense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId) return;

    const defenseData: DefenseSession = {
      date: defenseDate,
      time: defenseTime,
      hall: defenseHall,
      headOfCommittee,
      internalExaminer,
      externalExaminer,
      status: 'scheduled',
      verdict: verdict,
      recommendations,
    };

    scheduleDefense(selectedProjectId, defenseData);
    setShowScheduleModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            جدول لجان المناقشة والحكم على المشاريع والأطروحات
          </h1>
          <div className="text-xs text-slate-500 mt-1">
            مواعيد الجلسات العلنية، توزيع قاعات المناقشات، وتشكيل اللجان الأكاديمية
          </div>
        </div>

        {(currentRole === 'committee' || currentRole === 'supervisor') && (
          <button
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>جدولة جلسة مناقشة جديدة</span>
          </button>
        )}
      </div>

      {/* Grid of Scheduled Defenses */}
      <div className="space-y-4">
        {projectsWithDefense.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-lg p-6">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-slate-900 mb-1">
              لم يتم جدولة جلسات مناقشة بعد
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              يمكن لرئيس لجنة مشاريع التخرج أو المشرف الأكاديمي حجز القاعات وتعيين المحكمين.
            </p>
          </div>
        ) : (
          projectsWithDefense.map((proj) => {
            const def = proj.defenseSchedule!;
            return (
              <div
                key={proj.id}
                className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs hover:border-teal-700/60 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1 flex items-center gap-2">
                      <span className="font-mono tabular-nums font-semibold text-teal-800">
                        {proj.code}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{proj.department}</span>
                      <span aria-hidden="true">·</span>
                      <span>{proj.term}</span>
                    </div>

                    <h3
                      onClick={() => setActiveProject(proj.id)}
                      className="text-base font-bold text-slate-900 hover:text-teal-800 transition-colors cursor-pointer leading-snug"
                    >
                      {proj.title}
                    </h3>

                    <div className="text-xs text-slate-600 mt-1">
                      الطلاب الباحثون: <strong>{proj.students.map((s) => s.name).join('، ')}</strong>
                    </div>
                  </div>

                  <div className="sm:text-left shrink-0">
                    <div className="text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1.5 rounded border border-teal-200">
                      {def.date} · {def.time}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      القاعة: {def.hall}
                    </div>
                  </div>
                </div>

                {/* Committee Formation Box */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded border border-slate-200/80 text-xs">
                  <div>
                    <div className="text-slate-400 font-medium mb-0.5">رئيس اللجنة (المشرف):</div>
                    <div className="font-bold text-slate-900">{def.headOfCommittee}</div>
                  </div>

                  <div>
                    <div className="text-slate-400 font-medium mb-0.5">الممتحن الداخلي:</div>
                    <div className="font-bold text-slate-900">{def.internalExaminer}</div>
                  </div>

                  <div>
                    <div className="text-slate-400 font-medium mb-0.5">الممتحن الخارجي:</div>
                    <div className="font-bold text-slate-900">{def.externalExaminer}</div>
                  </div>
                </div>

                {/* Verdict & Recommendations */}
                {def.verdict && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700">قرار اللجنة:</span>
                      <span className="font-bold text-teal-800">
                        {def.verdict === 'pass_with_honors' && 'اجتياز المشروع بمرتبة الشرف الأولى'}
                        {def.verdict === 'pass' && 'اجتياز المشروع بنجاح'}
                        {def.verdict === 'minor_revisions' && 'اجتياز مع تعديلات طفيفة خلال أسبوعين'}
                        {def.verdict === 'major_revisions' && 'إعادة مناقشة بعد استكمال الملاحظات'}
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveProject(proj.id)}
                      className="text-teal-800 hover:text-teal-900 font-semibold flex items-center gap-1 self-start sm:self-center"
                    >
                      <span>عرض تفاصيل المشروع والاستمارات</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Schedule Defense Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                جدولة جلسة مناقشة وتشكيل اللجنة الأكاديمية
              </h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDefense} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  المشروع المراد جدولته:
                </label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 font-medium"
                >
                  {eligibleProjects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.code} - {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    تاريخ المناقشة:
                  </label>
                  <input
                    type="date"
                    required
                    value={defenseDate}
                    onChange={(e) => setDefenseDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    وقت المناقشة:
                  </label>
                  <input
                    type="text"
                    required
                    value={defenseTime}
                    onChange={(e) => setDefenseTime(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                    placeholder="10:00 صباحاً"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  مقر المناقشة / القاعة:
                </label>
                <input
                  type="text"
                  required
                  value={defenseHall}
                  onChange={(e) => setDefenseHall(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                  placeholder="المدرج الرئيسي - قاعة ابن الهيثم"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="font-bold text-slate-900">أعضاء لجنة التحكيم:</div>

                <div>
                  <label className="block text-slate-600 text-2xs mb-0.5">
                    رئيس اللجنة (المشرف):
                  </label>
                  <input
                    type="text"
                    required
                    value={headOfCommittee}
                    onChange={(e) => setHeadOfCommittee(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 text-2xs mb-0.5">
                    الممتحن الداخلي بالقسم:
                  </label>
                  <input
                    type="text"
                    required
                    value={internalExaminer}
                    onChange={(e) => setInternalExaminer(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 text-2xs mb-0.5">
                    الممتحن الخارجي (جامعة أخرى أو صناعة):
                  </label>
                  <input
                    type="text"
                    required
                    value={externalExaminer}
                    onChange={(e) => setExternalExaminer(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:text-slate-800"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-md transition-colors shadow-xs"
                >
                  تأكيد الجدولة وإصدار التكليفات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
