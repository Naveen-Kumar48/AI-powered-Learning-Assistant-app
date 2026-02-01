import Document from "../models/Document.js";
import User from "../models/User.js";
import { uploadFile } from "../utils/fileHandler.js";



//*@desc upload document
//*@route POST /api/documents/upload
//*@access Private

export const uploadDocument = async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                success: false,
                error: "No file uploaded",
                statusCode: 400,
            });
        }
        const result = await uploadFile(file);
        const document = await Document.create({
            user: req.user.id,
            title: file.originalname,
            fileUrl: result.url,
            fileKey: result.key,
            fileType: file.mimetype,
            fileSize: file.size,
        });
        res.status(201).json({
            success: true,
            data: document,
            statusCode: 201,
        });
    } catch (error) {
        next(error);
    }
};