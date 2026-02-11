import axios from "axios";

export async function createChat(msg: string) {
    const response = await axios.post(`http://localhost:8000/chat?msg=${encodeURIComponent(msg)}`)

    return response.data
}