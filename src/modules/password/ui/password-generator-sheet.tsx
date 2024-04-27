import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as Clipboard from "expo-clipboard";
import { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { generatePassword } from "../generate-password";
import { useLang } from "@/modules/lang";
import {
  BottomSheet,
  Button,
  CopyIcon,
  ScalablePressable,
  useTheme,
  Slider,
  Switch,
  SyncIcon,
  EASING,
} from "@/ui";

export type PasswordGeneratorSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal>;
};

export function PasswordGeneratorSheet({
  sheetRef,
}: PasswordGeneratorSheetProps) {
  const { colors, scale } = useTheme();
  const lang = useLang();

  const [length, setLength] = useState(12);
  const [hasUppercase, setHasUppercase] = useState(true);
  const [hasLowercase, setHasLowercase] = useState(true);
  const [hasDigits, setHasDigits] = useState(true);
  const [hasSymbols, setHasSymbols] = useState(true);

  const [password, setPassword] = useState("");

  const regeneratePassword = useCallback(() => {
    if (hasUppercase || hasLowercase || hasDigits || hasSymbols) {
      setPassword(
        generatePassword({
          length,
          hasUppercase,
          hasLowercase,
          hasDigits,
          hasSymbols,
        }),
      );
    }
  }, [length, hasUppercase, hasLowercase, hasDigits, hasSymbols]);

  useEffect(() => {
    regeneratePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnPressCopy = () => {
    Clipboard.setStringAsync(password);
    sheetRef.current?.close();
  };

  const passwordSharedValue = useSharedValue(0);
  const passwordAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: passwordSharedValue.value,
        },
      ],
    };
  });

  const rotateButtonSharedValue = useSharedValue(0);
  const rotateButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotateButtonSharedValue.value}deg`,
        },
      ],
    };
  });

  const shakePassword = () => {
    const offset = 20;
    const duration = 50;
    passwordSharedValue.value = withSequence(
      withTiming(offset, {
        duration: duration,
        easing: EASING,
      }),
      withRepeat(
        withTiming(-offset, {
          duration,
          easing: EASING,
        }),
        2,
        true,
      ),
      withTiming(0, { duration: duration * 3, easing: EASING }),
    );
  };

  const rotateButton = () => {
    rotateButtonSharedValue.value = withSequence(
      withTiming(360, {
        duration: 300,
        easing: EASING,
      }),
      withTiming(0, {
        duration: 0,
      }),
    );
  };

  const handleOnPressRegenerate = () => {
    shakePassword();
    rotateButton();
    regeneratePassword();
  };

  return (
    <BottomSheet bottomSheetModalRef={sheetRef}>
      <View
        style={{
          gap: scale(32),
        }}
      >
        <View
          style={{
            gap: scale(20),
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              gap: scale(12),
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Animated.Text
                style={[
                  {
                    fontSize: scale(24),
                    fontFamily: "Gilroy-Bold",
                    color: colors.text,
                  },
                  passwordAnimatedStyle,
                ]}
              >
                {password}
              </Animated.Text>
            </View>
            <ScalablePressable
              onPress={handleOnPressRegenerate}
              style={rotateButtonAnimatedStyle}
            >
              <SyncIcon />
            </ScalablePressable>
          </View>
          <View
            style={{
              gap: scale(8),
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: scale(16),
                paddingStart: scale(16),
              }}
            >
              <Text
                style={{
                  color: colors.subtext,
                  fontFamily: "Gilroy-SemiBold",
                  fontSize: scale(14),
                }}
              >
                {lang.passwordGeneratorSheet.lengthLabel}
              </Text>
              <Text
                style={{
                  color: colors.text,
                  fontFamily: "Gilroy-Bold",
                  fontSize: scale(14),
                  letterSpacing: scale(14) * 0.02,
                }}
              >
                {length}
              </Text>
            </View>
            <Slider
              min={4}
              max={24}
              step={1}
              value={length}
              onChange={setLength}
            />
          </View>
          <BooleanField
            label={lang.passwordGeneratorSheet.hasUpperCaseLabel}
            value={hasUppercase}
            onChange={setHasUppercase}
          />
          <BooleanField
            label={lang.passwordGeneratorSheet.hasLowerCaseLabel}
            value={hasLowercase}
            onChange={setHasLowercase}
          />
          <BooleanField
            label={lang.passwordGeneratorSheet.hasDigitsLabel}
            value={hasDigits}
            onChange={setHasDigits}
          />
          <BooleanField
            label={lang.passwordGeneratorSheet.hasSymbolsLabel}
            value={hasSymbols}
            onChange={setHasSymbols}
          />
        </View>
        <Button
          text={lang.passwordGeneratorSheet.copyButton}
          onPress={handleOnPressCopy}
          leftIcon={<CopyIcon size="md" color={colors.primary} />}
        />
      </View>
    </BottomSheet>
  );
}

function BooleanField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  const { colors, scale } = useTheme();

  const handleOnPress = () => {
    onChange(!value);
  };

  return (
    <Pressable
      style={{
        width: "100%",
        flexDirection: "row",
        gap: scale(16),
        alignItems: "center",
        justifyContent: "space-between",
      }}
      onPress={handleOnPress}
    >
      <Text
        style={{
          color: colors.subtext,
          fontFamily: "Gilroy-SemiBold",
          fontSize: scale(14),
        }}
      >
        {label}
      </Text>
      <Switch enabled={value} onChange={onChange} />
    </Pressable>
  );
}
