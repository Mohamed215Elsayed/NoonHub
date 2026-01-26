import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
  isFulfilled,
} from '@reduxjs/toolkit';

import { getDataWithToken } from '../../Hooks/useGetData';
import { insertData } from '../../Hooks/useInsertData';
import { updateData } from '../../Hooks/useUpdateData';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data, { rejectWithValue }) => {
    try {
      return await insertData('/api/v1/auth/signup', data);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      return await insertData('/api/v1/auth/login', data);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  'auth/forgetPassword',
  async (data, { rejectWithValue }) => {
    try {
      return await insertData('/api/v1/auth/forgotPassword', data);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const verifyResetCode = createAsyncThunk(
  'auth/verifyResetCode',
  async (data, { rejectWithValue }) => {
    try {
      return await insertData('/api/v1/auth/verifyResetCode', data);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      return await updateData('/api/v1/auth/resetPassword', data);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getLoggedUser = createAsyncThunk(
  'auth/getLoggedUser',
  async (_, { rejectWithValue }) => {
    try {
      return await getDataWithToken('/api/v1/users/getMe');
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (body, { rejectWithValue }) => {
    try {
      return await updateData('/api/v1/users/updateMe', body);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const changeUserPassword = createAsyncThunk(
  'auth/changeUserPassword',
  async (body, { rejectWithValue }) => {
    try {
      return await updateData('/api/v1/users/changeMyPassword', body);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ===================== HELPERS ===================== */
const saveAuthToStorage = (data, token) => {
  localStorage.setItem('user', JSON.stringify(data));
  localStorage.setItem('token', token);
};
/* ===================== SLICE ===================== */

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    profileUpdated: false,
    passwordChanged: false,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
    loadUserFromStorage: (state) => {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (user && token) {
        state.user = JSON.parse(user);
        state.token = token;
      }
    },
    resetFlags: (state) => {
      state.profileUpdated = false;
      state.passwordChanged = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.token = action.payload.token;
        saveAuthToStorage(action.payload.data, action.payload.token);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.token = action.payload.token;
        saveAuthToStorage(action.payload.data, action.payload.token);
      })
      .addCase(forgetPassword.fulfilled, (state) => {})
      .addCase(verifyResetCode.fulfilled, (state) => {})
      .addCase(resetPassword.fulfilled, (state, action) => {
        if (action.payload.token) {
          state.user = action.payload.data;
          state.token = action.payload.token;
          saveAuthToStorage(action.payload.data, action.payload.token);
        }
      })

      .addCase(getLoggedUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        localStorage.setItem('user', JSON.stringify(action.payload.data));
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.profileUpdated = true;
        localStorage.setItem('user', JSON.stringify(action.payload.data));
      })
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.passwordChanged = true;
      })
      .addMatcher(isPending, (state, action) => {
        if (action.type.startsWith('auth/')) {
          state.loading = true;
          state.error = null;
        }
      })
      .addMatcher(isRejected, (state, action) => {
        if (action.type.startsWith('auth/')) {
          state.loading = false;
          state.error =
            action.payload?.message || action.payload || 'حدث خطأ غير متوقع';
        }
      })
      .addMatcher(isFulfilled, (state, action) => {
        if (action.type.startsWith('auth/')) {
          state.loading = false;
        }
      });
  },
});

export const selectAuth = (state) => state.auth;
export const isAuthenticated = (state) => !!state.auth.token;
export const { logoutUser, clearError, loadUserFromStorage, resetFlags } =
  authSlice.actions;
export default authSlice.reducer;
