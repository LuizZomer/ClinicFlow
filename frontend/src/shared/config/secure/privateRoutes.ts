import { Roles } from "@/shared/types/enum/roles";

export const privateRoutes = [
  { path: "/appointment", roles: [Roles.OPERATOR, Roles.ADMIN] },
];
