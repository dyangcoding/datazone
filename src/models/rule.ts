import emoji from "emoji-mart/dist-es/components/emoji/emoji";
import { RuleOptionsProperties } from "./ruleOptions";

export interface UpstreamRuleProperties {
    // required from MongoClient to fetch Rule Collection
    readonly _id: number;
    // generated from Twitter API
    readonly id?: number;
    readonly createdAt?: Date;
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
    public readonly id?: number;
    public readonly createdAt?: Date;
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

export function toRuleProperties(rules: ReadonlyArray<UpstreamRuleProperties>): ReadonlyArray<RuleProperties> {
    return rules.map(rule => {
        return {
            id: rule.id,
            createdAt: rule.createdAt,
            keyword: rule.keyword,
            tag: rule.tag,
            emoji: rule.emoji,
            mentionedUserId: rule.mentionedUserId,
            phrase: rule.phrase,
            hashtags: rule.hashtags,
            url: rule.hashtags,
            fromUser: rule.fromUser,
            toUser: rule.toUser,
            retweetsOfUser: rule.retweetsOfUser,
            context: rule.context,
            entity: rule.entity,
            conversationdId: rule.conversationId,
            options: rule.options
        } as RuleProperties    
    });
}