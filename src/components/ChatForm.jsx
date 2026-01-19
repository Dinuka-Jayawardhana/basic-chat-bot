import { useRef } from 'react';
import { FiArrowUp } from "react-icons/fi";

// ChatForm component - handles user message input and submission
function ChatForm({ chatHistory, setChatHistory, generateBotResponse }) {

  // Create a ref to access the input field DOM element
  const inputRef = useRef();

  // Handle form submission when user sends a message
  const handleFormSubmit = (e) => {
    // Prevent default form submission behavior (page reload)
    e.preventDefault();
    // Get the trimmed value from input field
    const userMessage = inputRef.current.value.trim();
    // If message is empty, do nothing and return
    if (!userMessage) {
      return;
    }
    // Clear the input field after getting the message
    inputRef.current.value = '';
    // Log user message for debugging
    console.log("User Message:", userMessage);

    // Add user message to chat history immediately
    setChatHistory(history => [...history, { role: 'user', text: userMessage }]);

    // Wait 600ms before generating bot response (for better UX)
    setTimeout(() => {
      // Call generateBotResponse with updated history including new user message
      generateBotResponse([...chatHistory, { role: 'user', text: userMessage }]);
    }, 600);
  };


  // Render the chat form UI
  return (
    <div>
      {/* Form element with submit handler */}
      <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
        {/* Text input field for user message */}
        <input ref={inputRef} type="text" className="chat-input" placeholder="Type your message..." required />
        {/* Submit button with up arrow icon */}
        <button className="up-arrow-button">
          <FiArrowUp />
        </button>
      </form>
    </div>
  )
}

// Export ChatForm component as default export
export default ChatForm
