import React from "react";
import { TweetProperties, } from "../models/tweet"
import { ChatAltIcon, EmojiSadIcon } from "@heroicons/react/solid";
import Spinner from "../components/spinner";
import { AppState } from "../app/store";
import { loadTweets } from "./actions";
import { connect } from "react-redux";
import { TweetListEntry } from "./tweet-list-entry";

interface StateProps {
    readonly tweets: ReadonlyArray<TweetProperties>;
    readonly isLoading: string;
    readonly error: string | undefined;
}

interface DispatchProps {
    readonly onLoad: () => void;
}

interface TweetListProps extends StateProps, DispatchProps {}

class TweetListComponent extends React.Component<TweetListProps> {
    constructor(props: TweetListProps) {
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
        if (error) {
            return this.renderError();
        }
        return this.renderTweets();
    }

    private renderTweets(): React.ReactNode {
        const tweets = this.props.tweets;
        if (!tweets || !tweets.length) {
            return this.renderPageInfo();
        }
        return (
            <div className="py-5 space-y-4">
                <div className="flex justify-between items-center border rounded-md bg-blue-500 text-white px-4 py-5">
                    <h3 className="text-xl leading-6 font-medium">Realtime Tweets</h3>
                    <p className="mt-1 max-w-2xl text-sm border-2 rounded-full py-3 px-6">{this.props.tweets.length}</p>
                </div>
                {tweets.map(tweet => {
                    return <TweetListEntry key={tweet.id} tweet={tweet} />
                })}
            </div>
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

    private renderPageInfo(): React.ReactNode {
        return (
            <div className="lg:text-center py-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="flex items-center justify-center px-2 py-4 text-center">
                    <ChatAltIcon className="text-green-500 h-12 w-12" aria-hidden="true" />
                </div>
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
}

function mapStateToProps(state: AppState): StateProps {
    return {
        tweets: state.tweets.value,
        isLoading: state.tweets.loading,
        error: state.tweets.error
    };
}

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        onLoad: () => dispatch(loadTweets())
    }
}

export const TweetList = connect(mapStateToProps, mapDispatchToProps)(TweetListComponent)

