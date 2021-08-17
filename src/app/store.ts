import { ThunkAction as ReduxThunkAction } from "redux-thunk";
import { ThunkDispatch as ReduxThunkDispatch } from "redux-thunk";
import { Action, configureStore } from "@reduxjs/toolkit";

import { Action as TweetsAction, ActionType } from "../tweets/actions";
import { Action as RulesAction } from "../rules/actions";
import { tweetReducer } from "../tweets/reducer";
import { ruleReducer } from "../rules/reducer";
import { tweetCollection } from "./mongo-client";
import { toTweetProperties, UpstreamTweetProperties } from "../models/tweet";

export type ThunkDispatch<A extends Action=Action> = ReduxThunkDispatch<AppState, never, A>
export type Status = "idle" | "loading" | "inserting" | "completed" | "failed";

export type AppAction = TweetsAction | RulesAction

export type ThunkAction<A extends AppAction, R = void> = ReduxThunkAction<R, AppState, never, A>
export type AsyncThunkAction<A extends AppAction = AppAction, R = void> = ThunkAction<A, PromiseLike<R>>

export const store = configureStore({
  reducer: {
    rules: ruleReducer,
    tweets: tweetReducer,
  }
})

// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const pipeline = [
  { 
      $in: [ "insert" ] 
  }
];

(() => {
  tweetCollection()
  .then(async collection => {
      for await (const tweet of collection.watch(pipeline)) {
          const { fullDocument } = tweet as globalThis.Realm.Services.MongoDB.InsertEvent<UpstreamTweetProperties>;
          if (fullDocument) {
              store.dispatch({type: ActionType.TweetInsertingStartedAction});
              store.dispatch({type: ActionType.TweetInsertingCompletedAction, tweet: toTweetProperties(fullDocument)});
          }
      }
  })
})() 
  