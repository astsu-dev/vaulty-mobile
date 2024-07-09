import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import * as Clipboard from "expo-clipboard";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import { PasswordCreate } from "../store/password";
import { useCopyPassword, useCopyPasswordToRemote } from "../use-copy-password";
import { PasswordGeneratorUsePasswordSheet } from "./password-generator-use-password-sheet";
import { PasswordInput } from "./password-input";
import { useLang } from "@/modules/lang";
import {
  useCopyToRemote,
  useRemoteClipboardSettingsStore,
} from "@/modules/remote-clipboard";
import {
  Button,
  ComputerIcon,
  CopyIcon,
  DiceIcon,
  EmailIcon,
  LabelIcon,
  Labeled,
  LinkIcon,
  ScalablePressable,
  TextInput,
  UserIcon,
  useTheme,
} from "@/ui";

export type PasswordFormProps = {
  defaultValues: PasswordCreate;
  onSubmit: (values: PasswordCreate) => void;
  style?: StyleProp<ViewStyle>;
};

export function PasswordForm({
  defaultValues,
  onSubmit,
  style,
}: PasswordFormProps) {
  const { scale } = useTheme();
  const lang = useLang();
  const [values, setValues] = useState(defaultValues);
  const passwordGeneratorSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentPasswordGenerator = () => {
    passwordGeneratorSheetRef.current?.present();
  };
  const copyPassword = useCopyPassword();
  const copyToRemote = useCopyToRemote();
  const copyPasswordToRemote = useCopyPasswordToRemote();
  const { enabled: remoteClipboardEnabled } = useRemoteClipboardSettingsStore(
    (state) => ({ enabled: state.enabled }),
  );

  useEffect(() => {
    setValues(defaultValues);
  }, [defaultValues]);

  const onPasswordGenerated = (password: string) => {
    if (password !== values.password) {
      setValues((values) => ({ ...values, password }));
    }
  };

  const handleOnCopyPasswordPress = async () => {
    await copyPassword(values.password);
  };

  const handleOnCopyPasswordToRemotePress = async () => {
    await copyPasswordToRemote(values.password);
  };

  const handleOnCopyUsernamePress = () => {
    Clipboard.setStringAsync(values.username);
  };

  const handleOnCopyUsernameToRemotePress = async () => {
    await copyToRemote(values.username);
  };

  const handleOnCopyEmailPress = () => {
    Clipboard.setStringAsync(values.email);
  };

  const handleOnCopyEmailToRemotePress = async () => {
    await copyToRemote(values.email);
  };

  const handleOnCopyWebsitePress = () => {
    Clipboard.setStringAsync(values.website);
  };

  const handleOnCopyWebsiteToRemotePress = async () => {
    await copyToRemote(values.website);
  };

  const handleOnSubmitPress = () => {
    onSubmit(values);
  };

  return (
    <BottomSheetModalProvider>
      <ScrollView
        style={style}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            justifyContent: "space-between",
            gap: scale(32),
            flex: 1,
          }}
        >
          <View
            style={{
              gap: scale(10),
            }}
          >
            <Labeled label={lang.passwordForm.nameInput.label}>
              <TextInput
                value={values.name}
                onChangeText={(name) =>
                  setValues((values) => ({ ...values, name }))
                }
                placeholder={lang.passwordForm.nameInput.placeholder}
                leftIcon={<LabelIcon size="md" />}
              />
            </Labeled>
            <Labeled label={lang.passwordForm.passwordInput.label}>
              <PasswordInput
                value={values.password}
                onChangeText={(password) =>
                  setValues((values) => ({ ...values, password }))
                }
                rightActions={
                  <>
                    <ScalablePressable onPress={handlePresentPasswordGenerator}>
                      <DiceIcon size="md" />
                    </ScalablePressable>
                    <ScalablePressable onPress={handleOnCopyPasswordPress}>
                      <CopyIcon size="md" />
                    </ScalablePressable>
                    {remoteClipboardEnabled && (
                      <ScalablePressable
                        onPress={handleOnCopyPasswordToRemotePress}
                      >
                        <ComputerIcon size="md" />
                      </ScalablePressable>
                    )}
                  </>
                }
              />
            </Labeled>
            <Labeled label={lang.passwordForm.usernameInput.label}>
              <TextInput
                placeholder={lang.passwordForm.usernameInput.placeholder}
                value={values.username}
                onChangeText={(username) =>
                  setValues((values) => ({ ...values, username }))
                }
                leftIcon={<UserIcon size="md" />}
                rightActions={
                  <>
                    <ScalablePressable onPress={handleOnCopyUsernamePress}>
                      <CopyIcon size="md" />
                    </ScalablePressable>
                    {remoteClipboardEnabled && (
                      <ScalablePressable
                        onPress={handleOnCopyUsernameToRemotePress}
                      >
                        <ComputerIcon size="md" />
                      </ScalablePressable>
                    )}
                  </>
                }
              />
            </Labeled>
            <Labeled label={lang.passwordForm.emailInput.label}>
              <TextInput
                placeholder={lang.passwordForm.emailInput.placeholder}
                value={values.email}
                onChangeText={(email) =>
                  setValues((values) => ({ ...values, email }))
                }
                leftIcon={<EmailIcon size="md" />}
                rightActions={
                  <>
                    <ScalablePressable onPress={handleOnCopyEmailPress}>
                      <CopyIcon size="md" />
                    </ScalablePressable>
                    {remoteClipboardEnabled && (
                      <ScalablePressable
                        onPress={handleOnCopyEmailToRemotePress}
                      >
                        <ComputerIcon size="md" />
                      </ScalablePressable>
                    )}
                  </>
                }
              />
            </Labeled>
            <Labeled label={lang.passwordForm.websiteInput.label}>
              <TextInput
                placeholder={lang.passwordForm.websiteInput.placeholder}
                value={values.website}
                onChangeText={(website) =>
                  setValues((values) => ({ ...values, website }))
                }
                leftIcon={<LinkIcon size="md" />}
                rightActions={
                  <>
                    <ScalablePressable onPress={handleOnCopyWebsitePress}>
                      <CopyIcon size="md" />
                    </ScalablePressable>
                    {remoteClipboardEnabled && (
                      <ScalablePressable
                        onPress={handleOnCopyWebsiteToRemotePress}
                      >
                        <ComputerIcon size="md" />
                      </ScalablePressable>
                    )}
                  </>
                }
              />
            </Labeled>
            <Labeled label={lang.passwordForm.notesInput.label}>
              <TextInput
                placeholder={lang.passwordForm.notesInput.placeholder}
                value={values.notes}
                onChangeText={(notes) =>
                  setValues((values) => ({ ...values, notes }))
                }
                multiline
              />
            </Labeled>
          </View>
          <Button
            onPress={handleOnSubmitPress}
            text={lang.passwordForm.saveButton}
          />
        </View>
      </ScrollView>
      <PasswordGeneratorUsePasswordSheet
        sheetRef={passwordGeneratorSheetRef}
        onButtonPress={onPasswordGenerated}
      />
    </BottomSheetModalProvider>
  );
}
