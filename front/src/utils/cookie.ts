import Cookie from 'js-cookie';

export function setCookie(key: string, value: any): void;
export function setCookie(key: string, value: any, expires: number): void;

export function setCookie(key: string, value: any, expires?: number): void {
  if (expires) {
    Cookie.set(key, value, {expires})
  } else {
    Cookie.set(key, value)
  }
}

export function getCookie(key: string): string | undefined {
  return Cookie.get(key)
}

export function removeCookie(key: string): void {
  Cookie.remove(key)
}