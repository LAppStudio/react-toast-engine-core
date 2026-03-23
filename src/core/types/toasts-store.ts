import { NewToast, Toast } from "./toast";

export type ToastsStore = {
  pool: Toast[];
  providers: string[];

  stack: (toast: NewToast) => void;
  remove: (toast: Toast["id"]) => void;
  pop: () => void;

  addProvider: (providerId: string) => void;
  removeProvider: (providerId: string) => void;
};

export type ToastsStoreSettings = {
  poolLimit?: number;
};
