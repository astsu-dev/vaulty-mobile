import Fuse from "fuse.js";

export type SearchPassword = {
  name: string;
};

export function searchPasswords<T extends SearchPassword>(
  passwords: T[],
  query?: string,
): T[] {
  query = query?.trim();

  if (!query) {
    return passwords;
  }

  const fuse = new Fuse(passwords, {
    keys: ["name"] as (keyof SearchPassword)[],
    ignoreLocation: true,
    threshold: 0.3,
  });
  const result = fuse.search(query);
  return result.map((i) => i.item);
}
