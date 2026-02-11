import { useState } from 'react'
import './App.css'
import { createChat } from './api_routers/chat'

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const data = await createChat(input);
      const botMessage: Message = { text: data.response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = { text: "Sorry, something went wrong.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="app-container">
      <h1>ChatBot</h1>
      <div className="chat-container">
        <div className="messages-list">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <div className="message-bubble">
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="message bot">
              <div className="message-bubble">
                typing...
              </div>
            </div>
          )}
        </div>
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            disabled={loading}
          />
          <button onClick={handleSend} disabled={loading || !input.trim()}>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
