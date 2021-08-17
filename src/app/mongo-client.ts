import * as Realm from "realm-web";
import { RuleProperties, UpstreamRuleProperties } from "../models/rule";
import { TweetProperties, UpstreamTweetProperties } from "../models/tweet";

/*
Modify Mongo Collection Output using Aggregation Pipelines
You can control collection output by providing an array of one or more of the following pipeline stages when configuring the change stream:
$match, $project, $addFields, $replaceRoot, $redact
See Change Events for more information on the change stream response document format.
https://docs.mongodb.com/manual/reference/change-events/#change-stream-output
*/
const pipeline = [
    {
      $project: { "_id": 0 }
    }
];

const REALM_APP_ID = process.env.REACT_APP_REALM_APP_ID || "";
const app = new Realm.App({ id: REALM_APP_ID });

async function loggIn() {
    const user: Realm.User = await app.logIn(Realm.Credentials.anonymous())
    return user
}

async function getMongoDB() {
    const currentUser = app.currentUser ? app.currentUser : await loggIn();
    return currentUser.mongoClient("mongodb-atlas");
}

export async function fetchRules() {
    const mongoDb = await getMongoDB();
    return mongoDb
        .db("dataZone")
        .collection<UpstreamRuleProperties>("rules")
        .aggregate(pipeline)
        .then(rules => rules as ReadonlyArray<RuleProperties>);
}

export async function tweetCollection() {
    const mongoDb = await getMongoDB();
    return mongoDb
        .db("dataZone")
        .collection<UpstreamTweetProperties>("tweets");
}

export async function fetchTweets() {
    const collection = await tweetCollection()
    return collection
        .aggregate(pipeline)
        .then(tweets => tweets as ReadonlyArray<TweetProperties>);
}