# Agent Guidelines for StreamVerse

This document provides guidelines for AI agents working on the StreamVerse repository. It includes build/test commands, code style conventions, and project-specific patterns.

## Core Technology Stack

- **AdonisJS v7**: The primary Node.js framework for backend structure, routing, and controllers. [AdonisJS Documentation](https://docs.adonisjs.com/)
- **React (via Inertia.js)**: Used for building the interactive frontend within the AdonisJS ecosystem. [Inertia.js React Docs](https://inertiajs.com/react). [AdonisJS Inertia Docs](https://docs.adonisjs.com/guides/frontend/inertia)
- **Tailwind CSS v4**: Utility-first CSS framework for styling. Configuration and variables are primarily managed directly in CSS files such as `inertia/css/app.css`. [Tailwind CSS Docs](https://tailwindcss.com/)
- **Shadcn UI**: React component library built with Tailwind and Radix UI. [Shadcn Docs](https://ui.shadcn.com/)
- **pnpm**: The exclusive package manager for this project. **Always** use `pnpm install`, `pnpm run`, `pnpm add`, etc. [pnpm Documentation](https://pnpm.io/)

## Architecture & File Structure

- **Component Storage**: Store generic UI and functional components (that are _not_ built-in Shadcn components) at `@/components/{components type}/{component name}`.
  - Example: `inertia/components/card/score-card.tsx`
- **Pages**: Top-level Inertia pages remain in `inertia/pages/`.

## Design & Aesthetic Directives

- Soft UI
- Dark Mode First
- Responsive UI
- Icon: Lucide Icon
- User interactive state like hover, focus, active, etc. must be visible and have color contrast (usually brighter than default state)

## Commands

- Build: `pnpm run build`
- Dev: `pnpm run dev`
- Test: `pnpm run test`
- Lint: `pnpm run lint`
- Format: `pnpm run format`

## Do's

- Write code in DRY paradigm and clean code
- Always follow code best practices
- Always follow project structure
- {} imports first, then default imports
- Always reflect to HTML Semantic structur
- Prefer to use shadcn components
- Always use function component not const component

## Don'ts

- Use pixel as unit, use rem instead
- Add unnecessary comments
