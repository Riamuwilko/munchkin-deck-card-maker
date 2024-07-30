const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deckSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    cards: [{
        type: Schema.Types.ObjectId,
        ref: "Card"
    }]
}, { timestamps: true});

module.exports = mongoose.model('Deck', deckSchema);
