import React, { useState } from 'react'

const Flashcard = ({flashcard, onToggleStar}) => {
    const [isFlipped, setIsFlipped] = useState(false);
   const handleFlip = () => {
    setIsFlipped(!isFlipped);
   }
   
}
export default Flashcard