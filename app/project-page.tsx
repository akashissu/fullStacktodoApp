'use client';

import { Navigate, useParams } from 'react-router-dom';
import { TaskBoard } from '../components/TaskBoard';
import { getProject } from '../src/taskStore';

export function ProjectPage() {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/" replace />;
  }

  const project = getProject(id);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <TaskBoard
      title={project.name}
      description="Stay focused on a single project lane while keeping the same controls."
      projectId={project.id}
    />
  );
}
