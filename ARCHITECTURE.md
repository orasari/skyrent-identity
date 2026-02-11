## Architecture Overview

This monorepo ships two deliverables:

- `packages/identity-sdk`: a reusable React SDK for identity verification.
- `apps/skyrent-demo`: a demo app that integrates the SDK in a 4-step flow.

## Key Decisions

- **Monorepo + pnpm workspaces**: keep SDK and demo in one repo with local linking for fast iteration.
- **SDK exports**: named exports for components, hooks, and types to keep the API explicit and tree-shakeable.
- **SDK build**: `tsup` outputs ESM + CJS + types to mirror real package distribution.
- **Demo data + mocks**: no backend required; `getIdentityData` simulates verification and errors.
- **UI layout**: shared `Layout` component ensures consistent two-column flow across steps.
- **Cart logic**: `useCart` hook centralizes cart state and actions.
- **User prefs**: `useLocalStorage` stores client-only preferences (unit system).
- **Styling boundaries**: Tailwind and app-specific styling live only in the demo app; the SDK sticks to framework-neutral inline styles and exposes `className` / `classNames` hooks so consumers can theme components in their own design systems.

## Data Flow

1. User selects drones in the demo app and builds a cart.
2. SDK components collect selfie, phone, and address.
3. `getIdentityData` produces a normalized identity result and status.
4. Demo app gates checkout based on verification status.

## Extending the SDK

### Add a new component

1. Create a new folder under `packages/identity-sdk/src/components/`.
2. Export the component from `packages/identity-sdk/src/index.ts`.
3. Add styles and tests in the same folder.
4. Rebuild the SDK: `pnpm --filter @skyrent/identity-sdk build`.

### Add a new core function

1. Add logic under `packages/identity-sdk/src/core/`.
2. Export the function and any types from `src/index.ts`.
3. Add unit tests under `src/core/__tests__/`.

### Add validation or UX behavior

1. Update component logic in `src/components/...`.
2. Keep SDK UI neutral and configurable via class overrides.
3. Add tests for new behavior.

## Extending the Demo App

### Add a new step

1. Create a new page under `apps/skyrent-demo/src/pages/`.
2. Add the step into the view flow in `apps/skyrent-demo/src/App.tsx`.
3. Reuse `Layout` and `RentalSummaryCard` for consistency.

### Add new drone categories

1. Update data in `apps/skyrent-demo/src/utils/demoData.ts`.
2. Update UI filters in `BrowseDronesPage.tsx` if needed.

## Testing Strategy

- **SDK**: unit tests for core logic and component behavior.
- **Demo**: integration-style tests for the verification flow.

## Local Development Notes

- Run both apps: `pnpm dev`
- SDK watch mode: `pnpm --filter @skyrent/identity-sdk dev`
- Demo app: `pnpm --filter skyrent-demo dev`
