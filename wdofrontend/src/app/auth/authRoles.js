/**
 * Authorization Roles
 */
const authRoles = {
  superadmin: ['superadmin'],
  admin: ['admin', 'superadmin'],
  employee: ['employee','admin', 'superadmin'],
  student: ['student','admin', 'superadmin'],
  guest: ['student', 'employee', 'admin', 'superadmin'],
  onlysuperadmin: ['superadmin'],
  onlyadmin: ['admin'],
  onlyemployee: ['employee'],
  onlystudent: ['student'],
  onlyguest: [],
};

export default authRoles;