import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../Hooks/useGetData";
import { insertData } from "../../Hooks/useInsertData";
import { updateData } from '../../Hooks/useUpdateData';
import { deleteData } from '../../Hooks/useDeleteData';

export const getAllCategory = createAsyncThunk(
  'category/getAll',
  async (limit, { rejectWithValue }) => {
    try {
      return await getData(`/api/v1/categories?limit=${limit}`);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'حدث خطأ أثناء الجلب');
    }
  }
);

export const getAllCategoryPage = createAsyncThunk(
  'category/getPage',
  async (page, { rejectWithValue }) => {
    try {
      return await getData(`/api/v1/categories?limit=6&page=${page}`);
    } catch (error) {
      return rejectWithValue(error.response?.data || 'حدث خطأ أثناء الانتقال');
    }
  }
);

export const createCategory = createAsyncThunk(
  'category/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await insertData(`/api/v1/categories`, formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'فشلت عملية الإضافة');
    }
  }
);
export const getOneCategory = createAsyncThunk(
  'category/getOneCategory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getData(`/api/v1/categories/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const updateCategory = createAsyncThunk(
  'ategory/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await updateData(`/api/v1/categories/${id}`, formData);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'فشلت عملية التعديل');
    }
  }
);
export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (id, { rejectWithValue }) => {
    try {
      const res = await deleteData(`/api/v1/categories/${id}`);
      return { id, res };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'فشلت عملية الحذف');
    }
  }
);
const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    category: { data: [] },
    loading: false,
    error: null,
    status: null,
    oneCategory: {},
  },
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /**************getAllCategory*/
      .addCase(getAllCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loading = false;
        // state.category = action.payload;
        state.category = action.payload?.data ? action.payload : { data: [] };
        state.error = null;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /********getAllCategoryPage**********/
      .addCase(getAllCategoryPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategoryPage.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload?.data ? action.payload : { data: [] };
        state.error = null;
      })
      .addCase(getAllCategoryPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /****************createCategory**/
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status || 201;
        const newCategory = action.payload?.data;
        if (newCategory && state.category?.data) {
          state.category.data.unshift(newCategory); // أفضل من push for fetch data and create data in same time
        }
        // if (state.category?.data) {
        //   state.category.data.push(action.payload.data);
        // }
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload?.status || 400;
        state.error = action.payload;
      })
      /************getOneCategory */
      .addCase(getOneCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneCategory.fulfilled, (state, action) => {
        state.oneCategory = action.payload;
        state.loading = false;
      })
      .addCase(getOneCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /************ updateCategory */
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status || 200;
        const updatedCategory = action.payload?.data;
        if (updatedCategory && state.category?.data) {
          const index = state.category.data.findIndex(
            (cat) => cat._id === updatedCategory._id
          );
          if (index !== -1) {
            state.category.data[index] = updatedCategory;
          }
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload?.status || 400;
        state.error = action.payload;
      })
      /************ deleteCategory */
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload?.status || 200;
        const id = action.payload.id;
        if (state.category?.data) {
          state.category.data = state.category.data.filter(
            (cat) => cat._id !== id
          );
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload?.status || 400;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = categorySlice.actions;
export default categorySlice.reducer;
