import { SERVER_DOMAIN } from '@/config';
import { RootState } from '@/redux/store';
import { InitialState } from '@/types/initial-state';
import { Product } from '@/types/product';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  error: null,
  data: [],
} as InitialState<Product[]>;

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await fetch(`${SERVER_DOMAIN}/products`, {
      credentials: 'include',
    });
    return await res.json();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;

export const selectAllProducts = (state: RootState) => state.products.data;
