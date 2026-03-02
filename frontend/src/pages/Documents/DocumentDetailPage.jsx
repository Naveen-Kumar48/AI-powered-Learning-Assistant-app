import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import documentService from "../../Services/documentService.js";
import Spinner from "../../components/common/Spinner";
import toast from "react-hot-toast";
import { ArrowLeft, ExternalLink } from "lucide-react";
import PageHeader from "../../components/common/PageHeader"
import Tabs from "../../components/common/Tabs"
import ChatInterface from "../../components/chat/ChatInterface"
import AiActions from "../../components/Ai/AIActions.jsx";
import FlashcardManager from "../../components/flashcards/FlashcardManager.jsx";
import QuizManager from "../../components/quizzes/QuizManager.jsx";
import { Base_URL } from "../../utils/apiPaths.js";

const DocumentdetailPage = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Content");

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      try {
        setLoading(true);
        const data = await documentService.getDocumentById(id);
        setDocument(data);
      } catch (error) {
        toast.error("Failed to fetch document");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocumentDetails();
  }, [id]);

  //Helper Function to get the Full PDF URL
  const getPdfUrl = () => {
    if (!document?.data?.filePath) return null;

    const filePath = document.data.filePath;
    let url = filePath;
    if (!filePath.startsWith("http://") && !filePath.startsWith("https://")) {
      const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : Base_URL;

      // Clean up the URL format to ensure no double slashes before uploads/
      const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      const cleanFilePath = filePath.startsWith('/') ? filePath : `/${filePath}`;
      url = `${cleanBaseUrl}${cleanFilePath}`;
    }
    return url;
  };

  const renderContent = () => {
    if (loading) {
      return <Spinner />;
    }
    if (!document || !document.data || !document.data.filePath) {
      return <div className="text-center p-8">PDF not Available</div>;
    }
    const pdfUrl = getPdfUrl();
    return (
      <div className="bg-white border  border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <div className=" flex items-center justify-between p-4 bg-gray-50 border-b border-gray-300">
          <span className=" text-sm font-medium text-gray-700">Document Viewer</span>
          <a
            href={pdfUrl}
            target="_blank"
            rel=" noopener  noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <ExternalLink size={16} />
            Open in new tab
          </a>
        </div>
        <div className=" bg-gray-100 p-1">
          <iframe
            src={pdfUrl}
            className=" w-full h-[70vh] bg-white rounded border border-gray-300"
            title="PDF Viewer"
            frameBorder="0"
            style={{
              colorScheme: "light",
            }}
          />
        </div>
      </div>
    );
  };



  const renderChat = () => {
    return <ChatInterface />
  }
  const renderAIActions = () => {
    return <AiActions />
  }
  const renderFlashcardsTab = () => {
    return <FlashcardManager documentId={id} />
  }
  const renderQuizzesTab = () => {
    return <QuizManager documentId={id} />
  }

  const tabs = [
    { name: "Content", label: "Content", content: renderContent() },
    { name: "Chat", label: "Chat", content: renderChat() },
    { name: "AI Actions", label: "AI Actions", content: renderAIActions() },
    { name: "Flashcards", label: "Flashcards", content: renderFlashcardsTab() },
    { name: "Quizzes", label: "Quizzes", content: renderQuizzesTab() }
  ]
  if (loading) {
    return <Spinner />
  }
  if (!document) {
    return <div className="text-center p-8">
      Document not found
    </div>
  }

  return (
    <div>
      <div className="mb-4">
        <Link to="/documents" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors ">
          <ArrowLeft size={16} />
          Back to Documents
        </Link>
      </div>
      <PageHeader title={document.data.title} />
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}


export default DocumentdetailPage;
