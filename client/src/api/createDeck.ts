import axios from "axios";
import { API_URL } from "./config";

export async function createDeck(deckTitle: string) {
    const res = await axios.post(`${API_URL}/decks`, {
        // create new deck
        title: deckTitle,
      });
    return res;
}
