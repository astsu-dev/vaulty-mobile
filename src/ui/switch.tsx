import { useCallback, useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "./theme";

export type SwitchProps = {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
};

const easingFn = Easing.bezier(0.4, 0, 0.2, 1);

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Switch({ enabled, onChange, disabled = false }: SwitchProps) {
  const { colors, scale: themeScale } = useTheme();
  const scale = useCallback(
    // Scale here to keep consistensy with size values from Figma design
    (value: number) => themeScale(value) * 1.25,
    [themeScale],
  );

  const handleOnPress = () => {
    if (!disabled) {
      onChange(!enabled);
    }
  };

  const backgroundSharedValue = useDerivedValue(() => {
    return withTiming(+enabled, {
      duration: 150,
      easing: easingFn,
    });
  }, [enabled]);

  const transformSharedValue = useSharedValue(0);

  useEffect(() => {
    if (enabled) {
      transformSharedValue.value = scale(20);
    } else {
      transformSharedValue.value = 0;
    }
  }, [enabled, scale, transformSharedValue]);

  const backgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        backgroundSharedValue.value,
        [0, 1],
        [colors.subtext2, colors.text],
        "RGB",
      ),
    };
  });

  const transformStyle = useAnimatedStyle(() => {
    return {
      translateX: withTiming(transformSharedValue.value, {
        duration: 150,
        easing: easingFn,
      }),
    };
  });

  return (
    <AnimatedPressable
      style={[
        {
          width: scale(48),
          height: scale(28),
          borderRadius: scale(14),
          justifyContent: "center",
          paddingHorizontal: scale(3),
        },
        backgroundStyle,
      ]}
      onPress={handleOnPress}
    >
      <Animated.View
        style={[
          {
            width: scale(22),
            height: scale(22),
            borderRadius: scale(11),
            backgroundColor: colors.primary,
          },
          transformStyle,
        ]}
      />
    </AnimatedPressable>
  );
}
