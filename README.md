# StreamVerse

Welcome to **StreamVerse**, the ultimate hub for streaming live football matches and TV channels for free! This project is built to deliver a smooth and visually stunning experience for sports fans and TV watchers alike.

## Tech Stack

We're using some of the best tools out there to keep everything fast, reliable, and easy to maintain:

- **Backend:** [AdonisJS v7](https://docs.adonisjs.com/)
- **Frontend & Routing:** React stitched together with [Inertia.js](https://inertiajs.com/react).
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Package Manager:** **pnpm**

## Features

- **Match Hub**: Browse Live, Upcoming, or Finished football matches. Features debounced server-side searching, status filtering, and chronological sorting so you can easily find your favorite teams.
- **TV Channels**: Browse and watch various sports and general television channels. 
- **Interactive "Soft UI"**: A highly polished, dynamic user interface crafted to look responsive, alive, and very premium.
- **Authentication**: Solid auth system with token-based email verification under the hood.

## Getting Started

Want to run this locally? Make sure you have Node (>= 24.0) and `pnpm` installed.

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Environment Variables**:
   Copy `.env.example` to `.env` and configure your database keys (StreamVerse uses MySQL under the hood) alongside any API credentials.

3. **Run Migrations (if needed)**:
   ```bash
   node ace migration:run
   ```

4. **Boot up the development environment**:
   ```bash
   pnpm run dev
   ```
   *This fires up both the Vite dev server for React and the AdonisJS server with hot module replacement (HMR).*

## Commands to Know

- `pnpm run dev` — Boot up the dev server.
- `pnpm run build` — Build assets and compile TypeScript for production deployment.
- `pnpm run test` — Run the local test suite (powered by Japa).
- `pnpm run lint` — Lint the entire codebase.
- `pnpm run format` — Auto-format files via Prettier to keep styling consistent.
