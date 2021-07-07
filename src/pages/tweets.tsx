import React from "react";
import { XIcon, SearchIcon } from "@heroicons/react/outline";
import { AccordionItem } from "../components/accordionItem";

interface TweetProps {

}

interface TweetState {
    readonly toggleSearch: Boolean
}

export class Tweets extends React.Component<TweetProps, TweetState> {
    constructor(props: TweetProps) {
        super(props);

        this.state = {toggleSearch: false};
        this.onToggleSearch = this.onToggleSearch.bind(this);
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
                    Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
                    accusamus quisquam.
                </p>
            </div>
        );
    }

    private renderSearchSection(): React.ReactNode {
        if (this.state.toggleSearch) {
            return (
                <React.Fragment>
                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <AccordionItem title="Standard Suche">
                                {this.renderStandard()}
                            </AccordionItem>
                            <AccordionItem title="Optionale Suche">
                                {this.renderOptions()}
                            </AccordionItem>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
        return null;
    }

    private renderStandard(): React.ReactNode {
        return (
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-4 gap-6">
                        <div className="col-span-4">
                            <label htmlFor="keyword" className="flex items-center justify-between text-sm font-medium text-gray-700">
                            Keyword
                            <span className="text-gray-400">Max. 256 Characters</span>
                            </label>
                            <input type="text" name="keyword" id="keyword" autoComplete="keyword"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2">
                        <label htmlFor="hashtags" className="block text-sm font-medium text-gray-700">
                            Hashtag
                        </label>
                        <input type="text" name="hashtags" id="hashtags" autoComplete="given-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2">
                        <label htmlFor="emoji" className="block text-sm font-medium text-gray-700">
                            Emoji
                        </label>
                        <input type="text" name="emoji" id="emoji" autoComplete="family-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-1">
                        <label htmlFor="user" className="block text-sm font-medium text-gray-700">
                            User
                        </label>
                        <input type="text" name="user" id="user" autoComplete="user"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-1">
                        <label htmlFor="from-user" className="block text-sm font-medium text-gray-700">
                            From User
                        </label>
                        <input type="text" name="from-user" id="from-user" autoComplete="from-user"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-1">
                        <label htmlFor="to-user" className="block text-sm font-medium text-gray-700">
                            To User
                        </label>
                        <input type="text" name="to-user" id="to-user" autoComplete="to-user"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-1">
                        <label htmlFor="retweet-of-user" className="block text-sm font-medium text-gray-700">
                            Retweet of User
                        </label>
                        <input type="text" name="retweet-of-user" id="retweet-of-user" autoComplete="retweet-of-user"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2">
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                            Url
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            https://
                            </span>
                            <input type="text" name="url" id="url"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"/>
                        </div>
                        </div>

                        <div className="col-span-2">
                        <label htmlFor="conversation" className="block text-sm font-medium text-gray-700">
                            Conversation
                        </label>
                        <input type="text" name="conversation" id="conversation"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        </div>

                        <div className="col-span-2">
                        <label htmlFor="context" className="block text-sm font-medium text-gray-700">
                            Context
                        </label>
                        <input type="text" name="context" id="context"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2">
                        <label htmlFor="entity" className="block text-sm font-medium text-gray-700">
                            Entity
                        </label>
                        <input type="text" name="entity" id="entity"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>
                    </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    private renderOptions(): React.ReactNode {
        return null;
    }

    private renderTweets(): React.ReactNode {
        return null;
    }

    private onToggleSearch(): void {
        this.setState(state => ({toggleSearch: !state.toggleSearch}));
    }
}