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
    type: Number
  }
});

module.exports = Client = mongoose.model("client", ClientSchema);
