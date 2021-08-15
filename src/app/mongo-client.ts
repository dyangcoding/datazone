
import * as Realm from "realm-web";
import { UpstreamRuleProperties } from "../models/rule";
import { UpstreamTweetProperties } from "../models/tweet";

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
    return mongoDb.db("dataZone").collection<UpstreamRuleProperties>("rules");
}

export async function tweetCollection() {
    const mongoDb = await getMongoDB();
    return mongoDb.db("dataZone").collection<UpstreamTweetProperties>("tweets");
}