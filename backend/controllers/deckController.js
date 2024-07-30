const Deck = require('../models/deckModel')
const Card = require('../models/cardModel')
const mongoose = require('mongoose')

// Get all decks
const getDecks = async (req, res) => {
    const decks = await Deck.find({}).sort({createdAt: -1})
    res.status(200).json(decks)
}

// Get a single deck
const getSingleDeck = async (req, res) => {
    const {deckId} = req.params;

    // Validate id
    if (!mongoose.Types.ObjectId.isValid(deckId)){
        return res.status(404).json({error: 'No such deck'})
    }
    const deck = await Deck.findById(deckId)
    if (!deck) {
        return res.status(404).json({error: 'No such deck'})
    }
    res.status(200).json(deck)
}

// Post a new deck
const createDeck = async (req, res) => {
    const {title, author} = req.body;

    // add doc to db
    try {
        const deck = await Deck.create({title, author});
        res.status(200).json(deck);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// Delete an existing deck
const deleteDeck = async (req, res) => {
    const {deckId} = req.params;

    // Validate id
    if (!mongoose.Types.ObjectId.isValid(deckId)){
        return res.status(404).json({error: 'No such deck'})
    }

    // Delete cards in the deck
    await Card.deleteMany({ deck: deckId });

    // Find and delete deck
    const deck = await Deck.findOneAndDelete({_id: deckId})
    if (!deck) {
        return res.status(404).json({error: 'No such deck'})
    }
    res.status(200).json(deck)
};

// Update an existing deck
const updateDeck = async (req, res) => {
    const {deckId} = req.params;

    // Validate id
    if (!mongoose.Types.ObjectId.isValid(deckId)){
        return res.status(404).json({error: 'No such deck'})
    }

    // Update deck
    const deck = await Deck.findOneAndUpdate({_id: deckId}, {
        ...req.body
    })

    if (!deck) {
        return res.status(404).json({error: 'No such deck'})
    }
    res.status(200).json(deck)
};

module.exports = {
    createDeck,
    getDecks,
    getSingleDeck,
    deleteDeck,
    updateDeck,
}