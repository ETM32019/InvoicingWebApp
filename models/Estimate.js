const mongoose = require("mongoose");

const EstimateSchema = new mongoose.Schema({
  estimate: {
    user: {
        type: Schema.Types.ObjectId
      },
    from: {
      profile: {
        type: Schema.Types.ObjectId,
        ref: "profile"
      }
    },
    billto: {
      client: {
        type: Schema.Types.ObjectId,
        ref: "client"
      }
    },
    item: [
      {
        user: {
          type: Schema.Types.ObjectId
        },
        item: {
          type: Schema.Types.ObjectId,
          ref: "item"
        }
      }
    ],
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
