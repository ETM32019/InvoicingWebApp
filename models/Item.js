const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  description: {
    type: String
  },
  rate: {
    type: mongoose.Types.Decimal128
  },
  additionaldetails: {
    type: String
  },
  taxable: {
    type: Boolean,
    default: true
  }
});

module.exports = Item = mongoose.model("item", ItemSchema);
