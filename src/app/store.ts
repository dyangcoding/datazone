import { ThunkAction as ReduxThunkAction } from "redux-thunk";
import { ThunkDispatch as ReduxThunkDispatch } from "redux-thunk";
import { Action, configureStore } from "@reduxjs/toolkit";

import { Action as TweetsAction, ActionType as TweetsActionType} from "../tweets/actions";
import { Action as RulesAction, ActionType as RuleActionType } from "../rules/actions";
import { tweetReducer } from "../tweets/reducer";
import { ruleReducer } from "../rules/reducer";
import { ruleCollection, tweetCollection } from "./mongo-client";
import { toTweetProperties, UpstreamTweetProperties } from "../models/tweet";
import { UpstreamRuleProperties } from "../models/rule";

export type ThunkDispatch<A extends Action=Action> = ReduxThunkDispatch<AppState, never, A>
export type Status = "idle" | "loading" | "inserting" | "deleting" | "completed" | "failed";

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

const tweetsPipeline = [
  { 
    $in: [ "insert" ] 
  }
];

(() => {
  tweetCollection()
  .then(async collection => {
      for await (const tweet of collection.watch(tweetsPipeline)) {
        const { fullDocument } = tweet as globalThis.Realm.Services.MongoDB.InsertEvent<UpstreamTweetProperties>;
        if (fullDocument) {
          store.dispatch({type: TweetsActionType.TweetInsertingStartedAction});
          store.dispatch({type: TweetsActionType.TweetInsertingCompletedAction, tweet: toTweetProperties(fullDocument)});
        }
      }
  })
})()

const rulePipeline = [
  {
    $in: [ "delete" ]
  }
];

(() => {
  ruleCollection()
  .then(async collection => {
    for await (const rule of collection.watch(rulePipeline)) {
      const { documentKey } = rule as globalThis.Realm.Services.MongoDB.DeleteEvent<UpstreamRuleProperties>;
      console.log("documentKeyID: " + documentKey._id.toString())
      if (documentKey) {
        store.dispatch({type: RuleActionType.RuleDeletedCompletedAction, ruleId: documentKey._id.toString()})
      }
    }
  })
})()
  