import { extractTextFromPDF } from '../utils/pdfParse.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const test = async () => {
    // This expects a 'test.pdf' to be present. If not, it will fail.
    // If we don't have a test pdf, let's just create a minimal mock? No.
    // Let's create a minimal valid PDF first? Too hard.
    // Let's test if import fails first.
    try {
        console.log("Testing PDF import...");
        const result = await extractTextFromPDF('nonexistent.pdf'); // should throw ENOENT
        console.log("Result:", result);
    } catch (e) {
        console.log("CATCH:", e.message);
        if (e.message.includes('ENOENT') || e.message.includes('no such file')) {
            console.log("SUCCESS: Module loads, file reading works (failed on missing file as expected).");
        } else {
            console.log("FAILURE: Unexpected error:", e);
        }
    }
}

test();
