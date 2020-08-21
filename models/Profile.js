const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  company: {
    title: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    address1: {
      type: String
    },
    address2: {
      type: String
    },
    address3: {
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
      type: Number
    },
    businessnumberlabel: {
      type: String
    },
    companylogo: {
      data: Buffer,
      contentType: String
    },
    color: {
      type: String
    }
  },
  tax: {
    type: {
      type: String
    },
    rate: {
      type: mongoose.Types.Decimal128
    },
    label: {
      type: String
    },
    inclusive: {
      type: Boolean,
      default: false
    }
  },
  currency: {
    code: {
      type: String
    }
  },
  estimate: {
    title: {
      type: String
    },
    lastnumber: {
      type: String
    },
    defaultnotes: {
      type: String
    }
  },
  paymentinfo: {
    paypal: {
      type: String
    },
    backtransfer: {
      type: String
    },
    bycheck: {
      type: String
    },
    other: {
      type: String
    }
  }
});

module.exports = mongoose.model("profile", ProfileSchema);
