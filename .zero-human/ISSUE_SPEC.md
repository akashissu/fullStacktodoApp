# AKA-70: Task Manager App

## ⚠️ Agent Implementation Directive

**You MUST build the COMPLETE, FULLY WORKING application described below.**

* Write ALL source code files needed to run this project (components, pages, API routes, styles, config, tests)
* Do NOT create only documentation, markdown files, README updates, or empty scaffold folders
* Do NOT leave placeholder comments like `// TODO: implement this` — write the actual implementation
* The project MUST be runnable with `npm run dev` (or the specified command) after your PR is merged
* Every acceptance criterion listed below must pass when a human tests the running app
* If an API key or env var is needed, include a `.env.example` AND fallback/mock data so the app works without it
* Commit ALL necessary files: package.json, all source files, config files, public assets

**This is a full project build, not a documentation task.**

## Problem / Overview

A polished task manager application with features such as project grouping, task prioritization, due dates, and drag-and-drop task reordering. The application is built with React and Vite, and uses localStorage for data persistence.

## Pages / Routes

* `/` — Shows all tasks, allows creating, editing, deleting tasks, and reordering tasks via drag-and-drop.
* `/project/[id]` — Shows tasks specific to a project, allows creating, editing, deleting tasks, and reordering tasks via drag-and-drop within the project.

## Data Sources

* localStorage

## Tech Stack & Solution

Vite + React 18 + TypeScript + Tailwind CSS + @dnd-kit/core

## Acceptance Criteria

1. npm run dev starts the app on localhost:5173 without errors
2. Home page (/) renders task list and allows creating, editing, deleting, and reordering tasks
3. Project page (/project/\[id]) renders task list specific to a project and allows creating, editing, deleting, and reordering tasks within the project
4. Tasks can be marked as complete
5. Tasks can be assigned to projects
6. Tasks can be assigned a priority level (low/medium/high)
7. Tasks can be assigned a due date
8. npm run build builds the application without errors

## Components to Build

* Sidebar
* TaskList
* TaskCard
* AddTaskForm
* PriorityBadge
* DueDatePicker

## Integrations / APIs

* localStorage

## Implementation Notes

Dev: npm run dev
Build: npm run build
Install: npm install

User Stories:

1. As a user, I want to create, edit, and delete tasks so I can manage my work.
2. As a user, I want to reorder tasks via drag-and-drop so I can prioritize my work.
3. As a user, I want to assign tasks to projects so I can group related tasks together.
4. As a user, I want to set due dates for tasks so I can manage my time.
5. As a user, I want to mark tasks as complete so I can track my progress.

***

## Definition of Done

* [ ] `npm run dev` (or equivalent) starts the app without errors
* [ ] `npm run build` completes without errors
* [ ] All routes/pages listed in the spec render correctly
* [ ] All acceptance criteria above pass when tested in browser
* [ ] No files are empty placeholders — all source code is written
* [ ] `.env.example` exists if any environment variables are needed
