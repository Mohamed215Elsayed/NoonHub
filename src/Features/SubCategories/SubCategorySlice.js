import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { insertData } from "../../Hooks/useInsertData";
import { getData } from "../../Hooks/useGetData";
/* ==============================
   Thunks
================================ */
// Create sub category
export const createSubCategory = createAsyncThunk(
  "subCategory/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await insertData("/api/v1/subcategories", data);
      return res?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "حدث خطأ أثناء إضافة التصنيف الفرعي"
      );
    }
  }
);

// Get sub categories by category
export const getSubCategoryOnCategory = createAsyncThunk(
  "subCategory/getOnCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const res = await getData(
        `/api/v1/categories/${categoryId}/subcategories`
      );
      return res?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "حدث خطأ أثناء جلب التصنيفات الفرعية"
      );
    }
  }
);
/* ==============================
   Initial State
================================ */

const initialState = {
  subCategories: [],
  subCategoriesByCategory: [],
  loading: false,
  error: null,
};

/* ==============================
   Slice
================================ */

const subCategorySlice = createSlice({
  name: "subCategories",
  initialState,
  reducers: {
    clearSubCategoryError: (state) => {
      state.error = null;
    },
    resetSubCategoriesByCategory: (state) => {
      state.subCategoriesByCategory = [];
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- Create SubCategory ---------- */
      .addCase(createSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories.push(action.payload);
      })
      .addCase(createSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- Get SubCategory On Category ---------- */
      .addCase(getSubCategoryOnCategory.pending, (state) => {
        state.loading = true;
        state.subCategoriesByCategory = [];
        state.error = null;
      })
      .addCase(getSubCategoryOnCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategoriesByCategory = action.payload || [];
      })
      .addCase(getSubCategoryOnCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubCategoryError, resetSubCategoriesByCategory } =
  subCategorySlice.actions;

export default subCategorySlice.reducer;
