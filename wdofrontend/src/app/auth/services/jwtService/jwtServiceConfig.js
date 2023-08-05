const jwtServiceConfig = {
  signIn: 'api/account/signin/',
  signUp: 'api/account/signup/',
  accessToken: 'api/auth/access-token',
  updateUser: 'api/auth/user/update',
  refreshToken: 'api/auth/jwt/refresh/',
  verifyToken: 'api/auth/jwt/verify/',
  getCurrentUser: 'api/account/current_user/',
  getControllableUsers: '/api/account/get_controllable_users/',
  userActivation: 'api/account/email_verify/',
  createCustomUser: 'api/account/create_custom_user/',
  changeUserStatus: 'api/account/change_status/'
};

export default jwtServiceConfig;
