import { runInContext } from "node:vm";
import React from "react";
import { Rule, RuleProperties } from "../models/rule";

interface SearchFormProps {
    readonly rule?: RuleProperties;
    readonly onChange?: (value: RuleProperties) => void;
}

interface SearchFormState {
    readonly rule: RuleProperties;
}

export class RuleSearchForm extends React.PureComponent<SearchFormProps, SearchFormState> {
    constructor(props: SearchFormProps) {
        super(props);

        this.state = {
            rule: props.rule || new Rule(),
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
        const rule = this.state.rule;
        return (
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-4 gap-6">
                        <div className="col-span-4">
                            <label htmlFor="keyword" className="flex items-center justify-between text-sm font-medium text-gray-700">
                                Keyword
                                <span className="text-gray-400">Max. 256 Characters</span>
                            </label>
                            <input value={rule.keyword} type="text" name="keyword" id="keyword" autoComplete="keyword" onChange={this.onKeywordChange}
                                placeholder="a keyword within the body of a Tweet"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="hashtags" className="block text-sm font-medium text-gray-700">
                                Hashtags
                            </label>
                            <input value={rule.hashtags} type="text" name="hashtags" id="hashtags" autoComplete="given-name" onChange={this.onHashtagsChange}
                                placeholder="a recognized hashtag in a Tweet"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="emoji" className="block text-sm font-medium text-gray-700">
                                Emoji
                            </label>
                            <input value={rule.emoji} type="text" name="emoji" id="emoji" autoComplete="family-name" onChange={this.onEmojiChange}
                                placeholder="an emoji within the body of a Tweet"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="user" className="block text-sm font-medium text-gray-700">
                                User
                            </label>
                            <input value={rule.mentionedUserId} type="text" name="user" id="user" autoComplete="user" onChange={this.onUserChange}
                                placeholder="Matches any Tweet that mentions the given username"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="from-user" className="block text-sm font-medium text-gray-700">
                                From User
                            </label>
                            <input value={rule.fromUser} type="text" name="from-user" id="from-user" autoComplete="from-user" onChange={this.onFromUserChange}
                                placeholder="Matches any Tweet from a specific user"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="to-user" className="block text-sm font-medium text-gray-700">
                                To User
                            </label>
                            <input value={rule.toUser} type="text" name="to-user" id="to-user" autoComplete="to-user" onChange={this.onToUserChange}
                                placeholder="Matches any Tweet that is in reply to a particular user"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="retweet-of-user" className="block text-sm font-medium text-gray-700">
                                Retweet of User
                            </label>
                            <input value={rule.retweetsOfUser} type="text" name="retweet-of-user" id="retweet-of-user" autoComplete="retweet-of-user" onChange={this.onRetweetOfUserChange}
                                placeholder="Matches Tweets that are Retweets of the specified user"
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
                                <input value={rule.url} type="text" name="url" id="url" onChange={this.onUrlChange}
                                    placeholder="Performs a tokenized match on any validly-formatted URL of a Tweet"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"/>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="conversation" className="block text-sm font-medium text-gray-700">
                                Conversation ID
                            </label>
                            <input value={rule.conversationId} type="text" name="conversation" id="conversation" onChange={this.onConversationIdChange}
                                placeholder="Matches Tweets that share a common conversation ID"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="context" className="block text-sm font-medium text-gray-700">
                                Context
                            </label>
                            <input value={rule.context} type="text" name="context" id="context" onChange={this.onContextChange}
                                placeholder="Matches Tweets with a specific domain id and/or domain id, enitity id pair where * represents a wildcard"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="entity" className="block text-sm font-medium text-gray-700">
                                Entity
                            </label>
                            <input value={rule.entity} type="text" name="entity" id="entity" onChange={this.onEntityChange}
                                placeholder="Matches Tweets with a specific entity string value"
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