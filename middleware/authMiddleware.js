import jwt from 'jsonwebtoken'
import md5 from 'md5'
import { users } from '../repositories/mongoDbConnect.js'
import logger from 'logger-line-number'

export const verifyAuth = async (req, res, next) => {
    try {
        const { token } = req.headers
        let decoded = jwt.verify(token, 'secretKey')
        logger.log(decoded)
        if (typeof decoded.user !== "undefined") {
            let { user, password } = decoded
            let userData = await users.findOne({ user, password })
            if (userData !== null) {
                next()
            }
            else {
                res.status(400).send("Authencation Failed")
            }
        } else {
            res.status(400).send("Authencation Failed")
        }
    }
    catch (err) {
        logger.log(err)
        res.status(400).send("Authencation Failed")
    }

}