const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  locationId: {
    type: mongoose.Types.ObjectId,
    ref: "Attraction",
    required: true,
  },
  tags: [{ type: String }],
  likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  dislikes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      author: { type: mongoose.Types.ObjectId, ref: "User" },
      content: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Story", storySchema);
