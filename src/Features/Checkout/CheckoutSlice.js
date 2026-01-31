import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { insertData } from '../../Hooks/useInsertData';
// import { getDataWithToken } from '../../Hooks/useGetData';

export const createOrderCash = createAsyncThunk(
  'checkout/createOrderCash',
  async ({ cartId, body }, { rejectWithValue }) => {
    try {
      const response = await insertData(`/api/v1/orders/${cartId}`, body);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'فشل في إنشاء الطلب');
    }
  }
);
export const createOrderCard = createAsyncThunk(
  'checkout/createOrderCard',
  async ({ cartId, body }, { rejectWithValue }) => {
    try {
      const response = await insertData(
        `/api/v1/orders/checkout-session/${cartId}`,
        body
      );
      // console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'خطأ في عملية الدفع');
    }
  }
);
const CheckoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetCheckoutState: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* Create Order */
      .addCase(createOrderCash.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderCash.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrderCash.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createOrderCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderCard.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrderCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCheckoutState } = CheckoutSlice.actions;
export default CheckoutSlice.reducer;
