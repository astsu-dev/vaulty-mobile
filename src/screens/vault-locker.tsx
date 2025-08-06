import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { AppState, Platform } from "react-native";
import { RootStackParamList } from "./root-stack-param-list";
import { useLockVault } from "@/modules/vault";

export function VaultLocker() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const lockVault = useLockVault();

  useEffect(() => {
    if (Platform.OS === "ios") {
      const sub = AppState.addEventListener("change", (nextState) => {
        if (nextState === "background") {
          lockVault();
          navigation.reset({
            index: 0,
            routes: [{ name: "UnlockVault", params: { skipBiometric: true } }],
          });
        }
      });
      return sub.remove;
    }
  }, [lockVault, navigation]);

  return <></>;
}
