import Document from "../models/Document.js";
import User from "../models/User.js";
import Flashcard from "../models/Flashcard.js";
import Quiz from "../models/Quiz.js";
import { extractTextFromPDF } from "..//utils/pdfParse.js";
import { chunkText } from "../utils/textChunker.js";
import fs from "fs/promises";
import mongoose from "mongoose";
import { uploadFile } from "../utils/fileHandler.js";

//*@desc upload PDF document
//*@route POST /api/documents/upload
//*@access Private

export const uploadDocument = async (req, res, next) => {
  try {
  } catch (error) {
    // clean up file on the error
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => {});
    }
    next(error);
  }
};
//*desc Get  all user documents
//*@routes Get /api/documents
//*@ access Private
export const getDocuments = async (req, res, next) => {

};

//*@desc  Get single document with chunks
//* @routes Get /api/document/:id
//*@access  Private 

export const getDocument=async(req,res,next)=>{


}

//*desc Delete document 
//* @route Delete /api/documents/:id
//* access Private 

export const deleteDocument= async(req,res,next)=>{

}

//*desc Update document 
//* @route Put /api/documents/:id
//*@access Private
export const updateDocument=async(req,res,next)=>{

}


