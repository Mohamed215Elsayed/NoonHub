import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { insertData } from "../../Hooks/useInsertData";
import { updateData } from "../../Hooks/useUpdateData";
import { getDataWithToken } from "../../Hooks/useGetData";
// Async Thunk for Signup
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      return await insertData("/api/v1/auth/signup", data);
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "حدث خطأ أثناء التسجيل" }
      );
    }
  }
);
// Async Thunk لتسجيل الدخول
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      return await insertData("/api/v1/auth/login", data);
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "حدث خطأ أثناء تسجيل الدخول" }
      );
    }
  }
);
export const getLoggedUser = createAsyncThunk(
  "auth/getLoggedUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDataWithToken("/api/v1/users/getMe");
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch current user"
      );
    }
  }
);
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await insertData("/api/v1/auth/forgotPassword", data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "حدث خطأ أثناء ارسال الكود"
      );
    }
  }
);
// verify reset code
export const verifyResetCode = createAsyncThunk(
  "auth/verifyResetCode",
  async (data, { rejectWithValue }) => {
    try {
      const response = await insertData("/api/v1/auth/verifyResetCode", data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "الكود غير صحيح" }
      );
    }
  }
);
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await updateData("/api/v1/auth/resetPassword", data);
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "فشل تغيير كلمة السر" }
      );
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    forgetPassword: null,
    verifyResetCode: null,
    resetPassword: null,
  },

  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    clearError: (state) => {
      state.error = null;
    },

    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },

    loadUserFromStorage: (state) => {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (user && token) {
        state.user = JSON.parse(user);
        state.token = token;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.error = null;

        localStorage.setItem("user", JSON.stringify(action.payload.data));
        localStorage.setItem("token", action.payload.token);
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.errors && Array.isArray(action.payload.errors)) {
          state.error = action.payload.errors.map((err) => err.msg).join(" | ");
        } else {
          // لو في رسالة واحدة
          state.error = action.payload?.message || "حدث خطأ أثناء التسجيل";
        }
      })
      /*=========================*/
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.error = null;

        localStorage.setItem("user", JSON.stringify(action.payload.data));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        // لو في array من الأخطاء
        if (action.payload?.errors && Array.isArray(action.payload.errors)) {
          state.error = action.payload.errors.map((e) => e.msg).join(" | ");
        } else {
          state.error = action.payload?.message || "حدث خطأ أثناء تسجيل الدخول";
        }
      })
      /* ============ GET LOGGED USER ============ */
      .addCase(getLoggedUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoggedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data || action.payload;
      })
      .addCase(getLoggedUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      /*=========================*/
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.forgetPassword = action.payload;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /*=========================*/
      .addCase(verifyResetCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyResetCode.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyResetCode = action.payload;
      })
      .addCase(verifyResetCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "فشل التحقق من الكود";
      })
      // resetPassword
      /*=========================*/
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetPassword = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "فشل التحقق من الكود";
      });
  },
});

// Actions
export const { logoutUser, clearError, updateUser, loadUserFromStorage } =
  authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const isAuthenticated = (state) => !!state.auth.token;

export default authSlice.reducer;
