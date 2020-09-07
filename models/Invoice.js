const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  previewemail: {
    type: String
  },
  color: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
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
    }
  },
  businessnumber: {
    type: String
  },
  invoicenumber: {
    type: String,
    required: true
  },
  invoicedate: {
    type: Date,
    default: Date.now
  },
  invoiceterms: {
    type: String
  },
  invoicedue: {
    type: Date,
    default: Date.now
  },
  invoicetoname: {
    type: String
  },
  invoicetoemail: {
    type: String
  },
  invoicetoaddress: {
    type: String
  },
  invoicetophone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  invoiceitem: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      rate: {
        type: mongoose.Types.Decimal128
      },
      quantity: {
        type: Number,
        default: 1
      },
      taxable: {
        type: Boolean,
        default: false
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("invoice", InvoiceSchema);
