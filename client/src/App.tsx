import { useEffect, useState, useRef } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { getDecks } from "./api/getDecks";
import { createDeck } from "./api/createDeck";
import { deleteDeck } from "./api/deleteDeck";

type TDeck = {
  // define type for deck
  _id: string;
  title: string;
};

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]); // array of objects

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreateDeck = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const node = inputRef.current;
      if (!node) return;
      const res = await createDeck(node.value); // create new deck
      setDecks((prevDecks) => [...prevDecks, res.data]); // add new deck to state
      node.value = ""; // clear input field
    } catch (err) {
      console.log(err);
    }
  };

  // trigger api to fetch all decks
  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const res = await getDecks(); // get all decks
        setDecks(res.data); // set decks state
      } catch (err) {
        console.log(err);
      }
    };
    fetchDecks();
  }, []);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, []);

  const handleDeleteDeck = async (id: string) => {
    try {
      await deleteDeck(id); // delete deck
      setDecks(decks.filter((deck: TDeck) => deck._id !== id)); // remove deck from state
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleCreateDeck}>
        <label
          style={{
            marginRight: "10px",
          }}
        >
          Deck Title
        </label>
        <input
          type="text"
          name="deckTitle"
          required
          ref={inputRef}
          style={{
            marginRight: "10px",
          }}
        />
        <button type="submit">Create Deck</button>
      </form>
      <div>
        {decks.map((deck: TDeck) => (
          <div key={deck._id} className="decks">
            <button
              onClick={() => handleDeleteDeck(deck._id)}
              className="deckButton"
            >
              X
            </button>
            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
