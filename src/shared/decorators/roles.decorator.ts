import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/shared/types/enum/roles.enum';

export const ROLES_KEY = 'roles';
export const RolesAllowed = (...roles: Roles[]) =>
  SetMetadata(ROLES_KEY, roles);
