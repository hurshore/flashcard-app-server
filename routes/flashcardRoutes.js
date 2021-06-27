const express = require('express');
const router = express.Router();

const {
  createFlashcard,
  getFlashcardSets,
  getSingleFlashcardSet,
  deleteFlashcard,
} = require('../controllers/flashcardController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, createFlashcard);
router.delete('/', authMiddleware, deleteFlashcard);
router.get('/all', getFlashcardSets);
router.get('/', getSingleFlashcardSet);

module.exports = router;
