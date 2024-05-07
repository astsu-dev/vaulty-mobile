import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "./theme";

export type TextInputProps = RNTextInputProps & {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode;
  rightActions?: React.ReactNode;
  insideSheet?: boolean;
};

export function TextInput({
  containerStyle,
  leftIcon,
  rightActions,
  style,
  insideSheet,
  multiline,
  ...props
}: TextInputProps) {
  const { colors, scale } = useTheme();
  const internalInputRef = useRef<RNTextInput>(null);

  const handleOnPress = () => {
    internalInputRef.current?.focus();
  };

  const TextInputComponent = insideSheet ? BottomSheetTextInput : RNTextInput;

  return (
    <Pressable
      android_disableSound
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: scale(8),
          paddingHorizontal: scale(16),
          paddingVertical: scale(12),
          backgroundColor: colors.secondary,
          borderRadius: scale(16),
        },
        containerStyle,
      ]}
      onPress={handleOnPress}
    >
      {leftIcon}
      <TextInputComponent
        // @ts-expect-error BottomSheetTextInput props are not fully compatible with RNTextInput
        ref={internalInputRef}
        style={[
          {
            flex: 1,
            fontFamily: "Gilroy-SemiBold",
            fontSize: scale(14),
            color: colors.text,
            lineHeight: multiline ? scale(14 * 1.4) : undefined,
          },
          style,
        ]}
        placeholderTextColor={colors.subtext}
        multiline={multiline}
        {...props}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: scale(8),
        }}
      >
        {rightActions}
      </View>
    </Pressable>
  );
}
