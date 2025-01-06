import jwt from 'jsonwebtoken'
import {MongoClient} from 'mongodb'
import pkg from 'lodash'
import { json } from 'express';
const { omit } = pkg;
var checkUserAuth = async (req, res, next) => {
    let token
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1]
            //verify Token
            const userID = jwt.verify(token, process.env.JWT_SECRET_KEY)

            //get User from Token
            const client = new MongoClient(process.env.Data_URL)
            const database = client.db("SMS_login")
            let c_User = await database.collection('users').findById(userID);
            // req.user = omit (c_User, ['password'])
            // userID = JSON.parse(`ObjectId('` + userID +`')`)
            console.log(userID)
            // next()
        } catch (error) {
            console.log(error)
        }
    }
    next()
}
export default checkUserAuth