import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteData } from "../../Hooks/useDeleteData";
import { updateData } from "../../Hooks/useUpdateData";
import { insertData } from "../../Hooks/useInsertData";
import { getDataWithToken } from "../../Hooks/useGetData";
//create review on product
export const createReview = createAsyncThunk(
  "review/createReview",
  async ({ prodID, body }, { rejectWithValue }) => {
    try {
      return await insertData(`/api/v1/products/${prodID}/reviews`, body);
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Get All Reviews For Product
export const getAllReviewProduct = createAsyncThunk(
  "review/getAllReviewProduct",
  async ({ prodID, page, limit }, { rejectWithValue }) => {
    try {
      return await getDataWithToken(
        `/api/v1/products/${prodID}/reviews?page=${page}&limit=${limit}`
      );
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Delete Review
export const deleteReviewOnProduct = createAsyncThunk(
  "review/deleteReviewOnProduct",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteData(`/api/v1/reviews/${id}`);
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "فشل حذف التقييم" }
      );
    }
  }
);

// Update Review
export const updateReviewOnProduct = createAsyncThunk(
  "review/updateReviewOnProduct",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      return await updateData(`/api/v1/reviews/${id}`, body);
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "فشل تعديل التقييم" }
      );
    }
  }
);
const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    createReviewRes: null,

    allReviewProduct: [],
    pagination: null,

    deleteReviewRes: null,
    updateReviewRes: null,

    loadingCreate: false,
    loadingGet: false,
    loadingDelete: false,
    loadingUpdate: false,

    error: null,
  },
  reducers: {
    resetCreateReview(state) {
      state.createReviewRes = null;
      state.error = null;
    },
    resetUpdateReview(state) {
      state.updateReviewRes = null;
      state.error = null;
    },
    updateReviewLocally(state, action) {
      state.allReviewProduct = state.allReviewProduct.map((r) =>
        r._id === action.payload._id ? action.payload : r
      );
    },
  },
  extraReducers: (builder) => {
    builder

      /* Create Review */
      .addCase(createReview.pending, (state) => {
        state.loadingCreate = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loadingCreate = false;
        state.createReviewRes = action.payload;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loadingCreate = false;
        state.error = action.payload;
      })

      /* Get All Reviews */
      .addCase(getAllReviewProduct.pending, (state) => {
        state.loadingGet = true;
        state.error = null;
      })
      .addCase(getAllReviewProduct.fulfilled, (state, action) => {
        state.loadingGet = false;
        state.allReviewProduct = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllReviewProduct.rejected, (state, action) => {
        state.loadingGet = false;
        state.error = action.payload;
      })

      /* Delete Review */
      .addCase(deleteReviewOnProduct.pending, (state) => {
        state.loadingDelete = true;
      })
      .addCase(deleteReviewOnProduct.fulfilled, (state, action) => {
        state.loadingDelete = false;
        state.deleteReviewRes = action.payload;
        // حذف التقييم من القائمة مباشرة
        state.allReviewProduct = state.allReviewProduct.filter(
          (review) => review._id !== action.meta.arg
        );
      })
      .addCase(deleteReviewOnProduct.rejected, (state, action) => {
        state.loadingDelete = false;
        state.error = action.payload;
      })

      /* Update Review */
      .addCase(updateReviewOnProduct.pending, (state) => {
        state.loadingUpdate = true;
      })

      // .addCase(updateReviewOnProduct.fulfilled, (state, action) => {
      //   state.loadingUpdate = false;
      //   state.updateReviewRes = action.payload;

      //   // تحديث المصفوفة فوراً بالبيانات الجديدة
      //   state.allReviewProduct = state.allReviewProduct.map((review) =>
      //     review._id === action.meta.arg.id
      //       ? { ...review, ...action.meta.arg.body } // ندمج التعديلات (title, ratings)
      //       : review
      //   );
      // })
      // داخل extraReducers في مبرد (builder) التحديث
      .addCase(updateReviewOnProduct.fulfilled, (state, action) => {
        state.loadingUpdate = false;
        // تحديث المراجعة المحددة داخل المصفوفة فوراً
        // action.meta.arg يحتوي على البيانات التي أرسلتها (id, body)
        state.allReviewProduct = state.allReviewProduct.map((item) =>
          item._id === action.meta.arg.id
            ? {
                ...item,
                title: action.meta.arg.body.title,
                ratings: action.meta.arg.body.ratings,
              }
            : item
        );
      })

      .addCase(updateReviewOnProduct.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.error = action.payload;
      });
  },
});
export const { resetCreateReview, resetUpdateReview, updateReviewLocally } =
  reviewSlice.actions;
export default reviewSlice.reducer;
