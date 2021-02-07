import { Module } from 'vuex';
import { RootState, AuthState } from './interfaces';
import { userService } from '../services';
import router from '../router';

let initialState = {
  loggingIn: false,
  loggedIn: false,
  user: undefined,
  token: '',
}

const storaged = localStorage.getItem('user');

if (storaged) {
  const user = JSON.parse(storaged);
  const token = localStorage.getItem('token') || '';
  if (user) {
    initialState = {
      loggingIn: false,
      loggedIn: true,
      user,
      token,
    };
  }
}

export const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state: initialState,
  actions: {
    signup({ dispatch, commit }, { email, password }): void {
      userService.register(email, password).then(
        (user) => {
          userService.login(email, password).then(
            (user) => {
              commit('loginRequest', { email });
              commit('loginSuccess', user);
              router.push('/');
            },
            (error: Error) => {
              commit('loginFailure', error);
              dispatch('alert/error', error, { root: true });
            },
          );
        },
        (error: Error) => {
          dispatch('alert/error', error, { root: true });
        },
      );
    },
    login({ dispatch, commit }, { email, password }): void {
      commit('loginRequest', { email });
      userService.login(email, password).then(
        (user) => {
          commit('loginSuccess', user);
          router.push('/');
        },
        (error: Error) => {
          commit('loginFailure', error);
          dispatch('alert/error', error, { root: true });
        },
      );
    },
    logout({ commit }): void {
      userService.logout();
      commit('logout');
    },
  },
  mutations: {
    loginRequest(state, user): void {
      state.loggingIn = true;
      state.user = user;
    },
    loginSuccess(state, user): void {
      state.loggedIn = true;
      state.user = user;
    },
    loginFailure(state): void {
      state.loggingIn = false;
      state.loggedIn = false;
      state.user = undefined;
    },
    logout(state): void {
      state.loggingIn = false;
      state.loggedIn = false;
      state.user = undefined;
    },
  },
};
