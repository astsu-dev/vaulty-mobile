import { Buffer } from "@craftzdog/react-native-buffer";
import crypto from "react-native-quick-crypto";

const PBKDF2_SALT = "super-secret-vaulty-salt";
const PBKDF2_ITERATIONS = 600000;
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

/** Error thrown when the key for AES 256 GCM decryption is invalid */
export class InvalidKeyError extends Error {}

/** Derives a 256-bit key from the given password using PBKDF2 algorithm.
 * The key can be used to encrypt/decrypt data with AES 256 GCM algorithm.
 * @param password The password to derive the key
 * @returns The derived key in Buffer format
 * */
export async function pbkdf2(password: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      PBKDF2_SALT,
      PBKDF2_ITERATIONS,
      32,
      "SHA-256",
      (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          resolve(derivedKey as Buffer);
        }
      },
    );
  });
}

/** Encrypts the given data with AES 256 GCM algorithm.
 * @param data The data to encrypt in utf-8 format
 * @param key The key to encrypt the data
 * @returns The encrypted data in base64 format
 * */
export async function encrypt(data: string, key: Buffer): Promise<string> {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([
    iv,
    cipher.update(data, "utf-8"),
    cipher.final(),
    cipher.getAuthTag(),
  ]);
  return encrypted.toString("base64");
}

/** Decrypts the given data with AES 256 GCM algorithm.
 * @param data The data to decrypt in base64 format
 * @param key The key to decrypt the data
 * @throws InvalidKeyError if the key is invalid
 * @returns The decrypted data in utf-8 format
 * */
export async function decrypt(data: string, key: Buffer): Promise<string> {
  const dataBuffer = Buffer.from(data, "base64");
  const iv = dataBuffer.subarray(0, IV_LENGTH);
  const cipherText = dataBuffer.subarray(
    IV_LENGTH,
    dataBuffer.length - AUTH_TAG_LENGTH,
  );
  const authTag = dataBuffer.subarray(dataBuffer.length - AUTH_TAG_LENGTH);

  const cipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  cipher.setAuthTag(authTag);

  try {
    const decrypted = Buffer.concat([
      cipher.update(cipherText),
      cipher.final(),
    ]);
    return decrypted.toString("utf-8");
  } catch (err) {
    throw new InvalidKeyError("Invalid key for decryption");
  }
}
