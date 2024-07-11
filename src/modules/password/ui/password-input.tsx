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

export function PasswordInput({
  rightActions,
  disabled,
  ...props
}: PasswordInputProps) {
  const lang = useLang();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <TextInput
      secureTextEntry={secureTextEntry}
      placeholder={lang.passwordInput.placeholder}
      autoCapitalize="none"
      leftIcon={<KeyIcon size="md" />}
      rightActions={
        <>
          {secureTextEntry ? (
            <ScalablePressable
              onPress={() => setSecureTextEntry(false)}
              disabled={disabled}
            >
              <EyeSlashedIcon size="md" />
            </ScalablePressable>
          ) : (
            <ScalablePressable
              onPress={() => setSecureTextEntry(true)}
              disabled={disabled}
            >
              <EyeIcon size="md" />
            </ScalablePressable>
          )}
          {rightActions}
        </>
      }
      disabled={disabled}
      {...props}
    />
  );
}
