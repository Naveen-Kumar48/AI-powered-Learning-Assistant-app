import React, { useEffect, useState, useRef } from 'react'
import { Send, MessageSquare, Sparkles } from 'lucide-react'
import { useParams } from 'react-router-dom'
import aiService from "../../Services/aiService"
import toast from 'react-hot-toast'
import { useAuth } from "../../components/context/AuthContext"
import Spinner from "../common/Spinner"
import MarkdownRenderer from "../common/MarkdownRenderer"


const ChatInterface = () => {
    const { id: docuemntId } = useParams();
    const { user } = useAuth();
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const messageEndRef = useRef(null);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                setInitialLoading(true);
                const response = await aiService.getChatHistory(docuemntId);
                setHistory(response.data);
            } catch (error) {
                console.error("Failed to fetch chat history:", error);
            } finally {
                setInitialLoading(false);
            }
        }
        fetchChatHistory();
    }, [docuemntId]);

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        const userMessage = { role: "user", content: message, timestamp: new Date() };
        setHistory((prev) => [...prev, userMessage]);
        setMessage("");
        setLoading(true);
        try {
            const response = await aiService.sendMessage(docuemntId, userMessage.content);
            const assistantMessage = {
                role: "assistant", content: response.data.answer,
                timestamp: new Date(),
                relevantChunks: response.data.relevantChunks
            };
            setHistory((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            toast.error("Failed to send message");
            const errorMessage = {
                role: "assistant",
                content: "Sorry, I'm having trouble understanding you. Please try rephrasing your question.",
                timestamp: new Date()
            };
            setHistory((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    }
    const renderMessage = (message, index) => {
       const isUser = message.role === "user";
       return (
        <div key={index} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            {!isUser && (
                <div className=''>
                    <Sparkles className='w-6 h-6 text-emerald-600' strokeWidth={2} />
                </div>
            )}
            <div className={`max-w-[80%] p-3 rounded-lg ${
                isUser 
                ? "bg-blue-500 text-white" 
                : "bg-gray-200"}`}>
                    {isUser ? (
                        <p>{message.content}</p>
                    ) : (
                        <MarkdownRenderer content={message.content} />
                    )}
            </div>
        </div>
       )
       {isUser && (
        <div className=''>
           {user?.username?.charAt(0).toUpperCase()||'U'}
        </div>
       )}
    };

    if (initialLoading) {
        return (
            <div className="flex flex-col h-[70vh] bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl items-center justify-center shadow-xl shadow-slate-200/50">
                <div className='h-14 w-14 rounded-2xl bg-linear-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4    '>
                    <MessageSquare className=' w-7 h-7 text-emerald-600' strokeWidth={2} />

                </div>
                <Spinner />
                <p className='text-sm text-slate-500 mt-3  font-medium '>Loading chat history...</p>
            </div>
        )
    }

    return (
        <div className=''>
            {/* Message Area */}
            <div className=''>
                {history.length === 0 ? (
                    <div className=''>
                        <div className=''>
                            <MessageSquare className='w-10 h-10 text-emerald-600' strokeWidth={2} />
                        </div>
                        <h3 className='text-2xl font-bold text-slate-800 mb-2'>Start a conversation</h3>
                        <p className='text-slate-500'>Ask me anything about your document!</p>
                    </div>
                ) : (
                    history.map(renderMessage)
                )}
                <div ref={messageEndRef} />
                {
                    loading && (
                        <div className='flex justify-start'>
                            <div className='flex items-center space-x-2 bg-gray-200 p-3 rounded-lg'>
                                <Spinner className='w-4 h-4 text-emerald-600' strokeWidth={2} />
                                <p className='text-sm text-slate-500'>AI is typing...</p>
                            </div>
                            <div className=''>
                                <div className=''>
                                    <span className='' style={{ animationDelay: '0ms' }}></span>
                                    <span className='' style={{ animationDelay: '150ms' }}></span>
                                    <span className='' style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        </div>
                    )}
            </div>

            {/* Input Area */}
            <div className='p-5 border-t border-slate-200/60 bg-white/80'>
                <form onSubmit={handleSendMessage} className='flex items-center gap-3'>
                    <input type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder='Ask a question about your document...'
                        disabled={loading}
                        className='flex-1 p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/80 backdrop-blur-xl shadow-sm shadow-slate-200/50 transition-all duration-200 placeholder:text-slate-400' />
                    <button type='submit'
                        disabled={loading || !message.trim()}
                        className='shrink-0 p-3 bg-linear-to-br from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0'
                    >
                        <Send className='w-5 h-5' strokeWidth={2} />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatInterface