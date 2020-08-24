const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  invoice: {
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

module.exports = Invoice = mongoose.model("invoice", InvoiceSchema);
