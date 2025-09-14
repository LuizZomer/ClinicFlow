import { internalApi } from "@/shared/config/api/internalApi.config";

export const internalJwtDecode = async (): Promise<JwtPayloadWithUser> => {
  const res = await internalApi.get("api/auth/me");

  return res.data.user;
};
