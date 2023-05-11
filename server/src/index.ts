import express, {Request, Response} from 'express';
import mongoose from 'mongoose';  
import dotenv from 'dotenv';
import cors from 'cors';
import Deck from './models/Deck';
const app = express(); // create express app
dotenv.config();

app.use(express.json()); // use express json middleware to parse json body
app.use(cors({origin: "*"})); // use cors middleware to allow cross origin resource sharing

app.get('/', (req: Request, res:Response) => {  // root endpoint
    res.send('Hello World');
});

app.post('/decks', async (req: Request, res:Response) => { // create a new deck
    const newDeck = new Deck({
        title: req.body.title, 
    });
    const createdDeck = await newDeck.save() // save the deck to the database
    res.json(createdDeck); // return the deck in the response
});

app.get('/decks', async (req: Request, res:Response) => { // get all decks
    const decks = await Deck.find({}); // find all decks in the database
    res.json(decks); // return the decks in the response
});

app.delete('/decks/:id', async (req: Request, res:Response) => { // delete a deck
    const deletedDeck = await Deck.findByIdAndDelete(req.params.id); // find the deck by id and delete it
    res.json("successfully deleted the deck"); // return the deleted deck in the response
});

app.post('/decks/:id/cards', async (req: Request, res:Response) => { // create a new card
    const newCard = req.body;
    const deck = await Deck.findById(req.params.id); // find the deck by id
    if (deck) {
        deck.cards.push(newCard); // push the card to the deck
        const updatedDeck = await deck.save(); // save the deck to the database
        res.json(updatedDeck); // return the updated deck in the response
    } else {
        res.status(404); // if the deck is not found
        throw new Error('Deck not found'); // throw an error
    }
});

app.get('/decks/:id', async (req: Request, res:Response) => { // get all cards in a deck
    const deck = await Deck.findById(req.params.id); // find the deck by id
    if (deck) {
        res.json(deck); // return the cards in the response
    } else {
        res.status(404); // if the deck is not found
        throw new Error('Deck not found'); // throw an error
    }
});

app.delete('/decks/:id/:index', async (req: Request, res:Response) => { // delete a card
    const deck = await Deck.findById(req.params.id); // find the deck by id
    if (deck) {
        deck.cards.splice(parseInt(req.params.index), 1); // remove the card from the deck
        const updatedDeck = await deck.save(); // save the deck to the database
        res.json(updatedDeck); // return the updated deck in the response
    } else {
        res.status(404); // if the deck is not found
        throw new Error('Deck not found'); // throw an error
    }
});

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://rockytam4869:${process.env.DATABASE_PASSWORD}@cluster0.xihgmtm.mongodb.net/?retryWrites=true&w=majority`)
        app.listen(3000); // start express server on port 5000
    } catch (err) {
      console.log('Failed to connect to MongoDB', err)
    }
  }

(async () => {
    await connectDB();
}
)();

