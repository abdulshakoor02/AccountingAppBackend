import { MongoClient } from 'mongodb';
import logger from 'logger-line-number'
import dotenv from 'dotenv'
dotenv.config()
const url = `mongodb://${process.env.mongoUsername}:${process.env.mongoPassword}@${process.env.mongoHostname}:27017/?authMechanism=DEFAULT`;

async function createCollections(name, db) {
    try {
        await db.createCollection(name)
    }
    catch (err) {
        logger.log(name + " Already Exists")
    }
}

var users = ''
var invoices = ''
var features = ''
var database = ''

let feature = [{feature:'Admin'},{feature:'master',feature:'reports'}]
async function client() {
    try {
        let client = new MongoClient(url)
        await client.connect()
        let db = client.db('Accounting');
        database = db
        await createCollections('users', db)
        await createCollections('role', db)
        await createCollections('branch', db)
        await createCollections('features', db)
        await createCollections('roleFeatures', db)
        await createCollections('invoices', db)
        users = db.collection('users')
        invoices = db.collection('invoices')
        features = db.collection('features')
        // features.createIndex({feature:1},{unique:true})
        await features.insertMany(feature,{ordered:false})
        return client
    }
    catch (err) {
        logger.log(err)
    }
}

export default await client()
export {
    users, invoices, database,features
}