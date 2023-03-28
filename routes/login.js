import { users } from '../repositories/mongoDbConnect.js'
import logger from 'logger-line-number'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    try {
        let { data } = req.body
        let userData = await users.findOne(data)
        if (userData !== null) {
            const accessToken = jwt.sign({ user: userData.user, password: userData.password }, 'secretKey')
            res.send({ accessToken, userData })
        }
        else {
            res.status(400).send("Authencation Failed")
        }
    }
    catch (err) {
        _log(err)
        res.status(400).send("Authencation Failed")
    }
}