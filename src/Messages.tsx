import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Messages.css";

interface Message {
  text: string;
  timestamp: string;
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      // Simulating API call with mock data
      const mockMessages: Message[] = [
        {
          text: "This is a test broadcast message.",
          timestamp: "2024-08-25T23:30:00Z",
        },
        {
          text: "Test long sample message. Test long sample message 2. Test long sample message 3. Test long sample message. Test long sample message. Test long sample message. Test long sample message. Test long sample message. Test long sample message.",
          timestamp: "2024-08-25T16:00:00Z",
        },
      ];
      setMessages(mockMessages);
    };

    fetchMessages();
  }, []);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-GB", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${month} ${year} ${hours}:${minutes}`;
  };

  return (
    <div className="messages-container">
      <h2 className="messages-title">Broadcast Messages</h2>
      <div className="messages-list">
        {messages.map((message, index) => (
          <div key={index} className="message-item">
            <p className="message-text">{message.text}</p>
            <span className="message-timestamp">
              {formatDateTime(message.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
