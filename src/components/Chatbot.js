"use client";

import { useState } from "react";
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages([...messages, { text: input, type: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessages([
        ...messages,
        { text: input, type: "user" },
        { text: data.reply, type: "bot" },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...messages,
        { text: input, type: "user" },
        { text: "Something went wrong, please try again.", type: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="flex flex-col w-full max-w-lg p-5 bg-navy shadow-lg rounded-lg overflow-hidden mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <div className="flex items-center justify-between p-2">
        <button
          onClick={handleNewChat}
          className="flex items-center px-3 py-2 text-sm bg-blue-700 text-white rounded-lg hover:bg-gray-300"
        >
          <ChatBubbleOutlineIcon className="mr-2" />
          New Chat
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.type === "user" ? (
              <PersonIcon className="mr-2 text-blue-500" />
            ) : (
              <RecordVoiceOverIcon className="mr-2 text-gray-500" />
            )}
            <div
              className={`p-2 rounded-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg ${
                msg.type === "user"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-start justify-start">
            <RecordVoiceOverIcon className="mr-2 text-gray-500" />
            <div className="p-2 rounded-lg bg-gray-200 text-gray-600 animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t text-gray-800 border-gray-200">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-1 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
