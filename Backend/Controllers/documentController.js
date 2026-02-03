import Document from "../models/Document.js";
import User from "../models/User.js";
import Flashcard from "../models/Flashcard.js";
import Quiz from "../models/Quiz.js";
import { extractTextFromPDF } from "../utils/pdfParse.js";
import { chunkText } from "../utils/textChunker.js";
import fs from "fs/promises";
import mongoose from "mongoose";
// import { uploadFile } from "../utils/fileHandler.js";

//*@desc upload PDF document
//*@route POST /api/documents/upload
//*@access Private

export const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file",
        statusCode: 400,
      });
    }
    const { title } = req.body;
    if (!title) {
      //delete uploded file if no title is provided
      await fs.unlink(req.file.path);
      return res.status(400).json({
        success: false,
        message: "Please provide a title",
        statusCode: 400,
      });
    }
    //construct the url   fro the uploded file
    const baseUrl = `http://localhost:${process.env.PORT || 8000}`;
    const fileUrl = `${baseUrl}/uploads/documents/${req.file.filename}`;

    //creating  the document record

    const document = await Document.create({
      userId: req.user._id,
      title,
      fileName: req.file.originalname,
      filePath: fileUrl, // storing the url  instead  of the local path
      fileSize: req.file.size,
      status: "processing",
    });

    //process PDF  in background  (in prodution ,usea queue  like Bull )
    processPDF(document._id, req.file.path).catch((error) => {
      console.log("PDF processing failed:", error);
    });

    return res.status(201).json({
      success: true,
      data: document,
      message: "Document uploaded successfully Processing in progress",
    });
  } catch (error) {
    // clean up file on the error
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => {});
    }
    next(error);
  }
};

// Helper function  to process PDF in background
const processPDF = async (documentId, filePath) => {
  try {
    const { text } = await extractTextFromPDF(filePath);
    //creating chunks
    const chunks = chunkText(text, 500, 50);
    //update document status
    await Document.findByIdAndUpdate(documentId, {
      extractedText: text,
      chunks: chunks,
      status: "ready",
    });
    console.log(`Document ${documentId} processed successfully`);
  } catch (error) {
    console.error(`Error processing document ${documentId}`, error);
    await Document.findByIdAndUpdate(documentId, {
      status: "failed",
      failureReason: error.message,
    });
  }
};

//*desc Get  all user documents
//*@routes Get /api/documents
//*@ access Private
export const getDocuments = async (req, res, next) => {
  try {
    const documents = await Document.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(req.user._id) },
      },
      {
        $lookup: {
          from: "flashcards",
          localField: "_id",
          foreignField: "documentId",
          as: "flashcardSets",
        },
      },
      {
        $lookup: {
          from: "quizzes",
          localField: "_id",
          foreignField: "documentId",
          as: "quizzes",
        },
      },
      {
        $addFields: {
          flashcardCount: { $size: "$flashcardSets" },
          quizCount: { $size: "$quizzes" },
        },
      },
      {
        $project: {
          extractedText: 0,
          chunks: 0,
          flashcardSets: 0,
          quizzes: 0,
        },
      },
      {
        $sort: { updatedAt: -1 },
      },
    ]);
    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents,
    });
  } catch (error) {
    next(error);
  }
};

//*@desc  Get single document with chunks
//* @routes Get /api/document/:id
//*@access  Private

export const getDocument = async (req, res, next) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
        statusCode: 404,
      });
    }

    //Get count of Associated flashcards and quizzes
    const flashcardCount = await Flashcard.countDocuments({
      documentId: document._id,
      userId: req.user._id,
    });
    const quizCount = await Quiz.countDocuments({
      documentId: document._id,
      userId: req.user._id,
    });

    //update the last accessed time
    document.lastAccessedAt = new Date();
    await document.save();

    //*combine  document data  with counts
    const documentData = document.toObject();
    documentData.flashcardCount = flashcardCount;
    documentData.quizzCount = quizCount;

    res.status(200).json({
      success: true,
      data: documentData,
    });
  } catch (error) {
    next(error);
  }
};

//*desc Delete document
//* @route Delete /api/documents/:id
//* access Private

export const deleteDocument = async (req, res, next) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
        statusCode: 404,
      });
    }
    //* delete file from  the file system
    await fs.unlink(document.filePath).catch(() => {});
    //*Delete document
    await document.deleteOne();
    res.status(200).json({
      success: true,
      message: "Document deleted  successfully",
    });
  } catch (error) {
    next(error);
  }
};


