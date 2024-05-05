import { configureStore } from '@reduxjs/toolkit';
import { commentsApi } from './API/comments.api';
import uiManagerSlice from './slices/ui-manager.slice';

export const store = configureStore({
  reducer: {
    [uiManagerSlice.name]: uiManagerSlice.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(commentsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
