import React, { useState, useEffect, useRef } from 'react';

// --- SVG Icon Components ---
const CloseIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const HeartIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const SendIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

const AiAvatar = () => (
    <div className="w-10 h-10 rounded-full flex-shrink-0 bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5V3" /><path d="M12 13v-3" /><path d="M12 21v-3" /><path d="M19 12h2" /><path d="M5 12H3" /><path d="M17 17l-1-1" /><path d="M8 8l-1-1" /><path d="M17 7l-1 1" /><path d="M8 16l-1 1" /><path d="M9 13a3 3 0 1 0 0-6" /><path d="M15 13a3 3 0 1 0 0-6" /><path d="M9 10h6" /></svg>
    </div>
);


// --- Main App Component ---
export default function App() {
  const [progress, setProgress] = useState(20);
  const [logicPoints, setLogicPoints] = useState(5);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      sender: 'ai', 
      text: "Welcome! Let's begin the debate. The topic is: 'Is remote work more effective than in-office work?' Please present your opening argument." 
    }
  ]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (userInput.trim() === '') return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setProgress(p => Math.min(p + 15, 100));

    // Simulate AI response
    setTimeout(() => {
        const aiResponses = [
            "That's an interesting point. However, have you considered the impact on team collaboration and spontaneous innovation?",
            "I understand your perspective, but data from a 2023 Stanford study suggests otherwise. How do you reconcile your argument with that?",
            "Could you elaborate on that? What specific evidence supports that claim?",
            "An excellent argument. You've strengthened your position significantly. My next point is..."
        ];
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        setMessages(prev => [...prev, { sender: 'ai', text: randomResponse }]);

        // Randomly decide if user loses a point
        if (Math.random() > 0.6) {
            setLogicPoints(p => Math.max(p - 1, 0));
        }
    }, 1500);
  };

  return (
    <div className="bg-gray-900 text-white font-sans antialiased flex flex-col h-screen max-w-4xl mx-auto">
      {/* Header */}
      <header className="py-4 px-4 sm:px-6 w-full">
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-white">
            <CloseIcon className="w-7 h-7" />
          </button>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div 
              className="bg-blue-500 h-4 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <HeartIcon className="w-6 h-6 text-red-500" />
            <span className="font-bold text-lg text-red-500">{logicPoints}</span>
          </div>
        </div>
      </header>

      {/* Main Chat/Argument Area */}
      <main className="flex-grow p-4 sm:p-6 overflow-y-auto">
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'ai' && <AiAvatar />}
              <div className={`max-w-md p-4 rounded-2xl ${msg.sender === 'ai' ? 'bg-gray-800 rounded-bl-lg' : 'bg-blue-600 text-white rounded-br-lg'}`}>
                <p className="text-base">{msg.text}</p>
              </div>
            </div>
          ))}
           <div ref={chatEndRef} />
        </div>
      </main>

      {/* Footer Input Area */}
      <footer className="p-4 sm:p-6 border-t-2 border-gray-800">
        <form onSubmit={handleSendMessage} className="space-y-4">
            <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your argument..."
                className="w-full p-4 bg-gray-800 border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition-colors"
                rows="3"
            ></textarea>
            <div className="flex items-center justify-between">
                <button type="button" className="font-bold text-gray-500 hover:text-white transition-colors px-6 py-3 rounded-xl">
                    SKIP
                </button>
                <button 
                    type="submit"
                    disabled={!userInput.trim()}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105"
                >
                    SUBMIT
                    <SendIcon className="w-5 h-5" />
                </button>
            </div>
        </form>
      </footer>
    </div>
  );
}
