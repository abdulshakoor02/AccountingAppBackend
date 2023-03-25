import { MongoClient } from 'mongodb';
import log from './log.js'
import dotenv from 'dotenv'
dotenv.config()
const url = `mongodb://${process.env.mongoUsername}:${process.env.mongoPassword}@${process.env.mongoHostname}:27017/?authMechanism=DEFAULT`;




async function client() {
    let client = new MongoClient(url)
    await client.connect()
    log("mongodb connected")
    return client
}

export default await client()
