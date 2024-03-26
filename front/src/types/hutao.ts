// PASSPORT

export interface UserInfo {
  UserName: string,
  NormalizedUserName: string,
  IsLicensedDeveloper: boolean,
  IsMaintainer: boolean,
  GachaLogExpireAt: string
}

export interface GithubAuthorizationStatus {
  IsAuthorized: boolean,
  RefreshToken: string,
  ExpiresAt: number
}

/**
 * Passport 数据
 * <br>
 * 所有 string 均需 RSA 加密
 */
export interface PassportRequest {
  UserName: string,
  Password: string,
  VerifyCode: string,
  IsResetPassword: boolean,
  IsCancelRegistration: boolean
}

// CLOUD

export interface GachaEntry {
  Uid: string,
  Excluded: boolean,
  ItemCount: number
}

// MANAGEMENT

export interface Announcement {
  Title: string,
  Link:string,
  MaxPresentVersion:string,
  Content:string,
  Severity: AnnouncementSeverity
}

export enum AnnouncementSeverity {
  Informational = 0,
  Success = 1,
  Warning = 2,
  Error = 3
}

// REDEMPTION

export interface RedeemCodeWrapper {
  code: string
}

export interface RedeemResult {
  code: string,
  value: number
}