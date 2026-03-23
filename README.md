# React Toast Engine 🍞

**React Toast Engine** is a high-performance, headless toast management library for **React** and **React Native**.

It separates state logic (powered by Zustand) from the UI layer, allowing you to share the same notification logic across Web and Mobile while maintaining 60FPS native animations using **Reanimated**.

## ✨ Key Features

- 🚀 **Zero-Lag State:** Atomic updates via Zustand to prevent unnecessary re-renders.
- 📱 **Native First:** Deep integration with `react-native-reanimated` and `gesture-handler`.
- 🌐 **Truly Hybrid:** Multiple entry points to ensure Web builds don't bundle Native code.
- 🏗️ **Headless & Flexible:** You provide the components; we handle the stack, queue, and lifecycle.

---

## 📦 Installation

```bash
# npm
npm i @lapp-studio/react-toast-engine
# yarn
yarn add @lapp-studio/react-toast-engine
```

### Peer Dependencies

For **React Native** environments, ensure the following are installed:

```bash
yarn add react-native-reanimated react-native-gesture-handler react-native-safe-area-context
```

---

## 🚀 Quick Start

### 1. Initialize the Client

Define your UI components and initialize the engine.

```typescript
// src/lib/toasts.ts
import { createToastsClient } from "@lapp-studio/react-toast-engine";
import PoolRenderer from "@lapp-studio/react-toast-engine/native"; // For React Native

const components = {
  success: MySuccessComponent,
  error: MyErrorComponent,
  info: MyInfoComponent,
};

export const { store, utilities, renderer } = createToastsClient({
  components,
  PoolRenderer,
  storeSettings: { poolLimit: 5 },
});
```

### 2. Setup the Provider

Wrap your application root with the generated `Provider`.

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

Use hooks inside components or helpers for business logic (e.g., API interceptors).

```tsx
import { utilities } from "./lib/toasts";

// Inside a React Component
const stack = utilities.hooks.useStackToast();

// Outside React (e.g., inside an Axios Interceptor)
utilities.helpers.stack({
  title: "Success!",
  description: "Changes saved successfully.",
  infoType: "success",
  durationInMs: 3000,
});
```

---

## 🛠️ Architecture

The library follows a **Decoupled Provider-Consumer** pattern:

1.  **Store (Zustand):** Manages the global toast pool and provider stack.
2.  **Utilities:** Provides a clean API via `hooks` for UI and `helpers` for logic.
3.  **Renderer:** Handles priority. If multiple providers are present, only the topmost (latest) one renders the active toasts to prevent duplicates.

---

## 📱 React Native Specifics

The native build uses **Shared Values** and **Worklets** for maximum performance:

- **Swipe to Dismiss:** Fully interactive gestures to clear notifications.
- **Safe Area Aware:** Automatically calculates offsets using `react-native-safe-area-context`.
- **Z-Index Management:** Smart stacking logic that works across different navigation screens.

---

## 📄 License

MIT © LApp
