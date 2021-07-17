import React from "react";
import { XIcon, SearchIcon } from "@heroicons/react/outline";
import { AccordionItem } from "../components/accordionItem";
import { RuleSearchForm } from "../rules/rule-search-form";
import { OptionsSearchForm } from "../rules/options-search-form";
import { Rule, RuleProperties } from "../models/rule";
import { RuleClient } from "../services/ajax";
import { TweetsListComponent } from "../components/tweets-list";
import { RuleOptionsProperties } from "../models/ruleOptions";

interface TweetProps {

}

interface TweetState {
    readonly toggleSearch: Boolean;
    readonly rule: RuleProperties;
    readonly options: RuleOptionsProperties;
    readonly error?: Error;
    readonly hideError: boolean;
    readonly processing: boolean;
}

export class Tweets extends React.Component<TweetProps, TweetState> {
    constructor(props: TweetProps) {
        super(props);

        this.state = {
            toggleSearch: false,
            rule: new Rule(),
            options: {},
            hideError: true,
            processing: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onToggleSearch = this.onToggleSearch.bind(this);
        this.renderSearchSection = this.renderSearchSection.bind(this);
        this.onRuleChange = this.onRuleChange.bind(this);
        this.onRuleOptionsChange = this.onRuleOptionsChange.bind(this);
        this.onHideErrorClick = this.onHideErrorClick.bind(this);
    }

    public componentDidUpdate(_: TweetProps, previousState: TweetState): void {
        if (this.state.processing && !previousState.processing) {
            const rule = this.buildRule();
            console.log(rule);
            RuleClient.createRule(rule).then(
                () => this.setState({processing: false}),
                reason => this.setState({error: reason, hideError: false, processing: false})
            );
        }
    }

    public render(): React.ReactNode {
        return (
            <React.Fragment>
                {this.renderHeader()}
                {this.renderInfo()}
                {this.renderSearchSection()}
                {this.renderTweets()}
            </React.Fragment>
        );
    }

    private renderHeader(): React.ReactNode {
        return (
            <header className="bg-white">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Tweets
                    </h1>

                    <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                    <button type="button" onClick={this.onToggleSearch}
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

    private renderInfo(): React.ReactNode {
        return (
            <div className="lg:text-center py-6">
                <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Data Zone</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    A better way to acquire data
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                    Data Zone overcomes the struggle on how to effectively acquire twitter data for your next research project.
                </p>
            </div>
        );
    }

    private renderSearchSection(): React.ReactNode {
        if (this.state.toggleSearch) {
            return (
                <React.Fragment>
                    <div className="shadow overflow-hidden sm:rounded-md">
                        {this.renderErrorMessage()}
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <form onSubmit={this.onSubmit}>
                                <AccordionItem title="Standard Suche">
                                    <RuleSearchForm onChange={this.onRuleChange} />
                                </AccordionItem>
                                <AccordionItem title="Optionale Suche">
                                    <OptionsSearchForm onChange={this.onRuleOptionsChange} />
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
                    </div>
                </React.Fragment>
            );
        }
        return null;
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
        if (error && !this.state.hideError) {
            return (
                <div className="flex justify-between items-center p-2 bg-red-100 text-red-500 py-3 px-3 rounded" onClick={this.onHideErrorClick}>
                    <div className="lead">{error.message}</div>
                    <XIcon className="h-6 w-6" />
                </div>
            );
        }
    }

    private onHideErrorClick(): void {
        this.setState(previouSstate => ({hideError: !previouSstate.hideError}));
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

    private renderTweets(): React.ReactNode {
        return <TweetsListComponent />;
    }

    private onToggleSearch(): void {
        this.setState(state => ({toggleSearch: !state.toggleSearch}));
    }
}