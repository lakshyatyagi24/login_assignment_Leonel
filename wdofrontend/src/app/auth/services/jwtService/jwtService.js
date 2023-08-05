import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import jwtServiceConfig from './jwtServiceConfig';

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid access_token');
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.signUp, data)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  };

  createCustomUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.createCustomUser, data)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  };

  generateRole = (data) => {
    let role = data.role;

    if (!role || role === '') {
      role = 'guest';
    }

    if (data.status === 'pending')
      role = 'pending'
    if (data.status === 'reject')
      role = 'reject';

    return role;
  }

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signIn, {
          email,
          password,
        })
        .then((response) => {
          var access_token = "";
          var user_data = response.data;
          this.setSession(user_data.access);
          var user = {
            "data": {
              "displayName": user_data.first_name + " " + user_data.last_name,
              "email": user_data.email,
              "photoUrl": "assets/images/avatars/brain-hughes.jpg",
              "settings": {
                "layout": {},
                "theme": {}
              },
              "shortcuts": [
                "apps.calendar",
                "apps.mailbox",
                "apps.contacts"
              ]
            },
            "from": "wdoinstitution",
            "role": this.generateRole(user_data),
            "uuid": access_token.user_id
          }
          resolve(user);
          this.emit('onLogin', user);
        })
        .catch((error) => {
          console.log(error);
          reject(error.response.msg);
        })
    });
  };

  signInWithToken = () => { 
    return new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.verifyToken, {
          token: this.getAccessToken(),
        })
        .then((response) => {
          var access_token = "";
          access_token = this.getAccessToken();
          this.setSession(this.getAccessToken());

          axios
            .get(jwtServiceConfig.getCurrentUser)
            .then((response) => {
              var user = {};
              console.log(response.data);
              user = {
                "data": {
                  "displayName": response.data.first_name + " " + response.data.last_name,
                  "email": response.data.email,
                  "photoUrl": "assets/images/avatars/brain-hughes.jpg",
                  "settings": {
                    "layout": {},
                    "theme": {}
                  },
                  "shortcuts": [
                    "apps.calendar",
                    "apps.mailbox",
                    "apps.contacts"
                  ]
                },
                "from": "wdoinstitution",
                "role": this.generateRole(response.data),
                "uuid": access_token.user_id
              }
              resolve(user);
            })
            .catch((error) => {
              this.logout();
              reject(new Error('Failed to login with token.'));
            })
        })
        .catch((error) => {
          this.logout();
          reject(new Error('Failed to login with token.'));
        });
    });
  };

  verify = (uid, token) => {
    return new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.userActivation, { uid, token })
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(new Error('Failed to user activation'))
        })
    });
  }

  updateUserData = (user) => {
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem('jwt_access_token', access_token);
      axios.defaults.headers.common.Authorization = `JWT ${access_token}`;
    } else {
      localStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit('onLogout', 'Logged out');
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };
}

const instance = new JwtService();

export default instance;
