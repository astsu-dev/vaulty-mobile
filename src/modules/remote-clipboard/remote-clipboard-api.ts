import dgram from "react-native-udp";
import UdpSocket from "react-native-udp/lib/types/UdpSocket";
import { encrypt, pbkdf2 } from "@/utils/crypto";
import { getBroadcastAddress } from "@/utils/network";

export class RemoteClipboardAPI {
  private static socket: UdpSocket | null = null;

  static async setClipboard(
    port: number,
    apiKey: string,
    text: string,
    expiresIn?: number,
  ): Promise<void> {
    const socket = this.getSocket();
    const data = JSON.stringify({
      data: await encrypt(
        JSON.stringify({ text, expiresIn }),
        await pbkdf2(apiKey),
      ),
    });
    const broadcastAddress = await getBroadcastAddress();

    return new Promise((resolve, reject) => {
      socket.send(data, undefined, undefined, port, broadcastAddress, (err) => {
        if (err) {
          reject(
            new Error(
              `Failed to send UDP message to remote clipboard server. Error: ${err}`,
            ),
          );
        } else {
          resolve();
        }
      });
    });
  }

  private static getSocket(): UdpSocket {
    if (!this.socket) {
      this.socket = dgram.createSocket({ type: "udp4" });
      this.socket.bind();
    }
    return this.socket;
  }
}
