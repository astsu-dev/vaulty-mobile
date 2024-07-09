import { encrypt, pbkdf2 } from "@/utils/crypto";

export class RemoteClipboardAPI {
  static async setClipboard(
    url: string,
    apiKey: string,
    text: string,
    expiresIn?: number,
  ) {
    try {
      const response = await fetch(`${url}/clipboard`, {
        method: "POST",
        body: JSON.stringify({
          data: await encrypt(
            JSON.stringify({ text, expiresIn }),
            await pbkdf2(apiKey),
          ),
        }),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to make request to remote clipboard server. Status: ${response.status}. Body: ${await response.text()}`,
        );
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
