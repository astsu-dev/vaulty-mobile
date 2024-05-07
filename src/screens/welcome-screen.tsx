import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";
import { useCallback, useEffect, useRef } from "react";
import { Text, ToastAndroid, View } from "react-native";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import { RootStackParamList } from "./root-stack-param-list";
import { ScreenLayout } from "./screen-layout";
import {
  BackupFilePickCancelledError,
  pickBackupFile,
  useBackupFileStore,
} from "@/modules/backup";
import { useLang } from "@/modules/lang";
import { PasswordGeneratorCopySheet } from "@/modules/password";
import { useVaultMetadataStore } from "@/modules/vault";
import { ScalablePressable, useTheme, DiceIcon, Button } from "@/ui";

export function WelcomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Welcome">) {
  const { colors, scale } = useTheme();
  const lang = useLang();
  const { testString } = useVaultMetadataStore();
  const { setBackupFileUri } = useBackupFileStore((state) => ({
    setBackupFileUri: state.setBackupFileUri,
  }));

  const passwordGeneratorSheetRef = useRef<BottomSheetModal>(null);

  const handlePresentPasswordGeneratorPress = useCallback(() => {
    passwordGeneratorSheetRef.current?.present();
  }, []);

  const handleOnCreateVaultPress = () => {
    navigation.navigate("CreateVault");
  };

  const handleOnPickBackupFilePress = async () => {
    try {
      const fileUri = await pickBackupFile();
      setBackupFileUri(fileUri);
      navigation.navigate("ImportBackup");
    } catch (err) {
      if (err instanceof BackupFilePickCancelledError) {
        return;
      }

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      ToastAndroid.show(
        lang.errors.createUnexpectedErrorText(err),
        ToastAndroid.SHORT,
      );
    }
  };

  useEffect(() => {
    if (testString !== null) {
      navigation.reset({
        index: 0,
        routes: [{ name: "UnlockVault" }],
      });
    }
  }, [testString, navigation]);

  return (
    <BottomSheetModalProvider>
      <ScreenLayout
        header={{
          separator: false,
          rightButtons: (
            <ScalablePressable onPress={handlePresentPasswordGeneratorPress}>
              <DiceIcon />
            </ScalablePressable>
          ),
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <View
            style={{
              gap: scale(36),
              alignItems: "center",
              width: "100%",
            }}
          >
            <Illustration />
            <View
              style={{
                gap: scale(32),
                width: "100%",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  gap: scale(10),
                }}
              >
                <Text
                  style={{
                    fontFamily: "Gilroy-Bold",
                    fontSize: scale(28),
                    color: colors.text,
                  }}
                >
                  {lang.welcomeScreen.greetings}
                </Text>
                <Text
                  style={{
                    fontFamily: "Gilroy-Medium",
                    fontSize: scale(16),
                    color: colors.subtext,
                  }}
                >
                  {lang.welcomeScreen.letsSetupYourVault}
                </Text>
              </View>
              <View
                style={{
                  gap: scale(10),
                }}
              >
                <Button
                  text={lang.welcomeScreen.createVaultButton}
                  onPress={handleOnCreateVaultPress}
                />
                <Button
                  variant="secondary"
                  text={lang.welcomeScreen.importVaultButton}
                  onPress={handleOnPickBackupFilePress}
                />
              </View>
            </View>
          </View>
        </View>
      </ScreenLayout>
      <PasswordGeneratorCopySheet sheetRef={passwordGeneratorSheetRef} />
    </BottomSheetModalProvider>
  );
}

function Illustration(props: SvgProps) {
  return (
    <Svg width={301} height={342} fill="none" {...props}>
      <G clipPath="url(#a)">
        <Path
          fill="#F2F2F2"
          d="m144.479 320.838-.381-8.581-.119-.063c-4.089-2.145-8.776 1.739-7.47 6.168 1.229 4.167 2.055 8.66 4.304 12.308a16.668 16.668 0 0 0 12.223 7.703l5.195 3.18a27.93 27.93 0 0 0-5.887-22.633 27.017 27.017 0 0 0-4.958-4.608c-1.244 3.281-2.907 6.526-2.907 6.526Z"
        />
        <Path
          fill="#E6E6E6"
          d="M97.967 233.762c-10.001-10.315-24.495-16.23-39.765-16.23l-.59.001a56.785 56.785 0 0 1-28.624-7.73l-.904-.527.728-.75a55.337 55.337 0 0 0 9.76-13.819 16.733 16.733 0 0 1-13.506 4.364 17.149 17.149 0 0 1-12.58-8.058c-5.338-8.66-11.7-20.946-11.7-30.307a56.957 56.957 0 0 1 18.582-42.028 35.459 35.459 0 0 0 11.716-26.445l-.003-.71A80.443 80.443 0 0 1 33.47 72.06l.161-.643.662.023a54.38 54.38 0 0 0 12.715-1.065 42.918 42.918 0 0 1-11.403-3.033l-.712-.288.241-.73c16.648-10.307 54.226-4.97 76.038-54.873 17.686-40.465 80.089 35.921 80.089 80.074 0 4.505-4.459 10.459-1.121 13.436 36.081 32.19 11.186 52.86 3.336 73.66-1.862 4.935 2.176 10.352 2.176 15.691 0 .906-.023 1.841-.069 2.779l-.069 1.443-1.203-.801a39.856 39.856 0 0 1-6.581-5.397 34.734 34.734 0 0 1-1.101 29.98c-3.781 7.137-7.439 12.246-10.873 15.185a56.767 56.767 0 0 1-77.788-3.738Z"
        />
        <Path
          fill="#3F3D56"
          d="M158.375 341.13a1.022 1.022 0 0 0 1.011-.878c.043-.305 4.296-30.976.476-71.741-3.527-37.646-14.855-91.871-48.788-136.404a1.025 1.025 0 0 0-1.075-.37 1.03 1.03 0 0 0-.622.474 1.025 1.025 0 0 0 .071 1.135c33.64 44.149 44.877 97.975 48.379 135.356 3.798 40.527-.422 70.96-.465 71.262a1.028 1.028 0 0 0 .241.814 1.018 1.018 0 0 0 .772.352Z"
        />
        <Path
          fill="#3F3D56"
          d="M130.684 194.923a1.024 1.024 0 0 0 .972-.706 1.016 1.016 0 0 0-.371-1.142c-.123-.09-12.537-9.035-31.095-15.83-17.156-6.281-43.244-11.975-70.101-3.427a1.032 1.032 0 0 0-.71.888 1.021 1.021 0 0 0 1.33 1.06c26.306-8.373 51.921-2.773 68.778 3.399 18.293 6.698 30.476 15.475 30.597 15.563.174.127.384.195.6.195ZM177.457 78.428a1.019 1.019 0 0 0-.634-1.021 1.021 1.021 0 0 0-1.166.288c-.099.116-9.914 11.854-18.028 29.874-7.5 16.659-15.058 42.27-8.467 69.673a1.024 1.024 0 0 0 1.865.294c.142-.231.186-.509.122-.772-6.455-26.842.975-51.987 8.344-68.355 7.998-17.764 17.63-29.282 17.726-29.397.139-.164.223-.369.238-.584Z"
        />
        <Path
          fill="#2F2E41"
          d="M176.074 131.124c.862 6.956 5.683 12.692 12.693 12.692 3.366 0 6.594-1.337 8.975-3.717a12.695 12.695 0 0 0 3.717-8.975c0-7.01-5.712-12.045-12.692-12.693-7.406-.688-13.8 3.761-12.693 12.693Z"
        />
        <Path
          fill="#FFB6B6"
          d="m194.646 335.54 4.833-.001 2.299-18.643h-7.133l.001 18.644Z"
        />
        <Path
          fill="#2F2E41"
          d="m194.475 340.582 14.864-.001v-.188a5.784 5.784 0 0 0-5.785-5.785l-2.716-2.06-5.065 2.06h-1.298v5.974Z"
        />
        <Path
          fill="#FFB6B6"
          d="m175.606 335.54 4.833-.001 2.3-18.643h-7.134l.001 18.644Z"
        />
        <Path
          fill="#2F2E41"
          d="m175.436 340.582 14.864-.001v-.188a5.784 5.784 0 0 0-5.785-5.785l-2.716-2.06-5.065 2.06h-1.298v5.974ZM211.279 218.771l3.417 11.717-4.026 49.621s2.073 3.102.609 3.102c-1.465 0-3.343.688-2.16 2.541 1.183 1.853-2.86 8.505-2.86 8.505l-5.72 35.331-7.288-.107s-3.706-2.065-1.626-4.152c2.079-2.087 3.544-2.087 1.591-4.04-1.953-1.953-1.953-1.364-1.953-2.879 0-1.514-1.956-20.023 2.683-27.123l-1.397-28.947-3.293 28.394-6.78 37.878-7.021-.058s-3.243-3.126-3.237-5.439c.006-2.314 2.004-2.506.517-3.875-1.487-1.368-1.487-22.391 2.907-34.076 0 0 2.485-6.529-.006-8.766-2.491-2.237-.003-4.797-.003-4.797s3.945-1.427-.004-5.536-.021-33.171-.021-33.171-4.317-11.731.055-16.344c4.372-4.613 35.616 2.221 35.616 2.221Z"
        />
        <Path
          fill="#FFB6B6"
          d="m150.415 238.958 6.097-14.735 4.804 2.669-2.901 14.988a5.344 5.344 0 0 1-1.432 5.436 5.34 5.34 0 0 1-8.978-3.28 5.339 5.339 0 0 1 2.41-5.078ZM252.725 122.443l-9.277 12.969-4.074-3.687 6.221-13.942a5.335 5.335 0 0 1 2.627-4.97 5.338 5.338 0 1 1 4.503 9.63Z"
        />
        <Path
          fill="#111"
          d="M212.199 219.972c6.018 9.333-24.229 21.178-35.834 16.423-2.032-.833-9.023-3.583-4.245-7.396 4.779-3.813-.554-4.35-.68-6.832-.084-1.659 1.201-5.299-.14-5.143-1.34.156-2.909-2.139.01-3.126 2.92-.988.032-1.889.057-2.826.279-10.23 8.128-26.502 8.128-26.502l-14.143 36.153s.105 6.255-1.699 4.344c-1.803-1.912-1.672 4.274-1.672 4.274s-2.682 1.872-1.14 2.914c1.542 1.041-1.66 4.244-1.66 4.244l-7.473-.534s.117-5.551 1.393-6.778c1.276-1.228.65-3.16.65-3.16s3.321-2.94 1.094-5.328c-2.864-3.071 7.579-54.935 11.183-54.421a13.72 13.72 0 0 1 3.425-6.618 13.72 13.72 0 0 1 6.378-3.854l8.07-2.222 1.433-5.687h11.364l1.98 3.737 8.64 3.899c1.627-2.297 2.843-4.716 9.507-5.501 0 0 17.957-16.337 17.08-17.613-.877-1.276 1.907-4.262 1.907-4.262s2.377-.778 1.036-1.194c-1.342-.415 1.194-1.376 1.194-1.376s2.348-.617 1.24-1.429c-1.107-.813 3.697-1.346 3.697-1.346l6.232 5.085-1.259 2.136s.768 2.908-.235 1.847c-1.002-1.062-1.191 2.019-1.191 2.019s-.512 3.374-3.547 4.391c-3.036 1.017-5.338 10.675-5.338 10.675-7.159 9.308-15.608 16.569-25.62 21.35 3.902 4.478.178 49.657.178 49.657Z"
        />
        <Path
          fill="#FFB6B6"
          d="M190.169 144.57c6.217 0 11.256-5.039 11.256-11.255 0-6.216-5.039-11.255-11.256-11.255-6.216 0-11.255 5.039-11.255 11.255 0 6.216 5.039 11.255 11.255 11.255Z"
        />
        <Path
          fill="#2F2E41"
          d="M178.515 134.541c.356 2.446 2.441 5.858 1.953 5.858-.489 0-3.959-10.083-.489-10.74 2.518-.477 3.081-.059 5.434-1.079l-.332.313c1.557 1.132 3.725.434 5.502-.303 1.782-.732 3.944-1.43 5.506-.303.982.708 1.397 1.938 2.007 2.983.61 1.05 1.738 2.041 2.9 1.718.932-.258 1.469-1.303 1.464-2.27-.005-.966-1.263-1.886-.84-2.753 1.257-2.57.127-4.322-2.611-5.531-.996-.151-1.992-.306-2.988-.464a8.463 8.463 0 0 1 1.875-1.884 4.29 4.29 0 0 0-1.514-1.938c-.795-.474-1.782-.44-2.704-.391l-6.176.322c-1.523.079-3.1.171-4.462.869-1.698.874-2.812 2.578-3.622 4.311-1.816 3.896-1.528 7.03-.903 11.282Z"
        />
        <Path
          fill="#CACACA"
          d="m131.693 341.85 110.695.15a.581.581 0 1 0 0-1.162l-110.695-.15a.581.581 0 1 0 0 1.162Z"
        />
        <Path
          fill="#E6E6E6"
          d="M91.658 291.181c.204-1.403-1.265-2.777-3.281-3.071-2.016-.293-3.816.606-4.02 2.009-.204 1.402 1.265 2.777 3.28 3.07 2.017.294 3.817-.605 4.021-2.008Z"
        />
        <Path
          fill="#3F3D56"
          d="M115.662 288.839c.204-1.402-1.265-2.777-3.281-3.07-2.016-.294-3.816.605-4.02 2.008-.204 1.402 1.265 2.777 3.281 3.071 2.016.293 3.816-.606 4.02-2.009Z"
        />
        <Path
          fill="#FF6584"
          d="M85.084 271.747c.204-1.402-1.265-2.777-3.28-3.07-2.017-.294-3.817.606-4.02 2.008-.205 1.403 1.264 2.777 3.28 3.071 2.016.293 3.816-.606 4.02-2.009Z"
        />
        <Path
          fill="#E6E6E6"
          d="M74.654 263.787c.01-1.287-.709-2.336-1.604-2.343-.896-.007-1.63 1.031-1.64 2.319-.01 1.287.709 2.337 1.604 2.344.896.006 1.63-1.032 1.64-2.32Z"
        />
        <Path
          fill="#3F3D56"
          d="M71.117 248.961c.01-1.288-.709-2.337-1.604-2.344-.896-.007-1.63 1.032-1.64 2.319-.01 1.288.709 2.337 1.604 2.344.896.007 1.63-1.032 1.64-2.319Z"
        />
        <Path
          fill="#E6E6E6"
          d="M98.623 275.054c.01-1.287-.708-2.336-1.604-2.343-.896-.007-1.63 1.031-1.64 2.319-.01 1.288.709 2.337 1.605 2.344.895.006 1.63-1.032 1.64-2.32Z"
        />
        <Path
          fill="#FF6584"
          d="M87.023 280.847c.01-1.288-.708-2.337-1.604-2.344-.896-.006-1.63 1.032-1.64 2.319-.01 1.288.71 2.337 1.605 2.344.895.007 1.63-1.031 1.64-2.319Z"
        />
        <Path
          fill="#3F3D56"
          d="M103.171 291.552c.01-1.288-.709-2.337-1.604-2.344-.896-.007-1.63 1.031-1.64 2.319-.01 1.288.709 2.337 1.605 2.344.895.006 1.629-1.032 1.639-2.319Z"
        />
        <Path
          fill="#E6E6E6"
          d="M276.19 216.001c.204-1.402-1.265-2.777-3.281-3.07-2.017-.294-3.816.605-4.02 2.008-.205 1.403 1.264 2.777 3.281 3.071 2.016.293 3.816-.606 4.02-2.009Z"
        />
        <Path
          fill="#3F3D56"
          d="M300.195 213.659c.204-1.403-1.265-2.777-3.282-3.071-2.016-.293-3.816.606-4.02 2.009-.204 1.402 1.265 2.777 3.281 3.07 2.017.294 3.817-.605 4.021-2.008Z"
        />
        <Path
          fill="#FF6584"
          d="M269.616 196.568c.204-1.403-1.264-2.778-3.281-3.071-2.016-.293-3.816.606-4.02 2.008-.204 1.403 1.265 2.778 3.281 3.071 2.017.293 3.816-.606 4.02-2.008Z"
        />
        <Path
          fill="#E6E6E6"
          d="M259.186 188.608c.009-1.288-.709-2.337-1.605-2.344-.895-.007-1.629 1.032-1.639 2.319-.01 1.288.708 2.337 1.604 2.344.896.007 1.63-1.032 1.64-2.319Z"
        />
        <Path
          fill="#3F3D56"
          d="M255.649 173.781c.009-1.288-.709-2.337-1.605-2.344-.895-.007-1.629 1.031-1.639 2.319-.01 1.288.708 2.337 1.604 2.344.896.006 1.63-1.032 1.64-2.319Z"
        />
        <Path
          fill="#E6E6E6"
          d="M283.155 199.875c.01-1.288-.708-2.337-1.604-2.344-.896-.007-1.63 1.032-1.639 2.319-.01 1.288.708 2.337 1.604 2.344.896.007 1.63-1.032 1.639-2.319Z"
        />
        <Path
          fill="#FF6584"
          d="M271.555 205.667c.01-1.288-.708-2.337-1.604-2.344-.896-.007-1.63 1.032-1.639 2.319-.01 1.288.708 2.337 1.604 2.344.895.007 1.63-1.032 1.639-2.319Z"
        />
        <Path
          fill="#3F3D56"
          d="M287.703 216.371c.009-1.287-.709-2.336-1.604-2.343-.896-.007-1.63 1.031-1.64 2.319-.01 1.287.709 2.337 1.604 2.343.896.007 1.63-1.031 1.64-2.319Z"
        />
        <Path
          fill="#fff"
          d="M186.853 76.87c.204-1.402-1.265-2.777-3.281-3.07-2.016-.294-3.816.606-4.02 2.008-.204 1.403 1.265 2.777 3.281 3.07 2.016.294 3.816-.605 4.02-2.008Z"
        />
        <Path
          fill="#3F3D56"
          d="M210.857 74.528c.204-1.402-1.265-2.777-3.281-3.07-2.016-.294-3.816.605-4.02 2.008-.204 1.402 1.265 2.777 3.281 3.07 2.016.294 3.816-.605 4.02-2.008Z"
        />
        <Path
          fill="#FF6584"
          d="M180.28 57.437c.204-1.403-1.265-2.777-3.282-3.07-2.016-.294-3.816.605-4.02 2.008-.204 1.402 1.265 2.777 3.281 3.07 2.017.294 3.816-.606 4.021-2.008Z"
        />
        <Path
          fill="#E6E6E6"
          d="M169.849 49.476c.01-1.287-.708-2.337-1.604-2.343-.896-.007-1.63 1.031-1.639 2.319-.01 1.287.708 2.337 1.604 2.343.895.007 1.629-1.031 1.639-2.319Z"
        />
        <Path
          fill="#3F3D56"
          d="M166.312 34.65c.01-1.288-.709-2.337-1.604-2.344-.896-.007-1.63 1.032-1.64 2.32-.01 1.287.709 2.336 1.604 2.343.896.007 1.63-1.032 1.64-2.32Z"
        />
        <Path
          fill="#E6E6E6"
          d="M193.818 60.744c.01-1.288-.708-2.337-1.604-2.344-.895-.006-1.63 1.032-1.639 2.32-.01 1.287.708 2.336 1.604 2.343.896.007 1.63-1.032 1.639-2.32Z"
        />
        <Path
          fill="#FF6584"
          d="M182.218 66.535c.01-1.287-.708-2.336-1.604-2.343-.896-.007-1.63 1.031-1.639 2.319-.01 1.288.708 2.337 1.604 2.344.896.006 1.63-1.032 1.639-2.32Z"
        />
        <Path
          fill="#3F3D56"
          d="M198.366 77.24c.01-1.288-.708-2.337-1.604-2.344-.896-.006-1.63 1.032-1.639 2.32-.01 1.287.708 2.336 1.604 2.343.896.007 1.63-1.031 1.639-2.319Z"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M.787 0h299.427v342H.787z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
