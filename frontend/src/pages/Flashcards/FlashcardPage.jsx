import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import documentService from '../../Services/documentService';
import FlashcardManager from '../../components/flashcards/FlashcardManager';
import PageHeader from '../../components/common/PageHeader';
import Spinner from '../../components/common/Spinner';
import toast from 'react-hot-toast';

const FlashCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocumentInfo = async () => {
      try {
        const response = await documentService.getDocumentById(id);
        setDocument(response.data);
      } catch (error) {
        toast.error("Failed to fetch document");
        navigate('/flashcards');
      } finally {
        setLoading(false);
      }
    };
    fetchDocumentInfo();
  }, [id, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
  if (!document) return <div className="text-center p-8 text-slate-500">Document unavailable.</div>;

  return (
    <div className="min-h-screen pb-12">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to={`/documents/${id}`}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Document
          </Link>
        </div>

        <div className="mb-8 p-6 bg-white/80 border border-emerald-100 rounded-3xl shadow-sm backdrop-blur-xl flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-lg text-emerald-700 font-semibold text-xs uppercase tracking-wider mb-3 border border-emerald-100">
              <BookOpen className="w-4 h-4" /> Flashcard Workspace
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              {document.title || "Untitled Document"}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Review, manage, and memorize key concepts from this document.
            </p>
          </div>
        </div>

        <FlashcardManager documentId={id} />
      </div>
    </div>
  );
};

export default FlashCardPage;