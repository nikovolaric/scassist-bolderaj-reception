import { configureStore } from "@reduxjs/toolkit";
import checkAttendanceReducer from "../features/classes/slices/checkAttendanceSlice";
import cartReducer from "../features/articles/slices/cartSlice";
import companyReducer from "../features/checkout/slices/companyDataSlice";

export const store = configureStore({
  reducer: {
    checkAttendance: checkAttendanceReducer,
    cart: cartReducer,
    companyData: companyReducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
