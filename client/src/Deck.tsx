import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const Deck = () => {
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/decks"); // get all decks
        console.debug(res.data);
        setDecks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDecks();
  }, []);
  return (
    <div>
      <h1>Decks</h1>
      <ul>
        {decks.map((deck: any) => {
          return <li key={deck._id}>{deck.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Deck;
