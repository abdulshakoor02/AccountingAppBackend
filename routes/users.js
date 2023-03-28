import { users } from '../repositories/mongoDbConnect.js'
import logger from 'logger-line-number'
import md5 from 'md5'
import { worker } from '../workers/worker.js'


export const createUser = async (req, res) => {
    try {
        const { data } = req.body
        let response = await users.insertOne(data)
        res.send(response)
    }
    catch (err) {
        res.send(err)
    }
}

export const findUser = async (req, res) => {
    try {
        const { data } = req.body
        let response = await users.find(data).toArray()
        res.send(response)
    }
    catch (err) {
        res.send(err)
    }
}