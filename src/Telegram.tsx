import React, { useState } from "react";
import axios from "axios";
import "./Telegram.css";

const Telegram = () => {
  const [message, setMessage] = useState("");
  
  const TELEGRAM_API_TOKEN = "7526920561:AAHukgpeBHmBYJVFTCdd-wvtwvc2mKG-his";
  const CHAT_ID = "-1002241058899";

  const sendMessageToTelegram = async (message: string) => {
    const url = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`;

    try {
      const response = await axios.post(url, {
        chat_id: CHAT_ID,
        text: message,
      });
      console.log("Message sent:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const addMessageToPage = (message: string) => {
    const timestamp = new Date().toISOString();
    const storedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    const updatedMessages = [...storedMessages, { text: message, timestamp }];
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessageToTelegram(message);
    addMessageToPage(message);
    setMessage("");
  };

  return (
    <div className="tele-container">
      <h2 className="bc-h2">Create a Broadcast Message</h2>
      <form onSubmit={handleSubmit} className="form">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          className="input-field"
        />
        <button type="submit" className="submit-button-tele">
          Broadcast
        </button>
      </form>
    </div>
  );
};

export default Telegram;
