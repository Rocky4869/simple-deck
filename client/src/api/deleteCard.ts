import axios from "axios";
import { API_URL } from "./config";

export async function deleteCard(id: string, index: number) {
    const res = await axios.delete(
        `${API_URL}/decks/${id}/${index}` // delete card
      );
    return res;
}