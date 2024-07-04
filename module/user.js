const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  bookmarked: [
    {
      type: Schema.Types.ObjectId,
      ref: "films",
    },
  ],
});

module.exports = mongoose.model("users", userSchema);
