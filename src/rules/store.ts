import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { RuleClient } from "../services/ajax";
import { RuleProperties } from "../models/rule";

export type Status = "idle" | "loading" | "completed" | "failed";

interface RuleState {
    value: RuleProperties[],
    loading: Status,
    error: String | undefined,
};

interface UpdateRulePayload {
    newRule: RuleProperties,
    oldId: number,
};

const initialState: RuleState = {
    value: [] as RuleProperties[],
    loading: "idle",
    error: undefined
};

export const fetchRules =  createAsyncThunk(
    "rules/fetchRules", 
    async () => RuleClient.fetchRules()
);

export const addRule = createAsyncThunk(
    "rules/addRule",
    async (rule: RuleProperties) => RuleClient.createRule(rule)
);

export const updateRule = createAsyncThunk(
    "rules/updateOne", 
    async (newRuleWithOldRuleId: UpdateRulePayload) => {
        const {newRule, oldId} = newRuleWithOldRuleId;
        return RuleClient.updateRule(newRule, oldId);
    }
);

export const deleteRule = createAsyncThunk(
    "rules/deleteOne", 
    async (ruleId: number) => RuleClient.deleteRule(ruleId)
);

// reducer
export const ruleReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(fetchRules.pending, (state) => {
        state.loading = "loading"
    })
    .addCase(fetchRules.fulfilled, (state, action) => {
        state.loading = "completed"
        state.value.concat(action.payload)
    })
    .addCase(fetchRules.rejected, (state, action) => {
        state.loading = "failed"
        state.error = action.error.message
    })
});