const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheme = new Schema({
    name: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    score: {
      type: String,
      required: true
    },
    uuid: {
      type: String,
      required: true
    }
}, { autoIndex: false, versionKey: false });

const User = mongoose.model('User', userScheme);

module.exports = User;
