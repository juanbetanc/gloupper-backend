const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = Schema({
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
});

module.exports = mongoose.model("Chat", ChatSchema);
