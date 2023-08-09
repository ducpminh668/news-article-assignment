import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios';
import { storage } from '~/utils/storage';
interface CustomeAxiosInstance extends AxiosInstance {
  setToken: (token: string) => void;
}

function refreshToken() {
  return _axios.get('/auth/refreshToken').then((res) => res.data);
}

const _axios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 300000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
}) as CustomeAxiosInstance;

_axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.load('accessToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err: AxiosError) => {
    console.log('-----Error-----');
    return Promise.reject(err);
  }
);

_axios.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    console.log('-----Error-----');
    if (error.response && error.response.status === 401) {
      // TODO: handle Refresh Token
      // refreshToken();
    }

    return Promise.reject(error);
  }
);
export default _axios;
