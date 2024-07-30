const express = require('express')
const {
    createCard,
    getCards,
    getSingleCard,
    deleteCard,
    updateCard,
} = require('../controllers/cardController')

const router = express.Router({ mergeParams: true })

// GET all cards
router.get('/', getCards)

// GET a single card
router.get('/:cardId', getSingleCard)

// POST a new card
router.post('/', createCard)

// Delete an existing card
router.delete('/:cardId', deleteCard)

// Update an existing card
router.patch('/:cardId', updateCard)

module.exports = router