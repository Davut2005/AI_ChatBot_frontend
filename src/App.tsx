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

    console.log("entered to handleSend fn")

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
      <header className="header">
        <h1>Davut GPT</h1>
      </header>
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
                <span className="typing-indicator">typing...</span>
              </div>
            </div>
          )}
        </div>
        <div className="input-container-wrapper">
          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Send a message..."
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading || !input.trim()}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
