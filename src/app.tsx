import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AddPasswordScreen } from "@/screens/add-password-screen";
import { ChangeVaultPasswordScreen } from "@/screens/change-vault-password-screen";
import { CreateVaultScreen } from "@/screens/create-vault-screen";
import { ImportBackupScreen } from "@/screens/import-backup-screen";
import { MyPasswordsScreen } from "@/screens/my-passwords-screen";
import { PasswordOverviewScreen } from "@/screens/password-overview-screen";
import { RemoteClipboardSettingsScreen } from "@/screens/remote-clipboard-settings-screen";
import { RootLayout } from "@/screens/root-layout";
import { RootStackParamList } from "@/screens/root-stack-param-list";
import { SettingsScreen } from "@/screens/settings-screen";
import { UnlockVaultScreen } from "@/screens/unlock-vault-screen";
import { WelcomeScreen } from "@/screens/welcome-screen";

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <RootLayout>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="CreateVault" component={CreateVaultScreen} />
            <Stack.Screen name="MyPasswords" component={MyPasswordsScreen} />
            <Stack.Screen name="UnlockVault" component={UnlockVaultScreen} />
            <Stack.Screen name="AddPassword" component={AddPasswordScreen} />
            <Stack.Screen
              name="PasswordOverview"
              component={PasswordOverviewScreen}
            />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="ImportBackup" component={ImportBackupScreen} />
            <Stack.Screen
              name="ChangeVaultPassword"
              component={ChangeVaultPasswordScreen}
            />
            <Stack.Screen
              name="RemoteClipboardSettings"
              component={RemoteClipboardSettingsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RootLayout>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
