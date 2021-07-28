export interface RuleOptionsProperties {
    readonly isRetweet?: boolean;
    readonly isVerified?: boolean;
    readonly isReply?: boolean;
    readonly hasHashtags?: boolean;
    readonly hasLinks?: boolean;
    readonly hasMedia?: boolean;
    readonly hasImages?: boolean;
    readonly hasVideos?: boolean;
    readonly language?: string;
    readonly sample?: number;
}

export class RuleOptions implements RuleOptionsProperties {
    public readonly isRetweet?: boolean;
    public readonly isVerified?: boolean;
    public readonly isReply?: boolean;
    public readonly hasHashtags?: boolean;
    public readonly hasLinks?: boolean;
    public readonly hasMedia?: boolean;
    public readonly hasImages?: boolean;
    public readonly hasVideos?: boolean;
    public readonly language?: string;
    public readonly sample?: number;

    public toProps(): RuleOptionsProperties {
        return {
            isRetweet: this.isRetweet,
            isVerified: this.isVerified,
            isReply: this.isReply,
            hasHashtags: this.hasHashtags,
            hasLinks: this.hasLinks,
            hasMedia: this.hasMedia,
            hasImages: this.hasImages,
            hasVideos: this.hasVideos,
            language: this.language,
            sample: this.sample
        };
    }
}