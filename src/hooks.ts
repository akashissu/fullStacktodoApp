import { useCallback, useEffect, useMemo, useState } from 'react';
import { deleteTask, getTaskState, reorderTasks, toggleTask, upsertTask } from './taskStore';
import type { Project, Task, TaskInput } from './types';

export function useTaskManager(projectId?: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const refresh = useCallback(() => {
    const state = getTaskState();
    setProjects(state.projects);
    setTasks(projectId ? state.tasks.filter((task) => task.projectId === projectId) : state.tasks);
  }, [projectId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const saveTask = useCallback(
    (input: TaskInput, taskId?: string) => {
      upsertTask(input, taskId);
      refresh();
    },
    [refresh],
  );

  const removeTask = useCallback(
    (taskId: string) => {
      deleteTask(taskId);
      refresh();
    },
    [refresh],
  );

  const setCompleted = useCallback(
    (taskId: string) => {
      toggleTask(taskId);
      refresh();
    },
    [refresh],
  );

  const moveTask = useCallback(
    (taskIds: string[]) => {
      reorderTasks(taskIds, projectId);
      refresh();
    },
    [projectId, refresh],
  );

  const summary = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;
    return {
      total: tasks.length,
      completed,
      open: tasks.length - completed,
    };
  }, [tasks]);

  return {
    tasks,
    projects,
    summary,
    saveTask,
    removeTask,
    setCompleted,
    moveTask,
  };
}
