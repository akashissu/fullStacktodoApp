# AKA-70 Implementation Notes

## Purpose

This document is a deployment and review handoff summary for the Task Manager App delivered under ticket AKA-70.

## Architecture Summary

The application is a client-side Vite + React 18 SPA using TypeScript and React Router.

### Main building blocks

- `src/main.tsx`
  - React entry point
  - wraps the app in `BrowserRouter`
- `components/Sidebar.tsx`
  - renders app navigation
  - shows project-specific navigation links and task counts
- `components/TaskBoard.tsx`
  - composes task summary, task list, and add/edit form
- `components/TaskList.tsx`
  - owns drag-and-drop ordering behavior
- `components/TaskCard.tsx`
  - renders task metadata and item actions
- `components/AddTaskForm.tsx`
  - supports both create and edit flows
- `src/hooks.ts`
  - exposes task/project state and task operations through `useTaskManager`
- `src/taskStore.ts`
  - localStorage-backed persistence and task mutation helpers

## Routing

Implemented routes:

- `/` — all tasks
- `/project/:id` — project-scoped task list

## Persistence Model

The app uses browser `localStorage` only.

- Storage key: `aka-70-task-manager`
- First run behavior: writes fallback seeded state if no saved state exists
- Corrupt or missing localStorage payloads fall back safely to seed data

## Delivered Functional Areas

- Task create/edit/delete
- Completion toggle
- Project assignment
- Priority assignment
- Due date assignment
- Drag-and-drop reorder on all tasks page
- Drag-and-drop reorder within project views

## Release Readiness Notes

- No backend, database, or API credentials required
- No `.env` file required for normal operation
- Reviewer smoke test path:
  1. `npm install`
  2. `npm run dev`
  3. Open `http://localhost:5173`
  4. Verify all-task and project routes
  5. `npm run build`

## Handoff Constraint Log

This Scribe phase intentionally modified markdown/documentation artifacts only:

- `README.md`
- `CHANGELOG.md`
- `docs/IMPLEMENTATION_NOTES.md`

No application source files, package manifests, or routing/component code were changed in this phase.
