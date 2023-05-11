import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCards } from "./api/getCards";
import { deleteCard } from "./api/deleteCard";
import { createCard } from "./api/createCard";
import "./App.css";

type Card = {
  title: string;
  description: string;
};

const Deck = () => {
  const [cards, setCards] = useState<Card[]>([]); // cards state
  const [text, setText] = useState<string>("");
  const { id } = useParams(); // get id from url

  useEffect(() => {
    const fetchCards = async () => {
      try {
        if (!id) return;
        const res = await getCards(id); // get cards for deck with id
        const cards = res.data.cards;
        setCards(cards); // set cards state
      } catch (err) {
        console.log(err);
      }
    };
    fetchCards();
  }, [id]);

  const handleDeleteCard = async (index: number) => {
    try {
      if (!id) return;
      const res = await deleteCard(id, index); // delete card
      const cards = res.data.cards;
      setCards(cards); // set cards state
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateCard = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!id) return;
      const title = "hello world";
      const description = text;
      const res = await createCard(id, title, description); // create new card
      const cards = res.data.cards;
      setCards(cards); // set cards state
      setText(""); // reset text
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleCreateCard}>
        <label style={{ marginRight: "10px" }}>Deck - Cards</label>
        <input type="text" value={text} onChange={handleChange}></input>
        <button
          style={{
            marginLeft: "10px",
          }}
          type="submit"
        >
          Create Card
        </button>
      </form>
      {cards.map((card: Card, index: number) => (
        <div
          key={index}
          style={{
            marginTop: "20px",
          }}
        >
          <div>{card.title}</div>
          <div>{card.description}</div>
          <button
            onClick={() => {
              handleDeleteCard(index);
            }}
          >
            X
          </button>
        </div>
      ))}
    </>
  );
};

export default Deck;
