import React from "react";
import { Rule, RuleProperties } from "../models/rule";
import Tooltip from "../components/tooltip-wrapper";
import * as DESC from "../utils/stringUtils"
import EmojiPicker from "../components/emoji-picker";

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
        this.onTagChange = this.onTagChange.bind(this);
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
                            <div className="flex justify-between">
                                <label htmlFor="keyword" className="flex items-center justify-between text-sm font-medium text-gray-700">
                                    Keyword/Payload
                                </label>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-400">Max. 256 Characters</span>
                                    <Tooltip id="keyword" title="keywords" description={DESC.KeywordDesc} />
                                </div>
                            </div>
                            <input value={rule.keyword} type="text" name="keyword" id="keyword" autoComplete="keyword" onChange={this.onKeywordChange}
                                placeholder="keyword"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-4">
                            <div className="flex justify-between">
                                <label htmlFor="tag" className="flex items-center justify-between text-sm font-medium text-gray-700">
                                    Tag
                                </label>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-400">Max. 128 Characters</span>
                                    <Tooltip id="tag" title="tag" description={DESC.TagDesc} />
                                </div>
                            </div>
                            <input value={rule.tag} type="text" name="tag" id="tag" autoComplete="tag" onChange={this.onTagChange}
                                placeholder="a simple short string to identify the rule"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2">
                            <div className="flex justify-between">
                                <label htmlFor="hashtags" className="block text-sm font-medium text-gray-700">
                                    Hashtags
                                </label>
                                <Tooltip id="hashtags" title="hashtags" description={DESC.HashtagsDesc} />
                            </div>
                            
                            <input value={rule.hashtags} type="text" name="hashtags" id="hashtags" autoComplete="given-name" onChange={this.onHashtagsChange}
                                placeholder="hashtags"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2">
                            <div className="flex justify-between">
                                <label htmlFor="emoji" className="block text-sm font-medium text-gray-700">
                                    Emoji
                                </label>
                                <Tooltip id="emoji" title="emoji" description={DESC.EmojiDesc} />
                            </div>
                            <EmojiPicker id="emoji" name="emoji" onChange={this.onEmojiChange} />
                        </div>

                        <div className="col-span-1">
                            <div className="flex justify-between">
                                <label htmlFor="user" className="block text-sm font-medium text-gray-700">
                                    User
                                </label>
                                <Tooltip id="user" title="user" description={DESC.UserDesc} />
                            </div>
                            <input value={rule.mentionedUserId} type="text" name="user" id="user" autoComplete="user" onChange={this.onUserChange}
                                placeholder="@username"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-1">
                            <div className="flex justify-between">
                                <label htmlFor="from-user" className="block text-sm font-medium text-gray-700">
                                    From User
                                </label>
                                <Tooltip id="from-user" title="from a specific user" description={DESC.FromUserDesc} />
                            </div>
                            <input value={rule.fromUser} type="text" name="from-user" id="from-user" autoComplete="from-user" onChange={this.onFromUserChange}
                                placeholder="username or user id"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-1">
                            <div className="flex justify-between">
                                <label htmlFor="to-user" className="block text-sm font-medium text-gray-700">
                                    To User
                                </label>
                                <Tooltip id="to-user" title="in reply to a particular user" description={DESC.ToUserDesc} />
                            </div>
                            <input value={rule.toUser} type="text" name="to-user" id="to-user" autoComplete="to-user" onChange={this.onToUserChange}
                                placeholder="username or user id"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-1">
                            <div className="flex justify-between">
                                <label htmlFor="retweet-of-user" className="block text-sm font-medium text-gray-700">
                                    Retweet of User
                                </label>
                                <Tooltip id="retweet-of-user" title="Retweets of the specified user" description={DESC.RetweetsOfUserDesc} />
                            </div>
                            <input value={rule.retweetsOfUser} type="text" name="retweet-of-user" id="retweet-of-user" autoComplete="retweet-of-user" onChange={this.onRetweetOfUserChange}
                                placeholder="username or user id"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2">
                            <div className="flex justify-between">
                                <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                                    Url
                                </label>
                                <Tooltip id="url" title="URL" description={DESC.UrlDesc} />
                            </div>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    https://
                                </span>
                                <input value={rule.url} type="text" name="url" id="url" onChange={this.onUrlChange}
                                    placeholder="url"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"/>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <div className="flex justify-between">
                                <label htmlFor="conversation" className="block text-sm font-medium text-gray-700">
                                    Conversation ID
                                </label>
                                <Tooltip id="conversation-id" title="conversation ID" description={DESC.ConversationIdDesc} />
                            </div>
                            <input value={rule.conversationId} type="text" name="conversation" id="conversation" onChange={this.onConversationIdChange}
                                placeholder="conversation ID"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2">
                            <div className="flex justify-between">
                                <label htmlFor="context" className="block text-sm font-medium text-gray-700">
                                    Context
                                </label>
                                <Tooltip id="context" title="context" description={DESC.ContextDesc} />
                            </div>
                            <input value={rule.context} type="text" name="context" id="context" onChange={this.onContextChange}
                                placeholder="domain id and/or domain id, enitity id pair"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2">
                            <div className="flex justify-between">
                                <label htmlFor="entity" className="block text-sm font-medium text-gray-700">
                                    Entity
                                </label>
                                <Tooltip id="entity" title="entity" description={DESC.EntityDesc} />
                            </div>
                            <input value={rule.entity} type="text" name="entity" id="entity" onChange={this.onEntityChange}
                                placeholder="entity"
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

    private onTagChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.handleChange({tag: event.target.value});
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

    private handleChange(rule: Partial<RuleProperties>): void {
        this.setState(previousState => ({rule: {...previousState.rule, ...rule}}), () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.rule);
            }
        });
    }
}