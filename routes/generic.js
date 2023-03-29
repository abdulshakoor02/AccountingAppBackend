import { database } from '../repositories/mongoDbConnect.js'
import logger from 'logger-line-number'
import md5 from 'md5'
import { worker } from '../workers/worker.js'


export const createGeneric = async (req, res) => {
    try {
        const { data, collection } = req.body

        let collect = database.collection(collection)

        let response = await collect.insertOne(data)
        res.send(response)
    }
    catch (err) {
        res.send(err)
    }
}

export const findGeneric = async (req, res) => {
    try {
        let query = []
        const { data, skip, limit, collection } = req.body
        let collect = database.collection(collection)
        let payload = {
            "$facet": {
                "totalData": [
                    {
                        "$match": data
                    },
                    {
                        "$skip": skip
                    },
                    {
                        "$limit": limit
                    }
                ],
                "totalCount": [
                    {
                        "$group": {
                            "_id": null,
                            "count": {
                                "$sum": 1
                            }
                        }
                    }
                ]
            }
        }
        query.push(payload)
        let response = await collect.aggregate(query).toArray()
        res.send({ data: response[0].totalData, count: response[0].totalCount[0].count })
    }
    catch (err) {
        res.send(err)
    }
}