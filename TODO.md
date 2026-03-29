# StreamVerse - TODO List

### High-Priority

- [ ] Connect `home.tsx` to AdonisJS backend controllers to fetch live match data and broadcast schedules.
- [ ] Implement User Authentication (Login / Signup) via AdonisJS Auth and the existing Inertia React page stubs.
- [ ] Build the dedicated "Live Matches" page layout.
- [ ] Build the "TV Channels" dedicated browsing interface.

### UI / UX Polish

- [ ] Configure standard Tailwind v4 scrollbar hiding utilities for the `ChannelRail` component.
- [ ] Implement responsive sidebar toggling (hamburger menu) for mobile views in `main-layout.tsx`.
- [ ] Add loading skeletons for the `MatchCard` components to display while Inertia transitions or fetches data.

### Technical & Maintenance

- [ ] Create robust reusable components for forms (Inputs, Labels, Buttons) by wrapping the existing Shadcn components and organizing them into `@/components/form/`.
- [ ] Setup testing environment for React components and Adonis backend endpoints.
