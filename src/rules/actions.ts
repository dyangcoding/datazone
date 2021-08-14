import { createAsyncThunk } from "@reduxjs/toolkit";
import { RuleProperties } from "../models/rule";
import { RulesClient } from "../services/ajax";

export enum ActionType {
    LoadRulesStartedAction = "LOAD_RULES_STARTED",
    LoadRulesCompletedAction = "LOAD_RULES_COMPLETED",
    LoadRulesFailedAction = "LOAD_RULES_FAILED"
}

export type Action = LoadRulesStartedAction | LoadRulesCompletedAction | LoadRulesFailedAction;

export interface LoadRulesStartedAction {
    readonly type: ActionType.LoadRulesStartedAction;
}

export interface LoadRulesCompletedAction {
    readonly type: ActionType.LoadRulesCompletedAction;
    readonly rules: ReadonlyArray<RuleProperties>;
}

export interface LoadRulesFailedAction {
    readonly type: ActionType.LoadRulesFailedAction;
    readonly error: Error;
}

interface UpdateRulePayload {
    newRule: RuleProperties,
    oldId: number,
}

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