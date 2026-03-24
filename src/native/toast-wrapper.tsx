import { useCallback, useEffect, useRef } from "react";
import { useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { useRendererContext } from "../core/providers/renderer-context";

const MIN_DISMISS_VELOCITY = 1e3;

type ToastWrapperProps = {
  children: React.ReactNode;
  index: number;
  timeoutInMs: number;
  id: string;
};

export const ToastWrapper = ({
  children,
  index,
  timeoutInMs,
  id,
}: ToastWrapperProps) => {
  const { width } = useWindowDimensions();
  const { store: useStore } = useRendererContext();

  const remove = useStore((store) => store.remove);
  const count = useStore((store) => store.pool.length);

  const shouldDelete = useRef<boolean>(false);
  const offsetX = useSharedValue(0);

  const isActive = index === 0;

  const handleRemove = useCallback(() => {
    remove(id);
  }, [id, remove]);

  useAnimatedReaction(
    () => Math.abs(offsetX.value) > width * 1.5,
    (current, previous) => {
      if (current && current !== previous && shouldDelete.current)
        scheduleOnRN(handleRemove);
    },
  );

  const pan = Gesture.Pan()
    .enabled(isActive)
    .onChange((ev) => {
      if (Math.abs(ev.velocityX) > MIN_DISMISS_VELOCITY) {
        shouldDelete.current = true;
      }
      offsetX.value = ev.translationX;
    })
    .onFinalize((ev) => {
      if (!shouldDelete.current) {
        offsetX.value = withSpring(0);
        return;
      }
      offsetX.value = withSpring(ev.velocityX > 0 ? width * 2 : -width * 2);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    zIndex: 10 + count - index,
    opacity: withTiming(
      interpolate(index, [0, 1], [1, 0.5], Extrapolation.EXTEND),
    ),
    transform: [
      {
        translateY: withSpring(
          interpolate(index, [0, 1], [1, 10], Extrapolation.EXTEND),
        ),
      },
      { translateX: offsetX.value },
      {
        scale: withSpring(
          interpolate(index, [0, 1], [1, 0.95], Extrapolation.EXTEND),
        ),
      },
    ],
  }));

  useEffect(() => {
    let timeout: number;
    if (isActive) {
      timeout = setTimeout(() => {
        handleRemove();
      }, timeoutInMs);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [timeoutInMs, handleRemove, isActive]);

  return (
    <Animated.View
      style={[
        { position: "absolute", left: 0, right: 0, top: 0 },
        animatedStyle,
      ]}
    >
      <GestureDetector gesture={pan}>{children}</GestureDetector>
    </Animated.View>
  );
};
