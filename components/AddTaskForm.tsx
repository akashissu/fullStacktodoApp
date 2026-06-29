import { useEffect, useState } from 'react';
import { DueDatePicker } from './DueDatePicker';
import type { Priority, Project, Task, TaskInput } from '../src/types';

interface AddTaskFormProps {
  projects: Project[];
  initialTask?: Task | null;
  defaultProjectId?: string;
  onSave: (input: TaskInput, taskId?: string) => void;
  onCancelEdit: () => void;
}

const initialState = (projectId?: string): TaskInput => ({
  title: '',
  description: '',
  projectId: projectId ?? 'inbox',
  priority: 'medium',
  dueDate: '',
});

export function AddTaskForm({ projects, initialTask, defaultProjectId, onSave, onCancelEdit }: AddTaskFormProps) {
  const [formState, setFormState] = useState<TaskInput>(initialState(defaultProjectId));

  useEffect(() => {
    if (initialTask) {
      setFormState({
        title: initialTask.title,
        description: initialTask.description,
        projectId: initialTask.projectId,
        priority: initialTask.priority,
        dueDate: initialTask.dueDate,
      });
      return;
    }

    setFormState(initialState(defaultProjectId));
  }, [defaultProjectId, initialTask]);

  const updateField = <K extends keyof TaskInput>(field: K, value: TaskInput[K]) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.title.trim()) {
      return;
    }

    onSave(
      {
        ...formState,
        title: formState.title.trim(),
        description: formState.description.trim(),
      },
      initialTask?.id,
    );

    setFormState(initialState(defaultProjectId));
  };

  return (
    <form className="panel panel--padded form-card" onSubmit={handleSubmit}>
      <div className="panel__header">
        <div>
          <h2 className="panel__title">{initialTask ? 'Edit task' : 'Add a task'}</h2>
          <p className="panel__description">Capture the task details, assign a lane, then keep it moving.</p>
        </div>
      </div>

      <div className="form-grid">
        <label className="button-row">
          <span>Title</span>
          <input
            value={formState.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="What needs to happen?"
            required
          />
        </label>

        <label className="button-row">
          <span>Description</span>
          <textarea
            value={formState.description}
            onChange={(event) => updateField('description', event.target.value)}
            placeholder="Context, notes, blockers..."
          />
        </label>

        <div className="form-grid form-grid--two">
          <label className="button-row">
            <span>Project</span>
            <select value={formState.projectId} onChange={(event) => updateField('projectId', event.target.value)}>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </label>

          <label className="button-row">
            <span>Priority</span>
            <select
              value={formState.priority}
              onChange={(event) => updateField('priority', event.target.value as Priority)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>

        <DueDatePicker value={formState.dueDate} onChange={(value) => updateField('dueDate', value)} />
      </div>

      <div className="form-card__actions" style={{ marginTop: '1.25rem' }}>
        <button className="button button--primary" type="submit">
          {initialTask ? 'Save changes' : 'Create task'}
        </button>
        {initialTask ? (
          <button className="button button--secondary" type="button" onClick={onCancelEdit}>
            Cancel edit
          </button>
        ) : null}
      </div>
    </form>
  );
}
