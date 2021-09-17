import { RuleProperties } from "../models/rule";
import { Status } from "../app/store";
import { Action, ActionType } from "./actions";

interface RuleState {
    readonly value: ReadonlyArray<RuleProperties>,
    readonly loading: Status,
    readonly error: string | undefined,
};

const initialState: RuleState = {
    value: [] as RuleProperties[],
    loading: "idle",
    error: undefined
};

export function ruleReducer(state: RuleState = initialState, action: Action): RuleState {
    switch (action.type) {
        case ActionType.LoadRulesStartedAction: {
            return {...state, loading: "loading"};
        }
        case ActionType.LoadRulesCompletedAction: {
            return {...state, loading: "completed", value: action.rules};
        }
        case ActionType.LoadRulesFailedAction: {
            return {...state, loading: "failed", error: action.error.message};
        }
        case ActionType.DeleteRuleStartedAction: {
            return {...state, loading: "deleting"};
        }
        case ActionType.UpdateRuleCompletedAction: {
            return {...state, loading: "completed"};
        }
        case ActionType.DeletedRuleFailedAction: {
            console.log(action.error.message)
            return {...state, loading: "failed", error: action.error.message};
        }
        default:
            return state;
    }
}