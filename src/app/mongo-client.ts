import * as Realm from "realm-web";
import { UpstreamRuleProperties } from "../models/rule";
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

export async function ruleCollection() {
    const mongoDb = await getMongoDB();
    return mongoDb
        .db("dataZone")
        .collection<UpstreamRuleProperties>("rules");
}

/*
    keep the "_id" field that was generated from MongoDb, because in order to 
    delete specific Rule object from local Store we only have access to the _id
    which is deliveried from the Delete Change Event.
*/
export async function fetchRules() {
    return ruleCollection().then(async collection => {
        const rules = await collection.find();
        return rules.map(rule => 
            {
                const temp = {"_id": rule._id.toString()}
                return {...rule, ...temp}
            }
        )
    });
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
        .then(tweets => tweets as Array<TweetProperties>);
}