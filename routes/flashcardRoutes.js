const express = require('express');
const router = express.Router();

const {
  createFlashcard,
  getFlashcardSets,
  getSingleFlashcardSet,
} = require('../controllers/flashcardController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, createFlashcard);
router.get('/all', getFlashcardSets);
router.get('/', getSingleFlashcardSet);

module.exports = router;
