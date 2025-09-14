import { internalApi } from "@/shared/config/api/internalApi.config";
import { LoginApi } from "../../types/api/login-api";

export const internalLogin = async (data: LoginApi) => {
  const res = await internalApi.post("/api/auth/login", data);
  return res.data;
};
