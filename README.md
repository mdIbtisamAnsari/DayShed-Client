# 📅 DayShed (Day Scheduler)

**DayShed** is a modern, cross-platform mobile application designed to streamline daily scheduling, task ingestion, and productivity analytics. Built with **React Native (Expo)**, **TypeScript**, and **NativeWind**, DayShed provides a fast, intuitive, and responsive experience for managing everyday schedules on both Android and iOS devices.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (Prebuilt / Custom Native Support)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing & Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation with nested route groups)
- **Styling**: [NativeWind](https://www.nativewind.dev/) / Tailwind CSS
- **Networking**: Axios (Centralized API client with request interceptors)
- **State Management**: React Context (`LoadingContext`, `arkProvider`) & Custom Hooks (`useAuth`)
- **Native Platforms**: Android (Kotlin) & iOS (Swift) integration

---

## ✨ Key Features

- **🔐 Authentication Flow**:
  - Sign-in & Sign-up workflows
  - OTP verification (`otp.tsx`)
  - Password recovery support (`forgotPassword.tsx`)
- **📱 Daily Dashboard & Tabs**:
  - **Home**: Dynamic daily scheduling dashboard
  - **Inbox**: Communication and task ingestion hub
  - **Insights**: Productivity analytics and schedule breakdowns
- **💳 Monitization / Subscriptions**: Built-in subscription routing (`subscribe.tsx`)
- **🛡️ Secure Route Guarding**: Dynamic navigation flow segregating unauthenticated `(auth)` routes from protected `(root)` features.

---

## 📂 Directory Structure

```text
DayShed/
├── android/                 # Native Android project configuration (Kotlin)
├── ios/                     # Native iOS project configuration (Swift / Xcode)
├── assets/                  # App icons, splash screens, and image assets
├── src/
│   ├── api/                 # Axios HTTP client & network configurations
│   ├── app/                 # Expo Router file-based pages & layouts
│   │   ├── (auth)/          # Authentication routes (Sign-In, Sign-Up, OTP)
│   │   ├── (root)/          # Main application context
│   │   │   ├── (subscription)/ # Monetization and plan management
│   │   │   └── (tabs)/      # Bottom tab navigation (Home, Inbox, Insights)
│   │   └── _layout.tsx      # Root application layout
│   ├── context/             # Global React Context providers
│   ├── helper/              # Utility functions and custom providers
│   ├── hooks/                # Custom React Hooks (e.g., useAuth)
│   └── services/            # API service calls (authApi, localApi)
├── app.json                 # Expo project configuration
├── eas.json                 # Expo Application Services build configuration
├── tailwind.config.js       # NativeWind / Tailwind styling config
└── tsconfig.json            # TypeScript configuration
```

---

## 🚀 Development Timeline & Engineering Journal

Development was executed in focused sprints, balancing continuous offline prototyping and active code implementation with an approximate **4–5 day weekly sprint cadence** (with 2–3 days dedicated to planning, testing, and rest per week).

### 📍 Milestone 1: Foundation & Styling Pipeline
**Period:** Late August 2026
- Initialized the React Native project with Expo and TypeScript enforcement.
- Integrated NativeWind and configured Tailwind CSS (`tailwind.config.js`, `global.css`) for utility-first mobile styling.
- Defined core application configuration (`app.json`, `eas.json`, `metro.config.js`).

### 📍 Milestone 2: Native Module Setup & Prebuilding
**Period:** Early September 2026
- Executed Expo prebuild step to expose native `/android` and `/ios` directories.
- Configured native Android settings (`MainActivity.kt`, `MainApplication.kt`) and iOS entry points (`AppDelegate.swift`).
- Integrated custom branding assets (launch icons, splash screens, Android keystore `debug.keystore`).

### 📍 Milestone 3: Routing Architecture & Auth Services
**Period:** Mid-September 2026
- Established file-based navigation routing structure via `expo-router`.
- Designed user onboarding experience under the `(auth)` route group (`signin`, `signup`, `otp`, `forgotPassword`).
- Developed `authApi` service layer and created custom `useAuth` hook for managing user tokens and session persistence.
- Added global state handlers (`LoadingContext` and `arkProvider`).

### 📍 Milestone 4: Core Features, Tab Navigation & Network Layer
**Period:** Mid–Late September 2026
- Developed primary application tabs:
  - **Home**: Main schedule tracking UI
  - **Inbox**: Ingestion hub
  - **Insights**: Analytical overview of schedule distribution
- Created dedicated subscription funnel (`(subscription)/subscribe.tsx`).
- Standardized API calls with a centralized Axios client (`client.ts`) and modular service layer (`localApi.ts`)
