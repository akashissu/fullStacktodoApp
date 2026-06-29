import { NavLink } from 'react-router-dom';
import { useTaskManager } from '../src/hooks';

export function Sidebar() {
  const { projects, tasks } = useTaskManager();

  return (
    <aside className="sidebar">
      <h1 className="sidebar__title">Task Manager</h1>
      <p className="sidebar__subtitle">A tidy command center for deadlines, projects, and drag-and-drop planning.</p>
      <nav className="sidebar__list">
        <NavLink to="/" end className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}>
          <span>All Tasks</span>
          <span className="sidebar__count">{tasks.length}</span>
        </NavLink>
        {projects.map((project) => {
          const count = tasks.filter((task) => task.projectId === project.id).length;
          return (
            <NavLink
              key={project.id}
              to={`/project/${project.id}`}
              className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="sidebar__dot" style={{ background: project.color }} />
                {project.name}
              </span>
              <span className="sidebar__count">{count}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
