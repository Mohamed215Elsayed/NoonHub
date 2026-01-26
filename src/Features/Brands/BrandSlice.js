import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../Hooks/useGetData';
import { insertData } from '../../Hooks/useInsertData';
import { updateData } from '../../Hooks/useUpdateData';
import { deleteData } from '../../Hooks/useDeleteData';

export const getAllBrand = createAsyncThunk(
  'brand/getAll',
  async (limit, { rejectWithValue }) => {
    try {
      return await getData(`/api/v1/brands?limit=${limit}`);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || ' حدث خطأ أثناء جلب البيانات'
      );
    }
  }
);
export const getAllBrandPage = createAsyncThunk(
  'brand/getPage',
  async (page, { rejectWithValue }) => {
    try {
      return await getData(`/api/v1/brands?limit=6&page=${page}`);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || ' حدث خطأ أثناء جلب البيانات'
      );
    }
  }
);
export const createBrand = createAsyncThunk(
  'brand/create',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await insertData(`/api/v1/brands`, formData);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'فشلت عملية الإضافة');
    }
  }
);
export const getOneBrand = createAsyncThunk(
  'brand/getOneBrand',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getData(`/api/v1/brands/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const updateBrand = createAsyncThunk(
  'brand/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await updateData(`/api/v1/brands/${id}`, formData);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'فشلت عملية التعديل');
    }
  }
);
export const deleteBrand = createAsyncThunk(
  'brand/delete',
  async (id, { rejectWithValue }) => {
    try {
      const res = await deleteData(`/api/v1/brands/${id}`);
      return { id, res };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'فشلت عملية الحذف');
    }
  }
);

const brandSlice = createSlice({
  name: 'brands',
  initialState: {
    brand: { data: [] },
    oneBrand: {},
    loading: false,
    error: null,
    status: null,
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
      })
      /************** updateBrand */
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload?.status || 200;

        const updatedBrand = action.payload?.data;
        if (updatedBrand && state.brand?.data) {
          const index = state.brand.data.findIndex(
            (item) => item._id === updatedBrand._id
          );
          if (index !== -1) {
            state.brand.data[index] = updatedBrand;
          }
        }
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload?.status || 400;
        state.error = action.payload;
      })
      /************** deleteBrand */
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 200;

        const deletedId = action.payload.id;
        if (state.brand?.data) {
          state.brand.data = state.brand.data.filter(
            (item) => item._id !== deletedId
          );
        }
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload?.status || 400;
        state.error = action.payload;
      });
  },
});
export const { resetStatus } = brandSlice.actions;
export default brandSlice.reducer;
