# Codebase Reference: React Native Starter

## Overview

This project is a **React Native (v0.83.1)** application built with **TypeScript**. It follows a feature-based / domain-driven folder structure and uses modern libraries for state management, navigation, and styling.

## Tech Stack

| Category             | Library                                       | Version   |
| -------------------- | --------------------------------------------- | --------- |
| **Core**             | React Native                                  | 0.83.1    |
| **Language**         | TypeScript                                    | 5.8       |
| **State Management** | Redux Toolkit                                 | 2.11.2    |
| **Persistence**      | Redux Persist                                 | 6.0.0     |
| **Navigation**       | React Navigation                              | 7.x       |
| **Styling**          | NativeWind (Tailwind CSS) + Styled Components | 4.x / 6.x |
| **Networking**       | Axios                                         | 1.13.2    |
| **Forms**            | React Hook Form (likely) + Zod                | 4.3.5     |
| **Storage**          | MMKV + Async Storage + Encrypted Storage      |           |
| **I18n**             | i18next                                       |           |

## Architecture

### 1. Networking (`src/api`)

- **Client**: A singleton `ApiClient` class wraps `axios`.
- **Interceptors**:
  - **Request**: Adds `Authorization: Bearer <token>` from secure storage.
  - **Response**: Handles global errors and **automatic token refresh** logic on 401 errors.
- **Configuration**: Base URL and timeouts defined in `api.config.ts`.

### 2. State Management (`src/store`)

- **Redux Toolkit**: Used for global state.
- **Persistence**: `redux-persist` is configured with `AsyncStorage`.
- **Slices**:
  - `auth`: Token management, authentication status.
  - `user`: User profile data.
  - `app`: App-specific settings (blacklisted from persistence).

### 3. Navigation (`src/navigation`)

- **Root Navigator**: Controls the main flow switch.
  1.  **Onboarding**: Shown if `!isOnboardingComplete`.
  2.  **Auth Stack**: `Login`, `SignUp` (if `!isAuthenticated`).
  3.  **Main Stack**: Main app content (if `isAuthenticated`).
- **Helpers**: `navigationRef` allows navigation from non-component files (e.g., API interceptors).

### 4. Styling

- **Tailwind CSS**: Configured via `nativewind`.
- **Theme**: Custom colors (`primary`, `secondary`, etc.) and fonts (`Roboto`) defined in `tailwind.config.js`.

## Directory Structure (`src/`)

- `adapters`: Adapter pattern implementations.
- `api`: API client and configuration.
- `assets`: Static assets (images, fonts).
- `components`: Reusable UI components.
- `config`: App-wide configuration.
- `constants`: Constant values.
- `dto`: Data Transfer Objects (likely for API responses).
- `hooks`: Custom React hooks (`useRedux`, `useOnboarding`).
- `i18n`: Internationalization setup.
- `navigation`: Navigators and route definitions.
- `repositories`: Repository pattern (data access layer).
- `screens`: Screen components grouped by feature (Auth, Main, Onboarding).
- `services`: Business logic services.
- `store`: Redux setup and slices.
- `types`: TypeScript type definitions.
- `utils`: Helper functions (`logger`, `storage`).
- `validations`: Zod schemas for validation.
