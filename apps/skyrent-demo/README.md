# SkyRent Drones - Demo Application

Premium drone rental application demonstrating the `@skyrent/identity-sdk` integration.

## Architecture

```
src/
├── components/          # Reusable UI components
│   ├── drone/          # Drone browsing components
│   ├── cart/           # Shopping cart components
│   └── identity/       # Identity verification flow (SDK integration)
├── pages/              # Main application pages
│   ├── BrowsePage.tsx  # Step 1: Browse & select drones
│   ├── VerifyPage.tsx  # Step 2: Identity verification
│   └── CheckoutPage.tsx # Step 3: Complete rental
├── lib/                # Utilities and helpers
│   ├── types.ts        # App-specific types
│   └── mockData.ts     # Drone inventory mock data
├── App.tsx             # Main app with routing/state
├── main.tsx            # Entry point
└── index.css           # Global styles (Tailwind)
```

## User Flow (per assignment)

1. **Browse & Select** - View drone inventory (Filming/Cargo), add to cart
2. **Identity Verification** - Complete verification using SDK components
3. **Verification Result** - View score/status, proceed if verified
4. **Checkout** - Complete rental (only if verified)

## Development

```bash
# From workspace root
pnpm install
pnpm dev

# Or run just the demo app
pnpm --filter skyrent-demo dev
```

## SDK Integration

This app imports and uses:

- `@skyrent/identity-sdk` (workspace dependency)
- SDK components will be built in next steps
