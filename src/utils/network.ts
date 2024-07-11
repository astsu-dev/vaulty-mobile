import NetInfo, { NetInfoStateType } from "@react-native-community/netinfo";

/** Get the broadcast address of the current Wi-Fi network.
 * @throws {Error} If the device is not connected to a Wi-Fi network or
 * if the broadcast address cannot be determined.
 * */
export async function getBroadcastAddress(): Promise<string> {
  // eslint-disable-next-line import/no-named-as-default-member
  const state = await NetInfo.fetch();
  if (state.type !== NetInfoStateType.wifi) {
    throw new Error("Not connected to a Wi-Fi network");
  }

  const ipAddress = state.details.ipAddress;
  if (!ipAddress) {
    throw new Error("Cannot get local IP address");
  }

  const parts = ipAddress.split(".");
  parts[parts.length - 1] = "255";

  return parts.join(".");
}
