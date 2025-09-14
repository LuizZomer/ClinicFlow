import axios from "axios";

export const internalApi = axios.create({
  withCredentials: true,
});
