import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [deckTitle, setDeckTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeckTitle(e.target.value);
  };

  const handleCreateDeck = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:3000/decks", {
        title: deckTitle,
      });
      console.debug(res)
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
    </>
  );
}

export default App;
