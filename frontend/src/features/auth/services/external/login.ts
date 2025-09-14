import { externalApi } from "@/shared/config/api/externalApi.config";
import { LoginApi } from "../../types/api/login-api";

interface LoginResponse {
  access_token: string;
}

const loginAdapter = (data: LoginResponse) => {
  return {
    accessToken: data.access_token,
  };
};

export const externalLogin = async (data: LoginApi) => {
  const res = await externalApi.post<LoginResponse>("/auth/login", data);

  return loginAdapter(res.data);
};
