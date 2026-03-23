import { ElementType } from "react";
import { StoreApi, UseBoundStore } from "zustand";

import { ToastInfoType } from "./toast";
import { ToastComponentProps } from "./toast-component";
import { ToastsStore } from "./toasts-store";

export type ToastsComponentsByInfoType = Record<
  ToastInfoType,
  ElementType<ToastComponentProps>
>;

export type ToastsRendererContextProps = {
  children: React.ReactNode;
  components: ToastsComponentsByInfoType;
  store: UseBoundStore<StoreApi<ToastsStore>>;
};

export type ToastsPoolRendererProps = {
  children: React.ReactNode;
};

export type ToastsProviderProps = {
  children: React.ReactNode;
};
