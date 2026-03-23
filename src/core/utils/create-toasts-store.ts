import { create } from "zustand";

import { ToastsStore, ToastsStoreSettings } from "../types/toasts-store";
import { createToastRandomId } from "./create-toast-id";

const DEFAULT_POOL_LIMIT = 10;

export const createToastsStore = ({
  poolLimit = DEFAULT_POOL_LIMIT,
}: ToastsStoreSettings = {}) => {
  const store = create<ToastsStore>((set) => ({
    pool: [],
    providers: [],
    stack: (toast) =>
      set((store) => ({
        ...store,
        pool: [
          ...(store.pool.length >= poolLimit
            ? store.pool.slice(poolLimit - 1)
            : store.pool),
          { id: createToastRandomId(), ...toast },
        ],
      })),
    remove: (toastId) =>
      set((store) => ({
        ...store,
        pool: store.pool.filter((t) => t.id !== toastId),
      })),
    pop: () => set((store) => ({ ...store, pool: store.pool.slice(0, 1) })),

    addProvider: (providerId) =>
      set((store) => ({
        ...store,
        providers: [...new Set([providerId, ...store.providers])],
      })),

    removeProvider: (providerId) =>
      set((store) => ({
        ...store,
        providers: store.providers.filter((id) => id !== providerId),
      })),
  }));

  return store;
};
