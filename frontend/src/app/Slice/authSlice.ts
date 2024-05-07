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
}

const initialState: AuthState = {
  token:
    typeof window !== "undefined"
      ? localStorage.getItem("token") || null
      : null,
  error: null,
  admin: null,
};

export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (formData: any, { dispatch }) => {
    console.log(formData);

    try {
      const response = await axios.post<{ admin: Admin; token: string }>(
        "http://localhost:8001/adminRouter/adminlogin",
        formData
      );
      console.log("responce data--", response);

      const { admin, token } = response.data;
      console.log(admin, token);

      //
      dispatch(setAdmin(admin));
      dispatch(setToken(token));
      // Store token in localStorage and cookies

      // // Store token in localStorage and cookies
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        Cookies.set("token", token);
      }

      return token;
    } catch (error) {
      dispatch(setError("Error signing in: " + error));
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
      Cookies.set("token", action.payload); // Set token in cookies
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${action.payload}`;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setAdmin: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      // Access the token from action.payload after it has been set
      const token = action.payload || "";
      localStorage.setItem("token", token); // Set token in localStorage
      Cookies.set("token", token); // Set token in cookies
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set token in axios headers
    });
  },
});

export const { setToken, setError, setAdmin } = authSlice.actions;

export default authSlice.reducer;
