import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { Tweet } from "../models/tweet";
import { Status } from "../rules/store";
import { TweetsClient } from "../services/ajax";

interface TweetState {
    value: Tweet[],
    loading: Status,
    error: String | undefined,
};

const initialState: TweetState = {
    value: [] as Tweet[],
    loading: "idle",
    error: undefined
};

export const fetchTweets =  createAsyncThunk(
    "tweets/fetchTweets", 
    async () => TweetsClient.fetchTweets()
);

// reducer
export const tweetReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(fetchTweets.pending, (state) => {
        state.loading = "loading"
    })
    .addCase(fetchTweets.fulfilled, (state, action) => {
        state.loading = "completed"
        state.value.concat(action.payload)
    })
    .addCase(fetchTweets.rejected, (state, action) => {
        state.loading = "failed"
        state.error = action.error.message
    })
});