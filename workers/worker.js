// worker.ts 💼
import { define } from 'nanolith';
import client from '../repositories/mongoDbConnect.js'
import logger from 'logger-line-number'


// Exporting the variable is not a requirement, but it is
// necessary to somehow export the resolved value of the
// function in order to have access to it later on.

const findUser = async (data) => {
    logger.log(data)
    let res = await users.findeOne(data)
    return res
}
export const worker = await define({
    findUser
});
