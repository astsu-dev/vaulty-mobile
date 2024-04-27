export type LangDictionary = {
  welcome: {
    greetings: string;
    letsSetupYourVault: string;
    createVaultButton: string;
    importVaultButton: string;
  };
  passwordGeneratorSheet: {
    copyButton: string;
    lengthLabel: string;
    hasUpperCaseLabel: string;
    hasLowerCaseLabel: string;
    hasDigitsLabel: string;
    hasSymbolsLabel: string;
  };
};

export function useLang(): LangDictionary {
  return {
    welcome: {
      greetings: "Welcome to Vaulty!",
      letsSetupYourVault: "Let's setup your vault.",
      createVaultButton: "Create a new vault",
      importVaultButton: "Import an existing vault",
    },
    passwordGeneratorSheet: {
      copyButton: "Copy",
      lengthLabel: "Length",
      hasUpperCaseLabel: "Upper case",
      hasLowerCaseLabel: "Lower case",
      hasDigitsLabel: "Digits",
      hasSymbolsLabel: "Symbols",
    },
  };
}
