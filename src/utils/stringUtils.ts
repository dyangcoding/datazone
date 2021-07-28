export const KeywordDesc = "Matches a keyword within the body of a Tweet. A tokenized match, meaning that your keyword string will be matched against the tokenized text of the Tweet body.";

export const TagDesc = "At the time they are created, each filtering rule may be created with a tag. Rule tags have no special meaning as they are simply treated as opaque strings carried along with a rule."

export const EmojiDesc = "Matches an emoji within the body of a Tweet. A tokenized match, meaning that your emoji will be matched against the tokenized text of the Tweet body.";

export const HashtagsDesc = "Matches any Tweet containing a recognized hashtag, if the hashtag is a recognized entity in a Tweet. " + 
"This operator performs an exact match, NOT a tokenized match, meaning the rule #thanku will match posts with the exact hashtag #thanku, but not those with the hashtag #thankunext.";

export const UserDesc = "Matches any Tweet that mentions the given username, if the username is a recognized entity (including the @ character).";

export const FromUserDesc = "Matches any Tweet from a specific user. The value can be either the username (excluding the @ character) or the user’s numeric user ID.";

export const ToUserDesc = "Matches any Tweet that is in reply to a particular user. The value can be either the username (excluding the @ character) or the user’s numeric user ID." +
"You can only pass a single username/ID per to: operator.";

export const RetweetsOfUserDesc = "The value can be either the username (excluding the @ character) or the user’s numeric user ID.";

export const UrlDesc = "Performs a tokenized match on any validly-formatted URL of a Tweet.";

export const ContextDesc = "Matches Tweets with a specific domain id and/or domain id, enitity id pair where * represents a wildcard.";

export const EntityDesc = "Matches Tweets with a specific entity string value.";

export const ConversationIdDesc = "Matches Tweets that share a common conversation ID. A conversation ID is set to the Tweet ID of a Tweet that started a conversation.";