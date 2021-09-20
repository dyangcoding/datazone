import React from "react";
import { MenuAlt3Icon, DownloadIcon } from "@heroicons/react/outline";
import { RuleEditor } from "../rules/rule-editor";
import { TweetList } from "../tweets/tweet-list";
import { TweetProperties } from "../models/tweet";
import { AppState } from "../app/store";
import { connect } from "react-redux";
import { downloads } from "../utils/download";

interface TweetProps {
    readonly tweets: ReadonlyArray<TweetProperties>;
}

interface TweetState {
    readonly toggleEditor: Boolean;
}

export class TweetsComponent extends React.Component<TweetProps, TweetState> {
    constructor(props: TweetProps) {
        super(props);

        this.state = {
            toggleEditor: false,
        };
        this.onToggleEditor = this.onToggleEditor.bind(this);
        this.renderSearchSection = this.renderSearchSection.bind(this);
        this.onDownloadClick = this.onDownloadClick.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <div className="flex max-w-4xl mx-auto overflow-y-auto">
                <div className="flex flex-col lg:w-2/3 flex-grow mx-auto">
                    {this.renderHeader()}
                    {this.renderSearchSection()}
                    {this.renderTweets()}
                </div>
                <div className="fixed bottom-0 right-10 mb-4">
                    <button onClick={this.onDownloadClick}
                        className="text-white px-4 py-4 w-auto bg-green-600 rounded-full hover:bg-green-700 active:shadow-lg 
                            shadow transition ease-in duration-200 focus:outline-none">
                        <DownloadIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
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
                            <MenuAlt3Icon className="h-6 w-6" aria-hidden="true" />
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

    private renderSearchSection(): React.ReactNode {
        if (this.state.toggleEditor) {
            return <RuleEditor />;
        }
        return null;
    }

    private renderTweets(): React.ReactNode {
        return <TweetList />;
    }

    private onToggleEditor(): void {
        this.setState(state => ({toggleEditor: !state.toggleEditor}));
    }

    private onDownloadClick(): void {
        const tweets = this.props.tweets;
        if (!tweets || !tweets.length) {
            return;
        }
        downloads(tweets, "tweets.json");
    }
}

function mapStateToProps(state: AppState): TweetProps {
    return {
        tweets: state.tweets.value,
    };
}

export const Tweets = connect(mapStateToProps, null)(TweetsComponent)