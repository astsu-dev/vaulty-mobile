import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { RootStackParamList } from "./root-stack-param-list";
import { ScreenLayout } from "./screen-layout";
import { useLang } from "@/modules/lang";
import {
  PasswordCreate,
  PasswordForm,
  usePasswordStore,
} from "@/modules/password";
import { generatePassword } from "@/modules/password/generate-password";

export function AddPasswordScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "AddPassword">) {
  const lang = useLang();
  const { addPassword } = usePasswordStore((state) => ({
    addPassword: state.addPassword,
  }));
  const defaultPassword = useMemo(
    () =>
      generatePassword({
        length: 12,
        hasUppercase: true,
        hasLowercase: true,
        hasDigits: true,
        hasSymbols: true,
      }),
    [],
  );
  const defaultValues: PasswordCreate = {
    name: "",
    password: defaultPassword,
    username: "",
    email: "",
    website: "",
    notes: "",
  };

  const onSubmit = (password: PasswordCreate) => {
    addPassword(password);
    navigation.navigate("MyPasswords");
  };

  return (
    <ScreenLayout
      header={{
        title: lang.addPasswordScreen.headerTitle,
        separator: true,
        backButton: true,
      }}
    >
      <PasswordForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        style={{
          flex: 1,
        }}
      />
    </ScreenLayout>
  );
}
