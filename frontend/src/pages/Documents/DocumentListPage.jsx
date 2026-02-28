import React, { useState, useEffect } from "react";
import { Plus, Upload, Trash2, FileText, X, Form } from "lucide-react";
import toast from "react-hot-toast";

import documentService from "../../Services/documentService";
import Spinner from "../../components/common/Spinner";
import Button from "../../components/common/Button";
import DocumentCard from "../../components/documents/DocumentCard";

const DocumentListPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  //* State for upload model
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  //* State for delete confirmation
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const fetchDocuments = async () => {
    try {
      const data = await documentService.getDocuments();
      setDocuments(data);
    } catch (error) {
      toast.error("failed to fetch documents");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFilechange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      setUploadTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle) {
      toast.error("Please  provide a title  and select a file .");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("title", uploadTitle);

    try {
      await documentService.uploadDocument(formData);
      toast.success("Document uploaded succesfully");
      setIsUploadModalOpen(false);
      setUploadFile(null);
      setUploadTitle("");
      setLoading(true);
      fetchDocuments();
    } catch (error) {
      toast.error(error.message || " Upload Failed ");
    } finally {
      setUploading(false);
    }
  };
  const handleDeleteRequest = (doc) => {
    setSelectedDoc(doc);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDoc) return;
    setDeleting(true);
    try {
      await documentService.deleteDocument(selectedDoc._id);
      toast.success(`${selectedDoc.title} deleted successfully`);
      setIsDeleteModalOpen(false);
      setSelectedDoc(null);
      setDocuments(documents.filter((d) => d._id !== selectedDoc._id));
    } catch (error) {
      toast.error(error.message || "Failed to delete document");
    } finally {
      setDeleting(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <Spinner />
        </div>
      );
    }
    if (documents.length === 0) {
      return (
        <div className=" flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-md">
            <div className="inline flex items-center justify-center w-20 h-20 rounded-2xl  bg-linear-to-br from-slate-100 to-slate-200 shadow-slate-200/50 mb-6">
              <FileText className="   w-10 h-10 text-slate-400"
                strokeWidth={1.5}
              />

            </div>
            <h3 className="text-xl font-medium text-slate-900 trakning mb-2">
              No Documents Yet

            </h3>
            <p className="text-sm  text-slate-500 mb-6">
              Get Started by Uploading  your first PDF  document to begin  learning
            </p>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.98] rounded-xl"
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              Upload Document
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {
          documents?.map((doc) => (
            <DocumentCard
              key={doc._id}
              document={doc}
              onDelete={handleDeleteRequest}
            />
          ))}

      </div>
    )
  };

  return (
    <div className="min-h-screen ">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] opacity-30 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-medium text-slate-900 tracking-tight mb-2">
              My Documents
            </h1>
            <p className="text-slate-500 text-sm">
              Manage and organize your learning materials
            </p>
          </div>
          {documents.length > 0 && (
            <Button onClick={() => setIsUploadModalOpen(true)}>
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              Upload Document
            </Button>
          )}
        </div>
        {renderContent()}
      </div>
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden relative animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors z-10"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-semibold text-slate-900">
                Upload New Document
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Add a PDF Document to your Library
              </p>
            </div>
            <form onSubmit={handleUpload} className="p-6 space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Document Title
                </label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 placeholder:text-slate-400"
                  placeholder="eg. My Document"
                  required
                />
              </div>
              {/* File Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Pdf File
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="file-upload"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    accept=".pdf"
                    onChange={handleFilechange}
                    required
                  />
                  <div className={`w-full p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center transition-all duration-200 ${uploadFile ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors duration-200 ${uploadFile ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                      <Upload className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <p className="text-sm font-medium text-slate-900 mb-1">
                      {uploadFile ? (
                        <span className="text-emerald-600 truncate max-w-[200px] block">
                          {uploadFile.name}
                        </span>
                      ) : (
                        <>
                          <span className="text-emerald-500">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </>
                      )}
                    </p>
                    <p className="text-xs text-slate-500">
                      Only PDF UPTO 10mb are allowed
                    </p>
                  </div>
                </div>
              </div>
              {/* ActionButtons */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  disabled={uploading}
                  className="flex-1"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={uploading}
                  className="flex-1"
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Uploading...
                    </span>
                  ) : (
                    "Upload"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden relative animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors z-10"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
            {/* Modal header */}
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4 shadow-inner shadow-red-100">
                <Trash2 className="w-8 h-8 text-red-500" strokeWidth={2} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Confirm Delete
              </h2>
              {/* Content */}
              <p className="text-sm text-slate-500 mb-8">
                Are you sure you want to delete this document:{" "}
                <span className="font-semibold text-slate-700">
                  {selectedDoc?.title}
                </span>
                ? This action cannot be undone.
              </p>
              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full">
                <Button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  disabled={deleting}
                  className="flex-1"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={deleting}
                  className="flex-1 !from-red-500 !to-red-600 hover:!from-red-600 hover:!to-red-700 !shadow-red-500/25"
                >
                  {deleting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Deleting...
                    </span>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentListPage;
