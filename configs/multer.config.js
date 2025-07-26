const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Use the `/tmp` directory provided by serverless environments
        const uploadPath = '/tmp';

        // Ensure the directory exists (although `/tmp` should already exist)
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        console.log('Upload path:', uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Save the file with a unique timestamp
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Multer upload instance
const upload = multer({
    storage,
    limits: {
        fieldSize: 10 * 1024 * 1024, // 10 MB field size limit
        fileSize: 50 * 1024 * 1024  // 50 MB file size limit for uploads
    }
});

module.exports = upload;
