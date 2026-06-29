import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PriorityBadge } from './PriorityBadge';
import type { Project, Task } from '../src/types';

interface TaskCardProps {
  task: Task;
  project?: Project;
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskCard({ task, project, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  return (
    <article
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.55 : 1,
      }}
      className={`task-card${task.completed ? ' task-card--done' : ''}`}
    >
      <div className="task-card__top">
        <div className="task-card__title">
          <input
            className="checkbox"
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
          />
          <div>
            <h3>{task.title}</h3>
            <p className="task-card__project">{project?.name ?? 'Unassigned project'}</p>
          </div>
        </div>
        <button className="handle" type="button" {...attributes} {...listeners} aria-label={`Reorder ${task.title}`}>
          Drag
        </button>
      </div>

      {task.description ? <p className="task-card__description">{task.description}</p> : null}

      <div className="task-card__meta">
        <PriorityBadge priority={task.priority} />
        <span className="helper-text">{task.dueDate ? `Due ${task.dueDate}` : 'No due date set'}</span>
      </div>

      <div className="task-card__actions">
        <button className="button button--secondary" type="button" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="button button--ghost" type="button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
