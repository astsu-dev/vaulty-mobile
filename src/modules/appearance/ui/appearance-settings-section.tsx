import { useLang } from "@/modules/lang";
import { SettingsCard, SettingsSection } from "@/modules/settings";
import { MoonIcon, PhoneIcon, Switch, useTheme } from "@/ui";
import { useThemeStore } from "@/ui/theme";

export function AppearanceSettingsSection() {
  const lang = useLang();
  const { theme, setTheme } = useThemeStore();
  const { colorScheme } = useTheme();

  const handleOnChangeDarkMode = (enabled: boolean) => {
    if (enabled) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const handleOnChangeUseSystem = (enabled: boolean) => {
    setTheme(enabled ? "system" : colorScheme);
  };

  const handleOnPressDarkModeCard = () => {
    handleOnChangeDarkMode(colorScheme !== "dark");
  };

  const handleOnPressUseSystemCard = () => {
    handleOnChangeUseSystem(theme !== "system");
  };

  return (
    <SettingsSection label={lang.settings.appearanceSection.label}>
      <SettingsCard
        disabled={theme === "system"}
        text={lang.settings.appearanceSection.darkModeCardText}
        leftIcon={<MoonIcon size="md" />}
        rightAction={
          <Switch
            size="md"
            enabled={colorScheme === "dark"}
            onChange={handleOnChangeDarkMode}
            disabled={theme === "system"}
          />
        }
        onPress={handleOnPressDarkModeCard}
      />
      <SettingsCard
        text={lang.settings.appearanceSection.useSystemSettingsCardText}
        leftIcon={<PhoneIcon size="md" />}
        rightAction={
          <Switch
            size="md"
            enabled={theme === "system"}
            onChange={handleOnChangeUseSystem}
          />
        }
        onPress={handleOnPressUseSystemCard}
      />
    </SettingsSection>
  );
}
