import { useState } from "react";

export default function Chat() {
    const [messages, setMessages] = useState<Array<{ sender: string, text: string }>>([]);
    const [input, setInput] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false); 

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true); 

        try {
            const response = await fetch('https://travelplaner.onrender.com/api/trip/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
                credentials: "include",
            });

            const data = await response.json();
            const replyText = typeof data.reply === 'string'
                ? data.reply
                : JSON.stringify(data.reply, null, 2);

            const botMessage = { sender: 'Travel Assistant', text: replyText };

            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsTyping(false);
        }
    };

    const starNew = () => {
        setMessages([]);
        setInput('');
    };

    return (
        <div className='chat-form'>
            <h2>Chat with TravelBot</h2>
            <div className='chat-window'>
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender}`}>
                        <strong>{msg.sender === 'user' ? 'You' : 'TravelBot'}:</strong> {msg.text}
                    </div>
                ))}

                {/* ✅ typing message */}
                {isTyping && (
                    <div className="chat-message TravelBot typing">
                        <strong>TravelBot:</strong> is typing...
                    </div>
                )}
            </div>

            <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
            />
            <button onClick={sendMessage}>Send</button>
            <button onClick={starNew}>New conversation</button>
        </div>
    );
}
