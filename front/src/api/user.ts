import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';
// import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  UserName: string;
  Password: string;
}

// export interface LoginRes {
//   retcode: number;
//   message: string;
//   l10nKey: string;
//   data: string;
// }
export function login(data: LoginData) {
  return axios.post<string>('/Passport/Login', data);
}

// export function logout() {
//   return axios.post<LoginRes>('/api/user/logout');
// }

// export interface UserInfoRes {
//   NormalizedUserName: string;
//   UserName: string;
//   IsLicensedDeveloper: boolean;
//   IsMaintainer: boolean;
//   GachaLogExpireAt: string;
// }

export function getUserInfo() {
  return axios.get<UserState>('/Passport/UserInfo');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
