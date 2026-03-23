import { createToastsStore } from "./create-toasts-store";

import { NewToast, Toast } from "../types/toast";

type Parameters = {
  store: ReturnType<typeof createToastsStore>;
};

const getHelpers = (store: Parameters["store"]) => {
  const stack = (toast: NewToast) => store.getState().stack(toast);
  const remove = (toastId: Toast["id"]) => store.getState().remove(toastId);
  const pop = () => store.getState().pop();

  return { stack, remove, pop };
};

export const createToastsUtilities = ({ store: useStore }: Parameters) => {
  const useStackToast = () => {
    return useStore((store) => store.stack);
  };
  const useRemoveToast = () => {
    return useStore((store) => store.remove);
  };
  const useToastsPool = () => {
    return useStore((store) => store.pool);
  };

  const hooks = {
    useStackToast,
    useRemoveToast,
    useToastsPool,
  };

  const helpers = getHelpers(useStore);

  return { hooks, helpers };
};
