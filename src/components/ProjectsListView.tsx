import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS } from '../data/initialData';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Plus, 
  ExternalLink, 
  BookOpen, 
  User, 
  Layers, 
  Calendar 
} from 'lucide-react';
import { ProjectCategory, ProjectStatus } from '../types';

interface ProjectsListViewProps {
  onOpenNewProject: () => void;
}

export const ProjectsListView: React.FC<ProjectsListViewProps> = ({ onOpenNewProject }) => {
  const { 
    projects, 
    setActiveProject, 
    searchQuery, 
    setSearchQuery,
    selectedDepartment,
    setSelectedDepartment,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus 
  } = useApp();

  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    // Search query matches title, code, student, supervisor, tag
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.supervisor.name.toLowerCase().includes(q) ||
      p.students.some((s) => s.name.toLowerCase().includes(q)) ||
      p.tags.some((t) => t.toLowerCase().includes(q));

    // Department filter
    const matchesDept = 
      selectedDepartment === 'جميع الأقسام الأكاديمية' || 
      p.department === selectedDepartment;

    // Category filter
    const matchesCategory = 
      selectedCategory === 'all' || 
      p.category === selectedCategory;

    // Status filter
    const matchesStatus = 
      selectedStatus === 'all' || 
      p.status === selectedStatus;

    return matchesSearch && matchesDept && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            دليل المشاريع والأبحاث الأكاديمية
          </h1>
          <div className="text-xs text-slate-500 mt-1">
            إدارة وتتبع مسارات مشاريع التخرج ورسائل الدراسات العليا المعتمدة
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'cards' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="عرض البطاقات"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="عرض الجدول المتقدم"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenNewProject}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>تسجيل مقترح مشروع</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="relative md:col-span-2">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث بالرمز، عنوان المشروع، اسم الطالب، المشرف، أو الكلمات المفتاحية..."
            className="w-full pl-3 pr-9 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-teal-700 transition-colors"
          />
        </div>

        {/* Department Select */}
        <div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-teal-700 transition-colors text-slate-700"
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-teal-700 transition-colors text-slate-700"
          >
            <option value="all">كافة المراحل الأكاديمية</option>
            <option value="graduation_1">مشروع تخرج 1</option>
            <option value="graduation_2">مشروع تخرج 2</option>
            <option value="master_thesis">رسائل ماجستير</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs for Quick Status */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-500 pl-2 shrink-0">حالة المسار:</span>
        {[
          { id: 'all', label: 'الكل' },
          { id: 'proposal_submitted', label: 'مقترحات قيد المراجعة' },
          { id: 'proposal_approved', label: 'مقترحات معتمدة' },
          { id: 'in_progress', label: 'قيد التنفيذ' },
          { id: 'ready_for_defense', label: 'مؤهل للمناقشة' },
          { id: 'defended_passed', label: 'مكتمل ومناقش' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedStatus(tab.id)}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap font-medium ${
              selectedStatus === tab.id
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Project Content Listing */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-lg p-6">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-900 mb-1">
            لم يتم العثور على مشاريع مطابقة
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            جرب تعديل معايير البحث أو تصفية الأقسام، أو قم بتسجيل مقترح مشروع أكاديمي جديد.
          </p>
          <button
            onClick={onOpenNewProject}
            className="px-4 py-2 text-xs font-semibold text-white bg-teal-800 rounded-lg hover:bg-teal-900 transition-colors"
          >
            تسجيل مقترح الآن
          </button>
        </div>
      ) : viewMode === 'cards' ? (
        /* Card Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project.id)}
              className="bg-white border border-slate-200 rounded-lg p-5 hover:border-teal-700/60 transition-all cursor-pointer group shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Meta line - Zero pill rule: unboxed text with separators */}
                <div className="text-xs text-slate-500 mb-2 flex flex-wrap items-center gap-2">
                  <span className="font-mono tabular-nums font-semibold text-teal-800">
                    {project.code}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{project.department}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {project.category === 'graduation_1' && 'تخرج 1'}
                    {project.category === 'graduation_2' && 'تخرج 2'}
                    {project.category === 'master_thesis' && 'ماجستير'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors leading-snug mb-2">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {project.abstract}
                </p>

                {/* Progress bar */}
                <div className="space-y-1 mb-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>نسبة إنجاز المعالم</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-800">
                      {project.progressPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-teal-700 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${project.progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-100 text-xs flex items-center justify-between text-slate-500">
                <div className="flex items-center gap-2">
                  <span>المشرف: <strong className="text-slate-800 font-medium">{project.supervisor.name.split(' ').slice(0, 3).join(' ')}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>{project.students.length} باحثين</span>
                </div>
                <span className="text-teal-800 font-semibold group-hover:underline">
                  فتح الملف ←
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* High Density Table View */
        <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto shadow-xs">
          <table className="w-full text-xs text-right divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-700 font-semibold">
              <tr>
                <th className="px-4 py-3">رمز المشروع</th>
                <th className="px-4 py-3">عنوان المشروع</th>
                <th className="px-4 py-3">القسم الأكاديمي</th>
                <th className="px-4 py-3">المشرف الأكاديمي</th>
                <th className="px-4 py-3">فريق الطلاب</th>
                <th className="px-4 py-3 text-left">الإنجاز</th>
                <th className="px-4 py-3">الحالة</th>
                <th className="px-4 py-3 text-center">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => setActiveProject(p.id)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3 font-mono font-medium text-teal-800 whitespace-nowrap">
                    {p.code}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900 max-w-xs truncate">
                    {p.title}
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                    {p.department.replace('قسم ', '')}
                  </td>
                  <td className="px-4 py-3 text-slate-800 whitespace-nowrap font-medium">
                    {p.supervisor.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                    {p.students.map((s) => s.name.split(' ')[0]).join('، ')}
                  </td>
                  <td className="px-4 py-3 text-left font-mono tabular-nums font-semibold text-slate-800 whitespace-nowrap">
                    {p.progressPercentage}%
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-700">
                    {p.status === 'ready_for_defense' && 'مؤهل للمناقشة'}
                    {p.status === 'in_progress' && 'قيد التنفيذ'}
                    {p.status === 'proposal_approved' && 'مقترح معتمد'}
                    {p.status === 'proposal_submitted' && 'قيد المراجعة'}
                    {p.status === 'defended_passed' && 'مناقش بنجاح'}
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <button className="text-teal-800 hover:text-teal-900 font-semibold">
                      عرض
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
