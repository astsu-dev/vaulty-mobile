import { Platform } from "react-native";
import dgram from "react-native-udp";
import UdpSocket from "react-native-udp/lib/types/UdpSocket";
import { encrypt, pbkdf2 } from "@/utils/crypto";
import { getBroadcastAddress } from "@/utils/network";

export class RemoteClipboardAPI {
  private static socket: UdpSocket | null = null;

  static async setClipboard(
    port: number,
    password: string,
    text: string,
    expiresIn?: number,
  ): Promise<void> {
    const socket = this.getSocket();
    const data = JSON.stringify({
      data: await encrypt(
        JSON.stringify({ text, expiresIn }),
        await pbkdf2(password),
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
        // Create a new socket everytime to avoid stale connections
        this.cleanup();
      });
    });
  }

  private static getSocket(): UdpSocket {
    if (!this.socket) {
      this.socket = dgram.createSocket({ type: "udp4" });
      this.socket.bind();
      if (Platform.OS === "ios") {
        this.socket.on("listening", (_msg, _rinfo) => {
          this.socket?.setBroadcast(true);
        });
      }
    }
    return this.socket;
  }

  public static cleanup() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}
