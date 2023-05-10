import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";

type TDeck = {
  // define type for deck
  _id: string;
  title: string;
};

function App() {
  const [deckTitle, setDeckTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeckTitle(e.target.value);
  };

  const handleCreateDeck = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:3000/decks", { // create new deck
        title: deckTitle,
      });
      setDecks([...decks, res.data]); // add new deck to state
      console.debug(res);
      setDeckTitle(""); // reset deck title
    } catch (err) {
      console.log(err);
    }
  };

  // trigger api to fetch all decks
  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/decks"); // get all decks
        console.debug(res.data);
        setDecks(res.data); // set decks state
      } catch (err) {
        console.log(err);
      }
    };
    fetchDecks();
  }, []);

  const handleDeleteDeck = async (id: string) => {
    try {
      const res = await axios.delete(`http://localhost:3000/decks/${id}`);
      setDecks(decks.filter((deck: TDeck) => deck._id !== id)); // remove deck from state
      console.debug(res);
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
          value={deckTitle}
          onChange={handleChange}
          style={{
            marginRight: "10px",
          }}
        ></input>
        <button type="submit">Create Deck</button>
      </form>
      <div>
        {decks.map((deck) => (
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
