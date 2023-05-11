import axios from 'axios';
import { API_URL } from "./config";

export async function deleteDeck(id: string) {
    const res = await axios.delete(`${API_URL}/decks/${id}`);
    return res;
}