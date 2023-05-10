import axios from 'axios';
import { API_URL } from "./config";

export async function getDecks() {
    const res = await axios.get(`${API_URL}/decks`);
    return res;
}