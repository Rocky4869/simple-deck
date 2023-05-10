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

