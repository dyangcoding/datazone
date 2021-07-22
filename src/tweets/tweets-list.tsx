import React, { Fragment } from "react";
import { useGetTweetsQuery } from "../services/api";

const TweetsList = () => {
    const { data: tweets, isLoading } = useGetTweetsQuery()
    return (
        <Fragment>
            {!tweets ? <div>No Tweets !</div> : undefined}
            <ul>
                {tweets?.map(tweet => (
                    <li key={tweet.id}>{tweet.text}</li>
                ))}
            </ul>
            {isLoading ? 'Loading' : null}
        </Fragment>
    );
}

export default TweetsList

