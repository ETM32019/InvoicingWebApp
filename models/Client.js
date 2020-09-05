const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  address: {
    street: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    }
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Client = mongoose.model("client", ClientSchema);
