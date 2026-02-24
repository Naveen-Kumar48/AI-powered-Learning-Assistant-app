import Document from '../models/Document.js'

import Flashcard from '../models/Flashcard.js'

import Quiz from '../models/Quiz.js'


//*desc: Get user learning Stastics
//*route: GET /api/progress/dashboard
//*access: Private
export const getDashboard = async (req,res) => {
    try {
        const  userId=req.user.id;
        // *Get  counts 
        const totalDocument=await Document.countDocuments({userId}) 
        const totalFlashcards=await Flashcard.countDocuments({userId})
        const totalQuizzes=await Quiz.countDocuments({userId})
        const completedQuizzes=await Quiz.countDocuments({userId,completedAt:{$ne:null}})

        //*Get flashcard  statistics
         

    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
}