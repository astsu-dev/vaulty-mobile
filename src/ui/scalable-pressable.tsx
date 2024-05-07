import { ComponentProps } from "react";
import { GestureResponderEvent, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { EASING } from "./animation";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type ScalablePressableProps = ComponentProps<typeof Pressable>;

export function ScalablePressable({
  children,
  style,
  onPressIn,
  onPressOut,
  android_disableSound = true,
  ...props
}: ScalablePressableProps) {
  const scale = useSharedValue(1);

  const handleOnPressIn = (event: GestureResponderEvent) => {
    scale.value = 0.95;
    onPressIn?.(event);
  };

  const handleOnPressOut = (event: GestureResponderEvent) => {
    scale.value = 1;
    onPressOut?.(event);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(scale.value, {
          duration: 150,
          easing: EASING,
        }),
      },
    ],
  }));

  return (
    <AnimatedPressable
      android_disableSound={android_disableSound}
      unstable_pressDelay={5}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      style={[animatedStyle, style]}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
}
