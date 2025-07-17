import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { AppState } from "react-native";
import { RootStackParamList } from "./root-stack-param-list";
import { usePasswordStoreContainerStore } from "@/modules/password";
import { useLockVault, useVaultMetadataStore } from "@/modules/vault";

export function VaultLocker() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const lockVault = useLockVault();
  const { passwordStore } = usePasswordStoreContainerStore();
  const { testString } = useVaultMetadataStore();

  useEffect(() => {
    console.log("Subscribe to change event");
    AppState.addEventListener("change", (nextState) => {
      console.log("Handle change event:", nextState);
      if (nextState === "background") {
        lockVault();
      }
    });
  }, [lockVault, navigation]);

  useEffect(() => {
    if (testString && passwordStore === null) {
      navigation.reset({
        index: 0,
        routes: [{ name: "UnlockVault" }],
      });
    }
  }, [navigation, passwordStore, testString]);

  return <></>;
}
