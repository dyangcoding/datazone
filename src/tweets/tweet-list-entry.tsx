import { HeartIcon, ReplyIcon, DeviceMobileIcon, CalendarIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";
import ReactTooltip from "react-tooltip";
import { TweetProperties, User } from "../models/tweet";

interface ListEntryProps {
    readonly tweet: TweetProperties;
}

export class TweetListEntry extends React.Component<ListEntryProps> {
    constructor(props: ListEntryProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                {this.renderHeader()}
                {this.renderText()}
                {this.renderPublicMetrics()}
                {this.renderNonPublicMetrics()}
                {this.renderDomains()}
                {this.renderEntity()}
                {this.renderMentionedUsers()}
                {this.renderMatchingRules()}
            </div>
        );
    }

    private renderHeader(): React.ReactNode {
        const author = this.props.tweet.author;
        if (!author) {
            return null;
        }
        return (
            <div className="px-4 py-2 sm:px-6">
                <div className="flex items-center justify-between space-x-2">
                    <div className="flex space-x-2 cursor-pointer" data-tip=" " data-for={this.props.tweet.id}>
                        <img className="h-8 w-8 rounded-full" src={author.profileImageUrl} alt="" />
                        <span className="flex items-center">
                            {author.name}
                        </span>
                    </div>
                    <ReactTooltip id={this.props.tweet.id} type="dark" data-place="top" getContent={() => this.renderUserInfo()} />
                    <div className="flex space-x-2">
                        {this.renderDate()}
                        {this.renderSource()}
                    </div>
                </div>
            </div>
        );
    }

    private renderUserInfo(): React.ReactNode {
        const author = this.props.tweet.author;
        if (!author) {
            return null;
        }
        return (
            <div className="flex flex-col space-y-2 text-sm w-80 rounded shadow">
                <div className="flex space-x-1 items-center">
                    <img className="h-12 w-12 rounded-full" src={author.profileImageUrl} alt="" />
                    <span className="flex items-center">
                        {author.name}
                    </span>
                </div>
                {author.createdAt 
                    ? 
                    <div>
                        <span className="flex items-center">
                            <CalendarIcon className="h-5 w-5" /> Joined {new Date(author.createdAt).toDateString()}
                        </span>
                    </div>
                    :
                    undefined
                }
                {
                    author.description 
                    ?
                    <div className="flex whitespace-wrap">
                        {author.description}
                    </div>
                    :
                    null
                }
                {this.renderUserMetrics(author)}                
            </div>
        );    
    }

    private renderUserMetrics(user: User): React.ReactNode {
        const metrics = user.metrics;
        if (!metrics) {
            return null;
        }
        return (
            <div className="flex space-x-1">
                <div><span className="font-bold mr-1">{metrics.followingCount}</span> following</div> 
                <div><span className="font-bold mr-1">{metrics.followersCount}</span> followers</div>
                <div><span className="font-bold mr-1">{metrics.tweetCount}</span> tweets</div>
            </div>
        );
    }

    // TODO: validate createAt
    private renderDate(): React.ReactNode {
        const createdAt = this.props.tweet.createdAt;
        if (!createdAt) {
            return null;
        }
        return (
            <div className="sm:hidden lg:flex items-center space-x-1">
                <CalendarIcon className="h-4 w-4" />
                <span className="text-sm text-gray-900 sm:mt-0">{new Date(createdAt).toLocaleString()}</span>
            </div>
        );
    }

    private renderSource(): React.ReactNode {
        const source = this.props.tweet.source;
        if (!source) {
            return null;
        }
        return (
            <div className="sm:hidden lg:flex items-center space-x-1 cursor-pointer" data-tip="Source">
                <DeviceMobileIcon className="h-4 w-4" />
                <span className="text-sm text-gray-900 sm:mt-0">{source}</span>
            </div>
        );
    }

    private renderText(): React.ReactNode {
        const text = this.props.tweet.text;
        if (!text) {
            return null;
        }
        return (
            <div className="bg-gray-50 px-4 py-5 sm:px-6">
                <div className="mt-1 text-sm text-gray-900 sm:mt-0">
                    {text}
                </div>
            </div>
        );
    }

    private renderHashtags(): React.ReactNode {
        const hashtags = this.props.tweet.entities?.hashtags;
        if (!hashtags || !hashtags.length) {
            return null;
        }
        return (
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">Hashtags</div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 space-x-2">
                    {hashtags.map(hashtag => {
                        return (
                            <span key={hashtag} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {"#".concat(hashtag)}
                            </span>
                        )
                    })}
                </div>
            </div>
        );
    }

    private renderPublicMetrics(): React.ReactNode {
        const metrics = this.props.tweet.publicMetrics;
        if (!metrics || (metrics.retweetCount === 0 && metrics.replyCount === 0 && metrics.likeCount === 0)) {
            return null;
        }
        return (
            <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">Public Metrics</div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex">
                        {metrics.retweetCount > 0 
                            ? 
                            <Fragment>
                                <div className="inline-flex items-center text-sm px-1 cursor-pointer" data-tip="Retweet Count">
                                    <ReplyIcon className="h-4 w-4 mr-1" /> 
                                    <span>{metrics.retweetCount}</span>
                                </div>
                                <ReactTooltip />
                            </Fragment>
                            : undefined
                        }
                        {metrics.replyCount > 0 
                            ?
                            <Fragment>
                                <div className="inline-flex items-center text-sm px-1 cursor-pointer" data-tip="Reply Count">
                                    <ReplyIcon className="h-4 w-4" />
                                    <span>{metrics.replyCount}</span>
                                </div>
                                <ReactTooltip />
                            </Fragment>
                            
                            : undefined
                        }
                        {metrics.likeCount > 0 
                            ?
                            <Fragment>
                                <div className="inline-flex items-center text-sm px-1 cursor-pointer" data-tip="Like Count">
                                    <HeartIcon className="h-4 w-4" />
                                    <span>{metrics.likeCount}</span>
                                </div>
                                <ReactTooltip />
                            </Fragment>
                            : undefined
                        }
                    </div>
                </div>
            </div>
        );
    }

    private renderNonPublicMetrics(): React.ReactNode {
        const metrics = this.props.tweet.nonPublicMetrics;
        if (!metrics || (metrics.impressionCount === 0 && metrics.urlLinkClicks === 0 && metrics.userProfileClicks === 0)) {
            return null;
        }
        return (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">Non Public Metrics</div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex">
                        {metrics.impressionCount > 0 
                            ? 
                            <Fragment>
                                <div className="inline-flex items-center text-sm px-1 cursor-pointer" data-tip="Impression Count">
                                    <ReplyIcon className="h-4 w-4 mr-1" /> 
                                    <span>{metrics.impressionCount}</span>
                                </div>
                                <ReactTooltip />
                            </Fragment>
                            : undefined
                        }
                        {metrics.urlLinkClicks > 0 
                            ?
                            <Fragment>
                                <div className="inline-flex items-center text-sm px-1 cursor-pointer" data-tip="Url Link Clicks Count">
                                    <ReplyIcon className="h-4 w-4" />
                                    <span>{metrics.urlLinkClicks}</span>
                                </div>
                                <ReactTooltip />
                            </Fragment>
                            : undefined
                        }
                        {metrics.userProfileClicks > 0 
                            ?
                            <Fragment>
                                <div className="inline-flex items-center text-sm px-1 cursor-pointer" data-tip="User Profile Clicks Count">
                                    <HeartIcon className="h-4 w-4" />
                                    <span>{metrics.userProfileClicks}</span>
                                </div>
                                <ReactTooltip />
                            </Fragment>
                            : undefined
                        }
                    </div>
                </div>
            </div>
        );
    }

    private renderDomains(): React.ReactNode {
        const domains = this.props.tweet.context?.domain;
        if (!domains || !domains.length) {
            return null;
        }
        return (
            <div className="flex items-center px-4 py-2 sm:px-6 space-x-4">
                <div className="w-1/4 text-sm font-medium text-gray-500">Domain</div>
                <div className="w-3/4 text-sm text-gray-900 space-x-1">
                    {domains.map(domain => {
                        return (
                            <span key={domain.id} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                {domain.name}
                            </span>
                        )
                    })}
                </div>
            </div>
        );
    }

    private renderEntity(): React.ReactNode {
        const entityList = this.props.tweet.context?.entity;
        if (!entityList || !entityList.length) {
            return null;
        }
        return (
            <div className="flex items-center justify-evenly bg-gray-50 px-4 py-2 sm:px-6 space-x-4">
                <div className="w-1/4 text-sm font-medium text-gray-500">Entity</div>
                <div className="w-3/4 text-sm text-gray-900 space-x-1">
                    {entityList.map(entity => {
                        return (
                            <span key={entity.id} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                {entity.name}
                            </span> 
                        )
                    })}
                </div>
            </div>
        );
    }

    private renderMentionedUsers(): React.ReactNode {
        const mentionedUsers = this.props.tweet.mentionedUsers;
        if (!mentionedUsers || !mentionedUsers.length) {
            return null;
        }
        return (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">Mentioned Users</div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {mentionedUsers.map(user => (
                        <span key={user.id} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            {user.name}
                        </span>
                    ))}
                </div>
            </div>
        );
    }

    private renderMatchingRules(): React.ReactNode {
        const rules = this.props.tweet.matchingRules;
        if (!rules || !rules.length) {
            return null;
        }
        return (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">Matching Rules</div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {rules.map(rule => (
                        <span key={rule.id} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {rule.tag}
                        </span>
                    ))}
                </div>
            </div>
        );
    }
}