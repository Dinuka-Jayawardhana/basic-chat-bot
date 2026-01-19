# Basic Chat UI

A modern, responsive chatbot interface built with **React** and powered by the **OpenAI API**. This project features a floating chat toggle button, smooth animations, and a clean, user-friendly design.

## 🚀 Features

-   **OpenAI GPT-3.5-Turbo**: Powered by OpenAI's advanced chat completion model for intelligent responses.
-   **Floating Toggle Button**: A sleek, circular button to easily show or hide the chat window.
-   **Auto-Scrolling**: Automatically scrolls to the latest message for a seamless chat experience.
-   **Real-time "Thinking" Indicator**: Provides visual feedback while the bot is generating a response.
-   **Error Handling**: Graceful handling of API errors, including rate limits (429 errors) with user-friendly messages.
-   **Custom UI Components**: Built with modular components like `ChatForm`, `ChatMessage`, and `ChatbotIcon`.
-   **Responsive Design**: Optimized for different screen sizes with a clean, modern aesthetic.

## 🛠️ Tech Stack

-   **Frontend**: React (Vite)
-   **API**: OpenAI Chat Completions API
-   **Icons**: React Icons (Bs, Sl, Fi)
-   **Styling**: Plain CSS with modern layout techniques (Flexbox)

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Dinuka-Jayawardhana/basic-chat-bot-ui.git
    cd basic-chat-ui
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory and add your OpenAI credentials:
    ```env
    VITE_API_URL=https://api.openai.com/v1/chat/completions
    VITE_OPENAI_API_KEY=your_openai_api_key_here
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

## 📂 Project Structure

```text
basic-chat-ui/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ChatForm.jsx    # User input and submission logic
│   │   ├── ChatMessage.jsx # Message bubble rendering
│   │   └── ChatbotIcon.jsx # Custom robot icon component
│   ├── App.jsx             # Main application and API logic
│   ├── App.css             # Root styles and layout
│   └── main.jsx            # Application entry point
├── .env                    # Environment variables (API keys)
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

### Component Details:
-   **App.jsx**: Handles the core state, OpenAI API integration, and overall layout.
-   **ChatForm.jsx**: Captures user input and triggers the message sending process.
-   **ChatMessage.jsx**: Displays messages with role-based formatting (user vs bot).
-   **ChatbotIcon.jsx**: A versatile icon component used in headers and message bubbles.
-   **App.css**: Contains all the design tokens, animations, and responsive layout rules.

