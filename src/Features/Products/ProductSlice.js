import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { insertData } from '../../Hooks/useInsertData';
import { getData } from '../../Hooks/useGetData';
import { deleteData } from '../../Hooks/useDeleteData';
import { updateData } from '../../Hooks/useUpdateData';

// --- Thunks ---
export const createProduct = createAsyncThunk(
  'products/create',
  async (formData, { rejectWithValue }) => {
    try {
      return await insertData('/api/v1/products', formData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  'products/getAll',
  async (limit, { rejectWithValue }) => {
    try {
      return await getData(`/api/v1/products?limit=${limit}`);
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'خطأ في الجلب');
    }
  }
);

export const getAllProductsPage = createAsyncThunk(
  'products/getAllPage',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      return await getData(`/api/v1/products?page=${page}&limit=${limit}`);
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'خطأ في الجلب');
    }
  }
);

export const getAllProductsByCategory = createAsyncThunk(
  'products/getByCategory',
  async ({ page, limit, CatId }, { rejectWithValue }) => {
    try {
      return await getData(
        `/api/v1/products?limit=${limit}&category=${CatId}&page=${page}`
      );
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'خطأ في الجلب');
    }
  }
);

export const getAllProductsByBrand = createAsyncThunk(
  'products/getByBrand',
  async ({ page, limit, brandID }, { rejectWithValue }) => {
    try {
      return await getData(
        `/api/v1/products?limit=${limit}&brand=${brandID}&page=${page}`
      );
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'خطأ في الجلب');
    }
  }
);

export const getOneProduct = createAsyncThunk(
  'products/getOne',
  async (id, { rejectWithValue }) => {
    try {
      return await getData(`/api/v1/products/${id}`);
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getProductLike = createAsyncThunk(
  'products/getLike',
  async (id, { rejectWithValue }) => {
    try {
      return await getData(`/api/v1/products?category=${id}`);
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  'products/delete',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteData(`/api/v1/products/${id}`);
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateProducts = createAsyncThunk(
  'products/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      return await updateData(`/api/v1/products/${id}`, formData);
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'فشل التعديل للمنتج');
    }
  }
);

export const getAllProductsSearch = createAsyncThunk(
  'products/getAllSearch',
  async (queryString, { rejectWithValue }) => {
    try {
      const query = queryString ? `?${queryString}` : '';
      return await getData(`/api/v1/products${query}`);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// --- Initial State ---
const initialState = {
  allProducts: { data: [], pagination: {}, results: 0 },
  oneProduct: { data: {} },
  products: {},
  productLike: { data: [] },
  updateProducts: { data: [] },
  allProductCat: { data: [], pagination: {} },
  allProductBrand: { data: [], pagination: {} },

  loadingAllProducts: false,
  loadingCategory: false,
  loadingBrand: false,
  error: null,
  status: null,
};

// --- Slice ---
const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- All Products ---
      .addCase(getAllProducts.pending, (state) => {
        state.loadingAllProducts = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loadingAllProducts = false;
        state.allProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loadingAllProducts = false;
        state.error = action.payload;
      })

      .addCase(getAllProductsPage.pending, (state) => {
        state.loadingAllProducts = true;
      })
      .addCase(getAllProductsPage.fulfilled, (state, action) => {
        state.loadingAllProducts = false;
        state.allProducts = action.payload;
      })
      .addCase(getAllProductsPage.rejected, (state, action) => {
        state.loadingAllProducts = false;
        state.error = action.payload;
      })

      .addCase(getAllProductsSearch.pending, (state) => {
        state.loadingAllProducts = true;
      })
      .addCase(getAllProductsSearch.fulfilled, (state, action) => {
        state.loadingAllProducts = false;
        state.allProducts = action.payload;
      })
      .addCase(getAllProductsSearch.rejected, (state, action) => {
        state.loadingAllProducts = false;
        state.error = action.payload;
      })

      // --- Category ---
      .addCase(getAllProductsByCategory.pending, (state) => {
        state.loadingCategory = true;
      })
      .addCase(getAllProductsByCategory.fulfilled, (state, action) => {
        state.loadingCategory = false;
        state.allProductCat = action.payload;
      })
      .addCase(getAllProductsByCategory.rejected, (state, action) => {
        state.loadingCategory = false;
        state.error = action.payload;
      })

      // --- Brand ---
      .addCase(getAllProductsByBrand.pending, (state) => {
        state.loadingBrand = true;
      })
      .addCase(getAllProductsByBrand.fulfilled, (state, action) => {
        state.loadingBrand = false;
        state.allProductBrand = action.payload;
      })
      .addCase(getAllProductsByBrand.rejected, (state, action) => {
        state.loadingBrand = false;
        state.error = action.payload;
      })

      // --- One Product ---
      .addCase(getOneProduct.pending, (state) => {
        state.loadingAllProducts = true;
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.loadingAllProducts = false;
        state.oneProduct = { data: action.payload.data };
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        state.loadingAllProducts = false;
        state.error = action.payload;
      })

      // --- Create Product ---
      .addCase(createProduct.pending, (state) => {
        state.loadingAllProducts = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loadingAllProducts = false;
        state.products = action.payload;
        state.status = action.payload.status;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loadingAllProducts = false;
        state.error = action.payload;
      })

      // --- Product Like ---
      .addCase(getProductLike.pending, (state) => {
        state.loadingAllProducts = true;
      })
      .addCase(getProductLike.fulfilled, (state, action) => {
        state.loadingAllProducts = false;
        state.productLike = action.payload;
      })
      .addCase(getProductLike.rejected, (state, action) => {
        state.loadingAllProducts = false;
        state.error = action.payload;
      })

      // --- Delete Product ---
      .addCase(deleteProducts.pending, (state) => {
        state.loadingAllProducts = true;
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.loadingAllProducts = false;
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
      .addCase(deleteProducts.rejected, (state, action) => {
        state.loadingAllProducts = false;
        state.error = action.payload;
      })

      // --- Update Product ---
      .addCase(updateProducts.pending, (state) => {
        state.loadingAllProducts = true;
      })
      .addCase(updateProducts.fulfilled, (state, action) => {
        state.loadingAllProducts = false;
        state.status = action.payload?.status;
        state.updateProducts = action.payload;
        state.oneProduct = { data: action.payload.data };
        if (state.allProducts?.data) {
          state.allProducts.data = state.allProducts.data.map((item) =>
            item._id === action.payload.data?._id ? action.payload.data : item
          );
        }
      })
      .addCase(updateProducts.rejected, (state, action) => {
        state.loadingAllProducts = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = ProductSlice.actions;
export default ProductSlice.reducer;
