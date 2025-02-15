
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {},
    loading: true,
    error: null
  },
  reducers: {
    login: (state, action) => {
      state.userData = action.payload.data;
      state.error = action.payload.error;
      state.loading = false;
    },
    logout: (state) => {
      state.userData = {};
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;