import { ElementType } from "react";

import {
  ToastsComponentsByInfoType,
  ToastsPoolRendererProps,
} from "./types/toasts-renderer";
import { createToastsRenderer } from "./utils/create-toasts-renderer";
import { createToastsStore } from "./utils/create-toasts-store";
import { createToastsUtilities } from "./utils/create-toasts-utilities";
import { ToastsStoreSettings } from "./types/toasts-store";

type Parameters = {
  components: ToastsComponentsByInfoType;
  PoolRenderer: ElementType<ToastsPoolRendererProps>;
  storeSettings?: ToastsStoreSettings;
};

export const createToastsClient = ({
  components,
  PoolRenderer,
  storeSettings,
}: Parameters) => {
  const store = createToastsStore(storeSettings);
  const utilities = createToastsUtilities({ store });
  const renderer = createToastsRenderer({
    components,
    PoolRenderer,
    store,
  });

  return { store, utilities, renderer };
};
