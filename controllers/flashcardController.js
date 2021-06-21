const FlashcardSet = require('../models/FlashcardSet');
const Flashcard = require('../models/Flashcard');

const handleFlashcardSet = async (req, flashcardSet) => {
  if (!flashcardSet) {
    flashcardSet = new FlashcardSet({
      flashcardCount: 1,
      subject: req.body.subject,
      user: req.user._id,
    });
  } else {
    flashcardSet.flashcardCount += 1;
  }

  try {
    const set = await flashcardSet.save();
    return set._id;
  } catch (err) {
    console.log(err);
  }
};

const createANewFlashcard = async (req, flashcardSetId) => {
  try {
    const flashcard = new Flashcard({
      answer: req.body.answer,
      question: req.body.question,
      flashcardSetId,
    });
    await flashcard.save();
  } catch (err) {
    console.log(err);
  }
};

const createFlashcard = async (req, res) => {
  try {
    const flashcardSet = await FlashcardSet.findOne({
      user: req.user._id,
      subject: req.body.subject,
    });

    const flashcardSetId = await handleFlashcardSet(req, flashcardSet);
    await createANewFlashcard(req, flashcardSetId);
    res.status(200).json({ message: 'Successfully created a new flashcard' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error creating flashcard' });
  }
};

const getFlashcardSets = async (req, res) => {
  try {
    const flashcardSets = await FlashcardSet.find();
    return res.status(200).json(flashcardSets);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: 'Error trying to fetch flashcard sets' });
  }
};

const getSingleFlashcardSet = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ flashcardSetId: req.body.id });
    return res.status(200).json(flashcards);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: 'Error trying to fetch flashcard set' });
  }
};

module.exports = { createFlashcard, getFlashcardSets, getSingleFlashcardSet };
