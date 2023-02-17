// 1) Reference Mongoose
let mongoose = require('mongoose')
let validator = require('validator')

// 2) Define Schema
let salesSchema = new mongoose.Schema({
    _id: require('mongoose').Schema.Types.ObjectId,
    storeLocation: String,
    //REMEMBER: {} == object
    customer: {
        gender: String,
        age: Number,
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: (value) => {
                return validator.isEmail(value)
            }
        },
        satisfaction: Number
    }
})

// 3) Export Model       //FCC:(nameOfCollection, referenceNameToSchemaDefinition)
module.exports = mongoose.model('sales', salesSchema)
//??I assume model is a method or something like that in the mongoose class??
//https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/
//Check out Database Conection section idk what it's saying though???




/*
Basic Operations
Mongoose has a flexible API and provides many ways to accomplish a task. We will not
focus on the variations because that is out of scope for this article, but remember
that most of the operations can be done in more than one way either syntactically or
via the application architecture.

????????????????????????????????????????
"syntactically or via the application architecture"
    ^not 1 clue what they are talking about or reffering to??
????????????????????????????????????????
*/




/*let SalesModel = require('./storeLocation')

let msg = new SalesModel({
    _id: '1234567890ABCD-EFGHI',
    storeLocation: 'Korea',
    email: 'TESTY@Email.COM',
    satisfaction: 8
})

msg.save()
   .then(doc => {
    console.log(doc)
   })
   .catch(err => {
    console.log(err)
   })*/