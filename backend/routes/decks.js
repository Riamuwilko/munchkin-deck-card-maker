const express = require('express')
const {
    createDeck,
    getDecks,
    getSingleDeck,
    deleteDeck,
    updateDeck,
} = require('../controllers/deckController')

const router = express.Router()
const cardRoutes = require('./cards')

// GET all decks
router.get('/', getDecks);

// GET a single deck
router.get('/:deckId', getSingleDeck);

// POST a new deck
router.post('/', createDeck);

// Delete an existing deck
router.delete('/:deckId', deleteDeck);

// Update an existing deck
router.patch('/:deckId', updateDeck);

router.use('/:deckId/cards', cardRoutes);

module.exports = router;