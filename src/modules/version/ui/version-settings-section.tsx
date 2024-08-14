import * as Application from "expo-application";
import { Linking } from "react-native";
import { useLang } from "@/modules/lang";
import { SettingsCard, SettingsSection } from "@/modules/settings";
import { CodeCompareIcon, GithubIcon } from "@/ui";

export function VersionSettingsSection() {
  const lang = useLang();

  const version = Application.nativeApplicationVersion as string;
  if (version === null) {
    throw new Error(
      "This platform does not support getting the application version.",
    );
  }

  const handleOnPressGithubCard = async () => {
    await Linking.openURL(lang.settings.versionSection.githubLink);
  };

  return (
    <SettingsSection label={lang.settings.versionSection.label}>
      <SettingsCard
        leftIcon={<CodeCompareIcon size="md" />}
        text={`v${version}`}
      />
      <SettingsCard
        leftIcon={<GithubIcon size="md" />}
        text={lang.settings.versionSection.githubCardText}
        onPress={handleOnPressGithubCard}
      />
    </SettingsSection>
  );
}
