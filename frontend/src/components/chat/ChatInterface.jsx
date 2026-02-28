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
    const [message, setMessage] = useState([]);
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
        return "render message"
        // const isUser = message.role === "user";
        // return (
        //     <div key={index} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        //         <div className={`max-w-[80%] p-3 rounded-lg ${isUser ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
        //             <p>{message.content}</p>
        //         </div>
        //     </div>
        // );
    };

    if (true) {
        return (
            <div className="flex flex-col h-[70vh] bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl items-center justify-center shadow-xl shadow-slate-200/50">
                <div className='h-14 w-14 rounded-2xl bg-linear-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4    '>
                    <MessageSquare className=' w-7 h-7 text-emerald-600' strokeWidth={1.5} />

                </div>
                {/* <h2 className='text-2xl font-semibold text-slate-800 mb-2'>Welcome to AI Learning Assistant</h2>
                <p className='text-slate-600 mb-6'>Ask me anything about your documents</p> */}
                <Spinner />
                <p className='text-sm text-slate-500 mt-3  font '>Loading chat history...</p>
            </div>
        )
    }
}

export default ChatInterface