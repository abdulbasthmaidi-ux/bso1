import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Project, 
  UserRole, 
  TaskStatus, 
  Task, 
  SupervisoryMeeting, 
  Deliverable, 
  ProjectEvaluation, 
  DefenseSession 
} from '../types';
import { INITIAL_PROJECTS } from '../data/initialData';

export type AppView = 'dashboard' | 'projects' | 'defense_schedule' | 'reports' | 'project_detail';

interface AppContextType {
  projects: Project[];
  currentRole: UserRole;
  currentView: AppView;
  activeProjectId: string | null;
  activeProject: Project | undefined;
  searchQuery: string;
  selectedDepartment: string;
  selectedCategory: string;
  selectedStatus: string;
  notification: string | null;
  
  // Actions
  setRole: (role: UserRole) => void;
  setCurrentView: (view: AppView) => void;
  setActiveProject: (id: string | null) => void;
  setSearchQuery: (q: string) => void;
  setSelectedDepartment: (dept: string) => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedStatus: (status: string) => void;
  showNotification: (msg: string) => void;
  
  // Project Mutations
  createProject: (newProject: Partial<Project>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  updateTaskStatus: (projectId: string, taskId: string, newStatus: TaskStatus) => void;
  addTask: (projectId: string, task: Omit<Task, 'id'>) => void;
  addSupervisoryMeeting: (projectId: string, meeting: Omit<SupervisoryMeeting, 'id'>) => void;
  signMeeting: (projectId: string, meetingId: string) => void;
  submitDeliverable: (projectId: string, deliverable: Omit<Deliverable, 'id' | 'feedback' | 'status'>) => void;
  reviewDeliverable: (
    projectId: string, 
    deliverableId: string, 
    status: 'approved' | 'needs_revision', 
    feedbackText: string, 
    grade?: number
  ) => void;
  saveEvaluation: (projectId: string, evaluation: Omit<ProjectEvaluation, 'id' | 'submittedAt'>) => void;
  scheduleDefense: (projectId: string, defenseData: DefenseSession) => void;
  resetAllData: () => void;
}

const STORAGE_KEY = 'masar_academic_projects_store_v1';
const ROLE_STORAGE_KEY = 'masar_current_role_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_PROJECTS;
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem(ROLE_STORAGE_KEY) as UserRole;
      if (saved && ['student', 'supervisor', 'committee'].includes(saved)) {
        return saved;
      }
    } catch {
      // Fallback
    }
    return 'supervisor'; // default to supervisor for rich academic oversight view
  });

  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('جميع الأقسام الأكاديمية');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(ROLE_STORAGE_KEY, currentRole);
    } catch (e) {
      console.error('Failed to save role to localStorage', e);
    }
  }, [currentRole]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((current) => (current === msg ? null : current));
    }, 4000);
  };

  const setRole = (role: UserRole) => {
    setCurrentRole(role);
    const roleLabels = {
      student: 'طالب باحث (عبدالله السعيد - AgriVision AI)',
      supervisor: 'مشرف أكاديمي (أ.د. ريم الخالدي)',
      committee: 'رئيس لجنة المشاريع والقسم (د. حسام الشريف)',
    };
    showNotification(`تم التبديل إلى دور: ${roleLabels[role]}`);
  };

  const activeProject = projects.find((p) => p.id === activeProjectId);

  const createProject = (newProjectData: Partial<Project>) => {
    const id = `prj-${Date.now()}`;
    const code = `GP-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 90)}`;
    const fullProject: Project = {
      id,
      code,
      title: newProjectData.title || 'مشروع أكاديمي جديد',
      titleEn: newProjectData.titleEn || 'New Academic Research Project',
      department: newProjectData.department || 'قسم الذكاء الاصطناعي وعلم البيانات',
      academicYear: newProjectData.academicYear || '2026 / 2027',
      term: newProjectData.term || 'الفصل الدراسي الأول',
      category: newProjectData.category || 'graduation_1',
      abstract: newProjectData.abstract || '',
      objectives: newProjectData.objectives || ['صياغة الإطار العام للمشروع'],
      methodology: newProjectData.methodology || 'منهجية البحث العلمي والتطوير المتتابع',
      status: 'proposal_submitted',
      progressPercentage: 10,
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: 'الآن',
      supervisor: newProjectData.supervisor || INITIAL_PROJECTS[0].supervisor,
      students: newProjectData.students || [INITIAL_PROJECTS[0].students[0]],
      milestones: [
        {
          id: `ms-${Date.now()}-1`,
          title: 'اعتماد وثيقة المقترح الأكاديمي',
          description: 'صياغة وثيقة المقترح وتحديد الأهداف ونطاق العمل وموافقة المشرف.',
          dueDate: '2026-10-30',
          weightPercentage: 20,
          status: 'in_progress',
          deliverableRequired: true,
        },
        {
          id: `ms-${Date.now()}-2`,
          title: 'الدراسة النظرية والتحليل المعماري للنظام',
          description: 'مراجعة المراجع الأكاديمية ومخططات تدفق البيانات وهندسة النظام.',
          dueDate: '2026-12-15',
          weightPercentage: 30,
          status: 'upcoming',
          deliverableRequired: true,
        },
        {
          id: `ms-${Date.now()}-3`,
          title: 'التنفيذ التجريبي والاختبارات التقييمية',
          description: 'برمجة النواة الأساسية وتشغيل الاختبارات الميدانية وجمع النتائج.',
          dueDate: '2027-02-10',
          weightPercentage: 30,
          status: 'upcoming',
          deliverableRequired: true,
        },
        {
          id: `ms-${Date.now()}-4`,
          title: 'مناقشة المشروع والتقرير الأكاديمي النهائي',
          description: 'تسليم المسودة النهائية وخوض جلسة المناقشة أمام لجنة الحكم.',
          dueDate: '2027-03-01',
          weightPercentage: 20,
          status: 'upcoming',
          deliverableRequired: true,
        },
      ],
      deliverables: [],
      tasks: [
        {
          id: `tsk-${Date.now()}-1`,
          title: 'مراجعة الدراسات الأكاديمية المماثلة المنشورة حديثاً',
          description: 'تلخيص 10 أوراق بحثية من IEEE وACM.',
          assignedTo: newProjectData.students?.[0]?.name || 'باحث الفريق',
          status: 'in_progress',
          priority: 'high',
          dueDate: '2026-10-15',
        },
      ],
      supervisoryMeetings: [
        {
          id: `meet-${Date.now()}-1`,
          date: new Date().toISOString().split('T')[0],
          time: '11:00 ص',
          location: 'مكتب المشرف الأكاديمي',
          agenda: 'الجلسة الافتتاحية لاعتماد نطاق المشروع وتوزيع المهام',
          outcomes: 'تم الاتفاق على عنوان المشروع والأهداف الرئيسية وخطة العمل الزمنية.',
          actionItems: ['تجهيز مراجع الفصل الأول', 'إعداد جدول المقابلات الميدانية'],
          nextMeetingDate: '2026-10-20',
          supervisorSignature: true,
          attendedStudents: newProjectData.students?.map((s) => s.name) || ['الطالب الباحث'],
        },
      ],
      evaluations: [],
      tags: newProjectData.tags || ['مشروع جديد', 'بحث أكاديمي'],
    };

    setProjects([fullProject, ...projects]);
    setActiveProjectId(fullProject.id);
    setCurrentView('project_detail');
    showNotification('تم تسجيل مقترح المشروع الأكاديمي بنجاح وإرساله للاعتماد');
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            ...updates,
            lastActivity: 'الآن',
          };
        }
        return p;
      })
    );
  };

  const updateTaskStatus = (projectId: string, taskId: string, newStatus: TaskStatus) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const updatedTasks = p.tasks.map((t) =>
            t.id === taskId ? { ...t, status: newStatus } : t
          );
          return {
            ...p,
            tasks: updatedTasks,
            lastActivity: 'الآن',
          };
        }
        return p;
      })
    );
    showNotification('تم تحديث حالة المهمة بنجاح');
  };

  const addTask = (projectId: string, taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      id: `tsk-${Date.now()}`,
      ...taskData,
    };
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            tasks: [newTask, ...p.tasks],
            lastActivity: 'الآن',
          };
        }
        return p;
      })
    );
    showNotification('تمت إضافة المهمة إلى لوحة المهام');
  };

  const addSupervisoryMeeting = (
    projectId: string,
    meetingData: Omit<SupervisoryMeeting, 'id'>
  ) => {
    const newMeeting: SupervisoryMeeting = {
      id: `meet-${Date.now()}`,
      ...meetingData,
    };
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            supervisoryMeetings: [newMeeting, ...p.supervisoryMeetings],
            lastActivity: 'الآن',
          };
        }
        return p;
      })
    );
    showNotification('تم توثيق جلسة الإرشاد والتوجيه في السجل الأكاديمي');
  };

  const signMeeting = (projectId: string, meetingId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const updatedMeetings = p.supervisoryMeetings.map((m) =>
            m.id === meetingId ? { ...m, supervisorSignature: true } : m
          );
          return {
            ...p,
            supervisoryMeetings: updatedMeetings,
            lastActivity: 'الآن',
          };
        }
        return p;
      })
    );
    showNotification('تم التوقيع والمصادقة على محضر الجلسة رقمياً');
  };

  const submitDeliverable = (
    projectId: string,
    delivData: Omit<Deliverable, 'id' | 'feedback' | 'status'>
  ) => {
    const newDeliverable: Deliverable = {
      id: `del-${Date.now()}`,
      ...delivData,
      status: 'pending_review',
      feedback: [],
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          // Update milestone status if applicable
          const updatedMilestones = p.milestones.map((m) =>
            m.id === delivData.milestoneId && m.status === 'upcoming'
              ? { ...m, status: 'in_progress' as const }
              : m
          );
          return {
            ...p,
            deliverables: [newDeliverable, ...p.deliverables],
            milestones: updatedMilestones,
            lastActivity: 'الآن',
          };
        }
        return p;
      })
    );
    showNotification('تم تسليم مخرجات التقرير وفحص نسبة التشابه بنجاح');
  };

  const reviewDeliverable = (
    projectId: string,
    deliverableId: string,
    status: 'approved' | 'needs_revision',
    feedbackText: string,
    grade?: number
  ) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const updatedDeliverables = p.deliverables.map((d) => {
            if (d.id === deliverableId) {
              const updatedFeedback = feedbackText
                ? [
                    ...d.feedback,
                    {
                      id: `fb-${Date.now()}`,
                      authorName:
                        currentRole === 'supervisor'
                          ? p.supervisor.name
                          : 'لجنة مشاريع التخرج',
                      authorRole: currentRole,
                      text: feedbackText,
                      date: new Date().toISOString().split('T')[0],
                    },
                  ]
                : d.feedback;

              return {
                ...d,
                status,
                grade: grade !== undefined ? grade : d.grade,
                feedback: updatedFeedback,
              };
            }
            return d;
          });

          // Check if milestone can be marked as completed
          const targetDeliv = p.deliverables.find((d) => d.id === deliverableId);
          let updatedMilestones = p.milestones;
          if (targetDeliv && status === 'approved') {
            updatedMilestones = p.milestones.map((m) =>
              m.id === targetDeliv.milestoneId ? { ...m, status: 'completed' as const } : m
            );
          }

          // Recalculate progress
          const completedWeight = updatedMilestones
            .filter((m) => m.status === 'completed')
            .reduce((sum, m) => sum + m.weightPercentage, 0);

          return {
            ...p,
            deliverables: updatedDeliverables,
            milestones: updatedMilestones,
            progressPercentage: Math.min(100, Math.max(p.progressPercentage, completedWeight)),
            lastActivity: 'الآن',
          };
        }
        return p;
      })
    );
    showNotification(
      status === 'approved'
        ? 'تم اعتماد المخرجات الأكاديمية ورصد التقييم'
        : 'تمت إعادة التسليم للطلاب مع الملاحظات التعديلية'
    );
  };

  const saveEvaluation = (
    projectId: string,
    evalData: Omit<ProjectEvaluation, 'id' | 'submittedAt'>
  ) => {
    const newEval: ProjectEvaluation = {
      id: `eval-${Date.now()}`,
      ...evalData,
      submittedAt: new Date().toISOString().split('T')[0],
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const existingFiltered = p.evaluations.filter(
            (e) => e.evaluatorRole !== evalData.evaluatorRole
          );
          const allEvals = [...existingFiltered, newEval];
          return {
            ...p,
            evaluations: allEvals,
            lastActivity: 'الآن',
          };
        }
        return p;
      })
    );
    showNotification('تم حفظ واعتماد استمارة التقييم الأكاديمي الموزون بنجاح');
  };

  const scheduleDefense = (projectId: string, defenseData: DefenseSession) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            defenseSchedule: defenseData,
            status: defenseData.verdict ? 'defended_passed' : 'ready_for_defense',
            lastActivity: 'الآن',
          };
        }
        return p;
      })
    );
    showNotification('تم تثبيت موعد وتشكيل لجنة المناقشة العلنية بنجاح');
  };

  const resetAllData = () => {
    setProjects(INITIAL_PROJECTS);
    localStorage.removeItem(STORAGE_KEY);
    showNotification('تمت استعادة البيانات الأكاديمية الأولية بنجاح');
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        currentRole,
        currentView,
        activeProjectId,
        activeProject,
        searchQuery,
        selectedDepartment,
        selectedCategory,
        selectedStatus,
        notification,
        setRole,
        setCurrentView,
        setActiveProject: (id) => {
          setActiveProjectId(id);
          if (id) setCurrentView('project_detail');
        },
        setSearchQuery,
        setSelectedDepartment,
        setSelectedCategory,
        setSelectedStatus,
        showNotification,
        createProject,
        updateProject,
        updateTaskStatus,
        addTask,
        addSupervisoryMeeting,
        signMeeting,
        submitDeliverable,
        reviewDeliverable,
        saveEvaluation,
        scheduleDefense,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
