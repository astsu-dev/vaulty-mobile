import { PropsWithChildren } from "react";
import { View } from "react-native";
import { Labeled, useTheme } from "@/ui";

type SettingsSectionProps = PropsWithChildren & {
  label: string;
};

export function SettingsSection({ label, children }: SettingsSectionProps) {
  const { scale } = useTheme();
  return (
    <Labeled label={label} gap={6}>
      <View style={{ gap: scale(6) }}>{children}</View>
    </Labeled>
  );
}
