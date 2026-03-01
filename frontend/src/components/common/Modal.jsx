import React from 'react'
import { X } from 'lucide-react'
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm'>
            <div className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col'>
                {/* Header */}
                <div className='flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50'>
                    <h3 className='text-xl font-bold text-slate-900'>{title}</h3>
                    <button
                        onClick={onClose}
                        className='p-2 rounded-lg hover:bg-slate-200 transition-colors'
                    >
                        <X className='w-6 h-6 text-slate-500' strokeWidth={2} />
                    </button>
                </div>

                {/* Content */}
                <div className='flex-1 overflow-y-auto p-6'>{children}</div>
            </div>
        </div>
    )
}

export default Modal