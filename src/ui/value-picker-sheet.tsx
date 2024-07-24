import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { View, Text } from "react-native";
import { BottomSheet } from "./bottom-sheet";
import { CheckmarkIcon } from "./icons";
import { ScalablePressable } from "./scalable-pressable";
import { useTheme } from "./theme";

export type ValuePickerValue<T> = {
  value: T;
  text: string;
};

export type ValuePickerSheetProps<T> = {
  sheetRef: React.RefObject<BottomSheetModal>;
  title: string;
  value: T;
  values: ValuePickerValue<T>[];
  onChange: (value: T) => void;
  closeOnChange?: boolean;
};

export function ValuePickerSheet<T>({
  sheetRef,
  title,
  value: selectedValue,
  values,
  onChange,
  closeOnChange = true,
}: ValuePickerSheetProps<T>) {
  const { colors, scale } = useTheme();

  const handleOnChangeValue = async (value: T) => {
    onChange(value);
    if (closeOnChange) {
      // FIX: Sleep for a short time because the bottom sheet will reopen
      // if closed immediately because of language re-rendering. It is a workaround.
      await new Promise((resolve) => setTimeout(resolve, 20));
      sheetRef.current?.close();
    }
  };

  return (
    <BottomSheet bottomSheetModalRef={sheetRef}>
      <View
        style={{
          gap: scale(24),
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Gilroy-Bold",
            fontSize: scale(20),
            color: colors.text,
          }}
        >
          {title}
        </Text>
        <View
          style={{
            gap: scale(10),
          }}
        >
          {values.map(({ value, text }) => (
            <ScalablePressable
              key={String(value)}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderRadius: scale(16),
                backgroundColor: colors.secondary,
                gap: scale(16),
                paddingHorizontal: scale(20),
                paddingVertical: scale(16),
                width: "100%",
              }}
              onPress={() => handleOnChangeValue(value)}
            >
              <Text
                style={{
                  fontFamily: "Gilroy-SemiBold",
                  fontSize: scale(16),
                  color: colors.text,
                }}
              >
                {text}
              </Text>
              <CheckmarkIcon
                size="md"
                style={{
                  opacity: selectedValue === value ? 1 : 0,
                }}
              />
            </ScalablePressable>
          ))}
        </View>
      </View>
    </BottomSheet>
  );
}
