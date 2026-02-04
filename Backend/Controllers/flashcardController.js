import Flashcard from "../models/Flashcard.js";
//*@desc Get all the flashcard  for a document
// *@route Get /api/flashcard/:documentId
//* access Private

export const getFlashcards = async (req, res, next) => {
  try {
    const flashcards = await Flashcard.find({
      userId: req.user._id,
      documentId: req.params.documentId,
    })
      .populate("documentId", "title fileName")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: flashcards.length,
      data: flashcards,
    });
  } catch (error) {
    next(error);
  }
};

//*desc Get all flashcard sets  for a user
//* @route Get /api/flashcards
//*@access Private
export const getAllFlashcardSets = async (req, res, next) => {
  try {
    const flashcardSets = await Flashcard.find({
      userId: req.user._id,
    })
      .populate("documentId", "title")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: flashcardSets.length,
      data: flashcardSets,
    });
  } catch (error) {
    next(error);
  }
};

//* desc Mark flashcard as reviewed
//*@routes POST api/flasccard/:cardId/review
//*access private

export const reviewFlashcard = async (req, res, next) => {
  try {
    const flashcardSet = await Flashcard.findOne({
      "card._id": req.params.cardId,
      userId: user._id,
    });
    if(!flashcardSet){
        return res.status(404).json({
            statusCode:404,
            success:false,
            message:'Flashcard not found'
        })
    }
   const cardIndex=flashcardSet.cards.findIndex((card)=>card._id.toString()===req.params.cardId)
   if(cardIndex===-1){
    return res.status(404).json({
        statusCode:404,
        success:false,
        message:'Flashcard not found in the set'
    })
   }
   flashcardSet.cards[cardIndex].lastReviewed=Date.now();
   flashcardSet.cards[cardIndex].reviewCount+=1;
   await flashcardSet.save();
   res.status(200).json({
    success:true,
    data:flashcardSet, 
    message:'Flashcard revied successfully'
   })
   } catch (error) {
    next(error);
  }
};

//*@desc Toggle start/favorite on    flashcard
//* @route PUT /api/flashcards/:cardId/star
//*access Private

export const toggleStarFlashcard = async (req, res, next) => {
  try {
    const flashcardSet = await Flashcard.findOne({
      "card._id": req.params.cardId,
      userId:req.user._id,
    });
    if(!flashcardSet){
        return res.status(404).json({
            statusCode:404,
            success:false,
            message:'Flashcard set or card not found'
        })
    }
   const cardIndex=flashcardSet.cards.findIndex((card)=>card._id.toString()===req.params.cardId)
   if(cardIndex===-1){
    return res.status(404).json({
        statusCode:404,
        success:false,
        message:'Card not found in the set'
    })
   }//toggling the star 
   flashcardSet.cards[cardIndex].isStarred=!flashcardSet.cards[cardIndex].isStarred;
   await flashcardSet.save();
   res.status(200).json({
    success:true,
    data:flashcardSet, 
    message:`Flashcard ${flashcardSet.cards[cardIndex].isStarred?'starred':'unstarred'}`
   })
      } catch (error) {
    next(error);
  }
};

//*@desc   DELETE DLASHCARD SET
//*@route DELETE /api/flashcard/:id
//*@access Private

export const deleteFlashcardSets = async (req, res, next) => {
  try {
    const flashcardSet = await Flashcard.findOne({
      _id: req.params.id,
      userId:req.user._id,
    });
    if(!flashcardSet){
        return res.status(404).json({
            statusCode:404,
            success:false,
            message:'Flashcard set not found'
        })
    }
    await flashcardSet.deleteOne();
    res.status(200).json({
        success:true,
        message:'Flashcard set deleted successfully'
    })
  } catch (error) {
    next(error);
  }
};
