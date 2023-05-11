import mongoose from 'mongoose';
const { Schema } = mongoose;

const DeckSchema = new Schema({ // create mongoose schema
    title: String,
    cards: [Object],
});

const Model = mongoose.model('Deck', DeckSchema); // create mongoose model

export default Model;