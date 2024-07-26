const express = require('express')

const router = express.Router({ mergeParams: true })

// GET all cards
router.get('/', (req, res) => {
    res.json({mssg: 'GET all cards'})
})

// GET a single card
router.get('/:cardId', (req, res) => {
    res.json({mssg: 'GET a single card'})
})

// POST a new card
router.post('/', (req, res) => {
    res.json({mssg: 'POST a new card'})
})

// Delete an existing card
router.delete('/:cardId', (req, res) => {
    res.json({mssg: 'DELETE an existing card'})
})

// Update an existing card
router.patch('/:cardId', (req, res) => {
    res.json({mssg: 'UPDATE an existing card'})
})


module.exports = router