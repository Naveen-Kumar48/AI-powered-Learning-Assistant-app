import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";


import authRoutes from "./routes/authRoutes.js";
import documentRoutes  from "./routes/documentRoutes.js";
import flashcardRoutes from "./routes/flashcardRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";



//* Es6 module __dir  alteratives 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize app
const app = express();


//connect to database
connectDB();


// Middleware
app.use(
    cors({
        origin: "*",    
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//* static forlder for te uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes


app.use('/api/auth', authRoutes); 
app.use('/api/documents',documentRoutes); 
app.use('/api/flashcard',flashcardRoutes); 
app.use('/api/aiRoutes',aiRoutes); 
app.use(errorHandler);



// 404 handler
app.use((req,res)=>{
    res.status(404).json({success:false,message:"Route not found"});
})  

// server start 
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    process.exit(1);
})







//* code to generate the secrete key
//  &node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"