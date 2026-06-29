# Task Manager App

A polished task manager built with Vite, React 18, TypeScript, Tailwind CSS, and `@dnd-kit`. It stores data in `localStorage` so tasks and projects persist between reloads without needing a backend.

## Feature Overview

This app delivers the AKA-70 Task Manager experience with:

- Task creation, editing, deletion, and completion tracking
- Project-based organization with sidebar navigation
- Priority levels: low, medium, high
- Due date assignment through a date picker
- Drag-and-drop task reordering
- Dedicated project views at `/project/:id`
- Local persistence using browser `localStorage`
- Seeded default data for a usable first-run experience

## Tech Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- React Router
- `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`

## Setup

Install dependencies:

```bash
npm install
```

## Run Locally

Start the development server:

```bash
npm run dev
```

Vite serves the app locally, typically at:

- `http://localhost:5173`

## Production Build

Create a production build:

```bash
npm run build
```

Preview the built app locally:

```bash
npm run preview
```

## What Was Built for AKA-70

### Routes

- `/` — all tasks view with create, edit, delete, complete, and reorder flows
- `/project/:id` — project-scoped task view with the same task management controls inside a selected project

### Core Components

- `Sidebar` — app navigation and project counts
- `TaskList` — sortable task list powered by drag-and-drop
- `TaskCard` — task display with completion, metadata, and action controls
- `AddTaskForm` — task create/edit form
- `PriorityBadge` — visual priority indicator
- `DueDatePicker` — due date input control

### Data and Persistence

- Tasks and projects are loaded from browser `localStorage`
- Fallback seed data is written on first run
- Updates persist automatically after task mutations and reorder operations

## User Capabilities

Users can:

- Create tasks with title, description, project, priority, and due date
- Edit existing tasks
- Delete tasks
- Mark tasks complete/incomplete
- Reorder tasks from the full list
- Reorder tasks within a project-specific view
- Navigate between all-task and project-specific views

## Notes for Release / Handoff

- No environment variables are required for this app
- The app is frontend-only and does not depend on external APIs
- The automated PR step can use this README as the high-level product summary for reviewers
