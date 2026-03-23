import { createContext, useContext } from "react";

import { ToastsRendererContextProps } from "../types/toasts-renderer";

type ContextValues = Partial<
  Pick<ToastsRendererContextProps, "store" | "components">
>;

const Context = createContext<Partial<ContextValues>>({});

export const useRendererContext = () =>
  useContext(Context) as Required<ContextValues>;

const RendererProviderContext = ({
  children,
  components,
  store,
}: ToastsRendererContextProps) => {
  return (
    <Context.Provider value={{ components, store }}>
      {children}
    </Context.Provider>
  );
};

export default RendererProviderContext;
