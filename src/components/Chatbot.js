// import React, { useState } from 'react';
// import '../css/Chatbot.css';
// import chatbotLogo from '../asserts/chatbot.jpg';

// const Chatbot = () => {
//   const [isChatbotOpen, setChatbotOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const toggleChatbot = () => {
//     setChatbotOpen(!isChatbotOpen);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (input.trim()) {
//       const newMessages = [...messages, { sender: 'user', text: input }];
//       setMessages(newMessages);
//       setInput('');
//     }
//   };

//   return (
//     <div>
//       <div className="chatbot-logo" onClick={toggleChatbot}>
//         <img src={chatbotLogo} alt="Chatbot Logo" />
//       </div>
//       {isChatbotOpen && (
//         <div className="chatbot-container">
//           <div className="chat-window">
//             {messages.map((msg, index) => (
//               <div key={index} className={`message ${msg.sender}`}>
//                 {msg.text}
//               </div>
//             ))}
//           </div>
//           <form onSubmit={handleSubmit} className="chat-input">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//             />
//             <button type="submit">Send</button>
//           </form>
//           <button className="close-button" onClick={toggleChatbot}>X</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;

import React, { useState } from 'react';
import axios from 'axios';
import '../css/Chatbot.css';
import chatbotLogo from '../asserts/chatbot.jpg';

const Chatbot = () => {
  const [isChatbotOpen, setChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChatbot = () => {
    setChatbotOpen(!isChatbotOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      // Add user's message to the chat
      const userMessage = { sender: 'user', text: input };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);

      try {
        // Call the API
        const response = await axios.post(
          'https://localhost:7047/Api/AI/AIAssistance',
          null,
          {
            params: { value: input },
          }
        );

        // Add the AI response to the chat
        const botMessage = { sender: 'bot', text: response.data };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error communicating with AI API:', error);
        const errorMessage = { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }

      setInput(''); // Clear input field
    }
  };

  return (
    <div>
      <div className="chatbot-logo" onClick={toggleChatbot}>
        <img src={chatbotLogo} alt="Chatbot Logo" />
      </div>
      {isChatbotOpen && (
        <div className="chatbot-container">
          <div className="chat-window">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
          <button className="close-button" onClick={toggleChatbot}>X</button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

