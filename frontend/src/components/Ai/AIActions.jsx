import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Sparkles, BookOpen, Lightbulb } from 'lucide-react'
import aiService from '../../Services/aiService'
import toast from 'react-hot-toast'
import MarkdownRenderer from '../common/MarkdownRenderer'
import Modal from '../common/Modal'
const AiActions = () => {

    const { id: documentId } = useParams();
    const [loadingActions, setLoadingActions] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [concept, setConcept] = useState("");

    const handleGenerateSummary = async () => {
        setLoadingActions("summary");
        try {
            const { summary } = await aiService.generateSummary(documentId);
            setModalTitle("Generated Summary");
            setModalContent(summary);
            setIsModalOpen(true);
        } catch (error) {
            toast.error("Failed to generate summary");
        } finally {
            setLoadingActions(null);
        }
    }
    const handleExplainConcept = async (e) => {
        e.preventDefault();
        if (!concept.trim()) {
            toast.error("Please enter a concept to explain");
            return;
        }
        setLoadingActions("explain");
        try {
            const { explanation } = await aiService.explainConcept(
                documentId
                , concept
            );
            setModalTitle(`Explanation of ${concept}`);
            setModalContent(explanation);
            setIsModalOpen(true);
            setConcept("");
        } catch (error) {
            toast.error("Failed to generate concept");
        } finally {
            setLoadingActions(null);
        }
    }

    return (
        <>
            <div className='flex flex-col gap-6 max-w-5xl w-full'>
                {/* Header Card */}
                <div className='bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-slate-100 p-6 flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-xl bg-[#00a388] flex items-center justify-center shrink-0 shadow-sm text-white'>
                        <Sparkles className='w-6 h-6' strokeWidth={2} />
                    </div>
                    <div>
                        <h2 className='text-[18px] font-bold text-slate-900 leading-tight'>
                            AI Assistant
                        </h2>
                        <p className='text-[14px] text-slate-500'>
                            Powered by advanced AI
                        </p>
                    </div>
                </div>

                {/* Generate Summary Card */}
                <div className='group bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-slate-100 hover:border-[#00a884]/30 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 '>
                    <div>
                        <div className='flex items-center gap-3 mb-2 '>
                            <div className='w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-all duration-300 group-hover:scale-110'>
                                <BookOpen className='text-blue-500 w-5 h-5 transition-all duration-300' strokeWidth={2} />
                            </div>
                            <h3 className='text-[16px] font-bold text-slate-900'>Generate Summary</h3>
                        </div>
                        <p className='text-[14px] text-slate-500'>
                            Get a concise summary of the entire document.
                        </p>
                    </div>
                    <button
                        onClick={handleGenerateSummary}
                        disabled={loadingActions === "summary"}
                        className='shrink-0 px-6 py-2.5 bg-[#00a884] text-white text-[15px] font-medium rounded-xl hover:bg-[#009272] disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                    >
                        {loadingActions === "summary" ? (
                            <span className='flex items-center gap-2'>
                                <div className='animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent'></div>
                                Summarizing...
                            </span>
                        ) : (
                            "Summarize"
                        )}
                    </button>
                </div>

                {/* Explain Concept Card */}
                <div className='group bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-slate-100 hover:border-[#00a884]/30 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 p-6 flex flex-col gap-5'>
                    <div>
                        <div className='flex items-center gap-3 mb-2'>
                            <div className='w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-all duration-300 group-hover:scale-110'>
                                <Lightbulb className='text-amber-500 w-5 h-5 transition-all duration-300' strokeWidth={2} />
                            </div>
                            <h3 className='text-[16px] font-bold text-slate-900'>Explain a Concept</h3>
                        </div>
                        <p className='text-[14px] text-slate-500'>
                            Enter a topic or concept from the document to get a detailed explanation.
                        </p>
                    </div>

                    <form onSubmit={handleExplainConcept} className='flex flex-col sm:flex-row gap-3 mt-1'>
                        <input
                            type="text"
                            placeholder="Enter a concept (e.g. Machine Learning)..."
                            value={concept}
                            onChange={(e) => setConcept(e.target.value)}
                            disabled={loadingActions === "explain"}
                            className="flex-1 px-4 py-2.5 border border-[#00a884] rounded-xl text-[15px] outline-none focus:ring-1 focus:ring-[#00a884] transition-colors text-slate-800"
                        />
                        <button
                            type="submit"
                            disabled={loadingActions === "explain" || !concept.trim()}
                            className='shrink-0 px-8 py-2.5 bg-[#00a884] text-white text-[15px] font-medium rounded-xl hover:bg-[#009272] disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                        >
                            {loadingActions === "explain" ? (
                                <span className='flex items-center gap-2'>
                                    <div className='animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent'></div>
                                    Loading...
                                </span>
                            ) : (
                                "Explain"
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/*  Result Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalTitle}
            >
                <div className="max-h-[60vh] overflow-y-auto prose prose-sm  max-w-none prose-slate">
                    <MarkdownRenderer content={modalContent} />
                </div>
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl flex justify-end">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-6 py-2 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default AiActions