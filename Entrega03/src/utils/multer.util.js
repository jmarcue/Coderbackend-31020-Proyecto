import multer from "multer"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()} - ${file.originalname}`;
    cb(null, filename);
  }
});

export const fileUpload = multer( { storage } );