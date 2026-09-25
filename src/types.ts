export type UserRole = 'student' | 'supervisor' | 'committee';

export type ProjectStatus = 
  | 'proposal_submitted'
  | 'proposal_approved'
  | 'in_progress'
  | 'ready_for_defense'
  | 'defended_passed'
  | 'revisions_required';

export type ProjectCategory = 
  | 'graduation_1'
  | 'graduation_2'
  | 'master_thesis';

export interface Student {
  id: string;
  name: string;
  studentId: string;
  email: string;
  role: string;
  avatar?: string;
  gpa?: string;
}

export interface Supervisor {
  id: string;
  name: string;
  title: string;
  email: string;
  department: string;
  avatar?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  weightPercentage: number;
  status: 'completed' | 'in_progress' | 'upcoming' | 'delayed';
  deliverableRequired: boolean;
}

export interface DeliverableFeedback {
  id: string;
  authorName: string;
  authorRole: UserRole;
  text: string;
  date: string;
}

export interface Deliverable {
  id: string;
  milestoneId: string;
  title: string;
  submittedBy: string;
  submittedAt: string;
  version: string;
  fileName: string;
  fileSize: string;
  plagiarismSimilarity: number;
  status: 'pending_review' | 'approved' | 'needs_revision';
  grade?: number;
  feedback: DeliverableFeedback[];
}

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

export interface SupervisoryMeeting {
  id: string;
  date: string;
  time: string;
  location: string;
  agenda: string;
  outcomes: string;
  actionItems: string[];
  nextMeetingDate: string;
  supervisorSignature: boolean;
  attendedStudents: string[];
}

export interface DefenseSession {
  date: string;
  time: string;
  hall: string;
  headOfCommittee: string;
  internalExaminer: string;
  externalExaminer: string;
  status: 'scheduled' | 'completed' | 'pending';
  finalGrade?: number;
  verdict?: 'pass_with_honors' | 'pass' | 'minor_revisions' | 'major_revisions';
  recommendations?: string;
}

export interface CriteriaScores {
  problemSignificance: number; // max 15
  literatureMethodology: number; // max 20
  technicalImplementation: number; // max 35
  documentationReport: number; // max 15
  presentationDefense: number; // max 15
}

export interface ProjectEvaluation {
  id: string;
  evaluatorRole: 'supervisor' | 'internal_examiner' | 'external_examiner' | 'committee_chair';
  evaluatorName: string;
  scores: CriteriaScores;
  totalScore: number;
  feedback: string;
  submittedAt: string;
}

export interface Project {
  id: string;
  code: string;
  title: string;
  titleEn: string;
  department: string;
  academicYear: string;
  term: string;
  category: ProjectCategory;
  abstract: string;
  objectives: string[];
  methodology: string;
  status: ProjectStatus;
  progressPercentage: number;
  createdAt: string;
  lastActivity: string;
  supervisor: Supervisor;
  coSupervisor?: Supervisor;
  students: Student[];
  milestones: Milestone[];
  deliverables: Deliverable[];
  tasks: Task[];
  supervisoryMeetings: SupervisoryMeeting[];
  defenseSchedule?: DefenseSession;
  evaluations: ProjectEvaluation[];
  tags: string[];
}
