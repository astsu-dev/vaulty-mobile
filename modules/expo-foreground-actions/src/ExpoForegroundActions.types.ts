export type ExpireEventPayload = {
  remaining: number;
  identifier: number;
};

export interface AndroidSettings {
  headlessTaskName: string;
  notificationTitle: string;
  notificationDesc: string;
  notificationIconName: string;
  notificationIconType: string;
  linkingURI: string;
}

export interface Settings {
  events?: {
    onIdentifier?: (identifier: number) => void;
  };
  runInJS?: boolean;
}

export interface ForegroundApi {
  headlessTaskName: string;
  identifier: number;
}

export type ForegroundAction<Params> = (
  params: Params,
  api: ForegroundApi,
) => Promise<void>;
