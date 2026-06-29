import { defaultProjects, defaultTasks } from './data';
import type { Project, Task, TaskInput } from './types';

const STORAGE_KEY = 'aka-70-task-manager';

interface StoredState {
  tasks: Task[];
  projects: Project[];
}

const fallbackState: StoredState = {
  tasks: defaultTasks,
  projects: defaultProjects,
};

const isBrowser = typeof window !== 'undefined';

function loadState(): StoredState {
  if (!isBrowser) {
    return fallbackState;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackState));
    return fallbackState;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<StoredState>;
    return {
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : fallbackState.tasks,
      projects: Array.isArray(parsed.projects) ? parsed.projects : fallbackState.projects,
    };
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackState));
    return fallbackState;
  }
}

function saveState(state: StoredState) {
  if (!isBrowser) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getTaskState(): StoredState {
  return loadState();
}

export function upsertTask(input: TaskInput, taskId?: string): Task {
  const state = loadState();
  const now = new Date().toISOString();
  const existing = taskId ? state.tasks.find((task) => task.id === taskId) : undefined;

  const nextTask: Task = existing
    ? {
        ...existing,
        ...input,
        updatedAt: now,
      }
    : {
        id: createId('task'),
        completed: false,
        createdAt: now,
        updatedAt: now,
        ...input,
      };

  const tasks = existing
    ? state.tasks.map((task) => (task.id === nextTask.id ? nextTask : task))
    : [nextTask, ...state.tasks];

  saveState({ ...state, tasks });
  return nextTask;
}

export function deleteTask(taskId: string) {
  const state = loadState();
  saveState({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== taskId),
  });
}

export function toggleTask(taskId: string) {
  const state = loadState();
  saveState({
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === taskId
        ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
        : task,
    ),
  });
}

export function reorderTasks(taskIds: string[], projectId?: string) {
  const state = loadState();
  const scopedTasks = state.tasks.filter((task) => (projectId ? task.projectId === projectId : true));
  const taskMap = new Map(scopedTasks.map((task) => [task.id, task]));
  const reorderedScopedTasks = taskIds.map((id) => taskMap.get(id)).filter(Boolean) as Task[];
  const untouchedTasks = state.tasks.filter((task) => (projectId ? task.projectId !== projectId : false));
  const tasks = projectId ? [...untouchedTasks, ...reorderedScopedTasks] : reorderedScopedTasks;

  saveState({
    ...state,
    tasks,
  });
}

export function getProject(projectId: string) {
  return loadState().projects.find((project) => project.id === projectId);
}
