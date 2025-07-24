import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { RootStackParamList } from "./root-stack-param-list";
import { usePasswordStoreContainerStore } from "@/modules/password";
import { useVaultMetadataStore } from "@/modules/vault";

export function VaultLocker() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { passwordStore } = usePasswordStoreContainerStore();
  const { testString } = useVaultMetadataStore();

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
