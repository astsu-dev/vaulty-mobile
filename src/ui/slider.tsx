import { Slider as ExternalSlider } from "@miblanchard/react-native-slider";
import { ViewStyle } from "react-native";
import { useTheme } from "./theme";

export type SliderProps = {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  style?: ViewStyle;
};

export function Slider({
  min,
  max,
  step,
  value,
  onChange,
  style,
}: SliderProps) {
  const { colors, scale } = useTheme();

  return (
    <ExternalSlider
      minimumValue={min}
      maximumValue={max}
      step={step}
      value={value}
      // TODO: Fix by changing type declaration in react-native-slider
      onValueChange={onChange as unknown as (value: number[]) => void}
      containerStyle={style}
      thumbStyle={{
        width: scale(30),
        height: scale(30),
        backgroundColor: colors.primary,
        borderWidth: scale(4.5),
        borderColor: colors.text,
        borderRadius: scale(30) / 2,
      }}
      trackStyle={{
        height: scale(12),
        borderRadius: scale(12) / 2,
        backgroundColor: colors.secondary,
      }}
      minimumTrackStyle={{
        backgroundColor: colors.text,
      }}
      maximumTrackStyle={{
        backgroundColor: colors.secondary,
      }}
    />
  );
}
