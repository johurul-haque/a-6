import { SERVER_DOMAIN } from '@/config';
import { RootState } from '@/redux/store';
import { InitialState } from '@/types/initial-state';
import { User } from '@/types/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  error: null,
  data: {},
} as InitialState<User>;

export const fetchProfile = createAsyncThunk(
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
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;

export const selectProfile = (state: RootState) => state.profile.data;
