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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    // Reset file input value if needed (requires ref but simpler to just clear state here)
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedFile) return;

    console.log("entered to handleSend fn")

    const userMessage: Message = {
      text: input + (selectedFile ? ` (Attached: ${selectedFile.name})` : ''),
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setSelectedFile(null);
    setLoading(true);

    try {
      // TODO: Handle actual file upload to backend
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
          {selectedFile && (
            <div className="file-preview-container">
              <div className="file-preview">
                <span className="file-preview-name">{selectedFile.name}</span>
                <button className="remove-file-btn" onClick={handleRemoveFile} title="Remove file">
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            </div>
          )}
          <div className="input-area">
            <div className="file-input-wrapper">
              <label htmlFor="file-upload" className="file-upload-btn" title="Attach file">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Send a message..."
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading || (!input.trim() && !selectedFile)}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
