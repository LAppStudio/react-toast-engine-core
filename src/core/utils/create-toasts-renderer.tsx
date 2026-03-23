import { ElementType, useEffect, useId } from "react";

import { createToastsStore } from "./create-toasts-store";

import RendererProviderContext from "../providers/renderer-context";
import {
  ToastsComponentsByInfoType,
  ToastsPoolRendererProps,
  ToastsProviderProps,
} from "../types/toasts-renderer";

type Parameters = {
  components: ToastsComponentsByInfoType;
  store: ReturnType<typeof createToastsStore>;
  PoolRenderer: ElementType<ToastsPoolRendererProps>;
};

export const createToastsRenderer = ({
  components,
  PoolRenderer,
  store,
}: Parameters) => {
  const useStore = store;
  const Provider = ({ children }: ToastsProviderProps) => {
    const id = useId();
    const addProvider = useStore((store) => store.addProvider);
    const removeProvider = useStore((store) => store.removeProvider);
    const isCurrentProvider = useStore(
      (store) => store.providers.length === 0 || store.providers.at(0) === id,
    );

    useEffect(() => {
      addProvider(id);
      return () => {
        removeProvider(id);
      };
    }, [id, addProvider, removeProvider]);

    return (
      <RendererProviderContext components={components} store={store}>
        {isCurrentProvider ? <PoolRenderer>{children}</PoolRenderer> : children}
      </RendererProviderContext>
    );
  };

  return { Provider };
};
