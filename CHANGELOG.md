# Changelog

All notable changes to this repository are documented here.

## [AKA-70] - 2026-06-29

### Added

- Delivered a polished Task Manager application built with Vite, React 18, TypeScript, Tailwind CSS, and `@dnd-kit`
- Added task CRUD flows for creating, editing, deleting, and marking tasks complete
- Added project-based task grouping with dedicated `/project/:id` views
- Added drag-and-drop task reordering for the full task list and project-scoped lists
- Added priority badges and due date handling for task planning
- Added browser `localStorage` persistence with default seeded data
- Added release-facing documentation covering setup, run instructions, feature overview, and implementation notes

### Delivery Notes

- Install with `npm install`
- Run locally with `npm run dev`
- Build for production with `npm run build`
