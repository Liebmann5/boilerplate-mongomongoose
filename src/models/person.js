let mongoose = require('mongoose');

let personSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true
    },
    age: Number,
    favoriteFoods: [String]
});
//https://stackoverflow.com/questions/35509611/mongoose-save-array-of-strings

module.exports = mongoose.model('Person', personSchema);