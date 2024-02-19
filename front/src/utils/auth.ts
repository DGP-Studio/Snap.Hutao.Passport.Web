import {getCookie, removeCookie, setCookie} from "@/utils/cookie";

const TOKEN_KEY = 'token';

const getToken = () => {
  return getCookie(TOKEN_KEY);
};

const setToken = (token: string) => {
  setCookie(TOKEN_KEY, token, 3/24)
};

const clearToken = () => {
  removeCookie(TOKEN_KEY)
};

const isLogin = () => {
  return !!getToken();
};

const bearer = (token: string) => {
  return `Bearer ${token}`;
}

export { isLogin, getToken, setToken, clearToken, bearer };
