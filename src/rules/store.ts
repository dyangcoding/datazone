import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { RulesClient } from "../services/ajax";
import { RuleProperties } from "../models/rule";
import { Status } from "../app/store";

interface RuleState {
    readonly value: ReadonlyArray<RuleProperties>,
    readonly loading: Status,
    readonly error: string | undefined,
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

export const loadRules =  createAsyncThunk(
    "loadRules", 
    async () => RulesClient.fetchRules()
);

export const addRule = createAsyncThunk(
    "addRule",
    async (rule: RuleProperties) => RulesClient.createRule(rule)
);

export const updateRule = createAsyncThunk(
    "updateRule", 
    async (payload: UpdateRulePayload) => {
        const {newRule, oldId} = payload;
        return RulesClient.updateRule(newRule, oldId);
    }
);

export const deleteRule = createAsyncThunk(
    "deleteRule", 
    async (ruleId: number) => RulesClient.deleteRule(ruleId)
);

export const ruleReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(loadRules.pending, (state) => {
        state.loading = "loading"
    })
    .addCase(loadRules.fulfilled, (state, action) => {
        state.loading = "completed"
        state.value = state.value.concat(action.payload)
    })
    .addCase(loadRules.rejected, (state, action) => {
        state.loading = "failed"
        state.error = action.error.message
    })
});