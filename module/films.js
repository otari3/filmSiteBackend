const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const filmScema = new Schema({
  _id: {
    type: "ObjectId",
  },
  title: {
    type: "String",
  },
  thumbnail: {
    trending: {
      small: {
        type: "String",
      },
      large: {
        type: "String",
      },
    },
    regular: {
      small: {
        type: "String",
      },
      medium: {
        type: "String",
      },
      large: {
        type: "String",
      },
    },
  },
  year: {
    type: "Number",
  },
  category: {
    type: "String",
  },
  rating: {
    type: "String",
  },
  isBookmarked: {
    type: "Boolean",
  },
  isTrending: {
    type: "Boolean",
  },
});

module.exports = mongoose.model("films", filmScema);
