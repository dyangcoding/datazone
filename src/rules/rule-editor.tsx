import React from "react";
import { XIcon } from "@heroicons/react/outline";
import { connect } from "react-redux";
import { AccordionItem } from "../components/accordionItem";
import { Rule, RuleProperties } from "../models/rule";
import { RuleOptionsProperties } from "../models/ruleOptions";
import { OptionsSearchForm } from "./options-search-form";
import { RuleSearchForm } from "./rule-search-form";
import { addRule } from "./actions";

interface StateProps {
    readonly rule?: RuleProperties;
    readonly toggleEditor?: boolean | undefined;
}

interface DispatchProps {
    readonly onAddRule: (rule: RuleProperties) => Promise<RuleProperties>;
}

interface EditorProps extends StateProps, DispatchProps {}

interface EditorState {
    readonly rule: RuleProperties;
    readonly options: RuleOptionsProperties;
    readonly showError: boolean;
    readonly error?: Error;
    readonly processing: boolean;
}

class RuleEditorComponent extends React.Component<EditorProps, EditorState> {
    constructor(props: EditorProps) {
        super(props)

        this.state = {
            rule: this.props.rule ? this.props.rule : new Rule(),
            options: this.props.rule && this.props.rule.options ? this.props.rule.options : {language: "en", sample: 30} as RuleOptionsProperties,
            showError: true,
            processing: false,
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onRuleChange = this.onRuleChange.bind(this);
        this.onRuleOptionsChange = this.onRuleOptionsChange.bind(this);
        this.onHideErrorClick = this.onHideErrorClick.bind(this);
    }

    public componentDidUpdate(_: EditorProps, previousState: EditorState): void {
        if (this.state.processing && !previousState.processing) {
            const rule = this.buildRule();
            console.log(rule);
            if (this.props.onAddRule) {
                this.props.onAddRule(rule).then(
                    () => this.setState({processing: false}),
                    reason => this.setState({showError: true, processing: false, error: reason})
                );
            }
        }
    }

    public render(): React.ReactNode {
        return (
            <div className="w-full border rounded-md">
                <form className="bg-white sm:p-6 py-6 px-4" onSubmit={this.onSubmit}>
                    {this.renderErrorMessage()}
                    <AccordionItem title="Standard Search" isToggled={this.props.toggleEditor}>
                        <RuleSearchForm rule={this.state.rule} onChange={this.onRuleChange} />
                    </AccordionItem>
                    <AccordionItem title="Optional Search" isToggled={this.props.toggleEditor}>
                        <OptionsSearchForm options={this.state.options} onChange={this.onRuleOptionsChange} />
                    </AccordionItem>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
                                text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
                                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    // TODO: ensure that no empty Rule would be sent
    private buildRule(): RuleProperties {
        if (Object.keys(this.state.options).length) {
            return {...this.state.rule, options: this.state.options};
        }
        return {...this.state.rule};
    }

    private renderErrorMessage(): React.ReactNode {
        const error = this.state.error;
        if (error && this.state.showError) {
            return (
                <div className="flex justify-between items-center p-2 bg-red-100 text-red-500 py-3 px-3 rounded" onClick={this.onHideErrorClick}>
                    <div className="lead">{error.message}</div>
                    <XIcon className="h-6 w-6" />
                </div>
            );
        }
    }

    private onHideErrorClick(): void {
        this.setState(previousState => ({showError: !previousState.showError}));
    }

    private onRuleChange(rule: RuleProperties): void {
        this.setState(previousState => ({rule: {...previousState.rule, ...rule}}));
    }

    private onRuleOptionsChange(options: RuleOptionsProperties): void {
        this.setState(previousState => ({options: {...previousState.options, ...options}}));
    }

    private onSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.setState({processing: true});
    }
}

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        onAddRule: (rule: RuleProperties) => dispatch(addRule(rule))
    }
}

export const RuleEditor = connect(null, mapDispatchToProps)(RuleEditorComponent)