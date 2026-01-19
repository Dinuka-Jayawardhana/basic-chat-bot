import { useState, useRef, useEffect } from 'react'
import './App.css'

import { SlArrowDown } from "react-icons/sl";
import { BsChatDots } from "react-icons/bs";

import ChatForm from './components/ChatForm'
import ChatMessage from './components/ChatMessage'
import ChatbotIcon from './components/ChatbotIcon'


function App() {
  // State to store the conversation history (array of message objects)
  const [chatHistory, setChatHistory] = useState([]);
  // State to track if the bot is currently generating a response
  const [isBotThinking, setIsBotThinking] = useState(false);
  // State to store any error messages
  const [error, setError] = useState(null);
  // State to control chat window visibility (open/closed)
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Ref to access the chat body DOM element for scrolling
  const chatBodyRef = useRef();

  // Async function to generate bot response using OpenAI API
  const generateBotResponse = async (history) => {
    // Set thinking state to true to show "Thinking..." indicator
    setIsBotThinking(true);
    // Clear any previous errors
    setError(null);
    // Log the conversation history for debugging
    console.log("Generating bot response for history:", history);

    // Convert chat history to OpenAI API format
    // Change 'model' role to 'assistant' for OpenAI compatibility
    const messages = history.map(({ role, text }) => ({
      role: role === 'model' ? 'assistant' : role,
      content: text
    }));

    // Configure the API request options
    const requestOptions = {
      method: 'POST', 
      headers: {
        "Content-Type": "application/json", // JSON content type
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}` // API key from environment variable
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // OpenAI model to use
        messages: messages // Conversation history
      })
    }

    try {
      // Get API URL from environment variable
      const apiUrl = import.meta.env.VITE_API_URL;
      // Throw error if API URL is not configured
      if (!apiUrl) throw new Error("VITE_API_URL is not defined");

      // Make API request to OpenAI
      const response = await fetch(apiUrl, requestOptions)
      // Parse JSON response
      const data = await response.json();
      // Check if response is not OK (status code 200-299)
      if (!response.ok) {
        // Handle rate limit error (429 status code)
        if (response.status === 429) {
          throw new Error("You are chatting too fast. Please wait a few seconds.");
        }
        // Throw generic error with API error message
        throw new Error(data.error?.message || 'Error generating response');
      }
      // Log successful API response for debugging
      console.log("API Response Data:", data);

      // Extract the bot's response text from API response
      const apiResponseText = data.choices?.[0]?.message?.content?.trim();
      // Throw error if response structure is invalid
      if (!apiResponseText) throw new Error("Invalid response structure from API");
      // Log the extracted response text
      console.log("API Response Text:", apiResponseText);

      // Add bot's response to chat history
      setChatHistory(prevHistory => [...prevHistory, { role: "model", text: apiResponseText }]);

    } catch (error) {
      // Log error to console for debugging
      console.error("Error fetching bot response:", error);
      // Set error state to display error message to user
      setError(error.message);
    } finally {
      // Always set thinking state to false when done (success or error)
      setIsBotThinking(false);
    }
  };

  // Effect hook to auto-scroll chat to bottom when history changes
  useEffect(() => {
    // Check if chat body ref exists (prevents error when chat is closed)
    if (chatBodyRef.current) {
      // Scroll to bottom of chat body
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight, // Scroll to maximum height
        behavior: 'smooth' // Smooth scrolling animation
      });
    }
  }, [chatHistory]); // Run effect whenever chatHistory changes

  // Render the UI
  return (
    <>
      {/* Conditionally render chat window only when isChatOpen is true */}
      {isChatOpen && (
        <div className="chatbot-popup">
          {/* Chat header with icon, title, and close button */}
          <div className="chat-header">
            <div className="header-info">
              {/* Left side: Icon and title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Chatbot icon with white circle background (isHeader prop) */}
                <ChatbotIcon isHeader={true} />
                {/* Chat title */}
                <div className="logo-text">
                  Chatbot
                </div>
              </div>
              {/* Right side: Close button */}
              <button className="down-arrow-button" onClick={() => setIsChatOpen(false)}>
                <SlArrowDown />
              </button>
            </div>
          </div>
          {/* Chat body containing all messages */}
          <div ref={chatBodyRef} className="chat-body">
            {/* Initial greeting message */}
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">
                Hello! How can I assist you today?
              </p>
            </div>
            {/* Render all messages from chat history */}
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}

            {/* Display error message if error exists */}
            {error && (
              <div className="message bot-message error-message">
                <ChatbotIcon />
                <p className="message-text error-text">
                  {error}
                </p>
              </div>
            )}

            {/* Display "Thinking..." indicator while bot is processing */}
            {isBotThinking && (
              <div className="message bot-message">
                <ChatbotIcon />
                <p className="message-text">
                  Thinking...
                </p>
              </div>
            )}


          </div>

          {/* Chat footer with input form */}
          <div className="chat-footer">
            {/* Pass necessary props to ChatForm component */}
            <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
          </div>
        </div>
      )}

      {/* Floating toggle button (always visible) */}
      <button className="chat-toggle-button" onClick={() => setIsChatOpen(!isChatOpen)}>
        <BsChatDots />
      </button>
    </>
  )
}

// Export App component as default export
export default App
