import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCards } from "./api/getCards";
import { deleteCard } from "./api/deleteCard";
import { createCard } from "./api/createCard";
import { Link } from "react-router-dom";
import "./App.css";

type Card = {
  title: string;
  description: string;
};

const Deck = () => {
  const [cards, setCards] = useState<Card[]>([]); // cards state
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
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
      const res = await createCard(id, title, description); // create new card
      const cards = res.data.cards;
      setCards(cards); // set cards state
      setTitle(""); // reset text
      setDescription(""); // reset text
    } catch (err) {
      console.log(err);
    }
  };

  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(e.target.value);
  };

  return (
    <>
      <Link to={"/"} className="home-button">
        Back to Homepage
      </Link>
      <form onSubmit={handleCreateCard} style={{ marginTop: "40px" }}>
        {/* try to set input of title and input of description */}
        <label style={{ marginRight: "10px", fontSize: "30px" }}>
          Deck - Cards
        </label>
        <div className="card-input-container">
          <div className="card-input">
            <label>Title</label>
            <input
              type="text"
              value={title}
              required
              onChange={(e) => handleTitleChange(e)}
            ></input>
          </div>
          <div className="card-input">
            <label>Description</label>
            <input
              type="text"
              value={description}
              required
              onChange={(e) => handleDescriptionChange(e)}
            ></input>
          </div>
        </div>
        <button
          style={{
            marginLeft: "10px",
            marginTop: "30px",
          }}
          type="submit"
        >
          Create Card
        </button>
      </form>
      {cards.map((card: Card, index: number) => (
        <div key={index} className="cards">
          <div>Title: {card.title}</div>
          <div> Description: {card.description}</div>
          <button
            onClick={() => {
              handleDeleteCard(index);
            }}
            className="cardButton"
          >
            X
          </button>
        </div>
      ))}
    </>
  );
};

export default Deck;
