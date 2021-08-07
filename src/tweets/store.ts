import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { Status } from "../app/store";
import { TweetProperties } from "../models/tweet";
import { TweetsClient } from "../services/ajax";

interface TweetState {
    readonly value: ReadonlyArray<TweetProperties>,
    readonly loading: Status,
    readonly error: string | undefined,
};

const initialState: TweetState = {
    value: [] as TweetProperties[],
    loading: "idle",
    error: undefined
};

export const loadTweets =  createAsyncThunk(
    "loadTweets", 
    async () => TweetsClient.fetchTweets()
);

export const tweetReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(loadTweets.pending, (state) => {
        state.loading = "loading"
    })
    .addCase(loadTweets.fulfilled, (state, action) => {
        state.loading = "completed"
        state.value = state.value.concat(action.payload)
    })
    .addCase(loadTweets.rejected, (state, action) => {
        state.loading = "failed"
        state.error = action.error.message
    })
});