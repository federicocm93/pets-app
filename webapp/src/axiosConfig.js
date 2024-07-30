import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000",
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default instance;
