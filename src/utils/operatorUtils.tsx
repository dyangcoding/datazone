import React, { Fragment } from "react";
import { languageEntries } from "./languageUtils";

export interface TableEntry {
    readonly operator: string;
    readonly description: React.ReactNode;
}

export const entries: TableEntry[] = [
    {
        operator: "keyword",
        description: 
         <Fragment>
            Matches a keyword within the body of a Tweet. This is a tokenized match, meaning that your keyword string will be matched against the tokenized text of the Tweet body. Tokenization splits words based on punctuation, symbols, and Unicode basic plane separator characters.<br/>
            <br/>
            For example, a Tweet with the text “I like coca-cola” would be split into the following tokens: I, like, coca, cola. These tokens would then be compared to the keyword string used in your rule. To match strings containing punctuation (for example coca-cola), symbol, or separator characters, you must wrap your keyword in double-quotes.<br/>
            <br/>
            Example: <span className="text-blue-800">pepsi OR cola OR "coca cola"</span>
         </Fragment>
    },
    {
        operator: "emoji",
        description: 
         <Fragment>
             Matches an emoji within the body of a Tweet. Similar to a keyword, emojis are a tokenized match, meaning that your emoji will be matched against the tokenized text of the Tweet body.<br/>
            <br/>
            Note that if an emoji has a variant, you must wrap it in double quotes to add to a rule.<br/>
            <br/>
            Example: <span className="text-blue-800">(😃 OR 😡) 😬</span>
         </Fragment>
    },
    {
        operator: "hashtags",
        description: 
         <Fragment>
             Matches any Tweet containing a recognized hashtag, if the hashtag is a recognized entity in a Tweet.<br/>
            <br/>
            This operator performs an exact match, NOT a tokenized match, meaning the rule <span className="text-blue-800">#thanku</span> will match posts with the exact hashtag #thanku, but not those with the hashtag #thankunext.<br/>
            <br/>
            Example: <span className="text-blue-800">#thankunext #fanart OR @arianagrande</span>
         </Fragment>
    },
    {
        operator: "user",
        description: 
         <Fragment>
            Matches any Tweet that mentions the given username, if the username is a recognized entity (including the @ character).
            <br/>
            <br/>
            Example: <span className="text-blue-800">(@twitterdev OR @twitterapi) -@twitter</span>
         </Fragment>
    },
    {
        operator: "from User",
        description: 
         <Fragment>
            Matches any Tweet from a specific user.
            <br/>
            The value can be either the username (excluding the @ character) or the user’s numeric user ID.<br/>
            <br/>
            You can only pass a single username/ID <span className="text-blue-800">from:</span> operator.<br/>
            <br/>
            Example: <span className="text-blue-800">from:twitterdev OR from:twitterapi -from:twitter</span>
         </Fragment>
    },
    {
        operator: "to User",
        description: 
            <Fragment>
                    Matches any Tweet that is in reply to a particular user.
                    <br/>
                    The value can be either the username (excluding the @ character) or the user’s numeric user ID.
                    <br/>
                    <br/>
                    You can only pass a single username/ID per <span className="text-blue-800">to:</span> operator.
                    <br/>
                    <br/>
                    Example: <span className="text-blue-800">to:twitterdev OR to:twitterapi -to:twitter</span>
            </Fragment>
    },
    {
        operator: "Retweet Of User",
        description: 
            <Fragment>
                Matches Tweets that are Retweets of the specified user. The value can be either the username (excluding the @ character) or the user’s numeric user ID.<br/>
                <br/>
                You can only pass a single username/ID per <span className="text-blue-800">retweets_of:</span> operator.<br/>
                <br/>
                Example: <span className="text-blue-800">retweets_of:twitterdev OR retweets_of:twitterapi</span>
            </Fragment>
    },
    {
        operator: "Url",
        description: 
        <Fragment>
            Performs a tokenized match on any validly-formatted URL of a Tweet.
            <br/>
            <br/>
            This operator can matches on the contents of both the 
            <span className="text-blue-800">url</span> or <span className="text-blue-800">expanded_url</span> fields. 
            For example, a Tweet containing "You should check out Twitter Developer Labs: https://t.co/c0A36SWil4" (with the short URL redirecting to https://developer.twitter.com) will match both the following rules:
            <br/>
            <br/>
            <span className="text-blue-800">from:TwitterDev url:"https://developer.twitter.com"<br/></span>
            (because it will match the contents of <span className="text-blue-800">entities.urls.expanded_url</span>)
            <br/>
            <br/>
            <span className="text-blue-800">from:TwitterDev url:"https://t.co"<br/>
            </span>(because it will match the contents of <span className="text-blue-800">entities.urls.url</span>)<br/>
            <br/>
            Tokens and phrases containing punctuation or special characters should be double-quoted (for example, <span className="text-blue-800">url:"/developer"</span>). Similarly, to match on a specific protocol, enclose in double-quotes (for example, <span className="text-blue-800">url:"https://developer.twitter.com"</span>).<br/>
            <br/>
            You can only pass a single URL per <span className="text-blue-800">url:</span> operator.
        </Fragment>
    },
    {
        operator: "Conversation ID",
        description: 
        <Fragment>
            Matches Tweets that share a common conversation ID. A conversation ID is set to the Tweet ID of a Tweet that started a conversation. As Replies to a Tweet are posted, even Replies to Replies, the <span className="text-blue-800">conversation_id</span> is added to its JSON payload.<br/>
            <br/>
            You can only pass a single conversation ID per <span className="text-blue-800">conversation_id:</span> operator.<br/>
            <br/>
            Example: <span className="text-blue-800">conversation_id:1334987486343299072 (from:twitterdev OR from:twitterapi)</span>
        </Fragment>
    },
    {
        operator: "Context",
        description: 
            <Fragment>
                Matches Tweets with a specific domain id and/or domain id, enitity id pair where * represents a wildcard. To learn more about this operator, please visit our page on <a href="/en/docs/twitter-api/annotations">Tweet&nbsp;annotations</a>.<br/>
                <br/>
                You can only pass a single domain/entitie per <span className="text-blue-800">context:</span> operator.<br/>
                <br/>
                <span className="text-blue-800">context:domain_id.entity_id<br/>
                context:domain_id.*<br/>
                context:*.entity_id<br/>
                </span><br/>
                Examples:<br/>
                <span className="text-blue-800">context:10.799022225751871488<br/>
                </span>(<span className="text-blue-800">domain_id.entity_id</span> returns Tweets matching that specific domain-entity pair)<br/>
                <br/>
                <span className="text-blue-800">context:47.*<br/>
                </span>(<span className="text-blue-800">domain_id.*</span> returns Tweets matching that domain ID, with any domain-entity pair)<br/>
                <br/>
                <span className="text-blue-800">context:*.799022225751871488<br/>
                </span>(<span className="text-blue-800">*.entity_id</span> returns Tweets matching that entity ID, with any domain-entity pair)
            </Fragment>
    },
    {
        operator: "Entity",
        description: 
        <Fragment>
            Matches Tweets with a specific entity string value.
            You can only pass a single entity per<span className="text-blue-800"> entity:</span> operator.<br/>
            <br/>
            <span className="text-blue-800">entity:"string declaration of entity/place"<br/>
            </span><br/>
            Examples: <span className="text-blue-800">entity:"Michael Jordan" OR entity:"Barcelona"</span>
        </Fragment>
    },
    {
        operator: "Is Retweet",
        description: 
        <Fragment>
            Matches on Retweets that match the rest of the specified rule. This operator looks only for true Retweets (for example, those generated using the Retweet button). Quote Tweets will not be matched by this operator.<br/>
            <br/>
            Example: <span className="text-blue-800">data @twitterdev -is:retweet</span>
        </Fragment>
    },
    {
        operator: "Is Reply",
        description: 
        <Fragment>
            Deliver only explicit replies that match a rule. Can also be negated to exclude replies that match a rule from delivery.<br/>
            <br/>
            When used with the filtered stream, this operator matches on replies to an original Tweet, replies in quoted Tweets and replies in Retweets.<br/>
            <br/>
            Example: <span className="text-blue-800">from:twitterdev is:reply</span>
        </Fragment>
    },
    {
        operator: "Is Verified",
        description: 
        <Fragment>
            Deliver only Tweets whose authors are verified by Twitter.<br/>
            <br/>
            Example: <span className="text-blue-800">#nowplaying is:verified</span>
        </Fragment>
    },
    {
        operator: "Has Hashtags",
        description: 
        <Fragment>
            Matches Tweets that contain at least one hashtag.<br/>
            <br/>
            Example: <span className="text-blue-800">from:twitterdev -has:hashtags</span>
        </Fragment>
    },
    {
        operator: "Has Links",
        description: 
        <Fragment>
            This operator matches Tweets which contain links and media in the Tweet body.<br/>
            <br/>
            Example: <span className="text-blue-800">from:twitterdev announcement has:links</span>
        </Fragment>
    },
    {
        operator: "Has Media",
        description: 
        <Fragment>
            Matches Tweets that contain a media object, such as a photo, GIF, or video, as determined by Twitter. This will not match on media created with Periscope, or Tweets with links to other media hosting sites.<br/>
            <br/>
            Example: <span className="text-blue-800">(kittens OR puppies) has:media</span>
        </Fragment>
    },
    {
        operator: "Has Images",
        description: 
        <Fragment>
            Matches Tweets that contain a recognized URL to an image.<br/>
            <br/>
            Example: <span className="text-blue-800">#meme has:images</span>
        </Fragment>
    },
    {
        operator: "Has Videos",
        description: 
        <Fragment>
            Matches Tweets that contain native Twitter videos, uploaded directly to Twitter. This will not match on videos created with Periscope, or Tweets with links to other video hosting sites.<br/>
            <br/>
            Example: <span className="text-blue-800">#icebucketchallenge has:videos</span>
        </Fragment>
    },
    {
        operator: "Language",
        description: 
        <Fragment>
            Matches Tweets that have been classified by Twitter as being of a particular language (if, and only if, the tweet has been classified). It is important to note that each Tweet is currently only classified as being of one language, so AND’ing together multiple languages will yield no results.<br/>
            <br/>
            You can only pass a single BCP 47 language identifier per <span className="text-blue-800">lang:</span> operator.<br/>
            <br/>
            Note: if no language classification can be made the provided result is ‘und’ (for undefined).<br/>
            <br/>
            Example: <span className="text-blue-800">recommend #paris lang:en</span><br/>
            <br/>
            The list below represents the currently supported languages and their corresponding BCP 47 language identifier:
            <br/>
            <br/>
            {renderLanguages()}
        </Fragment>
    },
    {
        operator: "Sample",
        description: 
        <Fragment>
            Returns a random percent sample of Tweets that match a rule rather than the entire set of Tweets. The percent value must be represented by an integer between 1 and 100 (for example, <span className="text-blue-800">sample:10</span> will return a random 10% sample).<br/>
            <br/>
            This operator first reduces the scope of the stream to the percentage you specified, then the rule/filter is applied to that sampled subset. In other words, if you are using, for example, <span className="text-blue-800">sample:10</span>, each Tweet will have a 10% chance of being in the sample.<br/>
            <br/>
            This operator applies to the entire rule and requires all OR'd terms to be grouped.<br/>
            <br/>
            Example: <span className="text-blue-800">#nowplaying @spotify sample:15</span>
        </Fragment>
    },
]

function renderLanguages(): React.ReactNode {
    const table: JSX.Element[][] = [];
    let row: JSX.Element[] = [];
    languageEntries.forEach((entry, index) => {
        const rowEntry: JSX.Element = (
            <div key={index} className="w-1/4 whitespace-nowrap">
                <span>{entry.language}: </span> 
                <span className="text-blue-800">{entry.identifier}</span>
            </div>
        );
        row.push(rowEntry);
        if ((index + 1) % 4 === 0) {
            table.push(row);
            row = [];
        }
    });
    if (row) {
        table.push(row);
    }
    return (
        <div>
            {table.map((rows: JSX.Element[]) => renderRow(rows))}
        </div>
    );
}

function renderRow(rows: JSX.Element[]): React.ReactNode {
    return (
        <div className="flex">
            {rows.map(row => row)}
        </div>
    );
}