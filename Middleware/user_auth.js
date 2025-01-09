import jwt from 'jsonwebtoken'
import { MongoClient, ObjectId } from 'mongodb'
// import pkg from 'lodash'
// const { omit } = pkg;


var checkUserAuth = async (req, res, next) => {
    let token
    const { authorization } = req.headers

    if (authorization && authorization.startsWith('Bearer')) {
       
        try {
            token = authorization.split(' ')[1]
            //verify Token
            const userID = jwt.verify(token, process.env.JWT_SECRET_KEY)
            
            // var ID= JSON.parse(userID)

            //get User from Token
            const client = new MongoClient(process.env.Data_URL)
            const database = client.db("SMS_login")
            const collection = database.collection('users');

       
            // var c_User = await collection.find({ _id: new ObjectId(userID.userID)}).toArray(function(err, results) {
            //     if (err){
            //         console.log(err)
            //     }else{
            //         return results
            //     }
            //   });

              req.user = await collection.findOne({ _id: new ObjectId(userID.userID)})

            // req.user = omit (c_User, ['repass', 'password'])
            // console.log("C_User", req.user)
            next()
        } catch (error) {
            console.log(error)
        }
    }
    next()
}
export default checkUserAuth