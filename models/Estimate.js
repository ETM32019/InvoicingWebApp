const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Estimate = new Schema({
  user: {
    type: Schema.Types.ObjectId
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
  estimatenumber: {
    type: String,
    required: true
  },
  estimatedate: {
    type: Date,
    default: Date.now
  },
  estimatetoname: {
    type: String
  },
  estimatetoemail: {
    type: String
  },
  estimatetoaddress: {
    type: String
  },
  estimatetophone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  estimateitem: [
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

module.exports = mongoose.model("estimate", Estimate);
