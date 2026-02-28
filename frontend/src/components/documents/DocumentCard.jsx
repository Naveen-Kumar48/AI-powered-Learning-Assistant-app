import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Trash2, BookOpen, Clock, BrainCircuit } from 'lucide-react'
import moment from 'moment'

//Helper function to  format file size
const formatFileSize = (bytes) => {
    if (bytes === undefined || bytes === null) return "N/A"
    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < unitIndex.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`
}
const DocumentCard = ({
    document
    , onDelete
}) => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(`/documents/${document._id}`)
    }
    const handleDelete = (e) => {
        e.stopPropagation()
        onDelete(document)
    }
    return (
        <div className="group relative bg-white rounded-2xl border border-slate-200 p-6 flex flex-col h-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-emerald-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={handleNavigate}
        >
            {/* Header Section */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 ease-in-out">
                    <FileText className="w-6 h-6" strokeWidth={2} />
                </div>
                <button
                    onClick={handleDelete}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200"
                    title="Delete document"
                >
                    <Trash2 className="w-5 h-5" strokeWidth={2} />
                </button>
            </div>
            {/* Title Section */}
            <h3 className="text-[17px] text-slate-900 font-bold mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors duration-200" title={document.title}>
                {document.title}
            </h3>
            {/* Document Info Section */}
            <div className="mb-5">
                {document.fileSize !== undefined && (
                    <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-slate-500 text-[11px] font-semibold tracking-wider uppercase" title={formatFileSize(document.fileSize)}>
                        {formatFileSize(document.fileSize)}
                    </span>
                )}
            </div>
            {/* Stats Section */}
            <div className="flex items-center gap-5 mt-auto pt-4 border-t border-slate-100">
                {document.flashcardCount !== undefined && (
                    <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-purple-500" strokeWidth={2.5} />
                        <span className="text-sm font-semibold text-slate-600" title={`${document.flashcardCount} Flashcards`}>
                            {document.flashcardCount} <span className="text-slate-400 font-medium">Flashcards</span>
                        </span>
                    </div>
                )}
                {document.quizCount !== undefined && (
                    <div className="flex items-center gap-1.5">
                        <BrainCircuit className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
                        <span className="text-sm font-semibold text-slate-600" title={`${document.quizCount} Quizzes`}>
                            {document.quizCount} <span className="text-slate-400 font-medium">Quizzes</span>
                        </span>
                    </div>
                )}
            </div>
            {/* Footer section */}
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                        Uploaded {moment(document.createdAt).fromNow()}
                    </span>
                </div>
            </div>
            {/* Hover indicator */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>
    )
}

export default DocumentCard