import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "./shared/utils/decodeJwt";
import { Roles } from "./shared/types/enum/roles";
import { externalValidation } from "./features/auth/services/external/validation";
import { privateRoutes } from "./shared/config/secure/privateRoutes";
import { isPrivateRoute } from "./shared/utils/isPrivateRoute";

function userHasAccessToPath(pathname: string, userRole: Roles): boolean {
  const matchedRoute = privateRoutes.find((route) => route.path === pathname);
  return matchedRoute?.roles.includes(userRole) ?? false;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  if (!token && isPrivateRoute(pathname)) {
    return NextResponse.redirect("/login");
  }

  if (token && isPrivateRoute(pathname)) {
    const user = decodeJwt(token);

    if (user && userHasAccessToPath(pathname, user.role as Roles)) {
      try {
        console.log("validando token externo");
        await externalValidation(token);
        console.log("token externo validado");
      } catch {
        return NextResponse.redirect(new URL("/auth", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
