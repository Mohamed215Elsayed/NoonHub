import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { insertData } from "../../Hooks/useInsertData";
import { deleteData } from "../../Hooks/useDeleteData";
import { getDataWithToken } from "../../Hooks/useGetData";

// دالة مساعدة لتقليل تكرار الـ try-catch
const handleAsyncAction = async (actionFn, rejectWithValue) => {
  try {
    return await actionFn();
  } catch (error) {
    return rejectWithValue(error?.response?.data || error.message);
  }
};

export const addProductToWishList = createAsyncThunk(
  "wishLists/add",
  (body, { rejectWithValue }) =>
    handleAsyncAction(
      () => insertData("/api/v1/wishlist", body),
      rejectWithValue
    )
);

export const removeProductFromWishList = createAsyncThunk(
  "wishLists/remove",
  (prodID, { rejectWithValue }) =>
    handleAsyncAction(
      () => deleteData(`/api/v1/wishlist/${prodID}`),
      rejectWithValue
    )
);

export const getProductWishList = createAsyncThunk(
  "wishLists/getAll",
  (_, { rejectWithValue }) =>
    handleAsyncAction(
      () => getDataWithToken("/api/v1/wishlist"),
      rejectWithValue
    )
);
export const getProductWishListPage = createAsyncThunk(
  "wishLists/getAllPerPage",
  (page, { rejectWithValue }) =>
    handleAsyncAction(
      () => getDataWithToken(`/api/v1/wishlist?page=${page || 1}&limit=8`),
      rejectWithValue
    )
);
const wishListSlice = createSlice({
  name: "wishLists",
  initialState: {
    allWishList: [],
    loading: false,
    error: null,
    paginationResult: {},
  },
  reducers: {
    resetWishListError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.allWishList = action.payload?.data || [];
      })
      // 🟢 معالجة بيانات الترقيم عند طلب صفحة معينة
      .addCase(getProductWishListPage.fulfilled, (state, action) => {
        state.loading = false;
        state.allWishList = action.payload?.data || [];
        state.paginationResult = action.payload?.pagination || {};
      })
      .addCase(addProductToWishList.fulfilled, (state, action) => {
        state.loading = false;
        const newItem = action.payload?.data;
        if (newItem && !state.allWishList.find((i) => i._id === newItem._id)) {
          state.allWishList.push(newItem);
        }
      })
      .addCase(removeProductFromWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.allWishList = state.allWishList.filter(
          (item) => item._id !== action.meta.arg
        );
      })

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
          state.error = action.payload;
        }
      );
  },
});

export const { resetWishListError } = wishListSlice.actions;
export default wishListSlice.reducer;
