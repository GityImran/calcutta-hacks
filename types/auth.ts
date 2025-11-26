export interface User {
  id: string;
  did: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string | null;
  roleLabel: string | null;
  affiliation?: string;
  orcid?: string;
  createdAt?: string;
  showRolePublicly?: boolean;
}

export interface AuthFormData {
  name: string;
  email: string;
  password: string;
  role?: string;
  affiliation?: string;
}

export const ROLE_OPTIONS = [
  { 
    key: 'student', 
    label: 'Student', 
    desc: 'Learning, building projects, seeking endorsements.',
    icon: '🎓',
  },
  { 
    key: 'teacher', 
    label: 'Teacher', 
    desc: 'Endorse student work and supervise projects.',
    icon: '👨‍🏫',
  },
  { 
    key: 'researcher', 
    label: 'Researcher', 
    desc: 'Publish papers, lead research projects.',
    icon: '🔬',
  },
  { 
    key: 'industry', 
    label: 'Industry', 
    desc: 'Post roles, recruit verified talent.',
    icon: '💼',
  },
  { 
    key: 'mentor', 
    label: 'Mentor', 
    desc: 'Provide guidance, host office hours.',
    icon: '🤝',
  },
  { 
    key: 'admin', 
    label: 'Institution Admin', 
    desc: 'Manage institutional endorsements and cohorts.',
    icon: '🏛️',
  },
] as const;

export type RoleKey = typeof ROLE_OPTIONS[number]['key'];
