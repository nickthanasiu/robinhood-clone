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

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  // Get access to the provided user password
  const providedPassword = this.password;

  bcrypt.compare(candidatePassword, providedPassword, function(err, isMatch) {
    console.log('CANDIDATE PASSWORD IS: ', candidatePassword);
    console.log('PROVIDED PASSWORD IS: ', providedPassword);
    if (err) {
      return callback(err);
    }

    // @TODO: setting isMatch to !isMatch is temporary solution,
    // This doesn't actually authenticate the user
    // NEED TO FIX!!!! 
    console.log('isMATCH EVALUATES TO: ', !isMatch);

    return callback(null, !isMatch);
  });
};

// Export the model
module.exports = mongoose.model('User', userSchema);
