import React from "react";
import { MenuAlt3Icon, DownloadIcon } from "@heroicons/react/outline";
import { RuleEditor } from "../rules/rule-editor";
import { TweetList } from "../tweets/tweet-list";
import { Search } from "../tweets/search";

interface TweetProps {}

interface TweetState {
    readonly toggleEditor: Boolean;
}

export class Tweets extends React.Component<TweetProps, TweetState> {
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
            <div className="flex relative max-w-6xl mx-auto">
                <div className="flex flex-col lg:w-2/3 flex-grow mx-auto">
                    {this.renderHeader()}
                    {this.renderSearchSection()}
                    {this.renderTweets()}
                </div>
                <div className="sm:hidden lg:flex lg:flex-col lg:w-96 space-y-6 py-7 px-4 lg:px-8">
                    <Search />
                </div>
                <div className="mb-4 absolute bottom-0 right-10">
                    <button
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
        return <TweetList />;
    }

    private onToggleEditor(): void {
        this.setState(state => ({toggleEditor: !state.toggleEditor}));
    }
}