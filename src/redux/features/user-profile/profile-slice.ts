import { SERVER_DOMAIN } from '@/config';
import { RootState } from '@/redux/store';
import { InitialState } from '@/types/initial-state';
import { User } from '@/types/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  error: null,
  data: {
    name: 'Loading...',
    email: 'loading...',
  },
} as InitialState<User>;

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const res = await fetch(`${SERVER_DOMAIN}/profile`, {
      credentials: 'include',
    });

    return await res.json();
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;

export const selectProfile = (state: RootState) => state.profile.data;
