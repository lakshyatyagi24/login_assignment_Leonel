const jwtServiceConfig = {
  signIn: 'api/auth/jwt/create/',
  signUp: 'api/auth/users/',
  accessToken: 'api/auth/access-token',
  updateUser: 'api/auth/user/update',
  refreshToken: 'api/auth/jwt/refresh/',
  verifyToken: 'api/auth/jwt/verify/',
  getCurrentUser: 'api/account/current_user/'
};

export default jwtServiceConfig;
