import axios from "axios";

export const externalApi = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
