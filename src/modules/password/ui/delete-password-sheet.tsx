import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { View, Text } from "react-native";
import { usePasswordStore } from "../store/use-password-store";
import { useLang } from "@/modules/lang";
import { BottomSheet, Button, useTheme } from "@/ui";

export type DeleteVaultSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal>;
  passwordId: string;
  onDelete?: () => void;
};

export function DeletePasswordSheet({
  sheetRef,
  passwordId,
  onDelete,
}: DeleteVaultSheetProps) {
  const { colors, scale } = useTheme();
  const lang = useLang();
  const { deletePassword } = usePasswordStore((state) => ({
    deletePassword: state.deletePassword,
  }));

  const handleOnPressDelete = async () => {
    deletePassword(passwordId);
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
            {lang.deletePasswordSheet.title}
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
            {lang.deletePasswordSheet.cautionFirstLine}
            {"\n"}
            {lang.deletePasswordSheet.cautionSecondLine}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: scale(8),
          }}
        >
          <Button
            text={lang.deletePasswordSheet.cancelButton}
            variant="secondary"
            onPress={() => sheetRef.current?.close()}
            style={{
              flex: 1,
            }}
          />
          <Button
            text={lang.deletePasswordSheet.deleteButton}
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
