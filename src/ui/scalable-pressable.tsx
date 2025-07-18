import * as Haptics from "expo-haptics";
import { ImpactFeedbackStyle, NotificationFeedbackType } from "expo-haptics";
import { ComponentProps } from "react";
import { GestureResponderEvent, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { EASING } from "./animation";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type ScalablePressableProps = ComponentProps<typeof Pressable> & {
  /**
   * The default value is Medium. To disable set to null
   */
  impactFeedbackStyle?: ImpactFeedbackStyle | null;
  notificationFeedbackType?: NotificationFeedbackType;
};

export function ScalablePressable({
  children,
  style,
  onPressIn,
  onPressOut,
  onPress,
  notificationFeedbackType,
  android_disableSound = true,
  impactFeedbackStyle = ImpactFeedbackStyle.Light,
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

  const handleOnPress = (event: GestureResponderEvent) => {
    if (impactFeedbackStyle) {
      Haptics.impactAsync(impactFeedbackStyle);
    }
    if (notificationFeedbackType) {
      Haptics.notificationAsync(notificationFeedbackType);
    }
    onPress?.(event);
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
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      onPress={handleOnPress}
      style={[animatedStyle, style]}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
}
