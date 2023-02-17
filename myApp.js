require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


let Person;

Person = require('./src/models/person');



const createAndSavePerson = (done) => {
  let personInfo = new Person({
    name: 'IHateYou',
    age: 280000,
    favoriteFoods: ['silk milk', 'keys']
  });

  personInfo.save((err, data) => err ? done(err) : done(null, data));
};

var arrayOfPeople = [
  {name: 'Dennis', age: 30, favoriteFoods: ['guns', 'hammers', 'steaks']},
  {name: 'The', age: 2, favoriteFoods: ['the']},
  {name: 'Mennace', age: 25, favoriteFoods: ['children', 'gasoline', 'long bearded ghouls']}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => err ? done(err) : done(null, data))
};

const findPeopleByName = (personName, done) => {
  Person
    .find({
      name: personName
    }, (err, data) => err ? done(err) : done(null, data));
};

const findOneByFood = (food, done) => {
  Person.findOne( {favoriteFoods: food }, (err, data) => err ? done(err) : done(null, data) );
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => err ? done(err) : done(null, data));
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  //Mongoose declared the update() as 'DEPRECATED'!!!)
  Person.findById(personId, (err, data) => {
    data.favoriteFoods.push(foodToAdd);
    data.save((err, updatedPerson) => err ? done(err) : done(null, updatedPerson));
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate( { name: personName }, { age: ageToSet }, { new: true}, (err, updatedDoc) => {
    err ? done(err) : done(null, updatedDoc);
  } );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => err ? done(err) : done(null, removedDoc));
  //ALSO OK!!!!!
  //Person.findByIdAndRemove( { _id: personId }, (err, removedDoc) => err ? done(err) : done(null, removedDoc));
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.deleteMany( { name: nameToRemove }, (err, data) => err ? done(err) : done(null, data));
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch }).sort({ name: 1 }).limit(2).select({ age: 0 }).exec((err, data) => err ? done(err) : done(null, data));
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
