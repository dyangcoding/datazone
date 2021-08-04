import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { RuleProperties } from "../models/rule";
import TweetsList from "../tweets/tweets-list";
import { connect } from "react-redux";
import { RuleEditor } from "../rules/rule-editor";
import { Tweet } from "../models/tweet";
import { AppState } from "../app/store";

interface StateProps {
    readonly tweets: ReadonlyArray<Tweet>;
}

interface DispatchProps {
    readonly onAddRule: (rule: RuleProperties) => Promise<RuleProperties>;
}

interface TweetProps extends StateProps, DispatchProps {}

interface TweetState {
    readonly toggleEditor: Boolean;
}

export class TweetComponent extends React.Component<TweetProps, TweetState> {
    constructor(props: TweetProps) {
        super(props);

        this.state = {
            toggleEditor: false,
        };
        this.onToggleEditor = this.onToggleEditor.bind(this);
        this.renderSearchSection = this.renderSearchSection.bind(this);
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
                    <button type="button" onClick={this.onToggleEditor}
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
                    A better way to acquire real-time data
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                    Data Zone overcomes the struggle on how to effectively acquire twitter data for your next research project.
                </p>
            </div>
        );
    }

    private renderSearchSection(): React.ReactNode {
        if (this.state.toggleEditor) {
            return <RuleEditor />;
        }
        return null;
    }

    private renderTweets(): React.ReactNode {
        return <TweetsList />;
    }

    private onToggleEditor(): void {
        this.setState(state => ({toggleEditor: !state.toggleEditor}));
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        tweets: state.tweets.value,
    }
}

export const Tweets = connect(mapStateToProps)(TweetComponent)