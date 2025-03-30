import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function FingerprintIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        d="M16 13.778A2.222 2.222 0 0013.778 16c0 1.133-.112 2.789-.29 4.444M18.222 17.244c0 2.645 0 7.09-1.11 9.867M21.877 26.022c.134-.666.478-2.555.556-3.355M4.889 16a11.111 11.111 0 0120-6.667M4.889 20.444h.01M26.889 20.444c.222-2.222.145-5.949 0-6.666"
        stroke={color}
        strokeWidth={2.22222}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.222 24.333c.556-1.666 1.111-5 1.111-8.333a6.667 6.667 0 01.378-2.222M12.277 27.111c.234-.733.5-1.466.634-2.222M12.666 10.222a6.666 6.666 0 0110 5.778v2.222"
        stroke={color}
        strokeWidth={2.22222}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}
