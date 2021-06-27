const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  answer: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  flashcardSetId: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

const flashcardSet = mongoose.model('Flashcard', schema);

module.exports = flashcardSet;
