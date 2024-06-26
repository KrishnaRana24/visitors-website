import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Admin {
  id?: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  rpassword: string;
  photo: File | null;
}

interface AdminState {
  admins: Admin[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  admins: [],
  isLoading: false,
  error: null,
};

export const createAdmin = createAsyncThunk(
  "admin/createAdmin",
  async (formData: any, { rejectWithValue }) => {
    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.rpassword
      ) {
        throw new Error("Required fields are missing");
      }
      const response = await axios.post(
        "http://localhost:8000/adminRouter/adminauth",
        formData
      );
      console.log("adminData Responce", response);

      return response.data;
    } catch (error) {
      console.error("Error in createAdmin thunk", error);
      // Check if error is an AxiosError
      if (axios.isAxiosError(error)) {
        const serializedError = {
          message: error.message,
          code: error.code,
          response: error.response
            ? {
                status: error.response.status,
                data: error.response.data,
              }
            : null,
        };
        return rejectWithValue(serializedError);
      } else {
        return rejectWithValue({ message: (error as Error).message });
      }
    }
  }
);
// console.log(createAdmin);

export const updateAdminData = createAsyncThunk(
  "admin/updateAdminData",
  async (adminData: Admin) => {
    const response = await axios.put(
      `http://localhost:8001/adminauth/${adminData.id}`,
      adminData
    );
    return response.data;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admins.push(action.payload);
        console.log("Admin created successfully");
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Error creating admin", action.payload);
      });
  },
});

export default adminSlice.reducer;
