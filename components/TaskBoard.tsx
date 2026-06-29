import { useMemo, useState } from 'react';
import { AddTaskForm } from './AddTaskForm';
import { TaskList } from './TaskList';
import { useTaskManager } from '../src/hooks';
import type { Task } from '../src/types';

interface TaskBoardProps {
  title: string;
  description: string;
  projectId?: string;
}

export function TaskBoard({ title, description, projectId }: TaskBoardProps) {
  const { tasks, projects, summary, saveTask, removeTask, setCompleted, moveTask } = useTaskManager(projectId);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const headline = useMemo(
    () => [
      { label: 'Total', value: summary.total },
      { label: 'Open', value: summary.open },
      { label: 'Done', value: summary.completed },
    ],
    [summary.completed, summary.open, summary.total],
  );

  return (
    <section className="board">
      <div className="panel panel--padded">
        <div className="panel__header">
          <div>
            <h1 className="panel__title">{title}</h1>
            <p className="panel__description">{description}</p>
          </div>
          <div className="summary">
            {headline.map((item) => (
              <span key={item.label} className="summary__chip">
                {item.label}: {item.value}
              </span>
            ))}
          </div>
        </div>

        <TaskList
          tasks={tasks}
          projects={projects}
          onToggleComplete={setCompleted}
          onEdit={setEditingTask}
          onDelete={(taskId) => {
            if (editingTask?.id === taskId) {
              setEditingTask(null);
            }
            removeTask(taskId);
          }}
          onReorder={moveTask}
        />
      </div>

      <AddTaskForm
        projects={projects}
        initialTask={editingTask}
        defaultProjectId={projectId}
        onSave={(input, taskId) => {
          saveTask(input, taskId);
          setEditingTask(null);
        }}
        onCancelEdit={() => setEditingTask(null)}
      />
    </section>
  );
}
