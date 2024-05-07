import { useState } from "react";
import { useLang } from "@/modules/lang";
import {
  EyeIcon,
  EyeSlashedIcon,
  KeyIcon,
  ScalablePressable,
  TextInput,
  TextInputProps,
} from "@/ui";

export type PasswordInputProps = Omit<TextInputProps, "secureTextEntry">;

export function PasswordInput({ rightActions, ...props }: PasswordInputProps) {
  const lang = useLang();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <TextInput
      secureTextEntry={secureTextEntry}
      placeholder={lang.passwordInput.placeholder}
      leftIcon={<KeyIcon size="md" />}
      rightActions={
        <>
          {secureTextEntry ? (
            <ScalablePressable onPress={() => setSecureTextEntry(false)}>
              <EyeSlashedIcon size="md" />
            </ScalablePressable>
          ) : (
            <ScalablePressable onPress={() => setSecureTextEntry(true)}>
              <EyeIcon size="md" />
            </ScalablePressable>
          )}
          {rightActions}
        </>
      }
      {...props}
    />
  );
}
