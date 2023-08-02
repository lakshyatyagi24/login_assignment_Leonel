const jwtServiceConfig = {
  signIn: 'api/auth/jwt/create/',
  signUp: 'api/auth/users/',
  accessToken: 'api/auth/access-token',
  updateUser: 'api/auth/user/update',
  refreshToken: 'api/auth/jwt/refresh/',
  verifyToken: 'api/auth/jwt/verify/',
  getMe: 'api/auth/users/me/'
};

export default jwtServiceConfig;
