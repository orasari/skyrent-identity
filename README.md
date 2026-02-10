# SkyRent Identity Verification System

A monorepo containing an identity verification SDK and a demonstration application for drone rental services.

## Project Overview

This project consists of two main packages:

- **identity-sdk** - A reusable React component library for identity verification
- **skyrent-demo** - A demonstration application showing SDK integration in a drone rental context

### Demo App Flow & Performance

The demo app uses a step-based flow and lazy-loads verification steps:
- Selfie capture renders first.
- Phone verification and address form modules load only after the selfie step completes.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm 8.0 or higher

### Installation

```bash
# Install all dependencies
pnpm install


# Start SDK + demo app together
pnpm dev

# Or keep the SDK build up to date during dev (manual)
pnpm --filter @skyrent/identity-sdk dev

# Build the SDK package
pnpm --filter @skyrent/identity-sdk build

# Start the demo application
pnpm --filter skyrent-demo dev
```

The demo application will be available at `http://localhost:5173`

### Backend / API Notes

This project does not require a backend service. The demo uses a client-side mock in
`getIdentityData()` to generate verification results and scores for the flow.

### SDK Quick Start

Install the SDK (consumer apps):

```bash
pnpm add @skyrent/identity-sdk
```

Basic usage:

```tsx
import { SelfieCapture } from '@skyrent/identity-sdk';

export function VerificationStep() {
  return <SelfieCapture onCapture={(image) => console.log(image)} />;
}
```

Note: Camera access requires HTTPS in production (localhost is exempt).

### Building for Production

```bash
# Build all packages
pnpm -r build

# Build specific package
pnpm --filter @skyrent/identity-sdk build
pnpm --filter skyrent-demo build
```

## Project Structure

```
skyrent-identity/
├── packages/
│   └── identity-sdk/
│       ├── src/
│       │   ├── core/
│       │   │   └── types.ts          # TypeScript type definitions
│       │   └── index.ts              # Main package export
│       ├── dist/                     # Built package output
│       ├── package.json
│       └── tsup.config.ts            # Build configuration
│
├── apps/
│   └── skyrent-demo/
│       ├── src/
│       │   ├── components/           # React components
│       │   ├── pages/                # Application pages
│       │   ├── lib/                  # Utilities and helpers
│       │   ├── App.tsx               # Root application component
│       │   └── main.tsx              # Application entry point
│       ├── package.json
│       └── vite.config.ts            # Build and dev server config
│
├── pnpm-workspace.yaml               # Workspace configuration
└── package.json                      # Root package configuration
```

## How the Packages Connect

### Workspace Architecture

This project uses pnpm workspaces to manage multiple packages in a single repository. The workspace configuration is defined in `pnpm-workspace.yaml`:

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

### Local Package Linking

The demo application depends on the SDK package through workspace protocol:

```json
{
  "dependencies": {
    "@skyrent/identity-sdk": "workspace:*"
  }
}
```

When you run `pnpm install`, the workspace protocol creates a symlink from the demo app's `node_modules` to the local SDK package. This means:

- Changes to the SDK are immediately available to the demo app
- No need to publish the SDK to npm during development
- No need to reinstall after SDK changes
- TypeScript types are properly resolved across packages

### Build Process

The SDK is built using tsup, which:

- Bundles the source code into distributable formats
- Generates TypeScript declaration files
- Outputs both ESM and CommonJS formats
- Creates source maps for debugging

The demo app imports the built SDK from `dist/` rather than directly from `src/`. This simulates how external consumers would use the package.

## Technology Stack

### Build Tools

**pnpm** - Package manager chosen for:

- Efficient disk space usage through content-addressable storage
- Fast installation times
- Better workspace support than npm/yarn
- Strict dependency resolution prevents phantom dependencies

**tsup** - Build tool for the SDK:

- Zero-config TypeScript bundler
- Fast builds using esbuild
- Generates multiple module formats (ESM, CJS)
- Automatic TypeScript declaration generation
- Smaller and faster than webpack or rollup for library bundling

**Vite** - Development server and build tool for demo app:

- Fast hot module replacement during development
- Optimized production builds
- Native ESM support
- Better developer experience than Create React App

### Frontend Stack

**React 18** - UI library:

- Industry standard for component-based UIs
- Large ecosystem of tools and libraries
- Excellent TypeScript support
- Stable and production-ready with broad ecosystem compatibility

**TypeScript** - Type system:

- Catch errors at compile time
- Better IDE support and autocomplete
- Self-documenting code through types
- Essential for SDK development to provide type safety to consumers

**Tailwind CSS** - Styling framework:

- Utility-first approach speeds up development
- Consistent design system
- Small production bundle through purging
- No CSS naming conflicts

## Code Quality Tools

### Linting and Formatting

This project uses ESLint and Prettier to maintain code quality and consistency.

**ESLint** - Identifies problematic patterns and potential bugs:

```bash
# Check for linting errors
pnpm lint

# Auto-fix linting issues
pnpm lint:fix
```

**Prettier** - Enforces consistent code formatting:

```bash
# Format all files
pnpm format

# Check if files are formatted correctly
pnpm format:check
```

**Type Checking** - Verify TypeScript types across all packages:

```bash
pnpm type-check
```

### Editor Setup

The project includes configuration for VSCode in `.vscode/`:

- `settings.json` - Auto-format on save, ESLint integration
- `extensions.json` - Recommended extensions

**Recommended VSCode Extensions:**

- Prettier - Code formatter
- ESLint - Linting support
- EditorConfig - Consistent editor settings
- Tailwind CSS IntelliSense - Tailwind class autocomplete

When you open the project, VSCode will prompt you to install these extensions.

### Configuration Files

- `.editorconfig` - Basic editor settings (indentation, line endings)
- `.prettierrc` - Prettier formatting rules (single quotes, 2-space indentation)
- `.eslintrc.json` - ESLint 8 linting rules with TypeScript support
- `.gitignore` - Files to exclude from version control

All tools are configured to work together without conflicts. Prettier handles formatting, ESLint handles code quality.

## Development Workflow

### Making Changes to the SDK

1. Navigate to the SDK package: `cd packages/identity-sdk`
2. Make your changes in `src/`
3. Build the package: `pnpm build`
4. The demo app will automatically use the updated version

For faster iteration, use watch mode:

```bash
pnpm --filter @skyrent/identity-sdk dev
```

### Working on the Demo App

```bash
# Start dev server with hot reload
pnpm --filter skyrent-demo dev

# Type check without building
pnpm --filter skyrent-demo exec tsc --noEmit
```

## Package Scripts

### Root Level

- `pnpm dev` - Start dev servers for all packages
- `pnpm build` - Build all packages
- `pnpm test` - Run tests for all packages
- `pnpm lint` - Lint all files
- `pnpm lint:fix` - Fix linting issues automatically
- `pnpm format` - Format all files with Prettier
- `pnpm format:check` - Check if files are formatted
- `pnpm type-check` - Type check all packages

### SDK Package

- `pnpm build` - Build the SDK
- `pnpm dev` - Build in watch mode
- `pnpm test` - Run SDK tests

### Demo App

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

## Type Safety

The SDK exports TypeScript types that are automatically available to consumers:

```typescript
import type { Address, IdentityData, IdentityStatus } from '@skyrent/identity-sdk';
```

These types are generated during the build process and included in the package distribution. The `types` field in `package.json` points to the generated declaration files.

### Path Aliases

The demo app is configured with path aliases for cleaner imports:

```typescript
// Instead of: import Button from '../../../components/Button'
// Use: import Button from '@/components/Button'
```

The `@/*` alias maps to `./src/*` and is configured in both `tsconfig.json` and `vite.config.ts`.

## Module Formats

The SDK is built in two formats:

- **ESM** (ES Modules) - Modern format for bundlers and modern environments
- **CJS** (CommonJS) - Legacy format for older Node.js environments

The appropriate format is automatically selected based on the consumer's environment. Most modern tools will prefer ESM.

## Best Practices

### Code Organization

- Keep components small and focused
- Separate business logic from presentation
- Use TypeScript for all new code
- Export only what's necessary from the SDK

### Code Quality

- Run `pnpm lint` before committing
- Format code with `pnpm format` or enable format on save
- Fix all TypeScript errors before pushing
- Follow ESLint warnings to maintain code quality

### Dependency Management

- Add dependencies to the specific package that needs them
- Use `peerDependencies` in the SDK for React/React DOM
- Keep `devDependencies` separate from `dependencies`

### Type Safety

- Avoid `any` types
- Define interfaces for all data structures
- Use union types for status fields
- Export types that consumers need

## Troubleshooting

### SDK changes not reflected in demo app

1. Rebuild the SDK: `pnpm --filter @skyrent/identity-sdk build`
2. If using dev mode, ensure the watcher is running
3. Check that the demo app is importing from the correct path

### Type errors in demo app

1. Ensure SDK is built: `pnpm --filter @skyrent/identity-sdk build`
2. Restart your IDE's TypeScript server
3. Clear node_modules and reinstall if needed

### Build failures

1. Check Node.js version matches requirements (>=18.0.0)
2. Check pnpm version (>=8.0.0)
3. Delete `node_modules` and `pnpm-lock.yaml`, then reinstall
4. Ensure all peer dependencies are installed

## Package Metadata

Both packages include complete metadata:

- **License**: MIT
- **Keywords**: identity, verification, sdk, selfie, kyc, react
- **Repository**: GitHub (update URL in package.json files)
- **Author**: Update in package.json files before publishing

## Dependency Versions

### Core Dependencies

- React: 18.3.0
- React DOM: 18.3.0
- TypeScript: 5.9.3

### Build Tools

- Vite: 7.3.1
- tsup: 8.5.1
- pnpm: 10.28.2

### Code Quality

- ESLint: 8.57.0
- Prettier: 3.4.2
- @typescript-eslint: 7.18.0

The SDK supports React 18.x and 19.x through flexible peer dependencies.
