// import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { ApiBearerAuth } from '@nestjs/swagger';

// import { RolePermissionMetDataKey } from '../../app/auth/config/role-permission.config';
// import { RolePermissionGuard } from '../../app/auth/guard/permission.guard';
// import { UserRole } from '../../app/user/enum/role.enum';

// export const UserRolePermission = (...roles: UserRole[]) => {
//   return applyDecorators(
//     ApiBearerAuth(),
//     SetMetadata(RolePermissionMetDataKey, roles),
//     UseGuards(AuthGuard('jwt'), RolePermissionGuard),
//   );
// };
