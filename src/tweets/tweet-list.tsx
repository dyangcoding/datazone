import React, { Fragment } from "react";
import { User, UserMetrics, MatchingRule, TweetProperties, PublicMetrics } from "../models/tweet"
import { ChatAltIcon, ReplyIcon, HeartIcon, EmojiSadIcon } from "@heroicons/react/solid";
import Spinner from "../components/spinner";
import { AppState } from "../app/store";
import { loadTweets } from "./actions";
import { connect } from "react-redux";

interface StateProps {
    readonly tweets: ReadonlyArray<TweetProperties>;
    readonly isLoading: String;
    readonly error: String | undefined;
}

interface DispatchProps {
    readonly onLoad: () => void;
}

interface TweetProps extends StateProps, DispatchProps {}

class TweetListComponent extends React.Component<TweetProps> {
    constructor(props: TweetProps) {
        super(props);
    }

    public componentDidMount(): void {
        this.props.onLoad();
    }

    public render(): React.ReactNode {
        const {error, isLoading} = this.props;
        if (isLoading === "loading") {
            return <Spinner />;
        }
        else if (error) {
            {this.renderError()}
        } else {
            return (
                <Fragment>
                    <div className="flex flex-col my-4">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        {this.renderHeader()}
                                        {this.renderBody()}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            );
        }
    }

    private renderHeader(): React.ReactNode {
        return (
            <Fragment>
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Text
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Matching Rules
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hashtags
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mentioned Users
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Metrics
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Source
                        </th>
                    </tr>
                </thead>
            </Fragment>
        );
    }

    private renderError(): React.ReactNode {
        return (
            <div className="lg:text-center py-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="flex items-center justify-center px-2 py-4 text-center">
                    <EmojiSadIcon className="text-red-500 h-12 w-12" aria-hidden="true" />
                </div>
                <h2 className="text-2xl text-red-600 font-semibold tracking-wide uppercase">Oops, I think you're lost.</h2>
                <p className="text-lg text-red-500">
                    Sorry, we could't not get what you are looking for ...
                </p>
                <div className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium">
                    Check Connection OR refresh the Page
                </div>
            </div>
        );
    }
    
    private renderBody(): React.ReactNode {
        const tweets = this.props.tweets;
        return (
            <Fragment>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tweets.map((tweet) => (
                        <tr key={tweet.id}>
                            <td className="px-4 py-4 whitespace-nowrap">
                                {this.renderUser(tweet.author)}
                            </td>
                            <td className="px-4 py-4">
                                <div className="text-sm text-gray-900">{tweet.text}</div>
                            </td>
                            <td className="px-4 py-4">
                                {this.renderMatchingRules(tweet.matchingRules)}
                            </td>
                            <td className="px-4 py-4">
                                {this.renderHashtags(tweet.entities?.hashtags)}
                            </td>
                            <td className="px-4 py-4">
                                {this.renderMentionedUsers(tweet.mentionedUsers)}
                            </td>
                            <td className="px-4 py-4">
                                {this.renderPublicMetrics(tweet.publicMetrics)}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500">
                                {tweet.source}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Fragment>
        );
    }

    private renderPageInfo(): React.ReactNode {
        return (
            <div className="lg:text-center py-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="flex items-center justify-center px-2 py-4 text-center"><ChatAltIcon className="text-green-500 h-12 w-12" aria-hidden="true" /></div>
                <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">No Tweets</h2>
                <p className="text-lg text-gray-500">
                    Get Started by creating a new Rule
                </p>
                <div className="px-2 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button className="rounded-md border border-green-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                        Create Rule
                    </button>
                </div>
            </div>
        );
    }

    private renderUserMetrics(metrics: UserMetrics | undefined): React.ReactNode {
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

    private renderUser(author: User | undefined): React.ReactNode {
        return (
            <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={author?.profileImageUrl} alt="" />
                </div>
                <div className="ml-4 text-sm font-medium text-gray-900">
                    <div className="whitespace-pre-line">
                        <span className="pr-2">{author?.name}</span>
                    </div>
                    {author && author.createdAt 
                        ? 
                        <span className="">Joined {new Date(author.createdAt).toDateString()}</span>
                        :
                        undefined
                    }
                </div>
            </div>
        );
    }

    private renderMatchingRules(matchingRules: ReadonlyArray<MatchingRule> | undefined): React.ReactNode {
        if (!matchingRules || !matchingRules.length) {
            return null;
        }
        return (
            <Fragment>
                {matchingRules.map(rule => (
                    <span key={rule.id} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {rule.tag}
                    </span>
                ))}
            </Fragment>
        );
    }

    private renderHashtags(hashtags: ReadonlyArray<string> | undefined): React.ReactNode {
        if (!hashtags || !hashtags.length) {
            return null;
        }
        return (
            <Fragment>
                {hashtags.map(hashtag => (
                    <span key={hashtag} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {hashtag}
                    </span>
                ))}
            </Fragment>
        );
    }

    private renderMentionedUsers(mentionedUsers: ReadonlyArray<User> | undefined): React.ReactNode {
        if (!mentionedUsers || !mentionedUsers.length) {
            return null;
        }
        return (
            <Fragment>
                {mentionedUsers.map(user => (
                    <span key={user.id} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {user.name}
                    </span>
                ))}
            </Fragment>
        );
    }

    private renderPublicMetrics(metrics: PublicMetrics | undefined): React.ReactNode {
        if (!metrics) {
            return null;
        }
        return (
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
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        tweets: state.tweets.value,
        isLoading: state.rules.loading,
        error: state.rules.error
    };
}

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        onLoad: () => dispatch(loadTweets())
    }
}

export const TweetList = connect(mapStateToProps, mapDispatchToProps)(TweetListComponent)

