import React, { useState } from "react";
import axios from 'axios';

const TryTelegram = () => {
  const [message, setMessage] = useState("");

  const TELEGRAM_API_TOKEN = "7526920561:AAHukgpeBHmBYJVFTCdd-wvtwvc2mKG-his";
  const CHAT_ID = "-1002241058899";

  const sendMessageToTelegram = async (message) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessageToTelegram(message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button type="submit">Send to Telegram</button>
    </form>
  );
};

export default TryTelegram;
