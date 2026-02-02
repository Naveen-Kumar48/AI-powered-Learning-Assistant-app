import fs from "fs/promises";
import { PDFParse } from "pdf-parse";

// * extracting text from the PDFfile
// *@param{string} filepath -path to PDF file
// *@returns {Promise<{text:string,numPages:number}>}
export const extractTextFromPDF = async (filepath) => {
  try {
    const dataBuffer = await fs.readFile(filepath);
    //* pdf-parse  excepts a Uint8Array ,not a buffer
    const parser = new PDFParse(new Uint8Array(dataBuffer));
    const data = await parser.getText();
    return{
        text:data.text,
        numPages:data.numPages,
        info:data.info, 
    }
  } catch (error) {
    console.log("PDF parsing error:", error);
    throw new Error("failed to extract text from PDF");
  }
};
