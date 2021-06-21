const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    flashcardCount: {
      type: Number,
    },
    subject: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const flashcardSet = mongoose.model('FlashcardSet', schema);

module.exports = flashcardSet;
