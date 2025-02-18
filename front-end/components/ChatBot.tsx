"use client";

import { useState } from "react";
import {
  FiMessageCircle,
  FiSend,
  FiMic,
  FiMicOff,
  FiX,
  FiTrash2,
  FiVolumeX,
  FiVolume2,
} from "react-icons/fi";
import { handleChatbotMessage } from "../../back/controllers/routingUtils"; // Adjust the import path as needed

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isMuted, setIsMuted] = useState(false); // New state for mute
  const language = "en-US";

  let recognition: SpeechRecognition | undefined;
  let SpeechSynthesis: SpeechSynthesis | undefined;

  if (typeof window !== "undefined") {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    SpeechSynthesis = window.speechSynthesis;

    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = language;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsActive(false);
      };

      recognition.onspeechend = () => {
        recognition?.stop();
        setIsActive(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsActive(false);
      };
    } else {
      console.error("SpeechRecognition API is not supported in this browser.");
    }
  }

  // Function to speak the response using SpeechSynthesis
  const speak = (text: string) => {
    if (SpeechSynthesis && !isMuted) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      SpeechSynthesis.speak(utterance);
    }
  };

  const handleOnRecord = () => {
    if (isActive) {
      recognition?.stop();
      closeSynthesis();
    } else {
      recognition?.start();
    }
    setIsActive(!isActive);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    closeSynthesis();
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (message.trim() !== "") {
      // Add user message to chat history
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { sender: "user", text: message },
      ]);

      try {
        const response = await fetch("http://localhost:3002/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        const data = await response.json();
        console.log("Bot response:", data.response);

        // Add bot response to chat history
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { sender: "bot", text: data.response },
        ]);

        // Speak the response if not muted
        speak(data.response);
      } catch (error) {
        console.error("Error sending message:", error);
      }
      const response = handleChatbotMessage(message); // Handle command
      if (response.startsWith("navigate:")) {
        // Extract URL and navigate
        const url = response.replace("navigate:", "").trim();
        window.location.href = url;
        return; // Skip adding bot response to chat history
      }
      // Clear the input field
      setMessage("");
    }
  };

  const closeSynthesis = () => {
    if (SpeechSynthesis) {
      SpeechSynthesis.cancel();
    }
  };

  const clearChatHistory = () => {
    setChatHistory([]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    closeSynthesis();
  };

  return (
    <div className="fixed bottom-6 right-10 z-50">
      {isOpen ? (
        <div className="bg-gradient-to-br from-white to-gray-100 shadow-2xl rounded-lg p-6 w-80 h-96 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl text-gray-800">Request Bot</h2>
            <button
              onClick={toggleChat}
              className="text-gray-500 hover:text-gray-700 transition-transform transform hover:scale-110"
            >
              <FiX size={24} />
            </button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto bg-white rounded-lg shadow-inner">
            {chatHistory.length === 0 ? (
              <p className="text-center text-gray-500">What can I help with?</p>
            ) : (
              chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`${chat.sender === "user" ? "bg-blue-500" : "bg-gray-500"
                      } text-white p-2 rounded-lg max-w-xs mt-2`}
                  >
                    <p>{chat.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-4 flex items-center border-t pt-2 ">
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="Type your message..."
              className="flex-grow p-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={sendMessage}
              className="m-2 p-2 bg-blue-600 text-white text-center items-center rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 focus:outline-none"
            >
              <FiSend size={20} />
            </button>
            <button
              className="m-2 p-2 bg-blue-600 text-white text-center items-center justify-center rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 focus:outline-none"
              onClick={handleOnRecord}
            >
              {isActive ? <FiMic size={20} /> : <FiMicOff size={20} />}
            </button>
            <button
              onClick={clearChatHistory}
              className="m-2 p-2 bg-red-600 text-white text-center items-center rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 focus:outline-none"
            >
              <FiTrash2 size={20} />
            </button>
            <button
              onClick={toggleMute}
              className={`m-2 p-2 text-white text-center items-center rounded-lg ${isMuted
                  ? "bg-gray-600 hover:bg-gray-700"
                  : "bg-blue-600 hover:bg-blue-700"
                } transition-all transform hover:scale-105 focus:outline-none`}
            >
              {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full shadow-xl hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-700 transition-transform transform hover:scale-105 focus:outline-none"
        >
          <FiMessageCircle size={28} />
        </button>
      )}
    </div>
  );
}
