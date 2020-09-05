const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
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
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model("item", ItemSchema);
