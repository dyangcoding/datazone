import { tweetCollection } from "../app/mongo-client";
import { ThunkAction } from "../app/store";
import { toTweetProperties, TweetProperties } from "../models/tweet";

export enum ActionType {
    LoadTweetsStartedAction = "LOAD_TWEETS_STARTED",
    LoadTweetsCompletedAction = "LOAD_TWEETS_COMPLETED",
    LoadTweetsFailedAction = "LOAD_TWEETS_FAILED"
}

export type Action = LoadTweetsStartedAction | LoadTweetsCompletedAction | LoadTweetsFailedAction;

export interface LoadTweetsStartedAction {
    readonly type: ActionType.LoadTweetsStartedAction;
}

export interface LoadTweetsCompletedAction {
    readonly type: ActionType.LoadTweetsCompletedAction;
    readonly tweets: ReadonlyArray<TweetProperties>;
}

export interface LoadTweetsFailedAction {
    readonly type: ActionType.LoadTweetsFailedAction;
    readonly error: Error;
}

export function loadTweets(): ThunkAction<Action> {
    return dispatch => {
        dispatch({type: ActionType.LoadTweetsStartedAction});
        tweetCollection().then(collection => {
            collection.find().then(
                results => dispatch({type: ActionType.LoadTweetsCompletedAction, tweets: toTweetProperties(results)}),
                reason => dispatch({type: ActionType.LoadTweetsFailedAction, error: reason})
            )
        });
    }
}