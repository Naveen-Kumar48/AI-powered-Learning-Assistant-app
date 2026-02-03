import Flashcard from "../models/Flashcard.js";
//*@desc Get all the flashcard  for a document
// *@route Get /api/flashcard/:documentId
//* access Private


export const getFlashcards= async (req,res,next)=>{
    try {
        const flashcards=await Flashcard.find({
            userId:req.user._id,
            documentId:req.params.documentId
        })
        .populate('documentId',"title fileName")
        .sort({createdAt:-1});
        res.status(200).json({
            success:true,
            count:flashcards.length,
            data:flashcards,
        })
    } catch (error) {
        next(error)
        
    }

}


//*desc Get all flashcard sets  for a user
//* @route Get /api/flashcards
//*@access Private
export const getAllFlashcardSets = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
        
    }

}


//* desc Mark flashcard as reviewed
//*@routes POST api/flasccard/:cardId/review
//*access private

export const reviewFlashcard= async (req,res,next)=>{
  try {
        
    } catch (error) {
        next(error)
        
    }

}



//*@desc Toggle start/favorite on    flashcard
//* @route PUT /api/flashcards/:cardId/star
//*access Private

export const toggleStarFlashcard=async (req,res,next)=>{
  try {
        
    } catch (error) {
        next(error)
        
    }

}

//*@desc   DELETE DLASHCARD SET
//*@route DELETE /api/flashcard/:id
//*@access Private

export const deleteFlashcardSets=async (req,res,next)=>{
  try {
        
    } catch (error) {
        next(error)
        
    }

}