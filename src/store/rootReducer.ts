import {combineReducers} from '@reduxjs/toolkit';
import authSlice from '@/features/auth/slice';
import userSlice from '@/features/user/slice';
import appSlice from '@/features/app/slice';

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  app: appSlice,
});

export default rootReducer;
