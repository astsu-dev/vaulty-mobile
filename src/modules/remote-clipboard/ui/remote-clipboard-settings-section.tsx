import { useLang } from "@/modules/lang";
import { SettingsCard, SettingsSection } from "@/modules/settings";
import { ComputerIcon } from "@/ui";

export type RemoteClipboardSettingsSectionProps = {
  onPressRemoteClipboardSettingsCard: () => void;
};

export function RemoteClipboardSettingsSection({
  onPressRemoteClipboardSettingsCard,
}: RemoteClipboardSettingsSectionProps) {
  const lang = useLang();

  return (
    <SettingsSection label={lang.settings.remoteClipboardSection.label}>
      <SettingsCard
        leftIcon={<ComputerIcon size="md" />}
        text={
          lang.settings.remoteClipboardSection.remoteClipboardSettingsCardText
        }
        onPress={onPressRemoteClipboardSettingsCard}
      />
    </SettingsSection>
  );
}
