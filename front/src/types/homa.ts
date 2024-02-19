// GLOBAL

export interface UserInfo {
  UserName: string,
  NormalizedUserName: string,
  IsLicensedDeveloper: boolean,
  IsMaintainer: boolean,
  GachaLogExpireAt: string
}

// DASHBOARD

export interface AuthorizationStatus {
  IsAuthorized: boolean,
  RefreshToken: string,
  ExpiresAt: number
}

// CLOUD

export interface GachaEntry {
  Uid: string,
  Excluded: boolean,
  ItemCount: number
}

// SECURITY

export interface PassportRequest {
  UserName: string,
  Password: string,
  VerifyCode: string,
  IsResetPassword: boolean,
  IsCancelRegistration: boolean
}