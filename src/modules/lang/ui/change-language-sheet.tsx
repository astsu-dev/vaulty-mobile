import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { View, Text } from "react-native";
import { Language } from "../language";
import { useLangStore } from "../store/lang-store";
import { useLang } from "../use-lang";
import { languageToText } from "./language-to-text";
import { BottomSheet, CheckmarkIcon, ScalablePressable, useTheme } from "@/ui";

export type ChangeLanguageSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal>;
};

export function ChangeLanguageSheet({ sheetRef }: ChangeLanguageSheetProps) {
  const { colors, scale } = useTheme();
  const lang = useLang();
  const { language: selectedLanguage, setLanguage } = useLangStore();
  const languages = Object.entries(languageToText).sort() as [
    Language,
    string,
  ][];

  const handleOnPressLanguage = async (language: Language) => {
    setLanguage(language);
    // FIX: Sleep for a short time because the bottom sheet will reopen
    // if closed immediately because of language re-rendering. It is a workaround.
    await new Promise((resolve) => setTimeout(resolve, 20));
    sheetRef.current?.close();
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
          {lang.changeLanguageSheet.title}
        </Text>
        <View
          style={{
            gap: scale(10),
          }}
        >
          {languages.map(([language, text]) => (
            <ScalablePressable
              key={language}
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
              onPress={() => handleOnPressLanguage(language)}
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
                  opacity: selectedLanguage === language ? 1 : 0,
                }}
              />
            </ScalablePressable>
          ))}
        </View>
      </View>
    </BottomSheet>
  );
}
