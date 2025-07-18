import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export function useKeyboardIsVisible(): boolean {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Subscribe for the keyboard state
  useEffect(() => {
    const willShowListener = Keyboard.addListener("keyboardWillShow", () => {
      setIsKeyboardVisible(true);
    });
    const didShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    const willHideListener = Keyboard.addListener("keyboardWillHide", () => {
      setIsKeyboardVisible(false);
    });
    const didHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });
    return () => {
      willShowListener.remove();
      didShowListener.remove();
      willHideListener.remove();
      didHideListener.remove();
    };
  }, []);

  return isKeyboardVisible;
}
