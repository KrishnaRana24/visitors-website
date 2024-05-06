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
}

const initialState: AdminState = {
  admins: [],
  isLoading: false,
};

export const createAdmin = createAsyncThunk(
  "admin/createAdmin",
  async (formData: any) => {
    const response = await axios.post(
      "http://localhost:8001/adminRouter/adminauth",
      formData
    );
    console.log("adminData Responce", response);

    return response.data;
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
        console.error("Error creating admin", action.error);
      });
    // .addCase(updateAdminData.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(updateAdminData.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   const index = state.admins.findIndex(
    //     (admin) => admin.id === action.payload.id
    //   );
    //   if (index !== -1) {
    //     state.admins[index] = action.payload;
    //   }
    //   console.log("Admin updated successfully");
    // })
    // .addCase(updateAdminData.rejected, (state) => {
    //   state.isLoading = false;
    //   console.error("Error updating admin");
    // });
  },
});

export default adminSlice.reducer;
