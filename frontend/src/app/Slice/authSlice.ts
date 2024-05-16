import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface Admin {
  email: string;
  password: string;
}

interface AuthState {
  token: string | null;
  error: string | null;
  admin: Admin | null;
  loading: boolean;
}

const initialState: AuthState = {
  token:
    typeof window !== "undefined"
      ? localStorage.getItem("token") || null
      : null,
  error: null,
  admin: null,
  loading: false,
};

export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (formData: any, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post<{ adminInfo: Admin; token: string }>(
        "http://localhost:8000/adminRouter/adminlogin",
        formData
      );

      const { adminInfo, token } = response.data;

      dispatch(setAdmin(adminInfo));
      dispatch(setToken(token));

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        Cookies.set("token", token);
      }

      return token;
    } catch (error: any) {
      dispatch(setError("Error signing in: " + error.message));

      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An unknown error occurred");
    } finally {
      dispatch(setLoading(false));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
        Cookies.set("token", action.payload);
      }
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${action.payload}`;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setAdmin: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      const token = action.payload || "";
      localStorage.setItem("token", token);
      Cookies.set("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    });
    builder.addCase(adminLogin.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
  },
});

export const { setToken, setError, setAdmin, setLoading } = authSlice.actions;

export default authSlice.reducer;
