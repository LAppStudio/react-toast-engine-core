# React Toast Engine 🍞

[![npm version](https://img.shields.io/npm/v/@lapp-studio/react-toast-engine.svg?style=flat-square)](https://www.npmjs.com/package/@lapp-studio/react-toast-engine)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**React Toast Engine** is a high-performance, headless toast management library for **React** and **React Native**.

It separates state logic (powered by [Zustand](https://github.com/pmndrs/zustand)) from the UI layer, allowing you to share the exact same notification logic across Web and Mobile. For React Native, it maintains flawless 60FPS animations natively using **Reanimated** and **Gesture Handler**, without locking the JS thread.

## ✨ Key Features

- 🚀 **Zero-Lag State:** Atomic updates via Zustand to prevent unnecessary re-renders across your app.
- 📱 **Native First:** Deep, out-of-the-box integration with `react-native-reanimated`, `react-native-gesture-handler`, and `react-native-worklets`.
- 🌐 **Truly Hybrid (Tree-Shakeable):** Separate entry points for Core (`/`) and Native (`/native`) ensure your Web builds never bundle heavy React Native libraries.
- 🏗️ **100% Headless & Flexible:** You build the UI components; the engine handles the stacking, queuing, lifecycle, and gesture logic.
- 🛡️ **Smart Provider Stacking:** If multiple providers exist in the DOM/Tree, the engine intelligently routes toasts only to the topmost (active) provider to prevent duplicates.

---

## 📦 Installation

Install the core library:

```bash
# npm
npm i @lapp-studio/react-toast-engine

# yarn
yarn add @lapp-studio/react-toast-engine
```

### React Native Peer Dependencies

If you are using React Native, ensure you have the required animation and gesture libraries installed in your project:

```bash
yarn add react-native-reanimated react-native-gesture-handler react-native-safe-area-context react-native-worklets
```

---

## 🚀 Quick Start

### 1. Initialize the Client

Create a shared file (e.g., `src/lib/toasts.ts`) to configure your UI components and initialize the engine.

```typescript
// src/lib/toasts.ts
import { createToastsClient } from "@lapp-studio/react-toast-engine/core";

// Import the native renderer only in your React Native app
import { PoolRenderer } from "@lapp-studio/react-toast-engine/native";

import {
  MySuccessComponent,
  MyErrorComponent,
  MyInfoComponent,
} from "./components";

// Map your custom components to the engine's InfoTypes
const components = {
  success: MySuccessComponent,
  error: MyErrorComponent,
  info: MyInfoComponent,
};

// Create and export the client tools
export const { store, utilities, renderer } = createToastsClient({
  components,
  PoolRenderer,
  storeSettings: { poolLimit: 5 }, // Keep a maximum of 5 toasts in the DOM at once
});
```

### 2. Setup the Provider

Wrap your application's root component with the generated `Provider`.

```tsx
import { renderer } from "./lib/toasts";

export function App() {
  return (
    <renderer.Provider>
      <MainScreen />
    </renderer.Provider>
  );
}
```

### 3. Trigger Toasts

You can stack toasts from anywhere in your app—either via React hooks inside your components or via helper functions in standard TypeScript files.

**Inside a React Component (Using Hooks):**

```tsx
import { Button } from "react-native";
import { utilities } from "./lib/toasts";

export const SaveButton = () => {
  const stack = utilities.hooks.useStackToast();

  const handlePress = () => {
    stack({
      title: "Success!",
      description: "Profile updated.",
      infoType: "success",
      durationInMs: 3000,
    });
  };

  return <Button title="Save" onPress={handlePress} />;
};
```

**Outside React (Using Helpers - Great for API Interceptors):**

```typescript
import { utilities } from "./lib/toasts";
import api from "./api";

api.interceptors.response.use(
  (response) => response,
  (error) => {
    utilities.helpers.stack({
      title: "Connection Error",
      description: error.message,
      infoType: "error",
      durationInMs: 5000,
    });
    return Promise.reject(error);
  },
);
```

---

## 🎨 Creating Custom Components

Since the engine is **headless**, you have total control over the UI. Your components will receive `toast` data and an `actions` object. Using our exported types ensures full TypeScript support.

```tsx
import React from "react";
import { YStack, Text } from "tamagui"; // Or your UI library of choice
import { ToastComponentProps } from "@lapp-studio/react-toast-engine";

export const MySuccessComponent = ({ toast, actions }: ToastComponentProps) => {
  return (
    <YStack
      backgroundColor="$green10"
      padding="$4"
      borderRadius="$8"
      onPress={() => actions?.onPress?.(toast)}
    >
      <Text color="white" fontWeight="bold" fontSize="$4">
        {toast.title}
      </Text>
      <Text color="white" fontSize="$3">
        {toast.description}
      </Text>
    </YStack>
  );
};
```

---

## 📱 React Native Architecture

The native implementation uses **Shared Values** and **Worklets** to achieve native-level performance:

- **Swipe to Dismiss:** Fully interactive, physics-based gestures to clear notifications. Swipe velocities are calculated in real-time.
- **UI Thread Operations:** Dismissing a toast uses `scheduleOnRN` to bypass the JS thread entirely, avoiding stutters during heavy computations.
- **Safe Area Aware:** Automatically shifts offsets using `react-native-safe-area-context` to prevent overlapping with notches or dynamic islands.
- **Dynamic Z-Index:** Smart stacking logic that recalculates layer priorities smoothly as new toasts arrive or leave.

---

## 📄 License

MIT © L'App Studio
