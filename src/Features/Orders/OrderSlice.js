import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDataWithToken } from '../../Hooks/useGetData';
import { updateData } from '../../Hooks/useUpdateData';
import { deleteData } from '../../Hooks/useDeleteData';

export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async ({ page = 1, limit }, { rejectWithValue }) => {
    try {
      const response = await getDataWithToken(
        `/api/v1/orders?page=${page}&limit=${limit}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'فشل في تحميل الطلبات');
    }
  }
);

export const getOneOrder = createAsyncThunk(
  'orders/getOneOrder',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getDataWithToken(`/api/v1/orders/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'فشل في تحميل الطلب');
    }
  }
);

export const changeOrderPay = createAsyncThunk(
  'orders/changeOrderPay',
  async (id, { rejectWithValue }) => {
    try {
      const response = await updateData(`/api/v1/orders/${id}/pay`);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || 'فشل في تحديث حالة الدفع'
      );
    }
  }
);

export const changeOrderDeliver = createAsyncThunk(
  'orders/changeOrderDeliver',
  async (id, { rejectWithValue }) => {
    try {
      const response = await updateData(`/api/v1/orders/${id}/deliver`);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || 'فشل في تحديث حالة التوصيل'
      );
    }
  }
);
export const removeOrder = createAsyncThunk(
  'orders/removeOrder',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteData(`/api/v1/orders/${id}`);
      return { id, message: response.message };
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'فشل في حذف الطلب');
    }
  }
);
const OrderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: {
      data: [],
      pagination: {},
    },
    orderDetails: null,
    loading: false,
    loadingChange: false,
    results: 0,
    error: null,
  },

  reducers: {
    resetOrders: (state) => {
      state.orders.data = [];
      state.orders.pagination = {};
      state.orderDetails = null;
      state.results = 0;
      state.loading = false;
      state.loadingChange = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.data = action.payload.data || [];
        state.orders.pagination = action.payload.pagination || {};
        state.results = action.payload.results || 0;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getOneOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload.data || null;
      })
      .addCase(getOneOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(changeOrderPay.pending, (state) => {
        state.loadingChange = true;
      })
      .addCase(changeOrderPay.fulfilled, (state) => {
        state.loadingChange = false;
      })
      .addCase(changeOrderPay.rejected, (state, action) => {
        state.loadingChange = false;
        state.error = action.payload;
      })

      .addCase(changeOrderDeliver.pending, (state) => {
        state.loadingChange = true;
      })
      .addCase(changeOrderDeliver.fulfilled, (state) => {
        state.loadingChange = false;
      })
      .addCase(changeOrderDeliver.rejected, (state, action) => {
        state.loadingChange = false;
        state.error = action.payload;
      })
      .addCase(removeOrder.pending, (state) => {
        state.loadingChange = true;
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.loadingChange = false;
        state.orders.data = state.orders.data.filter(
          (order) => order._id !== action.payload.id
        );
        state.results -= 1;
      })
      .addCase(removeOrder.rejected, (state, action) => {
        state.loadingChange = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrders } = OrderSlice.actions;
export default OrderSlice.reducer;
