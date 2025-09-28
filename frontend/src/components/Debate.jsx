import React, { useState, useEffect, useRef } from 'react';

// Helper function to clean strings from the API
const cleanString = (str) => {
    if (typeof str !== 'string') return str;
    // Replace newline characters with a space and remove stray backslashes
    return str.replace(/\\n/g, ' ').replace(/\\/g, '').trim();
};

// Component to inject global CSS for scrollbar styling
const GlobalStyles = () => (
    <style>{`
        /* Custom Scrollbar Styling for Webkit Browsers */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #1f2840; 
        }
        ::-webkit-scrollbar-thumb {
            background-color: #4a5568;
            border-radius: 20px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background-color: #718096;
        }
    `}</style>
);

// Main App Component
export default function App() {
    return (
        <div className="bg-[#131a29] h-screen text-white font-sans flex">
            <GlobalStyles />
            <Sidebar />
            <MainContent />
            <RightSidebar />
        </div>
    );
}

// ========== ICONS (SVG Components) ==========
const LearnIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/></svg>
);
const LeaderboardsIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 16V8"/><path d="M12 16v-5"/><path d="M17 16v-8"/></svg>
);
const QuestsIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);
const ProfileIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const MoreIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
);
const SendIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

// ========== LEFT SIDEBAR COMPONENTS ==========
function Sidebar() {
    const navItems = [
        { icon: <LearnIcon />, label: 'DEBATE', active: true },
        { icon: <LeaderboardsIcon />, label: 'LEADERBOARDS' },
        { icon: <QuestsIcon />, label: 'QUESTS' },
        { icon: <ProfileIcon />, label: 'PROFILE' },
        { icon: <MoreIcon />, label: 'MORE' },
    ];
    return (
        <aside className="w-64 px-4 py-6 border-r border-gray-700 flex flex-col space-y-4">
            <h1 className="text-3xl font-bold text-green-400 pl-4">ArgueAI</h1>
            <nav className="flex-grow">
                <ul>
                    {navItems.map((item, index) => (
                        <NavItem key={index} icon={item.icon} label={item.label} active={item.active} />
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

function NavItem({ icon, label, active = false }) {
    return (
        <li className={`flex items-center space-x-4 p-3 rounded-xl cursor-pointer hover:bg-gray-700/50 ${active ? 'bg-gray-700/80 border border-gray-600' : ''}`}>
            {icon}
            <span className="font-bold text-sm tracking-wider">{label}</span>
        </li>
    );
}

// ========== MAIN CONTENT COMPONENTS ==========
function DebateResultsPopup({ stats, onPlayAgain }) {
    if (!stats || stats.error) {
        return (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
                <div className="bg-[#1f2840] border border-gray-700 rounded-xl p-8 max-w-lg w-full text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
                    <p className="text-gray-300 mb-6">{stats?.error || "An unknown error occurred while fetching results."}</p>
                    <button onClick={onPlayAgain} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
                        Play Again
                    </button>
                </div>
            </div>
        );
    }
    const { winner, reason, scores } = stats;
    if (!scores || !scores.user || !scores.opponent) {
        return (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
                <div className="bg-[#1f2840] border border-gray-700 rounded-xl p-8 max-w-lg w-full text-center">
                    <h2 className="text-2xl font-bold text-yellow-500 mb-4">Incomplete Data</h2>
                    <p className="text-gray-300 mb-6">The debate results received from the server were malformed.</p>
                    <button onClick={onPlayAgain} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
                        Play Again
                    </button>
                </div>
            </div>
        );
    }
    const isUserWinner = winner === 'user';
    const ScoreRow = ({ metric, userScore, opponentScore }) => (
        <React.Fragment>
            <div className="font-bold capitalize text-gray-300 text-left">{metric}</div>
            <div className={`text-xl font-bold ${userScore > opponentScore ? 'text-green-400' : userScore < opponentScore ? 'text-red-400' : ''}`}>
                {userScore}
            </div>
            <div className={`text-xl font-bold ${opponentScore > userScore ? 'text-green-400' : opponentScore < userScore ? 'text-red-400' : ''}`}>
                {opponentScore}
            </div>
        </React.Fragment>
    );
    return (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 p-4">
            <div className="bg-[#1f2840] border border-gray-700 rounded-xl p-4 max-w-xl w-full">
                <h2
                    className={`text-3xl font-bold text-center mb-1 ${
                        isUserWinner ? "text-green-400" : "text-red-400"
                    }`}
                >
                    {isUserWinner ? "You Won! 🎉" : "You Lost 😔"}
                </h2>
                <p className="text-center text-gray-400 mb-4 text-base">{reason}</p>

                <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-center mb-4 bg-[#131a29]/50 p-3 rounded-lg">
                    <div className="font-bold text-gray-400 uppercase text-left text-sm">
                        Metric
                    </div>
                    <div className="font-bold">You</div>
                    <div className="font-bold">Opponent</div>
                    <div className="col-span-3 h-px bg-gray-700 my-1"></div>

                    <ScoreRow
                        metric="Reasoning"
                        userScore={scores.user.reasoning}
                        opponentScore={scores.opponent.reasoning}
                    />
                    <ScoreRow
                        metric="Clarity"
                        userScore={scores.user.clarity}
                        opponentScore={scores.opponent.clarity}
                    />
                    <ScoreRow
                        metric="Evidence"
                        userScore={scores.user.evidence}
                        opponentScore={scores.opponent.evidence}
                    />
                    <ScoreRow
                        metric="Persuasiveness"
                        userScore={scores.user.persuasiveness}
                        opponentScore={scores.opponent.persuasiveness}
                    />

                    <div className="col-span-3 h-px bg-gray-700 my-1"></div>
                    <div className="font-bold capitalize text-gray-300 text-left text-base">
                        Total
                    </div>
                    <div
                        className={`text-xl font-bold ${
                            scores.user.total > scores.opponent.total ? "text-green-400" : ""
                        }`}
                    >
                        {scores.user.total}
                    </div>
                    <div
                        className={`text-xl font-bold ${
                            scores.opponent.total > scores.user.total ? "text-green-400" : ""
                        }`}
                    >
                        {scores.opponent.total}
                    </div>
                </div>

                <div className="text-center">
                    <button
                        onClick={onPlayAgain}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-base"
                    >
                        Play Again
                    </button>
                </div>
            </div>
        </div>
    );
}

function MainContent() {
    const [topic, setTopic] = useState('Loading topic...');
    const [debateId, setDebateId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [turnsLeft, setTurnsLeft] = useState(5);
    const [debateStats, setDebateStats] = useState(null);
    const chatEndRef = useRef(null);
    const startNewDebate = async () => {
        setTopic('Loading new topic...');
        setDebateId(null);
        setMessages([]);
        setTurnsLeft(5);
        setDebateStats(null);
        setIsSending(false);
        try {
            const engineeredPrompt = "The following is the topic you will be arguing the opposite position that the user: Should phones be allowed in class?";
            const response = await fetch('http://127.0.0.1:8000/debate/start', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({topic: engineeredPrompt}),
            });
            if (!response.ok) throw new Error(`Network response was not ok (${response.status})`);
            const data = await response.json();
            // **Clean the topic string**
            setTopic(cleanString(data.topic));
            setDebateId(data.debate_id);
        } catch (error) {
            console.error("Failed to fetch new debate topic:", error);
            setTopic('Failed to load topic. Is the server running?');
        }
    };
    useEffect(() => {
        startNewDebate();
    }, []);
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);
    useEffect(() => {
        if (turnsLeft === 0 && debateId && !debateStats) {
            const judgeDebate = async () => {
                try {
                    const response = await fetch('http://127.0.0.1:8000/debate/judge', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({debate_id: debateId}),
                    });
                    if (!response.ok) throw new Error('Failed to get debate stats');
                    const data = await response.json();

                    // **Clean the reason string before setting state**
                    if (data && data.reason) {
                        data.reason = cleanString(data.reason);
                    }
                    setDebateStats(data);
                } catch (error) {
                    console.error("Failed to judge debate:", error);
                    setDebateStats({ error: "Could not retrieve debate results." });
                }
            };
            setTimeout(judgeDebate, 1000);
        }
    }, [turnsLeft, debateId, debateStats]);
    const handleSendMessage = async (userMessage) => {
        if (!userMessage.trim() || !debateId || turnsLeft <= 0) return;
        setIsSending(true);
        const newUserMessage = { text: userMessage, sender: 'user' };
        setMessages(prev => [...prev, newUserMessage]);
        setTurnsLeft(prev => prev - 1);
        try {
            const response = await fetch('http://127.0.0.1:8000/debate/turn', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    debate_id: debateId,
                    content: userMessage,
                }),
            });
            if (!response.ok) throw new Error('Failed to get opponent response');
            const data = await response.json();

            // **Parse the inner JSON and clean the argument text**
            const opponentResponse = JSON.parse(data.opponent_content);
            const cleanedText = cleanString(opponentResponse.counter_argument);
            const opponentMessage = { text: cleanedText, sender: 'opponent' };
            setMessages(prev => [...prev, opponentMessage]);
        } catch (error) {
            console.error('Error during debate turn:', error);
            const errorMessage = { text: "Sorry, I couldn't get a response. Please try again.", sender: 'opponent' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsSending(false);
        }
    };
    return (
        <main className="flex-1 flex flex-col relative">
            {debateStats && <DebateResultsPopup stats={debateStats} onPlayAgain={startNewDebate} />}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
                <div className="w-full max-w-2xl">
                    <div className="flex items-center justify-between bg-[#1f2840] border border-gray-700 text-white p-4 rounded-xl mb-6">
                        <div className='flex-grow'>
                            <p className="text-xs font-bold text-gray-400 uppercase">Debate Topic</p>
                            <h2 className="text-xl font-bold">{topic}</h2>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                            <p className="text-xs font-bold text-gray-400 uppercase">Turns Left</p>
                            <p className="text-2xl font-bold">{turnsLeft}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <MessageBubble key={index} message={msg} />
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                </div>
            </div>
            <ChatInput debateId={debateId} onSendMessage={handleSendMessage} isSending={isSending} turnsLeft={turnsLeft} />
        </main>
    );
}

function MessageBubble({ message }) {
    const isUser = message.sender === 'user';
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md px-4 py-2 rounded-2xl ${isUser ? 'bg-blue-600' : 'bg-[#2a3958]'}`}>
                <p>{message.text}</p>
            </div>
        </div>
    );
}

function ChatInput({ debateId, onSendMessage, isSending, turnsLeft }) {
    const [message, setMessage] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!message.trim() || isSending) return;
        await onSendMessage(message);
        setMessage('');
    };
    const isInputDisabled = !debateId || isSending || turnsLeft <= 0;
    return (
        <div className="px-8 pb-4">
            <form className="w-full max-w-2xl mx-auto flex items-center gap-2" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={
                        !debateId ? "Waiting for debate to start..."
                            : turnsLeft === 0 ? "The debate is over. See your results."
                                : "Type your argument..."
                    }
                    className="flex-grow bg-[#1f2840] border border-gray-600 rounded-full px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isInputDisabled}
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    disabled={!message.trim() || isInputDisabled}
                >
                    <SendIcon />
                </button>
            </form>
        </div>
    );
}

function RightSidebar() {
    return (
        <aside className="w-96 px-6 py-4 space-y-6 hidden lg:block">
            <div className="bg-[#1f2840] rounded-2xl p-4 border border-gray-700">
                <h3 className="font-bold text-lg">Leaderboards</h3>
                <div className="flex items-center mt-3">
                    <img src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/192181672ada150becd83a74a4266ae9.svg" alt="Bronze League Badge" className="w-16 h-16 mr-4" />
                    <div>
                        <p className="font-bold">Better luck next time!</p>
                        <p className="text-sm text-gray-400">You finished #29 and dropped down in the Bronze League.</p>
                    </div>
                </div>
                <button className="w-full mt-4 bg-gray-600/50 hover:bg-gray-700 text-blue-300 font-bold py-2 px-4 rounded-xl border-b-4 border-gray-800 uppercase text-sm">
                    Go to Leaderboards
                </button>
            </div>
            <div className="bg-[#1f2840] rounded-2xl p-4 border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Daily Quests</h3>
                    <a href="#" className="text-blue-400 font-bold text-sm uppercase">View all</a>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="w-[60px] h-[60px] p-2 rounded-lg flex items-center justify-center">
                        <img
                            src="https://d35aaqx5ub95lt.cloudfront.net/images/goals/2b5a211d830a24fab92e291d50f65d1d.svg"
                            alt=""/>
                    </div>
                    <div className="flex-1">
                        <p className="font-bold">Earn 10 XP</p>
                        <div className="relative w-full bg-gray-600 rounded-full h-5 mt-1">
                            <div className="bg-yellow-400 h-5 rounded-full" style={{width: '0%'}}></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-sm font-bold text-white">0/10</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}