import { RuleOptionsProperties } from "./ruleOptions";

export interface UpstreamRuleProperties {
    // required from MongoClient to fetch Rule Collection
    readonly _id: string;
    // generated from Twitter API
    readonly id?: string;
    readonly createdAt?: string;
    readonly keyword?: string;
    readonly tag?: string;
    readonly emoji?: string;
    readonly mentionedUserId?: string;
    readonly phrase?: string;
    readonly hashtags?: string;
    readonly url?: string;
    readonly fromUser?: string;
    readonly toUser?: string;
    readonly retweetsOfUser?: string;
    readonly context?: string;
    readonly entity?: string;
    readonly conversationId?: string;
    readonly options?: RuleOptionsProperties;
}
// remove _id which is only required from Mongo Client to fetch Rule Collection
export type RuleProperties = Omit<UpstreamRuleProperties, "_id">;

export class Rule implements RuleProperties {
    public readonly id?: string;
    public readonly createdAt?: string;
    public readonly keyword?: string;
    public readonly tag?: string;
    public readonly emoji?: string;
    public readonly mentionedUserId?: string;
    public readonly phrase?: string;
    public readonly hashtags?: string;
    public readonly url?: string;
    public readonly fromUser?: string;
    public readonly toUser?: string;
    public readonly retweetsOfUser?: string;
    public readonly context?: string;
    public readonly entity?: string;
    public readonly conversationId?: string;
    public readonly options?: RuleOptionsProperties;
}