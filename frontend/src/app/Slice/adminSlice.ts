import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store/store"; // Assume you have an AppThunk type defined for Thunks

interface Admin {
  name: string;
  email: string;
  phone: string;
  password: string;
  photo: string | null;
}

interface AdminState {
  admins: Admin[];
}

const initialState: AdminState = {
  admins: [],
};

export const createAdmin =
  (adminData: Admin): AppThunk =>
  async (dispatch) => {
    try {
      // Make POST request to API to save data to MongoDB
      const response = await fetch("http://localhost:8001/adminauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to create admin");
      }

      const data = await response.json();

      // Dispatch action to add data to Redux store
      dispatch(addAdmin(adminData));

      console.log("Admin created successfully");
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addAdmin(state, action: PayloadAction<Admin>) {
      state.admins.push(action.payload);
    },
    updateAdmin(state, action: PayloadAction<Admin>) {
      state.admins.push(action.payload);
    },
  },
});

export const { addAdmin } = adminSlice.actions;

export default adminSlice.reducer;
