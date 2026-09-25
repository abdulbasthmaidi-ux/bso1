import React, { useState } from 'react';
import { Project, SupervisoryMeeting } from '../types';
import { useApp } from '../context/AppContext';
import { Plus, CheckCheck, Clock, MapPin, Calendar, CheckSquare, FileSignature } from 'lucide-react';

interface MeetingsTabProps {
  project: Project;
}

export const MeetingsTab: React.FC<MeetingsTabProps> = ({ project }) => {
  const { currentRole, addSupervisoryMeeting, signMeeting, showNotification } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [meetingDate, setMeetingDate] = useState(new Date().toISOString().split('T')[0]);
  const [meetingTime, setMeetingTime] = useState('11:00 ص');
  const [meetingLocation, setMeetingLocation] = useState('مكتب المشرف الأكاديمي');
  const [meetingAgenda, setMeetingAgenda] = useState('');
  const [meetingOutcomes, setMeetingOutcomes] = useState('');
  const [meetingActionItems, setMeetingActionItems] = useState('');
  const [nextMeetingDate, setNextMeetingDate] = useState('2027-02-15');
  const [selectedStudents, setSelectedStudents] = useState<string[]>(
    project.students.map((s) => s.name)
  );

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingAgenda) return;

    const actionList = meetingActionItems
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    addSupervisoryMeeting(project.id, {
      date: meetingDate,
      time: meetingTime,
      location: meetingLocation,
      agenda: meetingAgenda,
      outcomes: meetingOutcomes || 'تمت مناقشة النقاط المحددة والاتفاق على أولويات الأسبوع القادم.',
      actionItems: actionList.length > 0 ? actionList : ['متابعة تنفيذ التوصيات المسجلة'],
      nextMeetingDate: nextMeetingDate,
      supervisorSignature: currentRole === 'supervisor',
      attendedStudents: selectedStudents,
    });

    setShowAddModal(false);
    setMeetingAgenda('');
    setMeetingOutcomes('');
    setMeetingActionItems('');
  };

  const toggleStudent = (name: string) => {
    setSelectedStudents((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            سجل الجلسات الإرشادية والتوجيه الأكاديمي (Supervisory Meeting Logbook)
          </h2>
          <div className="text-xs text-slate-500 mt-0.5">
            توثيق اللقاءات الدورية الإلزامية بين المشرف والطلاب ورصد المهام والمحاضر
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>توثيق جلسة إرشاد جديدة</span>
        </button>
      </div>

      {/* Meetings Timeline */}
      <div className="space-y-4">
        {project.supervisoryMeetings.length === 0 ? (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-lg p-6">
            <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500">
              لم يتم توثيق أي جلسات إرشادية حتى الآن. اضغط على الزر أعلاه لتسجيل أول جلسة.
            </p>
          </div>
        ) : (
          project.supervisoryMeetings.map((meeting, index) => (
            <div
              key={meeting.id}
              className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3"
            >
              {/* Meeting Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">
                    الجلسة رقم ({project.supervisoryMeetings.length - index})
                  </span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="font-mono tabular-nums text-slate-600">{meeting.date}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-slate-600">{meeting.time}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-slate-600">{meeting.location}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {meeting.supervisorSignature ? (
                    <div className="flex items-center gap-1 text-teal-800 font-semibold bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                      <FileSignature className="w-3.5 h-3.5" />
                      <span>توقيع المشرف معتمد رقمياً</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-amber-700 font-medium">بانتظار مصادقة المشرف</span>
                      {currentRole === 'supervisor' && (
                        <button
                          onClick={() => signMeeting(project.id, meeting.id)}
                          className="px-2.5 py-1 bg-teal-800 text-white rounded font-medium hover:bg-teal-900 transition-colors"
                        >
                          توقيع المحضر الآن
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Agenda & Outcomes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="font-bold text-slate-800 mb-1">جدول أعمال الجلسة:</div>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
                    {meeting.agenda}
                  </p>
                </div>

                <div>
                  <div className="font-bold text-slate-800 mb-1">النتائج والقرارات والتوجيهات:</div>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
                    {meeting.outcomes}
                  </p>
                </div>
              </div>

              {/* Action Items List */}
              {meeting.actionItems && meeting.actionItems.length > 0 && (
                <div className="pt-2">
                  <div className="text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1">
                    <CheckSquare className="w-3.5 h-3.5 text-teal-800" />
                    <span>التوصيات والمهام المكلف بها الطلاب:</span>
                  </div>
                  <ul className="space-y-1">
                    {meeting.actionItems.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-600 flex items-start gap-2"
                      >
                        <span className="text-teal-700 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Footer with Attendance and Next Meeting */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-2xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">حضور الطلاب:</span>
                  <span>{meeting.attendedStudents.join('، ') || 'جميع أعضاء الفريق'}</span>
                </div>

                {meeting.nextMeetingDate && (
                  <div className="flex items-center gap-1 font-medium text-slate-700">
                    <span>موعد الجلسة التالية:</span>
                    <span className="font-mono tabular-nums text-teal-800">{meeting.nextMeetingDate}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Meeting Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                توثيق جلسة إرشاد ومتابعة أكاديمية
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMeeting} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">التاريخ:</label>
                  <input
                    type="date"
                    required
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">الوقت:</label>
                  <input
                    type="text"
                    required
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                    placeholder="10:00 ص"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">المكان / الرابط:</label>
                  <input
                    type="text"
                    required
                    value={meetingLocation}
                    onChange={(e) => setMeetingLocation(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                    placeholder="قاعة / معمل"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  جدول أعمال الجلسة (Agenda):
                </label>
                <input
                  type="text"
                  required
                  value={meetingAgenda}
                  onChange={(e) => setMeetingAgenda(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                  placeholder="مثال: مراجعة كود النموذج وتقليل نسبة الخطأ في الاستدلال"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  النتائج والتوجيهات العلمية المستخلصة:
                </label>
                <textarea
                  rows={3}
                  value={meetingOutcomes}
                  onChange={(e) => setMeetingOutcomes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                  placeholder="ما تم التوصل إليه خلال الجلسة وتوصيات المشرف المنهجية..."
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  المهام الموكلة للطلاب (سطر لكل مهمة):
                </label>
                <textarea
                  rows={2}
                  value={meetingActionItems}
                  onChange={(e) => setMeetingActionItems(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                  placeholder="مهمة 1&#10;مهمة 2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    موعد الجلسة التالية المقترح:
                  </label>
                  <input
                    type="date"
                    value={nextMeetingDate}
                    onChange={(e) => setNextMeetingDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    حضور أعضاء الفريق:
                  </label>
                  <div className="space-y-1">
                    {project.students.map((student) => (
                      <label key={student.id} className="flex items-center gap-1.5 cursor-pointer text-2xs">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.name)}
                          onChange={() => toggleStudent(student.name)}
                          className="rounded text-teal-800"
                        />
                        <span>{student.name.split(' ')[0]}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 font-medium text-slate-600 hover:text-slate-800"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-md transition-colors shadow-xs"
                >
                  حفظ المحضر وتوثيق الجلسة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
