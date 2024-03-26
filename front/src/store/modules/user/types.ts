export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  // 这些是 homa api 的返回
  NormalizedUserName?: string;
  UserName?: string;
  IsLicensedDeveloper?: boolean;
  IsMaintainer?: boolean;
  GachaLogExpireAt?: string;

  // 下面部分可以弃用
  name?: string;
  avatar?: string;
  job?: string;
  organization?: string;
  location?: string;
  email?: string;
  introduction?: string;
  personalWebsite?: string;
  jobName?: string;
  organizationName?: string;
  locationName?: string;
  phone?: string;
  registrationDate?: string;
  accountId?: string;
  certification?: number;
  role: RoleType;
}
