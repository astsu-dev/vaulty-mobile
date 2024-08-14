import * as React from "react";
import { Path } from "react-native-svg";
import { useTheme } from "../theme";
import { BaseIcon, BaseIconProps } from "./base-icon";

export function SeedingIcon({ color, ...props }: BaseIconProps) {
  const { colors } = useTheme();
  color = color ?? colors.text;

  return (
    <BaseIcon {...props}>
      <Path
        clipRule="evenodd"
        d="M6.667 9.901c.137 1.94.81 3.803 1.945 5.383.37.468.813.874 1.313 1.2a5.23 5.23 0 001.644.601 9.252 9.252 0 005.402-.917 10.503 10.503 0 00-1.944-5.388 5.499 5.499 0 00-1.314-1.2 5.233 5.233 0 00-1.644-.598 9.252 9.252 0 00-5.403.92z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.972 6.501a1 1 0 10-2 0h2zm-2 5.44a1 1 0 002 0h-2zm0 14.744a1 1 0 002 0h-2zm2-14.744a1 1 0 10-2 0h2zm-.875 1.284a1 1 0 10-.25 1.984l.25-1.984zm4.983.127l.445.895.032-.016-.477-.88zm1.398-1.048l.71.703.036-.037-.746-.666zm.988-1.486l.902.431c.005-.01.01-.02.013-.03l-.915-.4zm.82-5.416l.993-.112a1 1 0 00-.87-.88l-.123.992zm-5.108.871l-.446-.895-.03.016.476.879zM18.78 7.321l-.71-.703a1.104 1.104 0 00-.035.036l.745.667zm-.988 1.481l-.902-.432-.004.01.906.422zm-1.816 3.064a1 1 0 101.995.15l-1.995-.15zm-.004-5.365v5.44h2v-5.44h-2zm2 20.184V11.941h-2v14.744h2zm-1.125-11.476a9.97 9.97 0 005.678-.962l-.89-1.791a7.97 7.97 0 01-4.538.769l-.25 1.984zm5.71-.978a6.962 6.962 0 001.631-1.224L22.767 11.6c-.343.346-.735.64-1.163.872l.953 1.759zm1.667-1.261a7.313 7.313 0 001.144-1.721l-1.805-.861a5.31 5.31 0 01-.831 1.25l1.492 1.332zm1.157-1.75a11.542 11.542 0 00.898-5.93l-1.987.225a9.542 9.542 0 01-.742 4.902l1.831.803zm.028-6.81a9.97 9.97 0 00-5.677.968l.891 1.79a7.97 7.97 0 014.539-.773l.247-1.985zm-5.708.984a6.963 6.963 0 00-1.632 1.224l1.422 1.406c.343-.346.735-.64 1.163-.872L19.7 5.394zm-1.666 1.26A7.311 7.311 0 0016.89 8.37l1.804.864c.217-.452.497-.872.832-1.246l-1.491-1.334zm-1.15 1.726a10.029 10.029 0 00-.909 3.486l1.995.15a8.031 8.031 0 01.728-2.792l-1.813-.844z"
        fill={color}
      />
    </BaseIcon>
  );
}
