import axios from "axios";

export async function createChat(msg: string) {
    const response = await axios.post(`http://localhost:8000/chat?msg=${encodeURIComponent(msg)}`)

    console.log("received response from backend" , response.data)
    return response.data
}