import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../app/services/api';


const getStoredUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Ошибка парсинга данных пользователя из localStorage:', error);
    return null;
  }
};

const getStoredToken = () => {
  try {
    return localStorage.getItem('token') || null;
  } catch (error) {
    console.error('Ошибка получения токена из localStorage:', error);
    return null;
  }
};

const initialState = {
  user: getStoredUser(),
  token: getStoredToken(),
  loading: false,
  error: null,
  isAuthenticated: !!getStoredToken(),
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(email, password);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Ошибка авторизации'
      );
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Ошибка регистрации'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } catch (error) {
        console.error('Ошибка очистки localStorage:', error);
      }
    },
    setCredentials: (state, action) => {
      const { user, access_token } = action.payload;
      state.user = user;
      state.token = access_token;
      state.isAuthenticated = true;
      try {
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Ошибка соохранения в localStorage:', error);
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        try {
          localStorage.setItem('token', action.payload.access_token);
          localStorage.setItem('user', JSON.stringify(action.payload.user));
        } catch (error) {
          console.error('Ошибка соохранения в localStorage:', error);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        try {
          localStorage.setItem('token', action.payload.access_token);
          localStorage.setItem('user', JSON.stringify(action.payload.user));
        } catch (error) {
          console.error('Ошибка соохранения в localStorage:', error);
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setCredentials, clearError } = authSlice.actions;
export default authSlice.reducer;