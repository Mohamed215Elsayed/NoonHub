import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

import { getDataWithToken } from '../../Hooks/useGetData';
import { insertData } from '../../Hooks/useInsertData';
import { updateData } from '../../Hooks/useUpdateData';

/* ===================== ASYNC THUNKS ===================== */

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      return await insertData("/api/v1/auth/signup", data);
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "حدث خطأ أثناء التسجيل" });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      return await insertData("/api/v1/auth/login", data);
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "حدث خطأ أثناء تسجيل الدخول" });
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (data, { rejectWithValue }) => {
    try {
      return await insertData("/api/v1/auth/forgotPassword", data);
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "حدث خطأ أثناء إرسال الكود" });
    }
  }
);

export const verifyResetCode = createAsyncThunk(
  "auth/verifyResetCode",
  async (data, { rejectWithValue }) => {
    try {
      return await insertData("/api/v1/auth/verifyResetCode", data);
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "الكود غير صحيح" });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      return await updateData("/api/v1/auth/resetPassword", data);
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "فشل تغيير كلمة السر" });
    }
  }
);

export const getLoggedUser = createAsyncThunk(
  "auth/getLoggedUser",
  async (_, { rejectWithValue }) => {
    try {
      return await getDataWithToken("/api/v1/users/getMe");
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "فشل تحميل المستخدم" });
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (body, { rejectWithValue }) => {
    try {
      return await updateData("/api/v1/users/updateMe", body);
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "فشل تحديث البيانات" });
    }
  }
);

export const changeUserPassword = createAsyncThunk(
  "auth/changeUserPassword",
  async (body, { rejectWithValue }) => {
    try {
      return await updateData("/api/v1/users/changeMyPassword", body);
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "فشل تغيير كلمة السر" });
    }
  }
);

/* ===================== HELPERS ===================== */

const saveAuthToStorage = (data, token) => {
  localStorage.setItem("user", JSON.stringify(data));
  localStorage.setItem("token", token);
};

export const clearAuthStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const handleAuthSuccess = (state, action) => {
  state.loading = false;
  state.user = action.payload.data;
  state.token = action.payload.token;
  state.error = null;
  saveAuthToStorage(action.payload.data, action.payload.token);
};

/* ===================== SLICE ===================== */

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,

    // flags
    profileUpdated: false,
    passwordChanged: false,
  },

  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.profileUpdated = false;
      state.passwordChanged = false;
      clearAuthStorage();
    },

    clearError: (state) => {
      state.error = null;
    },

    loadUserFromStorage: (state) => {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (user && token) {
        state.user = JSON.parse(user);
        state.token = token;
      }
    },
    resetFlags: (state) => {
      state.profileUpdated = false;
      state.passwordChanged = false;
    }

  },

  extraReducers: (builder) => {
    builder
      /* AUTH */
      .addCase(registerUser.fulfilled, handleAuthSuccess)
      .addCase(loginUser.fulfilled, handleAuthSuccess)

      /* GET LOGGED USER */
      .addCase(getLoggedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        localStorage.setItem("user", JSON.stringify(state.user));
      })

      /* UPDATE PROFILE */
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.profileUpdated = true;
        localStorage.setItem("user", JSON.stringify(state.user));
      })

      /* CHANGE PASSWORD */
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.loading = false;
        state.passwordChanged = true;
      })

      /* GLOBAL PENDING */
      .addMatcher(
        (action) => action.type.startsWith("auth/") && isPending(action),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      /* GLOBAL REJECTED */
      .addMatcher(
        (action) => action.type.startsWith("auth/") && isRejected(action),
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload?.message ||
            action.payload ||
            "حدث خطأ غير متوقع";
        }
      )

  },
});

/* ===================== EXPORTS ===================== */

export const {
  logoutUser,
  clearError,
  loadUserFromStorage,
  resetFlags,
} = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const isAuthenticated = (state) => !!state.auth.token;

export default authSlice.reducer;
