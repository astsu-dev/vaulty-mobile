import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Language } from "../language";
import { useLangStore } from "../store/lang-store";
import { useLang } from "../use-lang";
import { languageToText } from "./language-to-text";
import { ValuePickerSheet } from "@/ui";

export type ChangeLanguageSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal>;
};

export function ChangeLanguageSheet({ sheetRef }: ChangeLanguageSheetProps) {
  const lang = useLang();
  const { language: selectedLanguage, setLanguage } = useLangStore();
  const languages = (
    Object.entries(languageToText).sort((a, b) => {
      if (a[1] < b[1]) return -1;
      if (a[1] > b[1]) return 1;
      return 0;
    }) as [Language, string][]
  ).map(([language, text]) => ({
    value: language,
    text,
  }));

  return (
    <ValuePickerSheet
      sheetRef={sheetRef}
      title={lang.changeLanguageSheet.title}
      value={selectedLanguage}
      values={languages}
      onChange={setLanguage}
    />
  );
}
