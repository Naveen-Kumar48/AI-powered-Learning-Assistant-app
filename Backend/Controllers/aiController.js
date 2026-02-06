import { Document } from "../models/Document.js";
import Flashcard from   "../models/Flashcard.js"
import Quiz from '../models/Quiz.js'
import ChatHistory from '../models/ChatHistory.js'
import * as geminiService from '../utils/geminiService.js'
import {findRelevantChunks} from '../utils/textChunker.js'

//* desc general  