const express = require('express')

const router = express.Router()
const cardRoutes = require('./cards')

// GET all decks
router.get('/', (req, res) => {
    res.json({mssg: 'GET all decks'})
})

// GET a single deck
router.get('/:deckId', (req, res) => {
    res.json({mssg: 'GET a single deck'})
})

// POST a new deck
router.post('/', (req, res) => {
    res.json({mssg: 'POST a new deck'})
})

// Delete an existing deck
router.delete('/:deckId', (req, res) => {
    res.json({mssg: 'DELETE an existing deck'})
})

// Update an existing deck
router.patch('/:deckId', (req, res) => {
    res.json({mssg: 'UPDATE an existing deck'})
})

router.use('/:deckId/cards', cardRoutes)

module.exports = router