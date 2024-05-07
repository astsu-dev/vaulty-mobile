import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import { useMemo, useState } from "react";
import { View, Text, ToastAndroid } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { InvalidKeyOrCorruptedBackupError, getBackupFromFile } from "../import";
import { useBackupFileStore } from "../store/backup-file-store";
import { useLang } from "@/modules/lang";
import { PasswordInput } from "@/modules/password";
import { useReplaceVault } from "@/modules/vault";
import { BottomSheet, Button, EASING, useTheme } from "@/ui";
import { pbkdf2 } from "@/utils/crypto";

export type ImportBackupSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal>;
  onImport?: () => void;
};

export function ImportBackupSheet({
  sheetRef,
  onImport,
}: ImportBackupSheetProps) {
  const { colors, scale } = useTheme();
  const lang = useLang();
  const replaceVault = useReplaceVault();
  const { backupFileUri } = useBackupFileStore();

  const [password, setPassword] = useState("");

  const importButtonTranslateX = useSharedValue(0);
  const importButtonTranslateXAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: importButtonTranslateX.value,
        },
      ],
    };
  });

  const shakeImportButton = () => {
    const offset = 2;
    const duration = 50;
    importButtonTranslateX.value = withSequence(
      withTiming(offset, {
        duration: duration,
        easing: EASING,
      }),
      withRepeat(
        withTiming(-offset, {
          duration,
          easing: EASING,
        }),
        2,
        true,
      ),
      withTiming(0, { duration: duration * 3, easing: EASING }),
    );
  };

  const handleOnPressImport = async () => {
    if (!backupFileUri) {
      throw new Error("Backup file URI is not set");
    }

    if (password) {
      try {
        const encryptionKey = await pbkdf2(password);
        const backup = await getBackupFromFile(backupFileUri, encryptionKey);
        await replaceVault(backup.passwords, encryptionKey);
      } catch (err) {
        let msg: string;

        if (err instanceof InvalidKeyOrCorruptedBackupError) {
          shakeImportButton();
          msg = lang.importBackupSheet.incorrectPasswordOrCorruptedBackupError;
        } else {
          msg = lang.errors.createUnexpectedErrorText(err);
        }

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        ToastAndroid.show(msg, ToastAndroid.SHORT);
        return;
      }

      sheetRef.current?.close();
      ToastAndroid.show(
        lang.importBackupSheet.successfullyImported,
        ToastAndroid.SHORT,
      );
      onImport?.();
    } else {
      shakeImportButton();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      ToastAndroid.show(
        lang.importBackupSheet.passwordEmptyError,
        ToastAndroid.SHORT,
      );
    }
  };

  const snapPoints = useMemo(() => ["100%"], []);

  return (
    <BottomSheet bottomSheetModalRef={sheetRef} snapPoints={snapPoints}>
      <View
        style={{
          gap: scale(16),
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
            {lang.importBackupSheet.title}
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
            {lang.importBackupSheet.cautionFirstLine}
            {"\n"}
            {lang.importBackupSheet.cautionSecondLine}
          </Text>
        </View>
        <PasswordInput
          value={password}
          onChangeText={setPassword}
          insideSheet
        />
        <View
          style={{
            flexDirection: "row",
            gap: scale(8),
          }}
        >
          <Button
            text={lang.importBackupSheet.cancelButton}
            variant="secondary"
            onPress={() => sheetRef.current?.close()}
            style={{
              flex: 1,
            }}
          />
          <Button
            text={lang.importBackupSheet.importButton}
            onPress={handleOnPressImport}
            style={[
              {
                flex: 1,
              },
              importButtonTranslateXAnimatedStyle,
            ]}
          />
        </View>
      </View>
    </BottomSheet>
  );
}
