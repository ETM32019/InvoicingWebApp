const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EstimateSchema = new Schema({
  estimate: {
    user: {
      type: Schema.Types.ObjectId
    },
    notes: {
      type: String
    },
    previewemail: {
      type: String
    },
    discount: {
      type: {
        type: String
      },
      percent: {
        type: mongoose.Types.Decimal128
      }
    },
    recordpayment: {
      amount: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      method: {
        type: String,
        required: true
      },
      notes: {
        type: String
      }
    }
  }
});

module.exports = Estimate = mongoose.model("estimate", Estimate);
