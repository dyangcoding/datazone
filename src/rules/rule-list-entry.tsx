import React from "react";
import { UpstreamRuleProperties } from "../models/rule";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import { connect } from "react-redux";
import { deleteRule, updateRule } from "./actions";
import { RuleEditor } from "./rule-editor";
import { ToastProperties } from "../ui/toast";
import { addToast } from "../ui/actions";

interface StateProps {
    readonly rule: UpstreamRuleProperties;
}

interface DispatchProps {
    readonly onEditRule: (newRule: UpstreamRuleProperties, oldId: number) => Promise<UpstreamRuleProperties>;
    readonly onDeleteRule: (ruleId: string) => Promise<void>;
    readonly addToast: (toast: ToastProperties) => void;
}

interface EntryProps extends StateProps, DispatchProps {}

interface EntryState {
    readonly isEditorToggled: boolean;
    readonly showError: boolean;
    readonly error?: Error;
    readonly processing: boolean;
}

class RuleEntryComponent extends React.Component<EntryProps, EntryState> {
    constructor(props: EntryProps) {
        super(props)

        this.state = {
            isEditorToggled: false,
            showError: false,
            processing: false,
        }

        this.onEditRuleClick = this.onEditRuleClick.bind(this);
        this.onDeleteRuleClick = this.onDeleteRuleClick.bind(this);
    }

    public render(): React.ReactNode {
        const rule = this.props.rule;
        return (
            <div className="flex flex-col px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-cemter justify-center">
                        <div className="flex items-center justify-center">
                            <AdjustmentsIcon className="h-8 w-8" aria-hidden="true" />
                        </div>
                        <div className="flex flex-col ml-4">
                            <div className="text-base font-medium whitespace-pre-line tracking-wide">
                                <span className="py-4">{rule.keyword}</span>
                            </div>
                            <div className="text-gray-500 text-sm">
                                {rule.payload}
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={this.onEditRuleClick} className="rounded-md border border-blue-300 shadow-sm px-4 py-2 bg-white text-base 
                                font-medium text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Edit
                            </button>
                        </div>
                        <div className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={this.onDeleteRuleClick} className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base 
                                font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                {this.state.isEditorToggled 
                    ? 
                    <div className="flex my-4">
                        {this.state.isEditorToggled ? <RuleEditor rule={rule} toggleEditor /> : null}
                    </div>
                    :
                    null
                }
            </div>
        );
    }

    private onEditRuleClick(): void {
        this.setState(previousState => ({isEditorToggled: !previousState.isEditorToggled}));
    }

    private onDeleteRuleClick(): void {
        const id = this.props.rule.id;
        if (!id) {
            this.setState({error: new Error("Can not delete the Rule without id.")})
            return;
        }
        this.props.onDeleteRule(id).then(
            () => {
                this.setState({processing: false});
                this.props.addToast(this.buildToast());
            },
            reason => this.setState({showError: true, processing: false, error: reason})
        )
    }

    private buildToast(): ToastProperties {
        return {
            id: Date.now(),
            title: 'Rule',
            message: 'You successfully deleted Rule.',
            mode: 'success'
        } as ToastProperties;
    }
}

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        onEditRule: (rule: UpstreamRuleProperties, id: number) => dispatch(updateRule(rule, id)),
        onDeleteRule: (id: string) => dispatch(deleteRule(id)),
        addToast: (toast: ToastProperties) => dispatch(addToast(toast)),
    };
}

export const RuleEntry = connect(null, mapDispatchToProps)(RuleEntryComponent)