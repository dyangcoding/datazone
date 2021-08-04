import React from "react";
import { RuleProperties } from "../models/rule";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import { connect } from "react-redux";
import { deleteRule, updateRule } from "./store";

interface StateProps {
    readonly rule: RuleProperties;
}

interface DispatchProps {
    readonly onEditRule: (newRule: RuleProperties, oldId: number) => Promise<RuleProperties>;
    readonly onDeleteRule: (ruleId: number) => Promise<void>;
}

interface EntryProps extends StateProps, DispatchProps {}

interface EntryState {

}

export class RuleEntryComponent extends React.Component<EntryProps, EntryState> {
    constructor(props: EntryProps) {
        super(props)

        this.onEditRuleClick = this.onEditRuleClick.bind(this);
        this.onDeleteRuleClick = this.onDeleteRuleClick.bind(this);
    }

    public render(): React.ReactNode {
        const rule = this.props.rule;
        return (
            <div className="flex flex-col min-w-full px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex">
                        <div className="flex-shrink-0 h-6 w-6">
                            <AdjustmentsIcon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="ml-4 text-base font-medium text-gray-900 tracking-wide">
                            <div className="whitespace-pre-line">
                                <span className="py-4">{rule.keyword}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="rounded-md border border-blue-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                Edit
                            </button>
                        </div>
                        <div className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private onEditRuleClick(): void {

    }

    private onDeleteRuleClick(ruleId: number | undefined): void {
        if (ruleId) {
            this.props.onDeleteRule(ruleId)
        }
    }
}

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        onEditRule: (rule: RuleProperties, id: number) => dispatch(updateRule({newRule: rule, oldId: id})),
        onDeleteRule: (id: number) => dispatch(deleteRule(id))
    };
}

export const RuleEntry = connect(null, mapDispatchToProps)(RuleEntryComponent)