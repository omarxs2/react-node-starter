import { createSlice } from '@reduxjs/toolkit'
import authService from '../../services/authService';
import { showMessage } from '../../app/views/store/messageSlice';

export const submitLogin = (credentials) => async dispatch => {
  return authService.login(credentials).then(res => {
    if (res.response && res.response.token) {
      localStorage.setItem('token', res.response.token);
      dispatch(showMessage({ message: 'Welcome to Eduturk Dashboard', variant: 'success' }));
      return dispatch(loginSuccess(res.response));
    }
    return false;
  }).catch(errors => {
    return false;
  });
};

export const resetPass = (credentials, role) => async dispatch => {
  return authService.resetPass(credentials, role).then(res => {
    if (res.response && res.response.success) {
      return true;
    }
  }).catch(errors => {
    return false;
  });
};

const initialState = {
  token: null,
  user: null,
  errors: null
}

export const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;

    },
    loginError: (state, action) => {
      state.errors = action.payload;
    },
    deleteToken: (state) => {
      state.token = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginSuccess, loginError, deleteToken } = loginSlice.actions

export default loginSlice.reducer;