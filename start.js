import dotenv from 'dotenv'
dotenv.config()
import client from './repositories/mongoDbConnect.js'
import logger from 'logger-line-number'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createUser, findUser } from './routes/users.js'
import { createGeneric, findGeneric } from './routes/generic.js'
import { login } from './routes/login.js'
import { verifyAuth } from './middleware/authMiddleware.js'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//login route
app.post('/login', login)

// user routes
app.post('/user/create', verifyAuth, createUser)
app.post('/user/find', verifyAuth, findUser)
app.post('/generic/create', createGeneric)
app.post('/generic/find', findGeneric)


app.listen(5000, () => {
    logger.log('webserver created on 5000')
})