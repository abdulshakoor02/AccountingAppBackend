import dotenv from 'dotenv'
dotenv.config()
import client from './repositories/mongoDbConnect.js'
import log from './repositories/log.js'

let db = client.db('test');

(async () => {
    await db.createCollection('users')
    // let users = db.collection('test')
    // log(await users.insertOne({ test: "test" }))
})()