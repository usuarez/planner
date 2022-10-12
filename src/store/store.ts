import { configureStore } from "@reduxjs/toolkit";
import toDoSlice from "./slices/toDoSlice";
export const store = configureStore({
  reducer: {
    todo: toDoSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
