import type { Project, Task } from './types';

export const defaultProjects: Project[] = [
  { id: 'inbox', name: 'Inbox', color: '#6366f1' },
  { id: 'product', name: 'Product Launch', color: '#ec4899' },
  { id: 'marketing', name: 'Marketing', color: '#14b8a6' },
  { id: 'personal', name: 'Personal', color: '#f59e0b' },
];

export const defaultTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Draft launch checklist',
    description: 'Collect engineering, QA, and support readiness items.',
    projectId: 'product',
    priority: 'high',
    dueDate: '2026-07-02',
    completed: false,
    createdAt: '2026-06-29T09:00:00.000Z',
    updatedAt: '2026-06-29T09:00:00.000Z',
  },
  {
    id: 'task-2',
    title: 'Book dentist appointment',
    description: 'Call the clinic and confirm the morning slot.',
    projectId: 'personal',
    priority: 'medium',
    dueDate: '2026-07-05',
    completed: false,
    createdAt: '2026-06-29T09:05:00.000Z',
    updatedAt: '2026-06-29T09:05:00.000Z',
  },
  {
    id: 'task-3',
    title: 'Review paid campaign copy',
    description: 'Approve the latest headline variations.',
    projectId: 'marketing',
    priority: 'low',
    dueDate: '2026-07-08',
    completed: true,
    createdAt: '2026-06-29T09:10:00.000Z',
    updatedAt: '2026-06-29T09:10:00.000Z',
  },
];
