import mongoose from 'mongoose';
const { Schema } = mongoose;

const DeckSchema = new Schema({ // create mongoose schema
    title: String,
});

const Model = mongoose.model('Deck', DeckSchema); // create mongoose model

export default Model;