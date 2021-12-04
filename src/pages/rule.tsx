import React from "react";
import { Fragment } from "react";
import { SearchIcon, ChatAltIcon, EmojiSadIcon, AdjustmentsIcon, TrashIcon, XIcon, DownloadIcon } from "@heroicons/react/outline";
import { UpstreamRuleProperties } from "../models/rule";
import { connect } from "react-redux";
import { RuleEntry } from "../rules/rule-list-entry";
import { AppState } from "../app/store";
import Spinner from "../components/spinner";
import { loadRules } from "../rules/actions";
import { downloads } from "../utils/download";

interface StateProps {
    readonly rules: ReadonlyArray<UpstreamRuleProperties>;
    readonly isLoading: string;
    readonly error: string | undefined;
}

interface DispatchProps {
    readonly onLoad: () => void;
}

interface RuleProps extends StateProps, DispatchProps {}

interface RuleState {
    readonly showError: boolean;
}

export class RuleComponent extends React.Component<RuleProps, RuleState> {
    constructor(props: RuleProps) {
        super(props);

        this.state = {
            showError: true,
        }

        this.onHideErrorClick = this.onHideErrorClick.bind(this);
        this.onDownloadClick = this.onDownloadClick.bind(this);
    }

    public componentDidMount(): void {
        this.props.onLoad();
    }

    public render(): React.ReactNode {
        return (
            <div className="max-w-4xl mx-auto">
                {this.renderHeader()}
                {this.renderRuleInfo()}
                {this.renderRules()}
                {this.renderActionButton()}
            </div>
        );
    }

    private renderHeader(): React.ReactNode {
        return (
            <header className="bg-white">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Rules
                    </h1>

                    <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                    <button type="button"
                        className="-mr-1 flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
                        <span className="sr-only">Search</span>
                        <SearchIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    </div>
                </div>

                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                    <div className="border-t border-gray-200"></div>
                    </div>
                </div>
            </header>
        );
    }

    private renderPageInfo(): React.ReactNode {
        return (
            <div className="lg:text-center py-6 border rounded-lg">
                <div className="flex items-center justify-center px-2 py-4 text-center"><AdjustmentsIcon className="text-gray-500 h-12 w-12" aria-hidden="true" /></div>
                <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">No Rules</h2>
                <p className="text-lg text-gray-500">
                    Get Started by creating a new Rule
                </p>
                <div className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button className="rounded-md border border-blue-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                        Create Rule
                    </button>
                </div>
            </div>
        );
    }

    private renderRuleInfo(): React.ReactNode {
        return (
            <Fragment>
                <div className="flex justify-between space-x-4">
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ChatAltIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <div className="text-lg leading-6 font-medium text-gray-900">
                                        Editing Rule
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            A new Rule would be created and applied to the filtered Stream every time when editing a existing rule.
                                            This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <TrashIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <div className="text-lg leading-6 font-medium text-gray-900">
                                        Deleting Rule
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            The particular Rule would be removed and applied to the filtered Stream every time when deleting a existing rule.
                                            This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    private renderError(): React.ReactNode {
        return (
            <div className="lg:text-center py-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="flex items-center justify-center px-2 py-4 text-center"><EmojiSadIcon className="text-red-500 h-12 w-12" aria-hidden="true" /></div>
                <h2 className="text-2xl text-red-600 font-semibold tracking-wide uppercase">Oops, I think you're lost.</h2>
                <p className="text-lg text-red-500">
                    Sorry, we could't not get what you are looking for ...
                </p>
                <div className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium">
                    Check Connection OR refresh the Page
                </div>
            </div>
        );
    }

    private renderRules(): React.ReactNode {
        const {rules, isLoading} = this.props;
        if (isLoading === "loading") {
            return <Spinner />;
        }
        if (!rules.length) {
            return this.renderPageInfo();
        }
        return (
            <Fragment>
                <div className="flex justify-between items-center border rounded-md bg-blue-500 text-white px-4 py-5">
                    <h3 className="text-xl leading-6 font-medium">Rules</h3>
                    <p className="mt-1 max-w-2xl text-sm border-2 rounded-full py-3 px-6">{this.props.rules.length}</p>
                </div>
                {this.renderErrorMessage()}
                <div className="flex flex-col bg-white divide-y divide-gray-200 my-4">
                    {rules.map(rule => (
                        <RuleEntry key={rule.id} rule={rule} />
                    ))}
                </div>
            </Fragment>
        );
    }

    private renderActionButton(): React.ReactNode {
        return (
            <div className="fixed bottom-0 right-10 mb-4">
                <button onClick={this.onDownloadClick}
                    className="text-white px-4 py-4 w-auto bg-green-600 rounded-full hover:bg-green-700 active:shadow-lg 
                        shadow transition ease-in duration-200 focus:outline-none">
                    <DownloadIcon className="w-6 h-6" />
                </button>
            </div>
        );
    }

    private renderErrorMessage(): React.ReactNode {
        const error = this.props.error;
        if (error && this.state.showError) {
            return (
                <div className="flex justify-between items-center p-2 bg-red-100 text-red-500 py-3 px-3 rounded my-4" onClick={this.onHideErrorClick}>
                    <div className="lead">{error}</div>
                    <XIcon className="h-6 w-6" />
                </div>
            );
        }
    }

    private onHideErrorClick(): void {
        this.setState(previousState => ({showError: !previousState.showError}));
    }

    private onDownloadClick(): void {
        const rules = this.props.rules;
        if (!rules || !rules.length) {
            return;
        }
        downloads(rules, "rules.json");
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        rules: state.rules.value,
        isLoading: state.rules.loading,
        error: state.rules.error
    };
}

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        onLoad: () => dispatch(loadRules())
    }
}

export const Rules = connect(mapStateToProps, mapDispatchToProps)(RuleComponent)