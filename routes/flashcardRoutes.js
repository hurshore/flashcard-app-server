const express = require('express');
const router = express.Router();

const {
  createFlashcard,
  getFlashcardSets,
  getSingleFlashcardSet,
  deleteFlashcard,
  deleteFlashcardSet,
  getRandomFlashcardSets,
  getSingleRandomFlashcardSet,
} = require('../controllers/flashcardController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, createFlashcard);
router.delete('/', authMiddleware, deleteFlashcard);
router.get('/set/all', getFlashcardSets);
router.get('/set', getSingleFlashcardSet);
router.delete('/set', authMiddleware, deleteFlashcardSet);
router.get('/set/random/all', getRandomFlashcardSets);
router.get('/set/random', getSingleRandomFlashcardSet);

module.exports = router;
