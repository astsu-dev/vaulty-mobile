import { useLang } from "@/modules/lang";
import { SettingsCard } from "@/modules/settings";
import { KeyIcon } from "@/ui/icons";

type ChangePasswordSettingsCardProps = {
  onChangePasswordPress: () => void;
};

export function ChangePasswordSettingsCard({
  onChangePasswordPress,
}: ChangePasswordSettingsCardProps) {
  const lang = useLang();

  return (
    <SettingsCard
      text={lang.settings.authSection.changePasswordCardText}
      leftIcon={<KeyIcon size="md" />}
      onPress={onChangePasswordPress}
    />
  );
}
