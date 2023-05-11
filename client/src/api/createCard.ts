import axios from "axios";
import { API_URL } from "./config";

export async function createCard(id: string, title: string, description: string) {
    const res = await axios.post(`${API_URL}/decks/${id}/cards`, {
        title,
        description,
      }); // create new card
  return res;
}