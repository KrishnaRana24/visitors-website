// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { RootState } from "../store/store";

// interface AuthState {
//   token: string | null;
//   error: string | null;
// }

// const initialState: AuthState = {
//   token: localStorage.getItem("token"),
//   error: null,
// };

// // Thunk action creator for login
// export const login = createAsyncThunk(
//   "auth/login",
//   async (formData: FormData, { dispatch }) => {
//     try {
//       const response = await axios.post<{ token: string }>(
//         "http://localhost:8001/adminlogin",
//         formData
//       );
//       const { token } = response.data;
//       dispatch(setToken(token));
//       // Redirect to the dashboard or any other protected route
//       window.location.replace("/dashboard");
//     } catch (error) {
//       dispatch(setError("Error signing in: " + error));
//       throw error; // Rethrow the error for components to handle
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setToken: (state, action: PayloadAction<string>) => {
//       state.token = action.payload;
//       localStorage.setItem("token", action.payload);
//     },
//     setError: (state, action: PayloadAction<string>) => {
//       state.error = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(login.fulfilled, (state, action) => {
//       // This will be called when the login thunk is successful
//     });
//     builder.addCase(login.rejected, (state, action) => {
//       // This will be called when the login thunk encounters an error
//     });
//   },
// });

// export const { setToken, setError } = authSlice.actions;

// export default authSlice.reducer;
