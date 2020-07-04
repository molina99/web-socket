;
'use strict'
const connectDB = require('../config/db')

let postUser = async (req, res) => {
    let user = req.body.user
    console.log(user)
    let db = await connectDB();
    db.collection('users').insertOne(user)
        .then(() => {
            res.status(200).json({
                data: user,
                sms: 'User created'
            })
        }).catch(err => {
        res.status(500).json({
            ok: false,
            data: null,
            sms: err
        })
    })
}

module.exports = {
    postUser
}
