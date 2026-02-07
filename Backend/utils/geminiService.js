import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

if (!process.env.GEMINI_API_KEY) {
    console.error('FATAL ERROR: GEMINI_API_KEY is not set in the environment variables.');
    process.exit(1);
}

/**
* Generate flashcards from text
* @param {string} text - Document text
* @param {number} count - Number of flashcards to generate
* @returns {Promise<Array<{question: string, answer: string, difficulty: string}>>}
**/
export const generateFlashcards = async (text, count = 10) => {
    const prompt = `Generate exactly ${count} educational flashcards from the following text.
Format each flashcard as:
Q: [Clear, specific question]
A: [Concise, accurate answer]
D: [Difficulty level: easy, medium, or hard]

Separate each flashcard with "---"

Text:
${text.substring(0, 15000)}`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents: prompt,
        });
        const generatedText = response.text();
        //parse the response 
        const flashcards = []

    } catch (error) {
        console.error('Error generating flashcards:', error);
        throw error;
    }
}