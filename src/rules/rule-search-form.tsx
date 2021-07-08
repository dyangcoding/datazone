import React from "react";
import { RuleProperties } from "./rule";

interface SearchFormProps {

}

interface SearchFormState {

}

export class RuleSearchForm extends React.PureComponent<SearchFormProps, SearchFormState> {
    constructor(props: SearchFormProps) {
        super(props)

        this.onKeywordChange = this.onKeywordChange.bind(this);
        this.onHashtagsChange = this.onHashtagsChange.bind(this);
        this.onEmojiChange = this.onEmojiChange.bind(this);
        this.onUserChange = this.onUserChange.bind(this);
        this.onFromUserChange = this.onFromUserChange.bind(this);
        this.onToUserChange = this.onToUserChange.bind(this);
        this.onRetweetOfUserChange = this.onRetweetOfUserChange.bind(this);
        this.onUrlChange = this.onUrlChange.bind(this);
        this.onConversationIdChange = this.onConversationIdChange.bind(this);
        this.onContextChange = this.onContextChange.bind(this);
        this.onEntityChange = this.onEntityChange.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <div className="mt-5 md:mt-0 md:col-span-2">
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
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
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
            </div>
        );
    }

    private onKeywordChange(value: string): void {

    }

    private onHashtagsChange(value: string): void {

    }

    private onEmojiChange(value: string): void {

    }

    private onUserChange(value: string): void {

    }

    private onFromUserChange(value: string): void {

    }

    private onToUserChange(value: string): void {

    }

    private onRetweetOfUserChange(value: string): void {

    }

    private onUrlChange(value: string): void {

    }

    private onConversationIdChange(value: string): void {

    }

    private onContextChange(value: string): void {

    }

    private onEntityChange(value: string): void {

    }

    private handleChange(rule: Partial<RuleProperties>): void {
        //this.props.onChange()
    }
}