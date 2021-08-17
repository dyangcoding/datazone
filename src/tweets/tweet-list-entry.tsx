import { HeartIcon, ReplyIcon, UserCircleIcon, CalendarIcon } from "@heroicons/react/outline";
import React from "react";
import { TweetProperties } from "../models/tweet";

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
                <dl className="odd:bg-gray-50">
                    {this.renderAuthor()}
                    {this.renderDate()}
                    {this.renderHashtags()}
                    {this.renderPublicMetrics()}
                    {this.renderNonPublicMetrics()}
                    {this.renderMentionedUsers()}
                    {this.renderText()}
                    {this.renderMatchingRules()}
                    {this.renderSource()}
                </dl>
            </div>
        );
    }

    private renderAuthor(): React.ReactNode {
        const author = this.props.tweet.author;
        if (!author) {
            return null;
        }
        return (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Author</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex items-center space-x-2">
                        <img className="h-8 w-8 rounded-full" src={author.profileImageUrl} alt="" />
                        <span className="flex items-center">
                            <UserCircleIcon className="h-4 w-4 mr-1" /> {author.name}
                        </span>
                        {author.createdAt 
                            ? 
                            <span className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1" /> Joined {new Date(author.createdAt).toDateString()}
                            </span>
                            :
                            undefined
                        }
                    </div>
                </dd>
            </div>
        );
    }

    private renderUserMetrics(): React.ReactNode {
        const metrics = this.props.tweet.author?.metrics;
        if (!metrics) {
            return null;
        }
        return (
            <div className="text-sm text-gray-500">
                <span className="pr-2">{metrics.followingCount} following</span>
                <span className="pr-2">{metrics.followersCount} followers</span>
                <span className="pr-2">{metrics.tweetCount} tweets</span>
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
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Tweeted At</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{new Date(createdAt).toLocaleString()}</dd>
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
                <dt className="text-sm font-medium text-gray-500">Hashtags</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 space-x-2">
                    {hashtags.map(hashtag => (
                        <span key={hashtag} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {hashtag}
                        </span>
                    ))}
                </dd>
            </div>
        );
    }

    private renderPublicMetrics(): React.ReactNode {
        const metrics = this.props.tweet.publicMetrics;
        if (!metrics || (metrics.retweetCount === 0 && metrics.replyCount === 0 && metrics.likeCount === 0)) {
            return null;
        }
        return (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Public Metrics</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex">
                        {metrics.retweetCount > 0 
                            ? 
                            <div className="inline-flex items-center text-sm px-1">
                                <ReplyIcon className="h-4 w-4 mr-1" /> 
                                <span>{metrics.retweetCount}</span>
                            </div> 
                            : undefined
                        }
                        {metrics.replyCount > 0 
                            ?
                            <div className="inline-flex items-center text-sm px-1">
                                <ReplyIcon className="h-4 w-4" />
                                <span>{metrics.replyCount}</span>
                            </div>
                            : undefined
                        }
                        {metrics.likeCount > 0 
                            ?
                            <div className="inline-flex items-center text-sm px-1">
                                <HeartIcon className="h-4 w-4" />
                                <span>{metrics.likeCount}</span>
                            </div>
                            : undefined
                        }
                    </div>
                </dd>
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
                <dt className="text-sm font-medium text-gray-500">Public Metrics</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex">
                        {metrics.impressionCount > 0 
                            ? 
                            <div className="inline-flex items-center text-sm px-1">
                                <ReplyIcon className="h-4 w-4 mr-1" /> 
                                <span>{metrics.impressionCount}</span>
                            </div> 
                            : undefined
                        }
                        {metrics.urlLinkClicks > 0 
                            ?
                            <div className="inline-flex items-center text-sm px-1">
                                <ReplyIcon className="h-4 w-4" />
                                <span>{metrics.urlLinkClicks}</span>
                            </div>
                            : undefined
                        }
                        {metrics.userProfileClicks > 0 
                            ?
                            <div className="inline-flex items-center text-sm px-1">
                                <HeartIcon className="h-4 w-4" />
                                <span>{metrics.userProfileClicks}</span>
                            </div>
                            : undefined
                        }
                    </div>
                </dd>
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
                <dt className="text-sm font-medium text-gray-500">Mentioned Users</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {mentionedUsers.map(user => (
                        <span key={user.id} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            {user.name}
                        </span>
                    ))}
                </dd>
            </div>
        );
    }

    private renderText(): React.ReactNode {
        const text = this.props.tweet.text;
        if (!text) {
            return null;
        }
        return (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Text</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {text}
                </dd>
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
                <dt className="text-sm font-medium text-gray-500">Matching Rules</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {rules.map(rule => (
                        <span key={rule.id} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {rule.tag}
                        </span>
                    ))}
                </dd>
            </div>
        );
    }

    private renderSource(): React.ReactNode {
        const source = this.props.tweet.source;
        if (!source) {
            return null;
        }
        return (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Source</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{source}</dd>
            </div>
        );
    }
}