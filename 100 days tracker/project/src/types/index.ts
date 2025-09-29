export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  currentDay: number;
  completedDays: boolean[];
  isActive: boolean;
  createdAt: Date;
}

export interface DailyEntry {
  challengeId: string;
  day: number;
  date: Date;
  completed: boolean;
  notes?: string;
}