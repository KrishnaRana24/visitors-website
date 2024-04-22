import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  name: string;
  email: string;
  phone: string;
  password: string;
  rpassword: string;
  photo: string;
}

const initialState: AdminState = {
  name: "",
  email: "",
  phone: "",
  password: "",
  rpassword: "",
  photo: "",
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // adminReducer: (state, action: PayloadAction<Partial<AdminState>>) => {
    //   return { ...state, ...action.payload };
    // },
    updateAdminData: (state, action: PayloadAction<Partial<AdminState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateAdminData } = adminSlice.actions;

export default adminSlice.reducer;
