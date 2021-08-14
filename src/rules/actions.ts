import { createAsyncThunk } from "@reduxjs/toolkit";
import { ruleCollection } from "../app/mongo-client";
import { ThunkAction } from "../app/store";
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

export function loadRules(): ThunkAction<Action> {
    return dispatch => {
        dispatch({type: ActionType.LoadRulesStartedAction});
        const collection = ruleCollection();
        collection.then(rules => {
            rules.find().then(
                results => dispatch({type: ActionType.LoadRulesCompletedAction, rules: results}),
                reason => dispatch({type: ActionType.LoadRulesFailedAction, error: reason})
            )
        })
    }
}

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