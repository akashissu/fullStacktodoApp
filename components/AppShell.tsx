import { Outlet } from 'react-router-dom';
import { Layout } from '../app/layout';
import { Sidebar } from './Sidebar';

export function AppShell() {
  return (
    <Layout>
      <div className="app-shell">
        <Sidebar />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </Layout>
  );
}
