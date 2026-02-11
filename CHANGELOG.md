# Changelog

All notable changes to this project will be documented here.

## [Unreleased]

### Added

- Identity verification SDK components (SelfieCapture, PhoneInput, AddressForm).
- Demo app with multi-step verification flow and checkout gating.
- SDK core `getIdentityData` with deterministic testing options.
- Unit and integration tests across SDK and demo app.
- Pre-commit automation (Husky, lint-staged, commitlint).

### Changed

- UI improvements for browsing, selection, and verification flow layouts.
- Centralized formatting utilities and configuration handling.

### Fixed

- Validation and warning behaviors for PhoneInput.
- Permission/error UX messaging for SelfieCapture.
