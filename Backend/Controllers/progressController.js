import Document from '../models/Document.js'

import Flashcard from '../models/Flashcard.js'

import Quiz from '../models/Quiz.js'


//*desc: Get user learning Stastics
//*route: GET /api/progress/dashboard
//*access: Private
export const getDashboard = async (req, res) => {
    try {
        const userId = req.user.id;
        // *Get  counts 
        const totalDocument = await Document.countDocuments({ userId })
        const totalFlashcardSets = await Flashcard.countDocuments({ userId })
        const totalQuizzes = await Quiz.countDocuments({ userId })
        const completedQuizzes = await Quiz.countDocuments({ userId, completedAt: { $ne: null } })

        //*Get flashcard  statistics
        const flashcardSets = await Flashcard.find({ userId })
        let totalFlashcards = 0;
        let reviewedFlascards = 0;
        let starredFlashcards = 0;

        flashcardSets.forEach(set => {
            totalFlashcards += set.cards.length
            reviewedFlascards += set.cards.filter(c => c.reviewed > 0).length
            starredFlashcards += set.cards.filter(c => c.isStarred).length
        })

        //*Get quix Stastics 
        const quizzes = await Quiz.find({ userId, completedAt: { $ne: null } })
        const averageScore = quizzes.length > 0 ? Math.round(quizzes.reduce((sum, q) => sum + q.score, 0) / quizzes.length) : 0

        //*Recent Activity 
        const recentDocuments = await Document.find({ userId }).sort({ createdAt: -1 }).limit(5).select('title filename lastAccessed status')
        const recentQuizzes = await Quiz.find({ userId }).sort({ createdAt: -1 }).limit(5).populate('documentId', 'title').select('title score  totalQuestions completedAt')


        //*Study  Streak (simplyied -in priduction ,track daily activity)
        const studyStreak = Math.floor(Math.random() * 7) + 1; //mock data
        res.status(200).json({
            succcess: true,
            data: {
                overview: {
                    totalDocument,
                    totalFlashcardSets,
                    totalFlashcards,
                    reviewedFlascards,
                    starredFlashcards,
                    averageScore,
                    studyStreak,
                    totalQuizzes,
                    completedQuizzes,
                },
                recentActivity: {
                    documents: recentDocuments,
                    quizzes: recentQuizzes,
                }
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}