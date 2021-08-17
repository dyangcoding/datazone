import { fetchTweets } from "../app/mongo-client";
import { ThunkAction } from "../app/store";
import { TweetProperties } from "../models/tweet";

export enum ActionType {
    LoadTweetsStartedAction = "LOAD_TWEETS_STARTED",
    LoadTweetsCompletedAction = "LOAD_TWEETS_COMPLETED",
    LoadTweetsFailedAction = "LOAD_TWEETS_FAILED",

    TweetInsertingStartedAction = "TWEET_INSERTING_STARTED",
    TweetInsertingCompletedAction = "TWEET_INSERTING_COMPLETED",
    TweetInsertingFailedAction = "TWEET_INSERTING_FAILED"
}

export type Action = LoadTweetsStartedAction | LoadTweetsCompletedAction | LoadTweetsFailedAction |
            TweetInsertingStartedAction | TweetInsertingCompletedAction | TweetInsertingFailedAction;

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

export interface TweetInsertingStartedAction {
    readonly type: ActionType.TweetInsertingStartedAction;
}

export interface TweetInsertingCompletedAction {
    readonly type: ActionType.TweetInsertingCompletedAction;
    readonly tweet: TweetProperties;
}

export interface TweetInsertingFailedAction {
    readonly type: ActionType.TweetInsertingFailedAction;
    readonly error: Error;
}

export function loadTweets(): ThunkAction<Action> {
    return dispatch => {
        dispatch({type: ActionType.LoadTweetsStartedAction});
        fetchTweets().then(
            results => dispatch({type: ActionType.LoadTweetsCompletedAction, tweets: results}),
            reason => dispatch({type: ActionType.LoadTweetsFailedAction, error: reason})
        );
    }
}

export function insertTweet(tweet: TweetProperties): ThunkAction<Action> {
    return dispatch => {
        dispatch({type: ActionType.TweetInsertingStartedAction});
        dispatch({type: ActionType.TweetInsertingCompletedAction, tweet: tweet});
    }
}

