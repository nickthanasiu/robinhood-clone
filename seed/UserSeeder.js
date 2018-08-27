/*eslint-disable*/

/*
 * Run this file ( node CompanySeeder.js ) to add users to database
 */

 const mongoose = require('mongoose');
 const User = require('../models/User');

 mongoose.connect('mongodb://localhost:27017/rhc', {
   useNewUrlParser: true,
 });

 const users = [
   new User({
     firstName: 'John',
     lastName: 'Smith',
     email: 'jsmith@yahoo.com',
     password: 'abc123'
   }),
 ];

 // Drop Companies from Database before re-seeding
 mongoose.connection.collections.users.drop();

let i, done = 0;

for (i = 0; i < users.length; i++) {
  users[i].save((err, result) => {
    done++;
    if (done === users.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
  console.log('EXITING');
}
