import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../Hooks/useGetData";
import { insertData } from "../../Hooks/useInsertData";

export const getAllBrand = createAsyncThunk(
  "brand/getAll",
  async (limit, { rejectWithValue }) => {
    try {
      return await getData(`/api/v1/brands?limit=${limit}`);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || " حدث خطأ أثناء جلب البيانات"
      );
    }
  }
);
export const getAllBrandPage = createAsyncThunk(
  "brand/getPage",
  async (page, { rejectWithValue }) => {
    try {
      return await getData(`/api/v1/brands?limit=6&page=${page}`);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || " حدث خطأ أثناء جلب البيانات"
      );
    }
  }
);
export const createBrand = createAsyncThunk(
  "brand/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await insertData(`/api/v1/brands`, formData);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "فشلت عملية الإضافة");
    }
  }
);
export const getOneBrand = createAsyncThunk(
  "brand/getOneBrand",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getData(`/api/v1/brands/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
const brandSlice = createSlice({
  name: "brands",
  initialState: {
    brand: { data: [] },
    loading: false,
    error: null,
    status: null,
    oneBrand: {},
  },
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /************** getAllBrand*/
      .addCase(getAllBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brand = action.payload?.data ? action.payload : { data: [] };
        state.error = null;
      })
      .addCase(getAllBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /**************getAllBrandPage*/
      .addCase(getAllBrandPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBrandPage.fulfilled, (state, action) => {
        state.loading = false;
        state.brand = action.payload?.data ? action.payload : { data: [] };
        state.error = null;
      })
      .addCase(getAllBrandPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /**************createBrand*/
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status || 201;
        const newBrand = action.payload?.data;
        if (action.payload?.data && state.brand?.data) {
          state.brand.data.unshift(newBrand);
        }
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload?.status || 400;
        state.error = action.payload;
      })
      /**************getOneBrand**/
      .addCase(getOneBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneBrand.fulfilled, (state, action) => {
        state.oneBrand = action.payload;
        state.loading = false;
      })
      .addCase(getOneBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    /*************** */
  },
});
export const { resetStatus } = brandSlice.actions;
export default brandSlice.reducer;
