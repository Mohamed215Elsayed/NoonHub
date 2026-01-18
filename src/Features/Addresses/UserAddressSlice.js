import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { insertData } from "../../Hooks/useInsertData";
import { getDataWithToken } from "../../Hooks/useGetData";
import { deleteData } from "../../Hooks/useDeleteData";
import { updateData } from "../../Hooks/useUpdateData";

// دالة مساعدة لمعالجة الأخطاء
const handleReject = (e, msg, rejectWithValue) =>
  rejectWithValue(
    e.response?.data?.message || e.response?.data?.errors?.[0]?.msg || msg
  );
/* ===================== ASYNC THUNKS ===================== */
export const addUserAddress = createAsyncThunk(
  "address/add",
  async (body, { rejectWithValue }) => {
    try {
      return await insertData("/api/v1/addresses", body);
    } catch (e) {
      return handleReject(e, "فشل إضافة العنوان", rejectWithValue);
    }
  }
);

export const getAllUserAddress = createAsyncThunk(
  "address/getAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getDataWithToken("/api/v1/addresses");
    } catch (e) {
      return handleReject(e, "فشل جلب العناوين", rejectWithValue);
    }
  }
);

export const getOneUserAddress = createAsyncThunk(
  "address/getOne",
  async (id, { rejectWithValue }) => {
    try {
      return await getDataWithToken(`/api/v1/addresses/${id}`);
    } catch (e) {
      return handleReject(e, "فشل جلب العنوان", rejectWithValue);
    }
  }
);

export const updateUserAddress = createAsyncThunk(
  "address/update",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      return await updateData(`/api/v1/addresses/${id}`, body);
    } catch (e) {
      return handleReject(e, "فشل تحديث العنوان", rejectWithValue);
    }
  }
);

export const deleteUserAddress = createAsyncThunk(
  "address/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await deleteData(`/api/v1/addresses/${id}`);
      return { id, res };
    } catch (e) {
      return handleReject(e, "فشل حذف العنوان", rejectWithValue);
    }
  }
);

/* ===================== SLICE ===================== */
const userAddressSlice = createSlice({
  name: "userAddress",
  initialState: {
    allAddresses: [],
    oneAddress: null,
    loading: false,
    status: "idle",
    error: null,
  },
  reducers: {
    resetAddressStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // جلب الكل
      .addCase(getAllUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.data;
        state.allAddresses =
          data.length > 0 && Array.isArray(data[0]) ? data[0] : data;
      })
      // جلب واحد
      .addCase(getOneUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.oneAddress = action.payload.data;
        // if (action.payload && action.payload.data) {
        //   state.oneAddress = Array.isArray(action.payload.data)
        //     ? action.payload.data[0]
        //     : action.payload.data;
        // }
      })
      // إضافة عنوان
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        state.allAddresses.unshift(action.payload.data);
      })
      // تحديث عنوان
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "updated";
        const index = state.allAddresses.findIndex(
          (addr) => addr._id === action.payload.data._id
        );
        if (index !== -1) state.allAddresses[index] = action.payload.data;
        state.oneAddress = action.payload.data;
      })
      // حذف عنوان
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "deleted";
        state.allAddresses = state.allAddresses.filter(
          (addr) => addr._id !== action.payload.id
        );
      })

      .addMatcher(
        isAnyOf(
          getAllUserAddress.pending,
          addUserAddress.pending,
          deleteUserAddress.pending,
          updateUserAddress.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addMatcher(
        isAnyOf(
          getAllUserAddress.rejected,
          addUserAddress.rejected,
          deleteUserAddress.rejected,
          updateUserAddress.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { resetAddressStatus } = userAddressSlice.actions;
export default userAddressSlice.reducer;
