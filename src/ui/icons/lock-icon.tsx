import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function LockIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        clipRule="evenodd"
        d="M17.7 25.333h-5.5c-2.47-.043-4.44-2.132-4.4-4.666V16c-.022-2.098 1.33-3.951 3.3-4.52v-.613c-.066-2.25 1.657-4.13 3.85-4.2 2.194.07 3.917 1.95 3.851 4.2v.613c1.97.569 3.322 2.422 3.3 4.52v4.667c.04 2.534-1.93 4.623-4.401 4.666z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.95 20.667a1 1 0 102 0h-2zm2-2.334a1 1 0 00-2 0h2zm2.588-5.888a1 1 0 00.526-1.93l-.526 1.93zm-7.7-1.93a1 1 0 10.526 1.93l-.525-1.93zm5.113 10.152v-2.334h-2v2.334h2zm3.113-10.152a5.167 5.167 0 00-1.363-.182v2c.282 0 .564.037.837.112l.526-1.93zm-1.363-.182h-5.5v2h5.5v-2zm-5.5 0c-.46 0-.918.061-1.362.182l.525 1.93c.273-.075.554-.112.836-.112l.001-2z"
        fill={color}
      />
    </BaseIcon>
  );
}
