import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootLayout } from "@/screens/root-layout";
import { WelcomeScreen } from "@/screens/welcome-screen";

SplashScreen.preventAutoHideAsync();

function App() {
  const [fontsLoaded] = useFonts({
    "Gilroy-Regular": require("./assets/fonts/Gilroy-Regular.ttf"),
    "Gilroy-Medium": require("./assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-SemiBold": require("./assets/fonts/Gilroy-SemiBold.ttf"),
    "Gilroy-Bold": require("./assets/fonts/Gilroy-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <SafeAreaProvider>
      <RootLayout>
        <WelcomeScreen />
      </RootLayout>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
