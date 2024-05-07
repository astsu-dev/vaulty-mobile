import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function EyeSlashedIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        fill={color}
        d="M16 12.517a.96.96 0 1 0 0-1.92v1.92ZM9.967 22.47a.96.96 0 1 0 .866-1.714l-.866 1.714Zm5.073-10.913a.96.96 0 1 0 1.92 0h-1.92Zm1.92-4.517a.96.96 0 1 0-1.92 0h1.92Zm-.963 3.557a.96.96 0 0 0 .006 1.92l-.006-1.92Zm3.296 2.346a.96.96 0 0 0 .495-1.855l-.495 1.855ZM9.02 8.873a.96.96 0 0 0-1.72.853l1.72-.853Zm.122 4.565a.96.96 0 1 0 1.72-.853l-1.72.853Zm.552 12.152a.96.96 0 0 0 1.412 1.3l-1.412-1.3Zm4.708-2.277a.96.96 0 1 0-1.412-1.301l1.412 1.301Zm11.264-12.234a.96.96 0 0 0-1.412-1.301l1.412 1.3Zm-3.998 1.507a.96.96 0 0 0 1.413 1.3l-1.413-1.3Zm-8.678 9.426a.96.96 0 0 0 1.412 1.301l-1.412-1.301Zm3.778-2.684.706.65h.001l-.707-.65Zm6.313-5.441a.96.96 0 1 0-1.413-1.3l1.413 1.3Zm-9.227 7.828a.96.96 0 1 0-.315 1.894l.315-1.894Zm11.106-4.51h.96c0-.023 0-.046-.002-.069l-.958.069Zm-2.136-4.817a.96.96 0 1 0-.899 1.697l.899-1.697Zm-9.42 6.705a.96.96 0 0 0 1.557-1.123l-1.557 1.123ZM16 14.945l-.001-.96h-.007l.008.96Zm.67 1.152a.96.96 0 1 0 1.018-1.627l-1.019 1.627Zm-.67-5.5c-2.627 0-5.05.67-6.847 1.802-1.785 1.125-3.073 2.8-3.073 4.806H8c0-1.114.718-2.263 2.176-3.182 1.446-.91 3.502-1.506 5.824-1.506v-1.92Zm-9.92 6.608c0 2.295 1.677 4.148 3.887 5.265l.866-1.714C8.948 19.804 8 18.476 8 17.205H6.08Zm10.88-5.648V7.04h-1.92v4.517h1.92Zm-.957.96c1.11-.003 2.217.14 3.29.426l.495-1.855a14.53 14.53 0 0 0-3.791-.49l.006 1.92ZM7.3 9.726l1.842 3.712 1.72-.853L9.02 8.873l-1.72.853Zm3.806 17.165 3.296-3.578-1.412-1.301-3.296 3.578 1.412 1.3ZM24.254 9.778l-2.586 2.808 1.413 1.3 2.585-2.807-1.412-1.301Zm-9.852 13.535 3.072-3.334-1.412-1.301-3.072 3.334 1.412 1.301Zm3.073-3.335 1.389-1.512-1.413-1.3-1.39 1.513 1.414 1.299Zm1.389-1.512 4.217-4.58-1.413-1.3-4.217 4.58 1.413 1.3Zm-5.325 5.143c.813.136 1.637.204 2.462.203v-1.92c-.72 0-1.438-.059-2.148-.177l-.314 1.894Zm2.462.203c2.627 0 5.05-.67 6.847-1.802 1.784-1.125 3.072-2.8 3.072-4.805H24c0 1.113-.718 2.262-2.176 3.18-1.446.912-3.502 1.507-5.824 1.507v1.92Zm9.917-6.676a5.842 5.842 0 0 0-3.094-4.748l-.899 1.697a3.922 3.922 0 0 1 2.078 3.188l1.915-.137Zm-10.957.834a1.303 1.303 0 0 1-.105-1.35l-1.713-.869a3.223 3.223 0 0 0 .26 3.342l1.558-1.123Zm-.105-1.35c.22-.435.665-.71 1.152-.715l-.016-1.92a3.223 3.223 0 0 0-2.849 1.766l1.713.868ZM16 15.904c.236 0 .468.066.668.192l1.02-1.627a3.175 3.175 0 0 0-1.69-.485l.002 1.92Z"
      />
    </BaseIcon>
  );
}
