export interface Domain {
    readonly id: string;
    readonly name: string;
    readonly description: string;
}

export interface Entity {
    readonly id: string;
    readonly name: string;
    readonly description: string;
}

export interface Context {
    readonly domains?: ReadonlyArray<Domain>;
    readonly entities?: ReadonlyArray<Entity>;
}

export interface PublicMetrics {
    readonly retweetCount: number;
    readonly replyCount: number;
    readonly likeCount: number;
    readonly quoteCount: number;
}

export interface NonPublicMetrics {
    readonly impressionCount: number;
    readonly urlLinkClicks: number;
    readonly userProfileClicks: number;
}

export interface UserMetrics {
    readonly followersCount: number;
    readonly followingCount: number;
    readonly tweetCount: number;
    readonly listedCount: number;
}

export interface User {
    readonly id: string;
    readonly name: string;
    readonly userName: string;
    readonly createdAt: string;
    readonly description?: string;
    readonly profileImageUrl?: string;
    readonly metrics?: UserMetrics;
    readonly url?: string;
    readonly verified: boolean;
}

export interface Url {
    readonly url: string;
    readonly expandedUrl: string;
    readonly displayUrl: string;
}

export interface Entities {
    readonly hashtags?: ReadonlyArray<string>;
    readonly mentionedUrls?: ReadonlyArray<Url>;
}

export interface MatchingRule {
    readonly id: string;
    readonly tag: string;
}

export interface UpstreamTweetProperties {
    // required from MongoClient to fetch TweetCollection
    readonly _id: string;
    readonly id?: string;
    readonly text?: string;
    readonly createdAt?: string;
    readonly author?: User;
    readonly inReplyToUserId?: string;
    readonly publicMetrics?: PublicMetrics;
    readonly nonPublicMetrics?: NonPublicMetrics;
    readonly context?: Context;
    readonly entities?: Entities;
    readonly mentionedUsers?: ReadonlyArray<User>;
    readonly matchingRules?: ReadonlyArray<MatchingRule>;
    readonly conversationId?: string;
    readonly source?: string;
    readonly lang?: string; 
}

export function toTweetProperties(tweet: UpstreamTweetProperties): TweetProperties {
    return {
        id: tweet.id,
        text: tweet.text,
        createdAt: tweet.createdAt,
        author: tweet.author,
        inReplyToUserId: tweet.inReplyToUserId,
        publicMetrics: tweet.publicMetrics,
        nonPublicMetrics: tweet.nonPublicMetrics,
        context: tweet.context,
        entities: tweet.entities,
        mentionedUsers: tweet.mentionedUsers,
        matchingRules: tweet.matchingRules,
        conversationId: tweet.conversationId,
        source: tweet.source,
        lang: tweet.lang
    } as TweetProperties;
}

// remove _id which is only required from Mongo Client to fetch Tweet Collection
export type TweetProperties = Omit<UpstreamTweetProperties, "_id">;