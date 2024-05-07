import { SearchPassword, searchPasswords } from "./search";

describe("searchPasswords", () => {
  test("should return all passwords if query is empty", () => {
    const passwords: SearchPassword[] = [
      { name: "password1" },
      { name: "password2" },
    ];

    const result = searchPasswords(passwords, "");

    expect(result).toEqual(passwords);
  });

  test("should return all passwords if query is undefined", () => {
    const passwords: SearchPassword[] = [
      { name: "password1" },
      { name: "password2" },
    ];

    const result = searchPasswords(passwords);

    expect(result).toEqual(passwords);
  });

  test("should return passwords that match the query", () => {
    const passwords: SearchPassword[] = [
      { name: "password1" },
      { name: "password2" },
    ];

    const result = searchPasswords(passwords, "1");

    expect(result).toEqual([passwords[0]]);
  });

  test("should return passwords that match the query case-insensitive", () => {
    const passwords: SearchPassword[] = [
      { name: "password1" },
      { name: "password2" },
    ];

    const result = searchPasswords(passwords, "PASSWORD");

    expect(result).toEqual(passwords);
  });
});
