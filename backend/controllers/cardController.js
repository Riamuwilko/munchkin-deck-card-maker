const Card = require('../models/cardModel')
const Deck = require('../models/deckModel')
const mongoose = require('mongoose')

// Get all Cards
const getCards = async (req, res) => {
    const cards = await Card.find({}).sort({createdAt: -1})
    res.status(200).json(cards)
}

// Get a single card
const getSingleCard = async (req, res) => {
    const {cardId} = req.params;

    // Validate id
    if (!mongoose.Types.ObjectId.isValid(cardId)){
        return res.status(404).json({error: 'No such card'})
    }
    const card = await Card.findById(cardId)
    if (!card) {
        return res.status(404).json({error: 'No such card'})
    }
    res.status(200).json(card)
}

// Post a new card
const createCard = async (req, res) => {
    const {title, level, ability} = req.body;
    const {deckId} = req.params;

    // Validate deckId
    if (!mongoose.Types.ObjectId.isValid(deckId)) {
        return res.status(404).json({ error: 'No such deck' });
    }

    // add doc to db
    try {

        // Create Card 
        const card = await Card.create({title, level, ability, deck: deckId});

        // Update the Deck
        await Deck.findByIdAndUpdate(
            deckId,
            { $push: { cards: card._id } },
            { new: true, useFindAndModify: false }
        );

        res.status(200).json(card);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// Delete an existing card
const deleteCard = async (req, res) => {
    const {cardId} = req.params;

    // Validate id
    if (!mongoose.Types.ObjectId.isValid(cardId)){
        return res.status(404).json({error: 'No such card'})
    }
    try {
        // Find and delete the card
        const card = await Card.findByIdAndDelete(cardId);

        if (!card) {
            return res.status(404).json({ error: 'No such card' });
        }

        // Update the deck to remove the card
        await Deck.findByIdAndUpdate(
            card.deck,
            { $pull: { cards: card._id } },
            { new: true, useFindAndModify: false }
        );

        res.status(200).json(card);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an existing card
const updateCard = async (req, res) => {
    const {cardId} = req.params;

    // Validate id
    if (!mongoose.Types.ObjectId.isValid(cardId)){
        return res.status(404).json({error: 'No such card'})
    }

    // Update card
    const card = await Card.findOneAndUpdate({_id: cardId},
        {...req.body
    })

    if (!card) {
        return res.status(404).json({error: 'No such card'})
    }
    res.status(200).json(card)
}


module.exports = {
    createCard,
    getCards,
    getSingleCard,
    deleteCard,
    updateCard,
}