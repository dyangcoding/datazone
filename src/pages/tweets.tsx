import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { AccordionItem } from "../components/accordionItem";
import { RuleSearchForm } from "../rules/rule-search-form";
import { OptionsSearchForm } from "../rules/options-search-form";

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
                                <RuleSearchForm />
                            </AccordionItem>
                            <AccordionItem title="Optionale Suche">
                                <OptionsSearchForm />
                            </AccordionItem>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
                                        text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
                                        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
        return null;
    }

    private renderTweets(): React.ReactNode {
        return null;
    }

    private onToggleSearch(): void {
        this.setState(state => ({toggleSearch: !state.toggleSearch}));
    }
}