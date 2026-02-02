/**
 * Split text into chunks for better AI processing
 * @param {string} text - Full text to chunk
 * @param {number} chunkSize - Target size per chunk (in words)
 * @param {number} overlap - Number of words to overlap between chunks
 * @returns {Array<{content: string, chunkIndex: number, pageNumber: number}>}
 */
export const chunkText = (text, chunkSize = 500, overlap = 50) => {
    // HARD SAFETY GUARDS
    if (typeof text !== "string") return [];
    if (chunkSize <= 0) chunkSize = 500;
    if (overlap < 0) overlap = 0;
    if (overlap >= chunkSize) overlap = Math.floor(chunkSize / 5);

    if (text.trim().length === 0) return [];

    // Clean text (preserve paragraphs)
    const cleanedText = text
        .replace(/\r\n/g, "\n")
        .replace(/\t/g, " ")
        .replace(/[ ]{2,}/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

    // Split paragraphs strictly by double newlines to ensure logical separation
    const paragraphs = cleanedText
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(Boolean);

    const chunks = [];
    let currentChunk = [];
    let currentWordCount = 0;
    let chunkIndex = 0;

    for (const paragraph of paragraphs) {
        const words = paragraph.split(/\s+/);
        const wordCount = words.length;

        // Large paragraph → split directly
        if (wordCount > chunkSize) {
            // First flush any existing chunk
            if (currentChunk.length) {
                chunks.push({
                    content: currentChunk.join("\n\n"),
                    chunkIndex: chunkIndex++,
                    pageNumber: 0,
                });
                currentChunk = [];
                currentWordCount = 0;
            }

            // Then split this massive paragraph
            for (let i = 0; i < words.length; i += (chunkSize - overlap)) {
                const slice = words.slice(i, i + chunkSize);
                if (!slice.length) break;

                chunks.push({
                    content: slice.join(" "),
                    chunkIndex: chunkIndex++,
                    pageNumber: 0,
                });

                // Optimization: if we are near the end, stop to prevent tiny trailing chunks
                if (i + chunkSize >= words.length) break;
            }
            continue;
        }

        // Would adding this paragraph exceed chunk size? -> Flush current chunk
        if (currentWordCount + wordCount > chunkSize && currentChunk.length > 0) {
            chunks.push({
                content: currentChunk.join("\n\n"),
                chunkIndex: chunkIndex++,
                pageNumber: 0,
            });

            // Start new chunk with overlaps if needed
            // For simplicity, we just start fresh with this paragraph to avoid complex overlap logic which often fails
            // If strict overlap is required, we can grab the last N words of previous chunk

            const prevChunkText = currentChunk.join(" ");
            const prevWords = prevChunkText.split(/\s+/);
            const overlapText = prevWords.slice(-Math.min(overlap, prevWords.length)).join(" ");

            currentChunk = [overlapText, paragraph];
            currentWordCount = overlapText.split(/\s+/).length + wordCount;

        } else {
            // Add paragraph to current chunk
            currentChunk.push(paragraph);
            currentWordCount += wordCount;
        }
    }

    // Push final chunk
    if (currentChunk.length) {
        const finalText = currentChunk.join("\n\n").trim();
        if (finalText.length) {
            chunks.push({
                content: finalText,
                chunkIndex: chunkIndex++,
                pageNumber: 0,
            });
        }
    }

    // FINAL FAILSAFE: If logic failed to produce chunks (e.g. one giant paragraph that wasn't split correctly), split by words
    if (chunks.length === 0 && cleanedText.length > 0) {
        const words = cleanedText.split(/\s+/);
        for (let i = 0; i < words.length; i += (chunkSize - overlap)) {
            const slice = words.slice(i, i + chunkSize);
            if (!slice.length) break;

            chunks.push({
                content: slice.join(" "),
                chunkIndex: chunkIndex++,
                pageNumber: 0,
            });

            if (i + chunkSize >= words.length) break;
        }
    }

    return chunks;
};

/**
 * Find relevant chunks based on keyword matching
 */
export const findRelevantChunks = (chunks, query, maxChunks = 3) => {
    if (!Array.isArray(chunks) || !chunks.length || !query) return [];

    const stopWords = new Set([
        "the", "is", "at", "which", "on", "a", "an", "and", "or", "but", "in",
        "with", "to", "for", "of", "as", "by", "this", "that", "it"
    ]);

    const queryWords = query
        .toLowerCase()
        .split(/\s+/)
        .filter(w => w.length > 2 && !stopWords.has(w));

    const scored = chunks.map((chunk, index) => {
        const content = chunk.content.toLowerCase();
        const contentWords = content.split(/\s+/).length;
        let score = 0;

        for (const word of queryWords) {
            const exact = (content.match(new RegExp(`\\b${word}\\b`, "g")) || []).length;
            const partial = (content.match(new RegExp(word, "g")) || []).length;
            score += exact * 3 + Math.max(0, partial - exact) * 1.5;
        }

        const matchedWords = queryWords.filter(w => content.includes(w)).length;
        score += matchedWords > 1 ? matchedWords * 2 : 0;

        return {
            content: chunk.content,
            chunkIndex: chunk.chunkIndex,
            pageNumber: chunk.pageNumber,
            _id: chunk._id,
            score: score / Math.sqrt(contentWords || 1),
            matchedWords,
            position: index,
        };
    });

    return scored
        .filter(c => c.score > 0)
        .sort((a, b) =>
            b.score - a.score ||
            b.matchedWords - a.matchedWords ||
            a.position - b.position
        )
        .slice(0, maxChunks);
};
