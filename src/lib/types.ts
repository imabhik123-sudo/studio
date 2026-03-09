import type { LucideIcon } from 'lucide-react';

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Comment = {
  id: string;
  user: User;
  content: string;
  createdAt: string;
};

export type Attachment = {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'pdf' | 'file';
};

export type TaskStatus = 'Backlog' | 'To Do' | 'In Progress' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: User;
  reporter: User;
  dueDate?: string;
  createdAt: string;
  comments: Comment[];
  attachments: Attachment[];
  sprintId?: string;
  tags: string[];
};

export type Sprint = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  goal: string;
};

export type NavLinkData = {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
};

export type Activity = {
  id: string;
  user: User;
  action: string;
  target: string;
  createdAt: string;
};

export type ChatMessage = {
  id: string;
  sender: User;
  receiver: User;
  content: string;
  createdAt: string;
  isRead: boolean;
};
