import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { insertData } from "../../Hooks/useInsertData";
import { getDataWithToken } from "../../Hooks/useGetData";
import { deleteData } from "../../Hooks/useDeleteData";
import { updateData } from "../../Hooks/useUpdateData";

const handleAsyncAction = async (actionFn, rejectWithValue) => {
  try {
    return await actionFn();
  } catch (error) {
    return rejectWithValue(error?.response?.data || error.message);
  }
};

// 1. إضافة كوبون
export const createCoupon = createAsyncThunk(
  "coupons/create",
  (body, { rejectWithValue }) =>
    handleAsyncAction(
      () => insertData("/api/v1/coupons", body),
      rejectWithValue
    )
);

// 2. جلب كل الكوبونات
export const getAllCoupons = createAsyncThunk(
  "coupons/getAll",
  (_, { rejectWithValue }) =>
    handleAsyncAction(
      () => getDataWithToken("/api/v1/coupons"),
      rejectWithValue
    )
);

// 3. حذف كوبون
export const removeCoupon = createAsyncThunk(
  "coupons/delete",
  (id, { rejectWithValue }) =>
    handleAsyncAction(
      () => deleteData(`/api/v1/coupons/${id}`),
      rejectWithValue
    )
);

// 4. تعديل كوبون
export const updateCoupon = createAsyncThunk(
  "coupons/update",
  ({ id, body }, { rejectWithValue }) =>
    handleAsyncAction(
      () => updateData(`/api/v1/coupons/${id}`, body),
      rejectWithValue
    )
);
export const getOneCoupon = createAsyncThunk(
  "coupons/getOne",
  (id, { rejectWithValue }) =>
    handleAsyncAction(
      () => getDataWithToken(`/api/v1/coupons/${id}`),
      rejectWithValue
    )
);

const CouponSlice = createSlice({
  name: "coupons",
  initialState: {
    coupons: [],
    oneCoupon: null,
    loading: false,
    error: null,
    createStatus: null,
  },
  reducers: {
    resetCouponStatus: (state) => {
      state.createStatus = null;
      state.error = null;
      state.oneCoupon = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // جلب الكل
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload?.data || [];
      })
      // إضافة كوبون
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.createStatus = 201;
        state.coupons.unshift(action.payload.data); // إضافة في بداية القائمة بدل عمل Reload
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.createStatus = action.payload?.status || 400;
        state.error = action.payload;
      })
      // حذف كوبون
      .addCase(removeCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = state.coupons.filter((c) => c._id !== action.meta.arg);
      })
      .addCase(getOneCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.oneCoupon = action.payload?.data || null;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.createStatus = 200;
        // تحديث الكوبون في القائمة دون عمل Reload
        const index = state.coupons.findIndex(c => c._id === action.payload.data._id);
        if (index !== -1) {
          state.coupons[index] = action.payload.data;
        }
      })
      // Matchers للتحميل والأخطاء العامة
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          // state.error = action.payload;
        }
      );
  },
});

export const { resetCouponStatus } = CouponSlice.actions;
export default CouponSlice.reducer;
