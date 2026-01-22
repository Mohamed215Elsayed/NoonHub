import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { insertData } from '../../Hooks/useInsertData';
import { getDataWithToken } from '../../Hooks/useGetData';
import { deleteData } from '../../Hooks/useDeleteData';
import { updateData } from '../../Hooks/useUpdateData';

/* ================== Thunks ================== */
export const addProductToCart = createAsyncThunk(
  'cart/addProduct',
  async (body, { rejectWithValue }) => {
    try {
      return await insertData('/api/v1/cart', body);
    } catch (e) {
      return rejectWithValue(e?.response?.data?.message || 'فشل إضافة المنتج');
    }
  }
);

export const getAllUserCartItems = createAsyncThunk(
  'cart/getAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getDataWithToken('/api/v1/cart');
    } catch (e) {
      return rejectWithValue(e?.response?.data?.message || 'فشل جلب العربة');
    }
  }
);

export const clearAllCartItem = createAsyncThunk(
  'cart/clearAll',
  async (_, { rejectWithValue }) => {
    try {
      return await deleteData('/api/v1/cart');
    } catch (e) {
      return rejectWithValue(e?.response?.data?.message || 'فشل مسح العربة');
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteItem',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteData(`/api/v1/cart/${id}`);
    } catch (e) {
      return rejectWithValue(e?.response?.data?.message || 'فشل حذف المنتج');
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateItem',
  async ({ id, body }, { rejectWithValue }) => {
    try {
      return await updateData(`/api/v1/cart/${id}`, body);
    } catch (e) {
      return rejectWithValue(
        e?.response?.data?.message || 'حدث خطأ أثناء تحديث الكمية'
      );
    }
  }
);
export const applyCouponCart = createAsyncThunk(
  'cart/applyCoupon',
  async (body, { rejectWithValue }) => {
    try {
      return await updateData('/api/v1/cart/applyCoupon', body);
    } catch (e) {
      return rejectWithValue(
        e?.response?.data?.message || 'الكوبون غير صحيح أو منتهي'
      );
    }
  }
);
/* ================== Slice ================== */
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    numOfCartItems: 0,
    totalCartPrice: 0,
    totalPriceAfterDiscount: 0,
    cartId: null,
    loading: false,
    error: null,
    appliedCoupon: null, // ✅
  },
  reducers: {
    resetCartError: (state) => {
      state.error = null;
    },
    clearCartState: (state) => {
      state.cartItems = [];
      state.numOfCartItems = 0;
      state.totalCartPrice = 0;
      state.totalPriceAfterDiscount = 0;
      state.cartId = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* -------- fulfilled -------- */
      .addCase(getAllUserCartItems.fulfilled, (state, action) => {
        const data = action.payload?.data;
        if (!data) return;
        state.cartItems = data.cartItems;
        state.numOfCartItems = action.payload.numOfCartItems;
        state.totalCartPrice = data.totalCartPrice;
        state.totalPriceAfterDiscount = data.totalPriceAfterDiscount || 0;
        state.cartId = data._id;
        state.loading = false;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        const data = action.payload?.data;
        if (!data) return;
        state.cartItems = data.cartItems;
        state.numOfCartItems = action.payload.numOfCartItems;
        state.totalCartPrice = data.totalCartPrice;
        state.cartId = data._id;
        state.loading = false;
      })
      .addCase(clearAllCartItem.fulfilled, (state) => {
        state.cartItems = [];
        state.numOfCartItems = 0;
        state.totalCartPrice = 0;
        state.totalPriceAfterDiscount = 0;
        state.cartId = null;
        state.loading = false;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        const data = action.payload?.data;
        if (!data) return;
        state.cartItems = data.cartItems;
        state.numOfCartItems = action.payload.numOfCartItems;
        state.totalCartPrice = data.totalCartPrice;
        state.totalPriceAfterDiscount = data.totalPriceAfterDiscount || 0;
        state.loading = false;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const data = action.payload?.data;
        if (!data) return;
        state.cartItems = data.cartItems;
        state.totalCartPrice = data.totalCartPrice;
        state.totalPriceAfterDiscount = data.totalPriceAfterDiscount || 0;
        state.loading = false;
      })
      .addCase(applyCouponCart.fulfilled, (state, action) => {
        const data = action.payload?.data;
        if (!data) return;
        state.totalPriceAfterDiscount = data.totalPriceAfterDiscount;
        state.appliedCoupon = action.meta.arg.coupon; // ✅ الكوبون اللي المستخدم دخله بنجيب الكوبون من meta.arg لأن الـ backend مش بيرجّعه.
        state.loading = false;
      })
      /* -------- Matchers (Pending & Rejected) -------- */
      .addMatcher(
        isAnyOf(
          addProductToCart.pending,
          getAllUserCartItems.pending,
          clearAllCartItem.pending,
          deleteCartItem.pending,
          updateCartItem.pending,
          applyCouponCart.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          addProductToCart.rejected,
          getAllUserCartItems.rejected,
          clearAllCartItem.rejected,
          deleteCartItem.rejected,
          updateCartItem.rejected,
          applyCouponCart.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { resetCartError, clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
