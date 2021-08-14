import { ThunkAction as ReduxThunkAction } from "redux-thunk";
import { ThunkDispatch as ReduxThunkDispatch } from "redux-thunk";
import { Action, configureStore } from "@reduxjs/toolkit";

import { Action as TweetsAction } from "../tweets/actions";
import { Action as RulesAction } from "../rules/actions";
import { tweetReducer } from "../tweets/reducer";
import { ruleReducer } from "../rules/reducer";

export type ThunkDispatch<A extends Action=Action> = ReduxThunkDispatch<AppState, never, A>
export type Status = "idle" | "loading" | "completed" | "failed";

export type AppAction = TweetsAction | RulesAction

export type ThunkAction<A extends AppAction, R = void> = ReduxThunkAction<R, AppState, never, A>
export type AsyncThunkAction<A extends AppAction = AppAction, R = void> = ThunkAction<A, PromiseLike<R>>

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