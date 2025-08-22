import { configureStore } from "@reduxjs/toolkit";
import { configuratorSlice } from "./slices/configurator/Configurator.sclice";

export const store = configureStore({
  reducer: {
    configurator: configuratorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
