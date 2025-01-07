import jwt from 'jsonwebtoken'
import { MongoClient, ObjectId } from 'mongodb'
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
            const collection = database.collection('users');

            const c_User = await collection.findOne({ _id: new ObjectId(userID) });



            // req.user = omit (c_User, ['password'])
            // userID = JSON.parse(`ObjectId('` + userID +`')`)
            console.log("userID", userID)
            console.log("C_User", c_User)
            next()
        } catch (error) {
            console.log(error)
        }
    }
    next()
}
export default checkUserAuth