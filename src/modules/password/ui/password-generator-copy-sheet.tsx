import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import {
  PasswordGeneratorSheet,
  PasswordGeneratorSheetProps,
} from "./password-generator-sheet";
import { useLang } from "@/modules/lang";
import { CopyIcon, useTheme } from "@/ui";

export type PasswordGeneratorCopySheetProps = Pick<
  PasswordGeneratorSheetProps,
  "sheetRef"
>;

export function PasswordGeneratorCopySheet({
  sheetRef,
}: PasswordGeneratorCopySheetProps) {
  const { colors } = useTheme();
  const lang = useLang();

  const onButtonPress = (password: string) => {
    Clipboard.setStringAsync(password);
    Toast.show({
      type: "neutral",
      text1: lang.copyToast.copied,
    });
  };

  return (
    <PasswordGeneratorSheet
      sheetRef={sheetRef}
      buttonText={lang.passwordGeneratorSheet.copyButton}
      buttonLeftIcon={<CopyIcon size="md" color={colors.primary} />}
      onButtonPress={onButtonPress}
    />
  );
}
