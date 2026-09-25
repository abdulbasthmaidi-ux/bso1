import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FACULTY_MEMBERS, DEPARTMENTS } from '../data/initialData';
import { ProjectCategory } from '../types';
import { Plus, Trash2, BookOpen, Layers } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({ isOpen, onClose }) => {
  const { createProject } = useApp();

  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [department, setDepartment] = useState(DEPARTMENTS[1]);
  const [category, setCategory] = useState<ProjectCategory>('graduation_2');
  const [term, setTerm] = useState('الفصل الدراسي الثاني 2026/2027');
  const [abstract, setAbstract] = useState('');
  const [methodology, setMethodology] = useState('');
  const [supervisorId, setSupervisorId] = useState(FACULTY_MEMBERS[0].id);
  const [objectives, setObjectives] = useState<string[]>([
    'تحديد الفجوة البحثية ومراجعة الأعمال السابقة في المجال',
    'تصميم وتنفيذ المعمارية البرمجية للحل المقترح',
    'التحقق التجريبي وقياس مؤشرات الأداء والدقة',
  ]);
  const [students, setStudents] = useState<
    Array<{ name: string; studentId: string; email: string; role: string }>
  >([
    {
      name: 'عبدالله بن محمد السعيد',
      studentId: '441008921',
      email: 'a.alsaeed@student.edu.sa',
      role: 'قائد الفريق ومطور النظم',
    },
  ]);

  if (!isOpen) return null;

  const handleAddObjective = () => {
    setObjectives([...objectives, '']);
  };

  const handleUpdateObjective = (index: number, val: string) => {
    const updated = [...objectives];
    updated[index] = val;
    setObjectives(updated);
  };

  const handleRemoveObjective = (index: number) => {
    setObjectives(objectives.filter((_, i) => i !== index));
  };

  const handleAddStudent = () => {
    setStudents([
      ...students,
      {
        name: '',
        studentId: '',
        email: '',
        role: 'باحث مشارك',
      },
    ]);
  };

  const handleUpdateStudent = (
    index: number,
    field: 'name' | 'studentId' | 'email' | 'role',
    val: string
  ) => {
    const updated = [...students];
    updated[index] = { ...updated[index], [field]: val };
    setStudents(updated);
  };

  const handleRemoveStudent = (index: number) => {
    if (students.length <= 1) return;
    setStudents(students.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !abstract) return;

    const selectedSupervisor =
      FACULTY_MEMBERS.find((f) => f.id === supervisorId) || FACULTY_MEMBERS[0];

    createProject({
      title,
      titleEn,
      department,
      category,
      term,
      abstract,
      methodology: methodology || 'منهجية التطوير الرشيق (Agile Methodology) مع التحليل المقارن للأداء.',
      supervisor: selectedSupervisor,
      students: students.map((s, idx) => ({
        id: `std-new-${idx}`,
        name: s.name || 'طالب باحث',
        studentId: s.studentId || `44100${Math.floor(1000 + Math.random() * 9000)}`,
        email: s.email || 'student@university.edu.sa',
        role: s.role || 'عضو الفريق',
      })),
      objectives: objectives.filter(Boolean),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl border border-slate-200 max-w-2xl w-full p-6 shadow-2xl my-8 space-y-5">
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              تسجيل مقترح مشروع أكاديمي جديد
            </h2>
            <div className="text-xs text-slate-500 mt-0.5">
              إيداع بيانات فكرة المشروع وفريق العمل والمشرف للاعتماد الرسمي
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Titles */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              عنوان المشروع باللغة العربية (معتمد رسمياً):
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 text-sm font-semibold"
              placeholder="مثال: نظام ذكي لرصد سلامة المنشآت الحيوية باستخدام إنترنت الأشياء والتعلم العميق"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              عنوان المشروع باللغة الإنجليزية (English Project Title):
            </label>
            <input
              type="text"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 font-sans"
              placeholder="e.g. Autonomous Structural Health Monitoring via Edge AI & IoT"
            />
          </div>

          {/* Academic categorization */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">القسم الأكاديمي:</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
              >
                {DEPARTMENTS.filter((d) => d !== 'جميع الأقسام الأكاديمية').map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">المرحلة الأكاديمية:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
              >
                <option value="graduation_1">مشروع تخرج 1 (Capstone 1)</option>
                <option value="graduation_2">مشروع تخرج 2 (Capstone 2)</option>
                <option value="master_thesis">رسالة ماجستير (Master Thesis)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">المشرف الأكاديمي المقترح:</label>
              <select
                value={supervisorId}
                onChange={(e) => setSupervisorId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 font-medium"
              >
                {FACULTY_MEMBERS.map((fac) => (
                  <option key={fac.id} value={fac.id}>
                    {fac.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Abstract */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              مستخلص الفكرة والمشكلة البحثية (Abstract):
            </label>
            <textarea
              rows={3}
              required
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 leading-relaxed"
              placeholder="اشرح المشكلة التي يعالجها المشروع، الفجوة في الحلول الحالية، والنتائج المتوقعة..."
            />
          </div>

          {/* Objectives */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block font-bold text-slate-800">الأهداف التفصيلية للمشروع:</label>
              <button
                type="button"
                onClick={handleAddObjective}
                className="text-2xs font-semibold text-teal-800 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>إضافة هدف</span>
              </button>
            </div>
            {objectives.map((obj, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="font-mono text-slate-400 font-bold">{i + 1}.</span>
                <input
                  type="text"
                  value={obj}
                  onChange={(e) => handleUpdateObjective(i, e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                  placeholder="هدف المشروع..."
                />
                {objectives.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveObjective(i)}
                    className="text-slate-400 hover:text-red-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Student Team */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="block font-bold text-slate-800">أعضاء الفريق الطلابي:</label>
              <button
                type="button"
                onClick={handleAddStudent}
                className="text-2xs font-semibold text-teal-800 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>إضافة طالب</span>
              </button>
            </div>
            {students.map((std, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50 p-2 rounded border border-slate-200/80">
                <input
                  type="text"
                  required
                  placeholder="الاسم الثلاثي للطالب"
                  value={std.name}
                  onChange={(e) => handleUpdateStudent(i, 'name', e.target.value)}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs"
                />
                <input
                  type="text"
                  required
                  placeholder="الرقم الجامعي"
                  value={std.studentId}
                  onChange={(e) => handleUpdateStudent(i, 'studentId', e.target.value)}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs font-mono"
                />
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    placeholder="الدور في الفريق"
                    value={std.role}
                    onChange={(e) => handleUpdateStudent(i, 'role', e.target.value)}
                    className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs"
                  />
                  {students.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveStudent(i)}
                      className="text-slate-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-medium text-slate-600 hover:text-slate-800"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-md transition-colors shadow-xs"
            >
              إرسال المقترح للاعتماد الأكاديمي
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
