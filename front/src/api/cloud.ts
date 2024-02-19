import {RedeemCodeWrapper, RedeemResult} from "@/types/passport";
import axios from "axios";
import {bearer, getToken} from "@/utils/auth";
import {GachaEntry} from "@/types/homa";

export function redeem(code: RedeemCodeWrapper) {
  return axios.post<RedeemResult>('https://passport.snapgenshin.cn/api/redemption/use',
    code,
    {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": bearer(getToken() as string)
      }
    });
}

export function fetchGachaLogs() {
  return axios.get<GachaEntry[]>('/GachaLog/Entries',
    {
      headers: {
        "Authorization": bearer(getToken() as string)
      }
    });
}