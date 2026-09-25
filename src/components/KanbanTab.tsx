import React, { useState } from 'react';
import { Project, Task, TaskPriority, TaskStatus } from '../types';
import { useApp } from '../context/AppContext';
import { Plus, CheckCircle, ArrowRight, ArrowLeft, Calendar, User } from 'lucide-react';

interface KanbanTabProps {
  project: Project;
}

export const KanbanTab: React.FC<KanbanTabProps> = ({ project }) => {
  const { updateTaskStatus, addTask, showNotification } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskAssignee, setTaskAssignee] = useState(project.students[0]?.name || '');
  const [taskPriority, setTaskPriority] = useState<TaskPriority>('medium');
  const [taskDueDate, setTaskDueDate] = useState('2027-02-15');

  const columns: { id: TaskStatus; label: string; count: number }[] = [
    {
      id: 'todo',
      label: 'مهام قادمة',
      count: project.tasks.filter((t) => t.status === 'todo').length,
    },
    {
      id: 'in_progress',
      label: 'قيد التنفيذ',
      count: project.tasks.filter((t) => t.status === 'in_progress').length,
    },
    {
      id: 'review',
      label: 'قيد المراجعة والتدقيق',
      count: project.tasks.filter((t) => t.status === 'review').length,
    },
    {
      id: 'done',
      label: 'مكتملة',
      count: project.tasks.filter((t) => t.status === 'done').length,
    },
  ];

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;

    addTask(project.id, {
      title: taskTitle,
      description: taskDescription,
      assignedTo: taskAssignee,
      status: 'todo',
      priority: taskPriority,
      dueDate: taskDueDate,
    });

    setShowAddModal(false);
    setTaskTitle('');
    setTaskDescription('');
  };

  const statusFlow: TaskStatus[] = ['todo', 'in_progress', 'review', 'done'];

  const moveTask = (task: Task, direction: 'next' | 'prev') => {
    const currentIndex = statusFlow.indexOf(task.status);
    if (direction === 'next' && currentIndex < statusFlow.length - 1) {
      updateTaskStatus(project.id, task.id, statusFlow[currentIndex + 1]);
    } else if (direction === 'prev' && currentIndex > 0) {
      updateTaskStatus(project.id, task.id, statusFlow[currentIndex - 1]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            لوحة المهام وتوزيع الأدوار (Task Board)
          </h2>
          <div className="text-xs text-slate-500 mt-0.5">
            تنسيق العمل اليومي لأعضاء الفريق البحثي ومتابعة سرعة الإنجاز
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>مهمة جديدة</span>
        </button>
      </div>

      {/* Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colTasks = project.tasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 flex flex-col min-h-[420px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 text-xs">
                <span className="font-bold text-slate-800">{col.label}</span>
                <span className="font-mono tabular-nums font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {col.count}
                </span>
              </div>

              {/* Tasks List */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {colTasks.length === 0 ? (
                  <div className="text-center py-10 text-xs text-slate-400">
                    لا توجد مهام في هذا العمود
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white border border-slate-200 rounded-md p-3.5 shadow-2xs hover:border-teal-700/50 transition-all space-y-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between text-2xs text-slate-500">
                        <span className="font-medium text-slate-700">
                          {task.priority === 'high' && 'أولوية عاجلة'}
                          {task.priority === 'medium' && 'أولوية متوسطة'}
                          {task.priority === 'low' && 'أولوية اعتيادية'}
                        </span>
                        <span className="font-mono tabular-nums">{task.dueDate}</span>
                      </div>

                      <h4 className="font-bold text-slate-900 leading-snug">
                        {task.title}
                      </h4>

                      {task.description && (
                        <p className="text-slate-600 text-2xs line-clamp-2 leading-relaxed">
                          {task.description}
                        </p>
                      )}

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-500">
                        <span className="truncate max-w-[120px]">
                          المسؤول: {task.assignedTo.split(' ')[0]}
                        </span>

                        {/* Movement Buttons */}
                        <div className="flex items-center gap-1 shrink-0">
                          {col.id !== 'todo' && (
                            <button
                              onClick={() => moveTask(task, 'prev')}
                              className="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors"
                              title="الرجوع للعمود السابق"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                          {col.id !== 'done' && (
                            <button
                              onClick={() => moveTask(task, 'next')}
                              className="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors"
                              title="التقدم للعمود التالي"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                إضافة مهمة جديدة لمشروع التخرج
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  عنوان المهمة:
                </label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                  placeholder="مثال: ضبط دقة مصفوفة الالتباس (Confusion Matrix)"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  توصيف المهمة والمخرجات المتوقعة:
                </label>
                <textarea
                  rows={3}
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                  placeholder="تفاصيل المتطلبات والأدوات المستخدمة..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    تعيين إلى:
                  </label>
                  <select
                    value={taskAssignee}
                    onChange={(e) => setTaskAssignee(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                  >
                    {project.students.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    مستوى الأولوية:
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as TaskPriority)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700"
                  >
                    <option value="high">أولوية عاجلة (High)</option>
                    <option value="medium">أولوية متوسطة (Medium)</option>
                    <option value="low">أولوية عادية (Low)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  تاريخ الاستحقاق:
                </label>
                <input
                  type="date"
                  value={taskDueDate}
                  onChange={(e) => setTaskDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-teal-700 font-mono"
                />
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
                  إضافة المهمة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
