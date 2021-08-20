import React, { Fragment } from "react";

export interface TableEntry {
    readonly operator: string;
    readonly description: React.ReactNode;
}

export const entries: TableEntry[] = [
    {
        operator: "keyword",
        description: 
         <Fragment>
             <td>Matches a keyword within the body of a Tweet. This is a tokenized match, meaning that your keyword string will be matched against the tokenized text of the Tweet body. Tokenization splits words based on punctuation, symbols, and Unicode basic plane separator characters.<br/>
            <br/>
            For example, a Tweet with the text “I like coca-cola” would be split into the following tokens: I, like, coca, cola. These tokens would then be compared to the keyword string used in your rule. To match strings containing punctuation (for example coca-cola), symbol, or separator characters, you must wrap your keyword in double-quotes.<br/>
            <br/>
            Example: <span className="text-blue-800">pepsi OR cola OR "coca cola"</span></td>
         </Fragment>
    },
    {
        operator: "emoji",
        description: 
         <Fragment>
             <td>Matches an emoji within the body of a Tweet. Similar to a keyword, emojis are a tokenized match, meaning that your emoji will be matched against the tokenized text of the Tweet body.<br/>
            <br/>
            Note that if an emoji has a variant, you must wrap it in double quotes to add to a rule.<br/>
            <br/>
            Example: <span className="text-blue-800">(😃 OR 😡) 😬</span></td>
         </Fragment>
    },
    {
        operator: "hashtags",
        description: 
         <Fragment>
             <td>Matches any Tweet containing a recognized hashtag, if the hashtag is a recognized entity in a Tweet.<br/>
            <br/>
            This operator performs an exact match, NOT a tokenized match, meaning the rule <span className="text-blue-800">#thanku</span> will match posts with the exact hashtag #thanku, but not those with the hashtag #thankunext.<br/>
            <br/>
            Example: <span className="text-blue-800">#thankunext #fanart OR @arianagrande</span></td>
         </Fragment>
    },
    {
        operator: "user",
        description: 
         <Fragment>
             <td>Matches any Tweet that mentions the given username, if the username is a recognized entity (including the @ character).
                <br/>
                <br/>
            Example: <span className="text-blue-800">(@twitterdev OR @twitterapi) -@twitter</span></td>
         </Fragment>
    },
    {
        operator: "from User",
        description: 
         <Fragment>
             <td>Matches any Tweet from a specific user.<br/>
            The value can be either the username (excluding the @ character) or the user’s numeric user ID.<br/>
            <br/>
            You can only pass a single username/ID <span className="text-blue-800">from:</span> operator.<br/>
            <br/>
            Example: <span className="text-blue-800">from:twitterdev OR from:twitterapi -from:twitter</span></td>
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
                <td>Matches Tweets that are Retweets of the specified user. The value can be either the username (excluding the @ character) or the user’s numeric user ID.<br/>
                <br/>
                You can only pass a single username/ID per <span className="text-blue-800">retweets_of:</span> operator.<br/>
                <br/>
                Example: <span className="text-blue-800">retweets_of:twitterdev OR retweets_of:twitterapi</span></td>
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
            <td>Matches Tweets that share a common conversation ID. A conversation ID is set to the Tweet ID of a Tweet that started a conversation. As Replies to a Tweet are posted, even Replies to Replies, the <span className="text-blue-800">conversation_id</span> is added to its JSON payload.<br/>
            <br/>
            You can only pass a single conversation ID per <span className="text-blue-800">conversation_id:</span> operator.<br/>
            <br/>
            Example: <span className="text-blue-800">conversation_id:1334987486343299072 (from:twitterdev OR from:twitterapi)</span></td>
        </Fragment>
    },
    {
        operator: "Context",
        description: 
            <Fragment>
                <td>Matches Tweets with a specific domain id and/or domain id, enitity id pair where * represents a wildcard. To learn more about this operator, please visit our page on <a href="/en/docs/twitter-api/annotations">Tweet&nbsp;annotations</a>.<br/>
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
                </span>(<span className="text-blue-800">*.entity_id</span> returns Tweets matching that entity ID, with any domain-entity pair)</td>
            </Fragment>
    },
    {
        operator: "Entity",
        description: 
        <Fragment>
            <td>Matches Tweets with a specific entity string value.
            You can only pass a single entity per<span className="text-blue-800"> entity:</span> operator.<br/>
            <br/>
            <span className="text-blue-800">entity:"string declaration of entity/place"<br/>
            </span><br/>
            Examples: <span className="text-blue-800">entity:"Michael Jordan" OR entity:"Barcelona"</span></td>
        </Fragment>
    },
    {
        operator: "Is Retweet",
        description: 
        <Fragment>
            <td>Matches on Retweets that match the rest of the specified rule. This operator looks only for true Retweets (for example, those generated using the Retweet button). Quote Tweets will not be matched by this operator.<br/>
            <br/>
            Example: <span className="text-blue-800">data @twitterdev -is:retweet</span></td>
        </Fragment>
    },
    {
        operator: "Is Reply",
        description: 
        <Fragment>
            <td>Deliver only explicit replies that match a rule. Can also be negated to exclude replies that match a rule from delivery.<br/>
            <br/>
            When used with the filtered stream, this operator matches on replies to an original Tweet, replies in quoted Tweets and replies in Retweets.<br/>
            <br/>
            Example: <span className="text-blue-800">from:twitterdev is:reply</span></td>
        </Fragment>
    },
    {
        operator: "Is Verified",
        description: 
        <Fragment>
            <td>Deliver only Tweets whose authors are verified by Twitter.<br/>
            <br/>
            Example: <span className="text-blue-800">#nowplaying is:verified</span></td>
        </Fragment>
    },
    {
        operator: "Has Hashtags",
        description: 
        <Fragment>
            <td>Matches Tweets that contain at least one hashtag.<br/>
            <br/>
            Example: <span className="text-blue-800">from:twitterdev -has:hashtags</span></td>
        </Fragment>
    },
    {
        operator: "Has Links",
        description: 
        <Fragment>
            <td>This operator matches Tweets which contain links and media in the Tweet body.<br/>
            <br/>
            Example: <span className="text-blue-800">from:twitterdev announcement has:links</span></td>
        </Fragment>
    },
    {
        operator: "Has Media",
        description: 
        <Fragment>
            <td>Matches Tweets that contain a media object, such as a photo, GIF, or video, as determined by Twitter. This will not match on media created with Periscope, or Tweets with links to other media hosting sites.<br/>
            <br/>
            Example: <span className="text-blue-800">(kittens OR puppies) has:media</span></td>
        </Fragment>
    },
    {
        operator: "Has Images",
        description: 
        <Fragment>
            <td>Matches Tweets that contain a recognized URL to an image.<br/>
            <br/>
            Example: <span className="text-blue-800">#meme has:images</span></td>
        </Fragment>
    },
    {
        operator: "Has Videos",
        description: 
        <Fragment>
            <td>Matches Tweets that contain native Twitter videos, uploaded directly to Twitter. This will not match on videos created with Periscope, or Tweets with links to other video hosting sites.<br/>
            <br/>
            Example: <span className="text-blue-800">#icebucketchallenge has:videos</span></td>
        </Fragment>
    },
    {
        operator: "Language",
        description: 
        <Fragment>
            <td>Matches Tweets that have been classified by Twitter as being of a particular language (if, and only if, the tweet has been classified). It is important to note that each Tweet is currently only classified as being of one language, so AND’ing together multiple languages will yield no results.<br/>
            <br/>
            You can only pass a single BCP 47 language identifier per <span className="text-blue-800">lang:</span> operator.<br/>
            <br/>
            Note: if no language classification can be made the provided result is ‘und’ (for undefined).<br/>
            <br/>
            Example: <span className="text-blue-800">recommend #paris lang:en</span><br/>
            <br/>
            The list below represents the currently supported languages and their corresponding BCP 47 language identifier:<br/>
            <br/>
            <table>
            <tbody><tr><td>Amharic: <span className="text-blue-800">am</span></td>
            <td>German: <span className="text-blue-800">de</span></td>
            <td>Malayalam: <span className="text-blue-800">ml</span></td>
            <td>Slovak: <span className="text-blue-800">sk</span></td>
            </tr><tr><td>Arabic: <span className="text-blue-800">ar</span></td>
            <td>Greek: <span className="text-blue-800">el</span></td>
            <td>Maldivian: <span className="text-blue-800">dv</span></td>
            <td>Slovenian: <span className="text-blue-800">sl</span></td>
            </tr><tr><td>Armenian: <span className="text-blue-800">hy</span></td>
            <td>Gujarati: <span className="text-blue-800">gu</span></td>
            <td>Marathi: <span className="text-blue-800">mr</span></td>
            <td>Sorani Kurdish: <span className="text-blue-800">ckb</span><br/>
            </td>
            </tr><tr><td>Basque: <span className="text-blue-800">eu</span></td>
            <td>Haitian Creole: <span className="text-blue-800">ht</span></td>
            <td>Nepali: <span className="text-blue-800">ne</span></td>
            <td>Spanish: <span className="text-blue-800">es</span></td>
            </tr><tr><td>Bengali: <span className="text-blue-800">bn</span></td>
            <td>Hebrew: <span className="text-blue-800">iw</span></td>
            <td>Norwegian: <span className="text-blue-800">no</span></td>
            <td>Swedish: <span className="text-blue-800">sv</span></td>
            </tr><tr><td>Bosnian: <span className="text-blue-800">bs</span></td>
            <td>Hindi: <span className="text-blue-800">hi</span></td>
            <td>Oriya: <span className="text-blue-800">or</span></td>
            <td>Tagalog: <span className="text-blue-800">tl</span></td>
            </tr><tr><td>Bulgarian: <span className="text-blue-800">bg</span></td>
            <td>Latinized Hindi: <span className="text-blue-800">hi-Latn</span></td>
            <td>Panjabi: <span className="text-blue-800">pa</span></td>
            <td>Tamil: <span className="text-blue-800">ta</span></td>
            </tr><tr><td>Burmese: <span className="text-blue-800">my</span></td>
            <td>Hungarian: <span className="text-blue-800">hu</span></td>
            <td>Pashto: <span className="text-blue-800">ps</span></td>
            <td>Telugu: <span className="text-blue-800">te</span></td>
            </tr><tr><td>Croatian: <span className="text-blue-800">hr</span></td>
            <td>Icelandic: <span className="text-blue-800">is</span></td>
            <td>Persian: <span className="text-blue-800">fa</span></td>
            <td>Thai: <span className="text-blue-800">th</span></td>
            </tr><tr><td>Catalan: <span className="text-blue-800">ca</span></td>
            <td>Indonesian: <span className="text-blue-800">in</span></td>
            <td>Polish: <span className="text-blue-800">pl</span></td>
            <td>Tibetan: <span className="text-blue-800">bo</span></td>
            </tr><tr><td>Czech: <span className="text-blue-800">cs</span></td>
            <td>Italian: <span className="text-blue-800">it</span></td>
            <td>Portuguese: <span className="text-blue-800">pt</span></td>
            <td>Traditional Chinese: <span className="text-blue-800">zh-TW</span></td>
            </tr><tr><td>Danish: <span className="text-blue-800">da</span></td>
            <td>Japanese: <span className="text-blue-800">ja</span></td>
            <td>Romanian: <span className="text-blue-800">ro</span></td>
            <td>Turkish: <span className="text-blue-800">tr</span></td>
            </tr><tr><td>Dutch: <span className="text-blue-800">nl</span></td>
            <td>Kannada: <span className="text-blue-800">kn</span></td>
            <td>Russian: <span className="text-blue-800">ru</span></td>
            <td>Ukrainian: <span className="text-blue-800">uk</span></td>
            </tr><tr><td>English: <span className="text-blue-800">en</span></td>
            <td>Khmer: <span className="text-blue-800">km</span></td>
            <td>Serbian: <span className="text-blue-800">sr</span></td>
            <td>Urdu: <span className="text-blue-800">ur</span></td>
            </tr><tr><td>Estonian: <span className="text-blue-800">et</span></td>
            <td>Korean: <span className="text-blue-800">ko</span></td>
            <td>Simplified Chinese: <span className="text-blue-800">zh-CN</span></td>
            <td>Uyghur: <span className="text-blue-800">ug</span></td>
            </tr><tr><td>Finnish: <span className="text-blue-800">fi</span></td>
            <td>Lao: <span className="text-blue-800">lo</span></td>
            <td>Sindhi: <span className="text-blue-800">sd</span></td>
            <td>Vietnamese: <span className="text-blue-800">vi</span></td>
            </tr><tr><td>French: <span className="text-blue-800">fr</span></td>
            <td>Latvian: <span className="text-blue-800">lv</span></td>
            <td>Sinhala: <span className="text-blue-800">si</span></td>
            <td>Welsh: <span className="text-blue-800">cy</span></td>
            </tr><tr><td>Georgian: <span className="text-blue-800">ka</span></td>
            <td>Lithuanian: <span className="text-blue-800">lt</span></td>
            <td>&nbsp;</td>
            </tr></tbody></table>
            </td>
        </Fragment>
    },
    {
        operator: "Sample",
        description: 
        <Fragment>
            <td>Returns a random percent sample of Tweets that match a rule rather than the entire set of Tweets. The percent value must be represented by an integer between 1 and 100 (for example, <span className="text-blue-800">sample:10</span> will return a random 10% sample).<br/>
            <br/>
            This operator first reduces the scope of the stream to the percentage you specified, then the rule/filter is applied to that sampled subset. In other words, if you are using, for example, <span className="text-blue-800">sample:10</span>, each Tweet will have a 10% chance of being in the sample.<br/>
            <br/>
            This operator applies to the entire rule and requires all OR'd terms to be grouped.<br/>
            <br/>
            Example: <span className="text-blue-800">#nowplaying @spotify sample:15</span></td>
        </Fragment>
    },
]