import { UserProfileDto } from '@/dtos/login';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: UserProfileDto | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfileDto>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;