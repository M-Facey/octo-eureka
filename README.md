# Octo Eureka

![App Banner](https://github.com/M-Facey/octo-eureka/blob/main/public/app-banner.png?raw=true)

This is a simple todo application created in Vue3 and TailwindCSS.

## Features

:warning: **Please Note**: The feature list will be updated as features are merged into the main branch.

### Basic Features

- [x] `ADD`, `DELETE`, `EDIT`, & `COMPLETE` todo(s)
- [ ] Mobile Friendly
  - [x] Re-work the edit section
  - [x] Move notification to top of screen for mobile
  - [ ] Rework modals
- [ ] Increased Accessability
  - [ ] High Contrast Mode
  - [x] Styling for `prefers-reduced-motion`

### Extra Features

- [x] `FILTER`, `LIMIT (MAX 50)` & `SORT` todo(s)
- [ ] Added tests
  - Number of unit tests: 3
  - Number of e2e tests: 7
- [ ] Clear todos after 24hrs

### Chores

- [ ] Re-structure project
- [x] Replace banner on `README.md`

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Run and Watch Unit Tests for Development

```sh
pnpm test:unit-dev
```

### Run Unit Tests for Production

```sh
pnpm test:unit
```

### Run E2E Tests

```sh
pnpm test:e2e
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```
