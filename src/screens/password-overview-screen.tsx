import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useRef } from "react";
import { RootStackParamList } from "./root-stack-param-list";
import { ScreenLayout } from "./screen-layout";
import { useLang } from "@/modules/lang";
import {
  DeletePasswordSheet,
  PasswordCreate,
  PasswordForm,
  usePasswordStore,
} from "@/modules/password";
import { ScalablePressable, TrashIcon } from "@/ui";

export function PasswordOverviewScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "PasswordOverview">) {
  const lang = useLang();
  const { getPassword, updatePassword } = usePasswordStore((state) => ({
    getPassword: state.getPassword,
    updatePassword: state.updatePassword,
  }));
  const defaultValues = useMemo(
    () => getPassword(route.params.id)!,
    [getPassword, route.params.id],
  );
  const deletePasswordSheetRef = useRef<BottomSheetModal>(null);

  const handleOnPresentDeletePasswordSheetPress = () => {
    deletePasswordSheetRef.current?.present();
  };

  const handleOnDeletePress = () => {
    navigation.navigate("MyPasswords");
  };

  const onSubmit = (password: PasswordCreate) => {
    updatePassword(route.params.id, password);
    navigation.navigate("MyPasswords");
  };

  return (
    <BottomSheetModalProvider>
      <ScreenLayout
        header={{
          title: lang.passwordOverviewScreen.headerTitle,
          separator: true,
          backButton: true,
          rightButtons: (
            <ScalablePressable
              onPress={handleOnPresentDeletePasswordSheetPress}
            >
              <TrashIcon />
            </ScalablePressable>
          ),
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
      <DeletePasswordSheet
        sheetRef={deletePasswordSheetRef}
        passwordId={route.params.id}
        onDelete={handleOnDeletePress}
      />
    </BottomSheetModalProvider>
  );
}
