import {
  User,
  Task,
  Sprint,
  NavLinkData,
  Activity,
  TaskStatus,
  ChatMessage,
} from './types';
import {
  LayoutDashboard,
  IterationCw,
  Layers,
  BarChart3,
  Settings,
  MessageSquare,
} from 'lucide-react';
import { PlaceHolderImages } from './placeholder-images';
import { addDays, formatISO, subDays, subMinutes } from 'date-fns';

const userAvatars = PlaceHolderImages.filter(
  (img) =>
    img.imageHint.includes('portrait') ||
    img.imageHint.includes('smiling') ||
    img.imageHint.includes('glasses')
);

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Alice Johnson',
    avatarUrl: userAvatars[0]?.imageUrl || '',
  },
  {
    id: 'user-2',
    name: 'Bob Williams',
    avatarUrl: userAvatars[1]?.imageUrl || '',
  },
  {
    id: 'user-3',
    name: 'Charlie Brown',
    avatarUrl: userAvatars[2]?.imageUrl || '',
  },
  {
    id: 'user-4',
    name: 'Diana Miller',
    avatarUrl: userAvatars[3]?.imageUrl || '',
  },
];

export const currentUser: User = users[0];

const now = new Date();

export const tasks: Task[] = [
  {
    id: 'TASK-101',
    title: 'Design login page UI',
    description: 'Create a modern and responsive login page design.',
    status: 'Done',
    priority: 'High',
    assignee: users[0],
    reporter: users[1],
    dueDate: formatISO(subDays(now, 5)),
    createdAt: formatISO(subDays(now, 10)),
    sprintId: 'SPRINT-1',
    comments: [
      {
        id: 'comment-1',
        user: users[1],
        content: 'Initial mockups are ready for review.',
        createdAt: formatISO(subDays(now, 8)),
      },
    ],
    attachments: [],
    tags: ['UI', 'Design'],
  },
  {
    id: 'TASK-102',
    title: 'Implement authentication API',
    description: 'Set up JWT-based authentication endpoints.',
    status: 'In Progress',
    priority: 'Urgent',
    assignee: users[2],
    reporter: users[1],
    dueDate: formatISO(addDays(now, 2)),
    createdAt: formatISO(subDays(now, 7)),
    sprintId: 'SPRINT-1',
    comments: [],
    attachments: [],
    tags: ['API', 'Backend', 'Security'],
  },
  {
    id: 'TASK-103',
    title: 'Develop user dashboard frontend',
    description: 'Build the main dashboard view with React components.',
    status: 'In Progress',
    priority: 'High',
    assignee: users[0],
    reporter: users[1],
    dueDate: formatISO(addDays(now, 5)),
    createdAt: formatISO(subDays(now, 4)),
    sprintId: 'SPRINT-1',
    comments: [],
    attachments: [],
    tags: ['Frontend', 'React'],
  },
  {
    id: 'TASK-104',
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment.',
    status: 'To Do',
    priority: 'Medium',
    assignee: users[3],
    reporter: users[1],
    dueDate: formatISO(addDays(now, 10)),
    createdAt: formatISO(subDays(now, 2)),
    sprintId: 'SPRINT-1',
    comments: [],
    attachments: [],
    tags: ['DevOps'],
  },
  {
    id: 'TASK-105',
    title: 'Write API documentation',
    description: 'Document all public API endpoints using Swagger/OpenAPI.',
    status: 'To Do',
    priority: 'Low',
    reporter: users[1],
    dueDate: formatISO(addDays(now, 12)),
    createdAt: formatISO(subDays(now, 1)),
    sprintId: 'SPRINT-1',
    comments: [],
    attachments: [],
    tags: ['Documentation'],
  },
  {
    id: 'TASK-106',
    title: 'User profile page',
    description: 'Create a page for users to view and edit their profiles.',
    status: 'Backlog',
    priority: 'Medium',
    reporter: users[0],
    createdAt: formatISO(subDays(now, 15)),
    comments: [],
    attachments: [],
    tags: ['Frontend', 'Feature'],
  },
];

export const sprints: Sprint[] = [
  {
    id: 'SPRINT-1',
    name: 'Omega Sprint: Q3 Launch Foundations',
    startDate: formatISO(subDays(now, 7)),
    endDate: formatISO(addDays(now, 7)),
    goal: 'Complete core features for the initial launch, including authentication and dashboard.',
  },
   {
    id: 'SPRINT-2',
    name: 'Phoenix Sprint: Q2 Polish',
    startDate: formatISO(subDays(now, 21)),
    endDate: formatISO(subDays(now, 7)),
    goal: 'Address UI feedback and fix critical bugs before the beta release.',
  },
];

export const navLinks: NavLinkData[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/sprints', label: 'Sprints', icon: IterationCw },
  { href: '/backlog', label: 'Tasks', icon: Layers },
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
];

export const settingsLink: NavLinkData = {
  href: '/settings',
  label: 'Settings',
  icon: Settings,
};

export const currentSprint = sprints[0];

export const activities: Activity[] = [
    {
        id: 'act-1',
        user: users[2],
        action: 'commented on',
        target: 'TASK-101',
        createdAt: formatISO(subDays(now, 1)),
    },
    {
        id: 'act-2',
        user: users[0],
        action: 'updated status of',
        target: 'TASK-101 to Done',
        createdAt: formatISO(subDays(now, 2)),
    },
    {
        id: 'act-3',
        user: users[1],
        action: 'created new task',
        target: 'TASK-105',
        createdAt: formatISO(subDays(now, 3)),
    },
    {
        id: 'act-4',
        user: users[3],
        action: 'was assigned to',
        target: 'TASK-104',
        createdAt: formatISO(subDays(now, 4)),
    },
];

export const burndownData = [
    { day: 'Day 1', ideal: 10, actual: 10 },
    { day: 'Day 2', ideal: 9, actual: 10 },
    { day: 'Day 3', ideal: 8, actual: 9 },
    { day: 'Day 4', ideal: 7, actual: 8 },
    { day: 'Day 5', ideal: 6, actual: 8 },
    { day: 'Day 6', ideal: 5, actual: 6 },
    { day: 'Day 7', ideal: 4, actual: 5 },
    { day: 'Day 8', ideal: 3, actual: null },
    { day: 'Day 9', ideal: 2, actual: null },
    { day: 'Day 10', ideal: 1, actual: null },
    { day: 'Day 11', ideal: 0, actual: null },
]

export const chatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: users[1],
    receiver: currentUser,
    content: "Hey Alice, just wanted to check in on the progress for TASK-102. How's the authentication API coming along?",
    createdAt: formatISO(subMinutes(now, 65)),
    isRead: false,
  },
  {
    id: 'msg-2',
    sender: currentUser,
    receiver: users[1],
    content: "Hi Bob! It's going well. I've hit a small snag with the token refresh logic, but I should have it sorted out by EOD.",
    createdAt: formatISO(subMinutes(now, 60)),
    isRead: true,
  },
  {
    id: 'msg-3',
    sender: users[1],
    receiver: currentUser,
    content: "Great to hear. Let me know if you need a second pair of eyes on it. Happy to help.",
    createdAt: formatISO(subMinutes(now, 58)),
    isRead: false,
  },
  {
    id: 'msg-4',
    sender: users[2],
    receiver: currentUser,
    content: "Quick question about the dashboard design. Do we have the final assets for the icons?",
    createdAt: formatISO(subDays(now, 1)),
    isRead: true,
  },
  {
    id: 'msg-5',
    sender: currentUser,
    receiver: users[2],
    content: "Hey Charlie, I believe so. They should be in the shared Figma file. I'll send you the link.",
    createdAt: formatISO(subDays(now, 1)),
    isRead: true,
  },
  {
    id: 'msg-6',
    sender: users[3],
    receiver: currentUser,
    content: "The CI/CD pipeline is ready for its first test run. Let me know when you have a feature branch ready.",
    createdAt: formatISO(subDays(now, 2)),
    isRead: true,
  }
];

export const getChatsForCurrentUser = () => {
    const chats: Record<string, ChatMessage[]> = {};
    chatMessages.forEach(message => {
        const otherUser = message.sender.id === currentUser.id ? message.receiver : message.sender;
        if (!chats[otherUser.id]) {
            chats[otherUser.id] = [];
        }
        chats[otherUser.id].push(message);
    });

    for (const userId in chats) {
        chats[userId].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    return chats;
}

export const getUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
}
