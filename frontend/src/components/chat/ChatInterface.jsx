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
        setHistory(prev => [...prev, userMessage]);
        setMessage("");
        setLoading(true);


        try {
            const response = await aiService.chat(docuemntId, userMessage.content);
            const assistantMessage = {
                role: "assistant",
                content: response.data.answer,
                timestamp: new Date(),
                relevantChunks: response.data.relevantChunks
            };
            setHistory(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            toast.error("Failed to send message");
            const errorMessage = {
                role: "assistant",
                content: "Sorry, I'm having trouble understanding you. Please try rephrasing your question.",
                timestamp: new Date()
            };
            setHistory(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    }
    const renderMessage = (msg, index) => { 
        const isUser = msg.role === "user";
        return (
            <div key={index} className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                {!isUser && (
                    <div className='shrink-0 w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20'>
                        <Sparkles className='w-4 h-4 text-white' strokeWidth={2} />
                    </div>
                )}
                <div className={`max-w-lg  p-4 rounded-2xl shadow-sm  ${
                    isUser
                    ? "bg-linear-to-br from-emerald-500 to-teal-500 text-white rounded-br-md shadow-md shadow-emerald-500/10"
                    : "bg-white border border-slate-200/60 text-slate-800 rounded-bl-md "}`}>
                    {isUser ? (
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                    ) : (
                      <div className='prose prose-sm prose-slate max-w-none'>
                        <MarkdownRenderer content={msg.content} />
                      </div>
                    )}
                </div>
                {isUser && (
                    <div className='shrink-0 w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-slate-700 font-semibold  shadow-sm'>
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
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
                    <div className='flex flex-col items-center justify-center h-full   text-center'>
                        <div className='w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20'>
                            <MessageSquare className='w-8 h-8 text-emerald-600' strokeWidth={2} />
                        </div>
                        <h3 className='text-base font-semibold text-slate-900 mb-2'>Start a conversation</h3>
                        <p className='text-slate-500 text-sm'>Ask me anything about this document!</p>
                    </div>
                ) : (
                    history.map(renderMessage)
                )}
                <div ref={messageEndRef} className="h-4" />
                {
                    loading && (
                        <div className='flex items-center gap-3 my-4'>
                            <div className='w-9 h-9 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center shadow-lg shadow-emerald-500/25 flex-items-center justify-center shrink-0'>
                                <Sparkles className='w-4 h-4 text-white' strokeWidth={2} />
                            </div>
                            <div className='flex items-center gap-2 px-4 py-3 rounded-2xl rounded-bl-md bg-white border border-slate-200/60 shadow-md shadow-slate-200/50'>
                                <p className='text-sm font-medium text-slate-600'>typing...</p>
                                <div className='flex gap-1 '>
                                    <span className='w-2 h-2 bg-slate-400 rounded-full animate-bounce' style={{ animationDelay: '0ms' }}></span>
                                    <span className='w-2 h-2 bg-slate-400 rounded-full animate-bounce' style={{ animationDelay: '150ms' }}></span>
                                    <span className='w-2 h-2 bg-slate-400 rounded-full animate-bounce' style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        </div>
                    )}
            </div>

            {/* Input Area */}
            <div className='p-5 bg-white/80 border-t border-slate-200'>
                <form onSubmit={handleSendMessage} className='flex items-center gap-3'>
                    <input type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder='Ask a follow-up question...'
                        disabled={loading}
                        className='flex-1 h-12 px-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10' />

                    <button type='submit'
                        disabled={loading || !message.trim()}   
                        className='shrink-0 w-12 h-12 flex items-center justify-center bg-emerald-500 text-white rounded-full hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 disabled:hover:shadow-none disabled:hover:translate-y-0 disabled:bg-slate-300'
                    >
                        <Send className='w-5 h-5' strokeWidth={2} />
                    </button>
                </form>
            </div>
        </div>  
    )
}

export default ChatInterface