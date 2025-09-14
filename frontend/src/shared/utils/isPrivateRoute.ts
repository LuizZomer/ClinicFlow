import { privateRoutes } from "../config/secure/privateRoutes";

export function isPrivateRoute(pathname: string): boolean {
  return privateRoutes.some((route) => route.path === pathname);
}
