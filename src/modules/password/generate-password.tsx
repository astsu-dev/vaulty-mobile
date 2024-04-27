export type GeneratePasswordOptions = {
  length: number;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasDigits: boolean;
  hasSymbols: boolean;
};

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbersChars = "0123456789";
const symbolsChars = "!@#$%^&*()_+=";

const hasUppercaseRegex = /[A-Z]/;
const hasLowercaseRegex = /[a-z]/;
const hasNumbersRegex = /[0-9]/;
const hasSymbolsRegex = /[!@#$%^&*()_+=]/;

export function generatePassword({
  length,
  hasUppercase,
  hasLowercase,
  hasDigits,
  hasSymbols,
}: GeneratePasswordOptions) {
  if (length < 4) {
    throw new TypeError("Password length must be at least 4 characters");
  }

  if (!hasUppercase && !hasLowercase && !hasDigits && !hasSymbols) {
    throw new TypeError(
      "At least one of the following must be true: hasUppercase, hasLowercase, hasDigits, hasSymbols",
    );
  }

  let chars = "";
  const rules: RegExp[] = [];

  if (hasUppercase) {
    chars += uppercaseLetters;
    rules.push(hasUppercaseRegex);
  }

  if (hasLowercase) {
    chars += lowercaseLetters;
    rules.push(hasLowercaseRegex);
  }

  if (hasDigits) {
    chars += numbersChars;
    rules.push(hasNumbersRegex);
  }

  if (hasSymbols) {
    chars += symbolsChars;
    rules.push(hasSymbolsRegex);
  }

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  for (const rule of rules) {
    if (!rule.test(password)) {
      return generatePassword({
        length,
        hasUppercase,
        hasLowercase,
        hasDigits,
        hasSymbols,
      });
    }
  }

  return password;
}
