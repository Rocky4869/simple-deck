import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [deckTitle, setDeckTitle] = useState("");
  const [decks, setDecks] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeckTitle(e.target.value);
  };

  const handleCreateDeck = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:3000/decks", {
        title: deckTitle,
      });
      console.debug(res);
      setDeckTitle("");
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
        setDecks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDecks();
  }, []);

  const handleDeleteDeck = async (id: string) => {
    try {
      const res = await axios.delete(`http://localhost:3000/decks/${id}`);
      console.debug(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleCreateDeck}>
        <label>Deck Title</label>
        <input
          type="text"
          name="deckTitle"
          value={deckTitle}
          onChange={handleChange}
        ></input>
        <button type="submit">Create Deck</button>
      </form>
      <div>
        {decks.map((deck: any) => (
          <div key={deck._id} className="decks">
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            <div>{deck.title}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
