import { ThunkDispatch as ReduxThunkDispatch } from "redux-thunk";
import { Action, configureStore } from "@reduxjs/toolkit";
import { ruleReducer } from "../rules/store";
import { tweetReducer } from "../tweets/store";

export type ThunkDispatch<A extends Action=Action> = ReduxThunkDispatch<AppState, never, A>

export const store = configureStore({
  reducer: {
    rules: ruleReducer,
    tweets: tweetReducer,
  }
  // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch