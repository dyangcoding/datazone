import { fetchRules } from "../app/mongo-client";
import { AsyncThunkAction, ThunkAction } from "../app/store";
import { RuleProperties, UpstreamRuleProperties } from "../models/rule";
import { RulesClient } from "../services/ajax";

export enum ActionType {
    LoadRulesStartedAction = "LOAD_RULES_STARTED",
    LoadRulesCompletedAction = "LOAD_RULES_COMPLETED",
    LoadRulesFailedAction = "LOAD_RULES_FAILED",

    AddRuleStartedAction = "ADD_RULE_STARTED",
    AddRuleCompletedAction = "ADD_RULE_COMPLETED",
    AddRuleFailedAction = "ADD_RULE_FAILED",

    UpdateRuleStartedAction = "UPDATE_RULE_STARTED",
    UpdateRuleCompletedAction = "UPDATE_RULE_COMPLETED",
    UpdateRuleFailedAction = "UPDATE_RULE_FAILED",

    DeleteRuleStartedAction = "DELETE_RULE_STARTED",
    DeleteRuleCompletedAction = "DELETE_RULE_COMPLETED",
    DeletedRuleFailedAction = "DELETE_RULE_FAILED",

    RuleDeletedCompletedAction = "RULE_DELETED_COMPLETED"
}

export type Action = LoadRulesStartedAction | LoadRulesCompletedAction | LoadRulesFailedAction 
                | AddRuleStartedAction | AddRuleCompletedAction | AddRuleFailedAction
                | UpdateRuleStartedAction | UpdateRuleCompletedAction | UpdateRuleFailedAction 
                | DeleteRuleStartedAction | DeleteRuleCompletedAction | DeleteRuleFailedAction
                | RuleDeletedCompletedAction;

export interface LoadRulesStartedAction {
    readonly type: ActionType.LoadRulesStartedAction;
}

export interface LoadRulesCompletedAction {
    readonly type: ActionType.LoadRulesCompletedAction;
    readonly rules: ReadonlyArray<UpstreamRuleProperties>;
}

export interface LoadRulesFailedAction {
    readonly type: ActionType.LoadRulesFailedAction;
    readonly error: Error;
}

export interface AddRuleStartedAction {
    readonly type: ActionType.AddRuleStartedAction;
}

export interface AddRuleCompletedAction {
    readonly type: ActionType.AddRuleCompletedAction;
    readonly rule: RuleProperties;
}

export interface AddRuleFailedAction {
    readonly type: ActionType.AddRuleFailedAction;
    readonly error: Error;
}

export interface UpdateRuleStartedAction {
    readonly type: ActionType.UpdateRuleStartedAction;
}

export interface UpdateRuleCompletedAction {
    readonly type: ActionType.UpdateRuleCompletedAction;
    readonly rule: RuleProperties;
}

export interface UpdateRuleFailedAction {
    readonly type: ActionType.UpdateRuleFailedAction;
    readonly error: Error;
}

export interface DeleteRuleStartedAction {
    readonly type: ActionType.DeleteRuleStartedAction;
}

export interface DeleteRuleCompletedAction {
    readonly type: ActionType.DeleteRuleCompletedAction;
}

export interface DeleteRuleFailedAction {
    readonly type: ActionType.DeletedRuleFailedAction;
    readonly error: Error;
}

export interface RuleDeletedCompletedAction {
    readonly type: ActionType.RuleDeletedCompletedAction;
    readonly ruleId: string;
}

export function loadRules(): ThunkAction<Action> {
    return dispatch => {
        dispatch({type: ActionType.LoadRulesStartedAction});
        fetchRules().then(
            results => dispatch({type: ActionType.LoadRulesCompletedAction, rules: results}),
            reason => dispatch({type: ActionType.LoadRulesFailedAction, error: reason})
        );
    }
}

export function addRule(rule: RuleProperties): AsyncThunkAction<Action, RuleProperties> {
    return dispatch => {
        dispatch({type: ActionType.AddRuleStartedAction});
        return RulesClient.createRule(rule).then(
            result => {
                dispatch({type: ActionType.AddRuleCompletedAction, rule: result});
                return result;
            },
            reason => {
                dispatch({type: ActionType.AddRuleFailedAction, error: reason})
                throw reason;
            }
        );
    }
}

export function updateRule(newRule: RuleProperties, oldId: number): AsyncThunkAction<Action, RuleProperties> {
    return dispatch => {
        dispatch({type: ActionType.UpdateRuleStartedAction});
        return RulesClient.updateRule(newRule, oldId).then(
            result => {
                dispatch({type: ActionType.UpdateRuleCompletedAction, rule: result});
                return result;
            },
            reason => {
                dispatch({type: ActionType.UpdateRuleFailedAction, error: reason})
                throw reason;
            }
        );
    }
}

export function deleteRule(id: string): AsyncThunkAction<Action> {
    return dispatch => {
        dispatch({type: ActionType.DeleteRuleStartedAction});
        return RulesClient.deleteRule(id).then(
            () => {
                dispatch({type: ActionType.DeleteRuleCompletedAction});
                return;
            },
            reason => {
                dispatch({type: ActionType.DeletedRuleFailedAction, error: reason});
                throw reason;
            }
        );
    }
}