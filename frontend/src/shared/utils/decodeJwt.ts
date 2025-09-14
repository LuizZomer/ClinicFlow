import jwt from "jsonwebtoken";

export const decodeJwt = (token: string): JwtPayloadWithUser | null => {
  try {
    const decoded = jwt.decode(token) as unknown as JwtPayloadWithUser;
    return decoded;
  } catch {
    return null;
  }
};
