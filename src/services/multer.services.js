import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
  };
  
export const multerlocal = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4() + '_' + file.originalname)
        }

    })

    const fileFilter = (req, file, cb) => {
        if (!MIME_TYPES[file.mimetype]) {
          cb(new Error("upload image only", { cause: 400 }), false);
        } else {
          cb(null, true);
        }
      };


    const upload = multer({ fileFilter, storage })
    return upload
}



