import type { UserDTO } from '@dto/user.dto';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  profile: UserDTO | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // fetch user profile
    fetchProfileStart: state => {
      state.isLoading = true;
      state.error = null;
    },

    fetchProfileSuccess: (state, action: PayloadAction<UserDTO>) => {
      state.isLoading = false;
      state.profile = action.payload;
      state.error = null;
    },

    fetchProfileFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // update user profile
    updateProfileStart: state => {
      state.isLoading = true;
      state.error = null;
    },

    updateProfileSuccess: (state, action: PayloadAction<UserDTO>) => {
      state.isLoading = false;
      state.profile = action.payload;
      state.error = null;
    },

    updateProfileFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // clear user profile
    clearProfile: state => {
      state.profile = null;
      state.isLoading = false;
      state.error = null;
    },

    // clear error
    clearUserError: state => {
      state.error = null;
    },
  },
});

export const {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  clearProfile,
  clearUserError,
} = userSlice.actions;

export default userSlice.reducer;
