import { externalLogin } from "@/features/auth/services/external/login";
import { decodeJwt } from "@/shared/utils/decodeJwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { document, password } = await req.json();

  console.log(document, password);

  const { accessToken } = await externalLogin({ document, password });

  const user = decodeJwt(accessToken);

  const cookiesStore = await cookies();

  cookiesStore.set({
    name: "token",
    value: accessToken,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 2, // 2 days,
    sameSite: "lax",
    secure: false,
  });

  return NextResponse.json({ message: "Logado com sucesso!", user });
}
