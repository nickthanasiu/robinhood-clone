/*eslint-disable*/
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true,
  },
  firstName: {
    type: String,
    lowercase: true,
    required: true,
  },
  lastName: {
    type: String,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    lowercase: true,
    required: true,
  },
}, { timestamps: true });

// Before saving User, encrypt password
userSchema.pre('save', function(next) {
  // Get access to the user model
  const user = this;
  // Generate a Salt, then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(error);
    }

    // Use the Salt to hash password
    bcrypt.hash(user.password, salt, null, function(error, hash) {
      if (error) {
        return next(error);
      }

      // Overwrite Plain Text password with encrypted(hashed) password
      user.password = hash;
      next();
    });
  })
});

// Export the model
module.exports = mongoose.model('User', userSchema);
