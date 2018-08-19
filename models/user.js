const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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

// Export the model
module.exports = mongoose.model('User', userSchema);
