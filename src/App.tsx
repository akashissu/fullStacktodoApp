import { Routes, Route } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { HomePage } from '../app/page';
import { ProjectPage } from '../app/project-page';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Route>
    </Routes>
  );
}
