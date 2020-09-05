const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  invoice: {
    user: {
      type: Schema.Types.ObjectId
    },
    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    address: {
      type: String
    },
    phone: {
      type: String,
      validate: {
        validator: function(v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
      required: [true, "User phone number required"]
    },
    businessnumber: {
      type: String
    },
    invoicenumber: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    terms: {
      type: String
    },
    itemdescription: {
      type: String,
      required: true
    },
    itemrate: {
      type: String,
      required: true
    },
    itemamount: {
      type: mongoose.Types.Decimal128
    },
    itemtaxable: {
      type: Boolean,
      default: false
    },
    quantity: {
      type: Number,
      default: 1
    },
    additionaldetails: {
      type: String
    },
    notes: {
      type: String
    },
    previewemail: {
      type: String
    },
    color: {
      type: String
    }
  }
});

module.exports = Invoice = mongoose.model("invoice", InvoiceSchema);
