import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { View, Text } from "react-native";
import { useDeleteVault } from "../vault-hooks";
import { useLang } from "@/modules/lang";
import { BottomSheet, Button, useTheme } from "@/ui";

export type DeleteVaultSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal>;
  onDelete?: () => void;
};

export function DeleteVaultSheet({
  sheetRef,
  onDelete,
}: DeleteVaultSheetProps) {
  const { colors, scale } = useTheme();
  const lang = useLang();
  const deleteVault = useDeleteVault();

  const handleOnPressDelete = async () => {
    deleteVault();
    sheetRef.current?.close();
    onDelete?.();
  };

  return (
    <BottomSheet bottomSheetModalRef={sheetRef}>
      <View
        style={{
          gap: scale(24),
          alignItems: "center",
        }}
      >
        <View
          style={{
            gap: scale(12),
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Gilroy-Bold",
              fontSize: scale(20),
              color: colors.text,
            }}
          >
            {lang.deleteVaultSheet.title}
          </Text>
          <Text
            style={{
              fontFamily: "Gilroy-Medium",
              fontSize: scale(14),
              lineHeight: scale(14 * 1.4),
              textAlign: "center",
              color: colors.subtext,
            }}
          >
            {lang.deleteVaultSheet.cautionFirstLine}
            {"\n"}
            {lang.deleteVaultSheet.cautionSecondLine}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: scale(8),
          }}
        >
          <Button
            text={lang.deleteVaultSheet.cancelButton}
            variant="secondary"
            onPress={() => sheetRef.current?.close()}
            style={{
              flex: 1,
            }}
          />
          <Button
            text={lang.deleteVaultSheet.deleteButton}
            variant="danger"
            onPress={handleOnPressDelete}
            style={{
              flex: 1,
            }}
          />
        </View>
      </View>
    </BottomSheet>
  );
}
