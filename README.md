# City Pulse App

## Documentation

### 📖 Overview

City Pulse is a modern, cross-platform mobile application built with Expo and React Native. It helps users discover events in their city, powered by the Ticketmaster API. The app features a clean, user-friendly interface with full support for both English and Arabic, including RTL (Right-to-Left) layout switching.

#### UI/UX

The design inspiration was obtained from Google screenshot references and MagicPath.ai.
The app logo was sourced from design.com and refined using ChatGPT.

#### Stack

- **Repository**: https://github.com/fathimabuniyam/city-pulse-app
- **Framework**: Expo (SDK 49+)
- **Frontend**: React Native, React Native Paper, Custom Components
- **Language**: TypeScript

## ✨ Features

- **Event Discovery**: Browse and search for events using the Ticketmaster API.

- **Infinite Scroll**: Effortlessly load more events on the home screen.

- **Bilingual Support**: Full English & Arabic localization with RTL layout support.

- **User Authentication**: Secure sign-up and login using **Firebase Auth**.

- **Favorites System**: Mark and save favorite events, synced with **Firebase DB**.

- **Biometric Authentication**: Secure login using Face ID / Touch ID.

- **Offline-First Caching**: Efficient data caching and state management with **TanStack Query**.

- **Form Handling**: Robust form validation with Formik and Yup.

- **Cross-Platform**: Runs seamlessly on both iOS and Android.

## 🏗 Project Architecture

Folder Structure

```
city-pulse-app/
├── app/ # Expo File-Based Routes (Main Navigation Stack & Tabs)
├── src/
│ ├── components/ # Reusable UI & Common Components
│ ├── constants/ # Color palettes, font definitions, etc.
│ ├── i18n/ # Localization files (translations, setup)
│ ├── layout/ # Auth Screen Layouts/Components
│ ├── providers/ # React Context Providers (Auth, Locale, etc.)
│ ├── queries/ # TanStack Query hooks & API calls (Firebase, Ticketmaster)
│ ├── screens/ # All Screen Components (mirrors app/ for organization)
│ ├── types/ # TypeScript definitions, interfaces, enums
│ └── utils/ # Utility functions (biometrics, toasts, helpers)
├── .eslintrc.js # ESLint configuration
├── .prettierrc # Prettier configuration
├── firebase.ts # Firebase configuration
└── ... (other config files)
```

## 🎬 App Startup Behavior

- Expo Default Splash

  > When the app starts inside Expo Go or a simulator, a white background with the Expo default logo appears.
  >
  > This is **NOT the app’s splash screen** — it's built-in behavior from Expo’s development environment.

- App's Actual Splash Screen

  > After the Expo logo disappears:
  >
  > A custom splash screen with bouncing logo animation is displayed.
  >
  > This is your actual branded splash screen.

- Navigation After Splash
  > Handled via AuthProvider:
  >
  > If a token exists in **AsyncStorage**, user is taken to Home.
  >
  > If no token is found, user is redirected to the Login screen.

## App Information

#### 🔐 Authentication Flow with Firebase Auth + AsyncStorage

- User signs in → Firebase returns token → token is stored in:

- React Native **AsyncStorage**

- Synced with **Firestore** (merged storage)

#### Internationalization (i18n)

- Library: Implemented using i18n-js.

- Storage: The user's language preference is stored in AsyncStorage.

- RTL Support: Managed by the LocaleProvider (src/providers/LocaleProvider.ts). The app dynamically switches to RTL layout when Arabic is selected.

- **Note on Expo Go**: RTL layout changes are not visible in the Expo Go app due to a known limitation. **They work perfectly in production builds and development builds on physical devices**.

#### Data Management with TanStack Query

- Caching: All API responses from Ticketmaster and Firebase are automatically cached.

- Infinite Scroll: The home screen's event list implements infinite scrolling using TanStack Query's useInfiniteQuery hook, providing a seamless user experience.

- Optimistic Updates: Favorite events are managed by storing only the Event ID in the user's Firebase document. The app then fetches the full event details based on these IDs.

## Installation & Running

### Clone the repository

```
git clone https://github.com/fathimabuniyam/city-pulse-app.git
cd city-pulse-app
```

Install dependencies

```
npm install
# or
yarn install
```

Start the development server

```
npx expo start
# or
yarn start
```

You can then run the app on an emulator/simulator or scan the QR code with the Expo Go app on your physical device.

## 📱 Screenshots & Media

- Screenshots of the app running on Android (Simulator) and iOS (Physical Device).

- A screen recording demonstrating the app flow on both platforms.

- Screenshots of the Firebase Firestore database structure.

## 👨‍💻 Development Practices

- **Code Quality**: Enforced using ESLint and Prettier.

- **Version Control**: Regular, atomic commits are pushed to GitHub to track progress and changes clearly.

- **Development Environment**: Primary IDE - VSCode
