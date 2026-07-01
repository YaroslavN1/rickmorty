[![Netlify Status](https://api.netlify.com/api/v1/badges/125d2270-53c1-4fdd-b8eb-8b451deb191f/deploy-status)](https://app.netlify.com/projects/rick-or-morty/deploys)

# Rick and Morty Character Browser

Personal Vue 3 project for browsing characters from the [Rick and Morty API](https://rickandmortyapi.com/), with search, filtering, and pagination.

## Features

- Searching is performed by 'name' field
- Filtering is available through 4 dropdowns: status, species, type, gender
- Page navigation is available through First/Previous/Next/Last buttons, as well as page number input
- Clicking on a character item opens up a card with details

## Tech stack

- [Vue 3](https://vuejs.org/) (`<script setup lang="ts">`) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/) for state management
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [`unplugin-vue-components`](https://github.com/unplugin/unplugin-vue-components) + [`unplugin-auto-import`](https://github.com/unplugin/unplugin-auto-import) for auto-imports
- [`rickmortyapi`](https://www.npmjs.com/package/rickmortyapi) as the API client

## Prerequisites

- Node `22.22.2` (defined in [`.nvmrc`](./.nvmrc))
- [pnpm](https://pnpm.io/)

## Getting started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `pnpm dev`        | Start the Vite dev server            |
| `pnpm build`      | Type-check and production build      |
| `pnpm preview`    | Preview the production build locally |
| `pnpm type-check` | Type-check without building          |
| `pnpm lint`       | Lint with ESLint                     |
| `pnpm format`     | Format with Prettier                 |

## Deployment

[Deployed](https://rick-or-morty.netlify.app/) via Netlify.

## Notes

- `rickmortyapi` dependence currently points at a fork (`github:YaroslavN1/rick-and-morty-api-node#master`). Main repository produces request URLs with double-slash inside, which results in 404 response from the main server. Issue is temporarily fixed in forked repository.
- since above solution is a linked repository (instead of dependence), `pnpm-workspace.yaml` allowlists `rickmortyapi`'s build scripts (`onlyBuiltDependencies`), which needs to run its own build step to produce its `dist/` output.
