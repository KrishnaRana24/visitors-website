import { Action, configureStore } from "@reduxjs/toolkit";
import adminReducer from "../Slice/adminSlice";
import { ThunkAction } from "redux-thunk";

export const store = configureStore({
  reducer: {
    adminData: adminReducer,
  },
});
// store.dispatch(storeAdminData());
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
