const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const cardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    ability: {
        type: String,
        required: true
    },
    deck: {
        type: Schema.Types.ObjectId,
        ref: "Deck"
    }
});
module.exports = mongoose.model('Card', cardSchema);
