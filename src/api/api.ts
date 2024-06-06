import axios from "axios";
export const api = axios.create({
  baseURL: process.env.VITE_API_URL,
});

api.interceptors.request.use(
  async (req) => {
    return req;
  },
  (error) => {
    return Promise.reject(error);
  },
);
