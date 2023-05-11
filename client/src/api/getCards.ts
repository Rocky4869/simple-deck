import axios from "axios";
import { API_URL } from "./config";

export async function getCards(id: string) {
    const res = await axios.get(`${API_URL}/decks/${id}`); // get all decks
    return res;
}