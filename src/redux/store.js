// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import signupReducer from './slice/signupSlice';
import loginReducer from './slice/loginSlice';
import eventReducer from './slice/eventSlice';

const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    event: eventReducer,
  },
});

export default store;
