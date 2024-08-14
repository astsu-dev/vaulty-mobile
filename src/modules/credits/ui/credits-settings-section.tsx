import { Linking } from "react-native";
import { useLang } from "@/modules/lang";
import { SettingsCard, SettingsSection } from "@/modules/settings";
import { SeedingIcon } from "@/ui";

export function CreditsSettingsSection() {
  const lang = useLang();

  const handleOnPressIconPackCard = async () => {
    await Linking.openURL(lang.settings.creditsSection.iconPackLink);
  };

  return (
    <SettingsSection label={lang.settings.creditsSection.label}>
      <SettingsCard
        leftIcon={<SeedingIcon size="md" />}
        text={lang.settings.creditsSection.iconPackCardText}
        onPress={handleOnPressIconPackCard}
      />
    </SettingsSection>
  );
}
