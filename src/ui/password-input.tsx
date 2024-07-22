import { useState } from "react";
import { EyeIcon, EyeSlashedIcon, KeyIcon } from "./icons";
import { ScalablePressable } from "./scalable-pressable";
import { TextInput, TextInputProps } from "./text-input";

export type PasswordInputProps = Omit<TextInputProps, "secureTextEntry">;

export function PasswordInput({
  rightActions,
  disabled,
  autoCapitalize = "none",
  ...props
}: PasswordInputProps) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <TextInput
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
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
