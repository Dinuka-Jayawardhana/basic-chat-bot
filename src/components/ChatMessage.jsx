// Import React library
import React from 'react'
// Import ChatbotIcon component
import ChatbotIcon from './ChatbotIcon'

// ChatMessage component - displays a single chat message (user or bot)
function ChatMessage({ chat }) {
  return (
    <div>
      {/* Message container with dynamic class based on message role */}
      {/* If role is 'model' (bot), apply 'bot-message' class, otherwise 'user-message' */}
      <div className={`message ${chat.role === 'model' ? 'bot-message' : 'user-message'}`}>
        {/* Display chatbot icon only for bot messages */}
        {chat.role === 'model' && <ChatbotIcon />}
        {/* Display the message text */}
        <p className="message-text">{chat.text}</p>
      </div>
    </div>
  )
}

// Export ChatMessage component as default export
export default ChatMessage
