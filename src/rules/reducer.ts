import { UpstreamRuleProperties } from "../models/rule";
import { Status } from "../app/store";
import { Action, ActionType } from "./actions";

interface RuleState {
    readonly value: ReadonlyArray<UpstreamRuleProperties>,
    readonly loading: Status,
    readonly error: string | undefined,
};

const initialState: RuleState = {
    value: [] as UpstreamRuleProperties[],
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
            return {...state, loading: "failed", error: action.error.message};
        }
        case ActionType.RuleDeletingCompletedAction: {
            const result = state.value.filter(rule => rule._id !== action.ruleId)
            return {...state, value: result}
        }
        default:
            return state;
    }
}