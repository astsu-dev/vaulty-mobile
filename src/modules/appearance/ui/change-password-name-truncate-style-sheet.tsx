import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  PasswordNameTruncateStyle,
  useAppearanceSettingsStore,
} from "../store/appearance-settings-store";
import { useLang } from "@/modules/lang";
import { ValuePickerSheet, ValuePickerValue } from "@/ui";

export type ChangePasswordNameTruncateStyleSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal>;
};

export function ChangePasswordNameTruncateStyleSheet({
  sheetRef,
}: ChangePasswordNameTruncateStyleSheetProps) {
  const lang = useLang();
  const { passwordNameTruncateStyle, setPasswordNameTruncateStyle } =
    useAppearanceSettingsStore((state) => ({
      passwordNameTruncateStyle: state.passwordNameTruncateStyle,
      setPasswordNameTruncateStyle: state.setPasswordNameTruncateStyle,
    }));
  const values: ValuePickerValue<PasswordNameTruncateStyle>[] = [
    {
      value: PasswordNameTruncateStyle.FROM_LEFT,
      text: lang.changePasswordNameTruncateStyleSheet.fromLeftValue,
    },
    {
      value: PasswordNameTruncateStyle.FROM_RIGHT,
      text: lang.changePasswordNameTruncateStyleSheet.fromRightValue,
    },
  ];

  return (
    <ValuePickerSheet
      sheetRef={sheetRef}
      title={lang.changePasswordNameTruncateStyleSheet.title}
      value={passwordNameTruncateStyle}
      values={values}
      onChange={setPasswordNameTruncateStyle}
    />
  );
}
