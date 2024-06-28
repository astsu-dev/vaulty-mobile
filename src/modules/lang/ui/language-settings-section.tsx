import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useLangStore } from "../store/lang-store";
import { useLang } from "../use-lang";
import { languageToText } from "./language-to-text";
import { SettingsCard, SettingsSection } from "@/modules/settings";
import { GlobeIcon } from "@/ui";

export type LanguageSettingsSectionProps = {
  sheetRef: React.RefObject<BottomSheetModal>;
};

export function LanguageSettingsSection({
  sheetRef,
}: LanguageSettingsSectionProps) {
  const lang = useLang();
  const { language: selectedLanguage } = useLangStore();
  const selectedLanguageText = languageToText[selectedLanguage];

  return (
    <SettingsSection label={lang.settings.languageSection.label}>
      <SettingsCard
        leftIcon={<GlobeIcon size="md" />}
        text={selectedLanguageText}
        onPress={() => sheetRef.current?.present()}
      />
    </SettingsSection>
  );
}
