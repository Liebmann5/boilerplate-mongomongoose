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














/*
This thing sucks...
https://www.mongodb.com/docs/atlas/troubleshoot-connection/#special-characters-in-connection-string-password

https://www.mongodb.com/docs/atlas/getting-started/
ok so the point of giving us an option in the article{MongoDB/Docker} was to allow us to connect to a cluster
in a few various ways I guess 
??Still no idea why they told/made us download MongoDB
Any in the link #4 says we can connect by using the 'Node.js driver' ssooooooo... no clue?? 
Google this   =>    "what is a driver in software"
https://www.mongodb.com/docs/drivers/node/current/
https://www.mongodb.com/docs/drivers/node/current/quick-start/
https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/#std-label-node-connect-to-mongodb

https://www.mongodb.com/docs/manual/reference/connection-string/#dns-seed-list-connection-format


$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
     Check out the 'Create Record' sections the 1st line is how I got the idea
https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


https://thecodebarbarian.com/how-find-works-in-mongoose.html
**https://forum.freecodecamp.org/t/creating-and-saving-a-record-with-mongodb/255208**
https://forum.freecodecamp.org/t/mongodb-and-mongoose-create-and-save-a-record-of-a-model-createperson-is-not-a-function-error/249896/4
*https://stackoverflow.com/questions/50144826/create-and-save-a-record-of-a-model-on-mongodb*
https://forum.freecodecamp.org/t/beta-mongoose-challenges-create-and-save-a-record-of-a-model/166524/7
*https://mongoosejs.com/docs/models.html*
https://www.freecodecamp.org/learn/back-end-development-and-apis/mongodb-and-mongoose/
https://mongoosejs.com/docs/guide.html
https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/
https://www.digitalocean.com/community/tutorials/how-to-work-with-files-using-the-fs-module-in-node-js


!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        This worked so I didn't need a to make a ??Database??
MONGO_URI='mongodb+srv://userName:userPassword@cluster0.eihacxg.mongodb.net/?retryWrites=true&w=majority'
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




UNRELATED... but seem like they'd be !extrememly! useful to learn
https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/#std-label-node-crud-landing
https://mongoosejs.com/docs/middleware.html#types-of-middleware
              =>On this website the sections are seperated like Query.prototype.deleteMany()/Parameters:/Returns:/See:
                CLICK THE !BLUE! KEYWORDS!!!! THEY'LL LINK YOU TO MONGODB DOCS TOO!!!!!!!!!!!
                I think this only might apply to sections that have a "See:" section!!!
*/