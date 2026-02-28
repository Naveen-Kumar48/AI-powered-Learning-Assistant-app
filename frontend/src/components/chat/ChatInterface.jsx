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
            <div key={index} className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                {!isUser && (
                    <div className='shrink-0 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20'>
                        <Sparkles className='w-5 h-5 text-white' strokeWidth={2} />
                    </div>
                )}
                <div className={`max-w-[75%] p-4 rounded-2xl ${isUser
                        ? "bg-emerald-500 text-white rounded-tr-sm shadow-md shadow-emerald-500/10"
                        : "bg-white border border-slate-100 text-slate-800 rounded-tl-sm shadow-md shadow-slate-200/50"}`}>
                    {isUser ? (
                        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    ) : (
                        <MarkdownRenderer content={message.content} />
                    )}
                </div>
                {isUser && (
                    <div className='shrink-0 w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold shadow-sm'>
                        {user?.username?.charAt(0).toUpperCase() || user?.uername?.charAt(0).toUpperCase() || 'U'}
                    </div>
                )}
            </div>
        )
    };

    if (initialLoading) {
        return (
            <div className="flex flex-col h-[70vh] bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl items-center justify-center shadow-xl shadow-slate-200/50">
                <div className='h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4'>
                    <MessageSquare className=' w-7 h-7 text-emerald-600' strokeWidth={2} />
                </div>
                <Spinner />
                <p className='text-sm text-slate-500 mt-3 font-medium'>Loading chat history...</p>
            </div>
        )
    }

    return (
        <div className='flex flex-col h-[75vh] bg-slate-50/50 border border-slate-200 rounded-2xl shadow-sm overflow-hidden'>
            {/* Message Area */}
            <div className='flex-1 overflow-y-auto p-6 space-y-6 relative'>
                {history.length === 0 ? (
                    <div className='flex flex-col items-center justify-center h-full min-h-[40vh] text-center'>
                        <div className='w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner'>
                            <MessageSquare className='w-10 h-10 text-emerald-600' strokeWidth={2} />
                        </div>
                        <h3 className='text-2xl font-bold text-slate-800 mb-2'>Start a conversation</h3>
                        <p className='text-slate-500 max-w-sm'>Ask me anything about your document!</p>
                    </div>
                ) : (
                    history.map(renderMessage)
                )}
                <div ref={messageEndRef} className="h-4" />
                {
                    loading && (
                        <div className='flex justify-start items-start gap-4 animate-in fade-in duration-300'>
                            <div className='shrink-0 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20'>
                                <Sparkles className='w-5 h-5 text-white' strokeWidth={2} />
                            </div>
                            <div className='flex items-center space-x-3 bg-white border border-slate-100 shadow-md shadow-slate-200/50 p-4 rounded-2xl rounded-tl-sm max-w-[75%]'>
                                <Spinner className='w-5 h-5 text-emerald-600' strokeWidth={2} />
                                <p className='text-sm font-medium text-slate-600'>AI is typing...</p>
                                <div className='flex items-center gap-1 ml-2'>
                                    <span className='w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce' style={{ animationDelay: '0ms' }}></span>
                                    <span className='w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce' style={{ animationDelay: '150ms' }}></span>
                                    <span className='w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce' style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        </div>
                    )}
            </div>

            {/* Input Area */}
            <div className='p-4 bg-white border-t border-slate-200'>
                <form onSubmit={handleSendMessage} className='flex items-center gap-3'>
                    <input type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder='Ask a follow-up question...'
                        disabled={loading}
                        className='flex-1 p-4 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50 transition-all duration-200 placeholder:text-slate-400 text-slate-700' />
                    <button type='submit'
                        disabled={loading || !message.trim()}
                        className='shrink-0 p-4 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0 disabled:bg-slate-300'
                    >
                        <Send className='w-5 h-5' strokeWidth={2} />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatInterface