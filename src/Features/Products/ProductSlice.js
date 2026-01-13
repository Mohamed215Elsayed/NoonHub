import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { insertData } from "../../Hooks/useInsertData";
import { getData } from "../../Hooks/useGetData";
import { deleteData } from "../../Hooks/useDeleteData";
import { updateData } from "../../Hooks/useUpdateData";
// --- Thunks ---
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, { rejectWithValue }) => {
    try {
      return await insertData("/api/v1/products", formData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (limit, { rejectWithValue }) => {
    try {
      return await getData(`/api/v1/products?limit=${limit}`);
    } catch (error) {
      return rejectWithValue(error?.response?.data || "خطأ في الجلب");
    }
  }
);

export const getAllProductsPage = createAsyncThunk(
  "products/getAllPage",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      return await getData(`/api/v1/products?page=${page}&limit=${limit}`);
    } catch (error) {
      return rejectWithValue(error?.response?.data || "خطأ في الجلب");
    }
  }
);

export const getOneProduct = createAsyncThunk(
  "products/getOne",
  async (id, { rejectWithValue }) => {
    try {
      return await getData(`/api/v1/products/${id}`);
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  }
);
export const getProductLike = createAsyncThunk(
  "products/getLike",
  async (id, { rejectWithValue }) => {
    try {
      return await getData(`/api/v1/products?category=${id}`);
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteData(`/api/v1/products/${id}`);
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const updateProducts = createAsyncThunk(
  "products/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await updateData(`/api/v1/products/${id}`, formData);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "فشل التعديل للمنتج");
    }
  }
);
export const getAllProductsSearch = createAsyncThunk(
  "products/getAllSearch",
  async (queryString, { rejectWithValue }) => {
    try {
      const query = queryString ? `?${queryString}` : "";
      const response = await getData(`/api/v1/products${query}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// --- Initial State ---
const initialState = {
  allProducts: { data: [], pagination: {}, results: 0 },
  oneProduct: { data: {} },
  products: {}, //for creation
  productLike: { data: [] },
  //   deleteProducts: [],
  updateProducts: { data: [] },
  loading: false,
  error: null,
  status: null,
};

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 1. جلب كل المنتجات
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      // 2. جلب صفحة معينة (Pagination)
      .addCase(getAllProductsPage.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      // 3. جلب منتج واحد
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.oneProduct = { data: action.payload.data };
      })
      // 4. إنشاء منتج
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = action.payload.status;
      })
      //منتجات قد تعجبك  لها نفس التصنيف5.
      .addCase(getProductLike.fulfilled, (state, action) => {
        state.productLike = action.payload;
      })
      // 6. حذف منتج (تحديث لحظي)
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.status = action.payload?.status;
        if (state.allProducts?.data) {
          state.allProducts.data = state.allProducts.data.filter(
            (item) => item._id !== action.meta.arg
          );
          state.allProducts.results = Math.max(
            0,
            state.allProducts.results - 1
          );
        }
      })
      // --- تعديل حالة التعديل (Update) ---
      .addCase(updateProducts.fulfilled, (state, action) => {
        state.status = action.payload?.status;
        state.updateProducts = action.payload;
        state.oneProduct = { data: action.payload.data };
        if (state.allProducts?.data) {
          state.allProducts.data = state.allProducts.data.map((item) =>
            item._id === action.payload.data?._id ? action.payload.data : item
          );
        }
      })
      .addCase(getAllProductsSearch.fulfilled, (state, action) => {
        state.allProducts = action.payload;
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
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { resetStatus } = ProductSlice.actions;
export default ProductSlice.reducer;
/*=================================================*/
// const initialState = {
//   products: [], //for create
//   allProducts: [], //for getting all or page
//   oneProduct: {}, //for one product detail
//   productLike: [], //for the same category or any thing that i choose
//   deleteProducts: [],
//   loading: false,
//   error: null,
//   status: null,
// };
