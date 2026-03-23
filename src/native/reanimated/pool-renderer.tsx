import { StyleSheet, View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ToastWrapper from "./toast-wrapper";

import { useRendererContext } from "../../core/providers/renderer-context";
import { ToastsPoolRendererProps } from "../../core/types/toasts-renderer";

const Toasts = () => {
  const { store: useStore, components } = useRendererContext();

  const pool = useStore((store) => store.pool);

  const count = pool.length;

  return pool.map((item, index) => {
    const Render = components[item.infoType];
    return (
      <Animated.View entering={FadeInUp} exiting={FadeOutUp} key={item.id}>
        <ToastWrapper
          index={count - index - 1}
          id={item.id}
          timeoutInMs={item.durationInMs}
        >
          <Render toast={item} actions={{}} />
        </ToastWrapper>
      </Animated.View>
    );
  });
};

const PoolRenderer = ({ children }: ToastsPoolRendererProps) => {
  const { top } = useSafeAreaInsets();
  const { store: useStore } = useRendererContext();
  const hasToasts = useStore((store) => store.pool.length > 0);

  return (
    <View style={styles.container}>
      {children}
      {hasToasts && (
        <Animated.View
          style={[styles.poolWrapper, { top }]}
          entering={FadeInUp}
          exiting={FadeOutUp}
        >
          <Toasts />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  poolWrapper: {
    position: "absolute",
    flexDirection: "column",
    height: 100,
    left: 10,
    right: 10,
  },
  pool: {},
});

export default PoolRenderer;
