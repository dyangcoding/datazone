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
    readonly url: String;
    readonly expandedUrl: String;
    readonly displayUrl: String;
}

export interface Entities {
    readonly hashtags?: ReadonlyArray<string>;
    readonly mentionedUrls?: ReadonlyArray<Url>;
}

export interface MatchingRule {
    readonly id: string;
    readonly tag: string;
}

export interface TweetProperties {
    readonly id: string;
    readonly text: string;
    readonly createAt: string;
    readonly authorId: string;
    readonly context?: ReadonlyArray<Context>;
    readonly entities?: ReadonlyArray<Entities>;
    readonly matchingRules: ReadonlyArray<MatchingRule>;
    readonly lang: string; 
}

export class Tweet {
    public readonly id: string | undefined;
    public readonly text: string | undefined;
    public readonly createAt: string | undefined;
    public readonly author: User | undefined;
    public readonly inReplyToUserId: string | undefined;
    public readonly publicMetrics?: PublicMetrics | undefined;
    public readonly nonPublicMetrics?: NonPublicMetrics | undefined;
    public readonly context?: Context | undefined;
    public readonly entities?: Entities | undefined;
    public readonly mentionedUsers?: ReadonlyArray<User> | undefined;
    public readonly matchingRules?: ReadonlyArray<MatchingRule> | undefined;
    public readonly conversationId?: string;
    public readonly source?: string;
    public readonly lang: string | undefined;

    constructor() {

    }
}