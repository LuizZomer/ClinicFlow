import { decodeJwt } from "@/shared/utils/decodeJwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  let user: JwtPayloadWithUser | null = null;

  if (token) user = decodeJwt(token);

  return NextResponse.json({
    user: {
      name: user?.name,
      sub: user?.sub,
      role: user?.role,
      iat: user?.iat,
      exp: user?.exp,
    },
  });
}
