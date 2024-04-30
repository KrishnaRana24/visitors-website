import { Action, configureStore } from "@reduxjs/toolkit";
import adminReducer from "../Slice/adminSlice";
import authReducer from "../Slice/authSlice";
import { ThunkAction } from "redux-thunk";

export const store = configureStore({
  reducer: {
    adminData: adminReducer,
    auth: authReducer,
  },
});
// store.dispatch(storeAdminData());
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
