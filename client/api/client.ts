import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Constants } from "../utils/constants";
import { getStorage } from "../utils/localStorage";

const authClient = () => {
  const instance = axios.create({
    baseURL: "https://mern-stack-blog-production.up.railway.app",
  });

  instance.interceptors.request.use(
    (config) => {
      const token = getStorage(Constants.AUTH_TOKEN);
      config.headers = {
        Authorization: `Bearer ${token}`,
      };

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

const publicClient = () => {
  const instance = axios.create({
    baseURL: "https://mern-stack-blog-production.up.railway.app",
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      console.log(error);

      return Promise.reject(error);
    }
  );

  return instance;
};

const client = {
  authClient,
  publicClient,
};

export default client;
