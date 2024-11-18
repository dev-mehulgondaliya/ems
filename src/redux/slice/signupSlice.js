import { createSlice } from '@reduxjs/toolkit';
import { commonApiCall, createExtraReducer } from '../../utils/helper';

const initialState = {
  data: {},
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  response: null,
};

export const signupUser = commonApiCall('signup/signupUser', 'signup', false); // thunkName | apiName | auth
export const adminSignup = commonApiCall('signup/adminSignup', 'adminSignup', false); // thunkName | apiName | auth

const signupSlice = createSlice({
  name: 'signupSlice',
  initialState,
  reducers: {
    setSignupForm(state, action) {
      state.data = action.payload;
    },
    clearSignupForm(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    createExtraReducer(builder, signupUser);
    createExtraReducer(builder, adminSignup);
  },
});

export const { setSignupForm, clearSignupForm } = signupSlice.actions;

export default signupSlice.reducer;
