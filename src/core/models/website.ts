export interface BaseEntity {
  id: string;
  createdDate: string | null;
  createdUser: string;
  updatedDate: string | null;
  updatedUser: number | null;
  deleted: boolean;
  deletedDate: string | null;
  deletedUser: number | null;
}

export enum WebSiteStatus {
  Active = 1,
  Inactive = 0,
}

export enum Timeframe {
  Hour = 1,
  Minute = 2,
}

export enum WebSiteState {
  Online = 1,
  Unavailable = 2,
}

export interface WebSite extends BaseEntity {
  name: string;
  address: string;
  https: boolean;
  telegramId: string;
  lastCheck: string;
  checkEvery: Timeframe;
  checkValue: number;
  status: WebSiteStatus;
  maximumRetries: number;
  currentRetryCount: number;
  state: WebSiteState;
  ignoreSslErrors: boolean;
  systemLogs: WebSiteLogs[];
}

export interface WebSiteLogs extends BaseEntity {
  detail: string;
  webSiteId: string;
  webSite: WebSite;
}
