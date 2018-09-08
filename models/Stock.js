const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    auto: true,
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  company_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
  },
  company_name: {
    type: String,
  },
  company_symbol: {
    type: String,
  },
  price: {
    type: Number,
  },
  num_shares: {
    type: Number,
  },
}, { timestamps: true });

module.exports = mongoose.model('Stock', StockSchema);
