// config/multerConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Calculate the full path to the upload directory
const uploadPath = path.join(__dirname, '../uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Log the path to the console to verify it
console.log(`Uploading to directory: ${uploadPath}`);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadPath); // Use the upload path as the destination
    },
    filename: function(req, file, cb) {
        // Create a unique file name for the upload
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Only allow image files (adjust the regex to match your needs)
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

module.exports = { upload };
