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
            return {
                ...state,
                loading: "loading"
            };
        }
        case ActionType.LoadRulesCompletedAction: {
            const uniqueRules = Array.from(new Set(action.rules.concat(state.value)));
            return {
                ...state,
                loading: "completed",
                value: uniqueRules
            };
        }
        case ActionType.LoadRulesFailedAction: {
            return {
                ...state,
                loading: "failed",
                error: action.error.message
            };
        }
        default:
            return state;
    }
}