import { externalApi } from "@/shared/config/api/externalApi.config";

export const externalValidation = async (token: string) => {
  await externalApi.get("/auth/validation", {
    headers: {
      Cookie: `auth=${token}`,
    },
  });
};
