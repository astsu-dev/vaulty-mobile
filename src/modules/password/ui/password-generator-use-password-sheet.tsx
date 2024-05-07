import {
  PasswordGeneratorSheet,
  PasswordGeneratorSheetProps,
} from "./password-generator-sheet";
import { useLang } from "@/modules/lang";

export type PasswordGeneratorUsePasswordSheetProps = Pick<
  PasswordGeneratorSheetProps,
  "sheetRef" | "onButtonPress"
>;

export function PasswordGeneratorUsePasswordSheet({
  sheetRef,
  onButtonPress,
}: PasswordGeneratorUsePasswordSheetProps) {
  const lang = useLang();

  return (
    <PasswordGeneratorSheet
      sheetRef={sheetRef}
      buttonText={lang.passwordGeneratorSheet.usePasswordButton}
      onButtonPress={onButtonPress}
    />
  );
}
