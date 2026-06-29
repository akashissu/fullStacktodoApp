# AKA-70 — Architect Plan

Role: Architect
Ticket: AKA-70 — Task Manager App
Phase: PLAN_DESIGN only
Status: Ready for Grunt

## Terminal inspection log

- Repository is effectively empty scaffold at handoff time.
- Present files: `README.md`, `docs/.gitkeep`, `memory-bank/.gitkeep`, `.paperclip/AGENTS.md`, `.git/*`
- No `package.json`, `src/`, Vite config, TypeScript config, or Tailwind config detected.
- Existing uncommitted change observed: `README.md` modified before this phase.

## Scope summary

Build a polished task manager app using:
- Vite
- React 18
- TypeScript
- Tailwind CSS
- `@dnd-kit/core`
- localStorage persistence

Required routes:
- `/` — all tasks
- `/project/[id]` equivalent in Vite/React Router: `/project/:id`

Required behavior:
- Create, edit, delete tasks
- Mark complete/incomplete
- Assign project
- Assign priority: low / medium / high
- Assign due date
- Drag-and-drop reorder
  - global reorder on home page
  - per-project reorder on project page
- Build and dev must work cleanly

## Recommended stack shape

Because the requested route `/project/[id]` is Next-style but the app must use Vite + React, implement routing with:
- `react-router-dom`
- Route mapping:
  - `/` -> all tasks page
  - `/project/:id` -> project-scoped page

Core dependencies:
- runtime:
  - `react`
  - `react-dom`
  - `react-router-dom`
  - `@dnd-kit/core`
  - `@dnd-kit/sortable`
  - `@dnd-kit/utilities`
- dev:
  - `vite`
  - `typescript`
  - `@types/react`
  - `@types/react-dom`
  - `tailwindcss`
  - `postcss`
  - `autoprefixer`
  - optionally `eslint` later, but not required for acceptance

## Proposed app architecture

### App shell
- `App.tsx`
  - wraps layout
  - mounts router and page structure
- `main.tsx`
  - React bootstrap
  - imports global Tailwind styles

### Layout
- `components/Sidebar.tsx`
  - app title
  - navigation to All Tasks
  - project list with task counts
  - lightweight project creation affordance
- `components/Layout.tsx` optional
  - sidebar + main content split

### Pages
- `pages/HomePage.tsx`
  - renders all tasks across projects
  - includes add/edit/delete/reorder UI
- `pages/ProjectPage.tsx`
  - loads `projectId` from route params
  - filters tasks by project
  - same task CRUD and reorder within project only
  - graceful empty state if project id is unknown

### Core task UI
- `components/TaskList.tsx`
  - receives ordered task array
  - wires `DndContext` + sortable list
  - emits reordered ids back upward
- `components/TaskCard.tsx`
  - task title / description
  - completion toggle
  - project label
  - priority badge
  - due date display
  - edit/delete actions
  - drag handle
- `components/AddTaskForm.tsx`
  - create and edit mode
  - fields:
    - title (required)
    - description (optional)
    - project selector
    - priority selector
    - due date picker
    - complete checkbox optional in edit mode
- `components/PriorityBadge.tsx`
  - low/medium/high visual styles
- `components/DueDatePicker.tsx`
  - wraps `input[type="date"]`
  - handles blank value cleanly

### Supporting project UI
- `components/ProjectList.tsx` optional if Sidebar grows
- `components/EmptyState.tsx` optional for zero-task views

## Data model plan

Use localStorage only; no backend.

### Types

```ts
export type Priority = 'low' | 'medium' | 'high';

export interface Project {
  id: string;
  name: string;
  color?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  projectId: string | null;
  priority: Priority;
  dueDate: string | null; // ISO date yyyy-mm-dd
  createdAt: string;
  updatedAt: string;
  order: number;
}

export interface AppState {
  tasks: Task[];
  projects: Project[];
}
```

### Persistence
- localStorage key: `aka70-task-manager-state`
- initialize with seed demo data when key is absent
- validate parse failures and fall back safely to defaults
- persist after each state mutation

## State management plan

For this app size, keep state local and explicit.

Recommended structure:
- `context/TaskAppContext.tsx`
  - holds `tasks`, `projects`, CRUD operations, reorder operations
- `hooks/useLocalStorageState.ts`
  - generic persistence helper or keep persistence inside provider
- `lib/storage.ts`
  - load/save helpers
- `lib/tasks.ts`
  - pure helpers for reorder, filtering, sorting
- `lib/date.ts` optional for due-date formatting

Provider operations should include:
- `createTask(input)`
- `updateTask(id, patch)`
- `deleteTask(id)`
- `toggleTaskComplete(id)`
- `reorderAllTasks(activeId, overId)`
- `reorderProjectTasks(projectId, activeId, overId)`
- `createProject(name)`
- `updateProject(id, patch)` optional
- `deleteProject(id)` optional, but if omitted, keep internal only and do not expose UI

## Drag-and-drop plan

Use `@dnd-kit/core` + `@dnd-kit/sortable`.

### Home page reorder semantics
- Reorder visible all-task list only
- Persist new `order` values across the full tasks array
- Suggested visible sort:
  1. incomplete before complete? optional, but avoid if it conflicts with manual ordering
  2. better: single manual order for all tasks, and visually dim completed tasks without auto-sorting

### Project page reorder semantics
- Only reorder tasks within same `projectId`
- Non-project tasks and other project tasks keep their existing order
- Recompute `order` for project subset while preserving global uniqueness

Implementation-safe strategy:
- Maintain `order` as numeric index in the underlying array
- When reordering a filtered subset, rebuild full task list by replacing only affected ids in sequence, then normalize `order`

## Routing plan

Use browser routing:
- `createBrowserRouter` or `BrowserRouter` + `Routes`
- Paths:
  - `/`
  - `/project/:id`

If direct refresh support matters in deployment later, Vite SPA fallback is usually enough for local dev; no extra server work required for acceptance.

## UX plan

### Sidebar
- Brand/title: “Task Manager”
- Link to All Tasks
- List projects with counts
- Add Project mini form or button with inline input

### Home page
- Header with total task count
- “Add task” button opening inline form or persistent panel
- Task list
- Empty state with CTA

### Project page
- Header with project name and count
- Back link to All Tasks
- Add task defaulting project selector to current project
- Task list filtered to current project

### Task form fields
- Title: required
- Description: optional textarea
- Project: dropdown including “No project”
- Priority: segmented buttons or select
- Due date: date input
- Submit / cancel

### Visual polish
- Tailwind cards with soft shadows and spacing
- Priority color coding:
  - low -> slate/green-ish muted
  - medium -> amber
  - high -> rose/red
- Completed tasks:
  - checkbox checked
  - reduced opacity / line-through title
- Due date emphasis:
  - overdue in red when incomplete
  - due today highlighted

## File plan for Grunt

```text
package.json
index.html
postcss.config.js
tailwind.config.js
tsconfig.json
tsconfig.node.json
vite.config.ts
.env.example
src/
  main.tsx
  App.tsx
  index.css
  types.ts
  components/
    Sidebar.tsx
    TaskList.tsx
    TaskCard.tsx
    AddTaskForm.tsx
    PriorityBadge.tsx
    DueDatePicker.tsx
  pages/
    HomePage.tsx
    ProjectPage.tsx
  context/
    TaskAppContext.tsx
  hooks/
    useLocalStorageState.ts (optional)
  lib/
    storage.ts
    tasks.ts
    dates.ts (optional)
```

## Acceptance mapping

1. `npm run dev` starts cleanly
   - requires full Vite scaffold and valid imports/config
2. `/` renders and supports CRUD + reorder
   - `HomePage` + `TaskList` + provider operations
3. `/project/:id` renders project tasks and supports CRUD + reorder in project
   - `ProjectPage` + filtered reorder helper
4. complete toggle
   - checkbox in `TaskCard`
5. project assignment
   - project dropdown in form
6. priority
   - selector + `PriorityBadge`
7. due date
   - `DueDatePicker`
8. `npm run build` succeeds
   - ensure TS config and clean production build

## Edge cases to handle

- Empty localStorage / corrupt JSON
- Creating first project when none exist
- Creating task with no project
- Project page for missing id
- Reordering single-item and zero-item lists
- Deleting a project-assigned task
- Editing a task and moving it to another project
- Marking completed tasks without disturbing manual order
- Date input blank/null conversion

## Suggested implementation order for Grunt

1. Scaffold Vite React TS app files
2. Add Tailwind setup and base layout
3. Define types and storage helpers
4. Implement provider with seeded demo state
5. Build sidebar and routing
6. Build task form + badge + date picker
7. Build task card
8. Build sortable task list
9. Wire home page
10. Wire project page with filtered reorder logic
11. Final manual pass for empty states and polish
12. Run `npm install`, `npm run build`, and smoke-check `npm run dev`

## Testing checklist for Pedant

- install succeeds
- build succeeds
- app loads at `/`
- can add task with title only
- can edit title/description/project/priority/due date
- can toggle complete
- can delete task
- can reorder tasks on `/`
- can create project and navigate to `/project/:id`
- can add/edit/delete tasks within a project view
- can reorder within project view and confirm persistence after reload
- localStorage persists after refresh
- missing/unknown project route shows graceful message, not crash

## Handoff notes

- Do not modify pre-existing `README.md` unless Scribe wants docs updates later.
- No PR should be created from this phase.
- No git push from this phase.
- Main risk is filtered drag-and-drop state correctness on `/project/:id`; implement helper functions as pure transforms and test that logic carefully.

ARCHITECT_DONE: plan ready for Grunt.
