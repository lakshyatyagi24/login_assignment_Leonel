/**
 * Authorization Roles
 */
const authRoles = {
  boss: ['boss'],
  ceo: ['ceo', 'boss'],
  superadmin: ['superadmin', 'ceo', 'boss'],
  admin: ['admin', 'superadmin', 'ceo', 'boss'],
  manager: [ 'manager', 'admin', 'superadmin', 'ceo', 'boss'],
  teamleader: ['teamleader', 'manager', 'admin', 'superadmin', 'ceo', 'boss'],
  employee: ['employee','teamleader', 'manager', 'admin', 'superadmin', 'ceo', 'boss'],
  teacher: ['teacher', 'employee','teamleader', 'manager', 'admin', 'superadmin', 'ceo', 'boss'],
  others: ['others','teacher', 'employee','teamleader', 'manager', 'admin', 'superadmin', 'ceo', 'boss'],
  onlyboss: ['boss'],
  onlyceo: ['ceo'],
  onlysuperadmin: ['superadmin'],
  onlyadmin: ['admin'],
  onlymanager: [ 'manager'],
  onlyteamleader: ['teamleader'],
  onlyemployee: ['employee'],
  onlyteacher: ['teacher'],
  onlyothers: ['others'],
  onlyguest: [],
};

export default authRoles;