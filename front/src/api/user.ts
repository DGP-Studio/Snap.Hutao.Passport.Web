import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

export function placeholder() {}
