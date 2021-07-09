import React from "react";
import { Rule, RuleProperties } from "./rule";

interface SearchFormProps {
    readonly onChange?: (value: RuleProperties) => void;
}

interface SearchFormState {
    readonly rule: RuleProperties;
}

export class RuleSearchForm extends React.PureComponent<SearchFormProps, SearchFormState> {
    constructor(props: SearchFormProps) {
        super(props);

        this.state = {
            rule: new Rule(),
        };

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
                            <input type="text" name="keyword" id="keyword" autoComplete="keyword" onChange={this.onKeywordChange}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="hashtags" className="block text-sm font-medium text-gray-700">
                                Hashtag
                            </label>
                            <input type="text" name="hashtags" id="hashtags" autoComplete="given-name" onChange={this.onHashtagsChange}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="emoji" className="block text-sm font-medium text-gray-700">
                                Emoji
                            </label>
                            <input type="text" name="emoji" id="emoji" autoComplete="family-name" onChange={this.onEmojiChange}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="user" className="block text-sm font-medium text-gray-700">
                                User
                            </label>
                            <input type="text" name="user" id="user" autoComplete="user" onChange={this.onUserChange}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="from-user" className="block text-sm font-medium text-gray-700">
                                From User
                            </label>
                            <input type="text" name="from-user" id="from-user" autoComplete="from-user" onChange={this.onFromUserChange}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="to-user" className="block text-sm font-medium text-gray-700">
                                To User
                            </label>
                            <input type="text" name="to-user" id="to-user" autoComplete="to-user" onChange={this.onToUserChange}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="retweet-of-user" className="block text-sm font-medium text-gray-700">
                                Retweet of User
                            </label>
                            <input type="text" name="retweet-of-user" id="retweet-of-user" autoComplete="retweet-of-user" onChange={this.onRetweetOfUserChange}
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
                                <input type="text" name="url" id="url" onChange={this.onUrlChange}
                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"/>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="conversation" className="block text-sm font-medium text-gray-700">
                                Conversation
                            </label>
                            <input type="text" name="conversation" id="conversation" onChange={this.onConversationIdChange}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="context" className="block text-sm font-medium text-gray-700">
                                Context
                            </label>
                            <input type="text" name="context" id="context" onChange={this.onContextChange}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="entity" className="block text-sm font-medium text-gray-700">
                                Entity
                            </label>
                            <input type="text" name="entity" id="entity" onChange={this.onEntityChange}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private onKeywordChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({keyword: event.target.value});
    }

    private onHashtagsChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({hashtags: event.target.value});
    }

    private onEmojiChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({emoji: event.target.value});
    }

    private onUserChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({mentionedUserId: event.target.value});
    }

    private onFromUserChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({fromUser: event.target.value});
    }

    private onToUserChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({toUser: event.target.value});
    }

    private onRetweetOfUserChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({retweetsOfUser: event.target.value});
    }

    private onUrlChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({url: event.target.value});
    }

    private onConversationIdChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({conversationId: event.target.value});
    }

    private onContextChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({context: event.target.value});
    }

    private onEntityChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({entity: event.target.value});
    }

    private handleChange(rule: RuleProperties): void {
        this.setState(previousState => ({rule: {...previousState.rule, ...rule}}), () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.rule);
            }
        });
    }
}