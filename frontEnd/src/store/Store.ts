import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";
import SpecialtiesSlice from "./Slices/SpecialtiesSlice";
import DoctorSlice from "./Slices/DoctorSlice";
import UserSlice from "./Slices/UserSlice";

export const Store = configureStore({
  reducer: {
    Auth: AuthSlice,
    Specialists: SpecialtiesSlice,
    Doctor: DoctorSlice,
    User: UserSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;
