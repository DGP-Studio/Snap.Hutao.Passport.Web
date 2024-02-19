import { defineStore } from 'pinia';
import {
  login as userLogin,
  // logout as userLogout,
  getUserInfo,
  LoginData,
} from '@/api/user';
import {UserInfo} from "@/types/homa";
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import crypt from '@/utils/crypt';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): UserInfo => ({
    UserName: "",
    NormalizedUserName: "",
    IsLicensedDeveloper: false,
    IsMaintainer: false,
    GachaLogExpireAt: ""
  }),

  getters: {
    userInfo(state: UserInfo): UserInfo {
      return { ...state };
    },
  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<UserInfo>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();

      this.setInfo(res.data);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        loginForm.UserName = crypt(loginForm.UserName);
        loginForm.Password = crypt(loginForm.Password);
        const res = await userLogin(loginForm);
        setToken(res.data);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },

    // Logout
    async logout() {
      try {
        // await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
