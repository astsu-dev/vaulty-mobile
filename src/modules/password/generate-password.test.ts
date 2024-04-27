import { GeneratePasswordOptions, generatePassword } from "./generate-password";

describe("generatePassword", () => {
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numbersRegex = /[0-9]/;
  const symbolsRegex = /[!@#$%^&*()_+=]/;

  test("should generate a password", () => {
    const options: GeneratePasswordOptions = {
      length: 10,
      hasUppercase: true,
      hasLowercase: true,
      hasDigits: true,
      hasSymbols: true,
    };

    const password = generatePassword(options);

    expect(password.length).toBe(10);
    expect(uppercaseRegex.test(password)).toBe(true);
    expect(lowercaseRegex.test(password)).toBe(true);
    expect(numbersRegex.test(password)).toBe(true);
    expect(symbolsRegex.test(password)).toBe(true);
  });

  test("should generate a password without upper case letters", () => {
    const options: GeneratePasswordOptions = {
      length: 10,
      hasUppercase: false,
      hasLowercase: true,
      hasDigits: true,
      hasSymbols: true,
    };

    const password = generatePassword(options);

    expect(password.length).toBe(10);
    expect(uppercaseRegex.test(password)).toBe(false);
    expect(lowercaseRegex.test(password)).toBe(true);
    expect(numbersRegex.test(password)).toBe(true);
    expect(symbolsRegex.test(password)).toBe(true);
  });

  test("should generate a password without lower case letters", () => {
    const options: GeneratePasswordOptions = {
      length: 10,
      hasUppercase: true,
      hasLowercase: false,
      hasDigits: true,
      hasSymbols: true,
    };

    const password = generatePassword(options);

    expect(password.length).toBe(10);
    expect(uppercaseRegex.test(password)).toBe(true);
    expect(lowercaseRegex.test(password)).toBe(false);
    expect(numbersRegex.test(password)).toBe(true);
    expect(symbolsRegex.test(password)).toBe(true);
  });

  test("should generate a password without digits", () => {
    const options: GeneratePasswordOptions = {
      length: 10,
      hasUppercase: true,
      hasLowercase: true,
      hasDigits: false,
      hasSymbols: true,
    };

    const password = generatePassword(options);

    expect(password.length).toBe(10);
    expect(uppercaseRegex.test(password)).toBe(true);
    expect(lowercaseRegex.test(password)).toBe(true);
    expect(numbersRegex.test(password)).toBe(false);
    expect(symbolsRegex.test(password)).toBe(true);
  });

  test("should generate a password without symbols", () => {
    const options: GeneratePasswordOptions = {
      length: 10,
      hasUppercase: true,
      hasLowercase: true,
      hasDigits: true,
      hasSymbols: false,
    };

    const password = generatePassword(options);

    expect(password.length).toBe(10);
    expect(uppercaseRegex.test(password)).toBe(true);
    expect(lowercaseRegex.test(password)).toBe(true);
    expect(numbersRegex.test(password)).toBe(true);
    expect(symbolsRegex.test(password)).toBe(false);
  });

  test("should throw error if password length is less than 4", () => {
    const options: GeneratePasswordOptions = {
      length: 3,
      hasUppercase: true,
      hasLowercase: true,
      hasDigits: true,
      hasSymbols: false,
    };

    expect(() => generatePassword(options)).toThrow(TypeError);
  });

  test("should not throw error if password length is equal to 4", () => {
    const options: GeneratePasswordOptions = {
      length: 4,
      hasUppercase: true,
      hasLowercase: true,
      hasDigits: true,
      hasSymbols: false,
    };

    expect(() => generatePassword(options)).not.toThrow(TypeError);
  });

  test("should throw error if all options are false", () => {
    const options: GeneratePasswordOptions = {
      length: 10,
      hasUppercase: false,
      hasLowercase: false,
      hasDigits: false,
      hasSymbols: false,
    };

    expect(() => generatePassword(options)).toThrow(TypeError);
  });
});
