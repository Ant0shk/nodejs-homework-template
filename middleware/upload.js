import multer from "multer";
import path from "path";

const destination = path.resolve("temp");
const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}}`;
    const filename = `${uniquePreffix}_${file.originalname}`; 
    cb(null, filename); 
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5, 
};
//Створюємо мідлвару Апплоад що буде зберігати файли що приходять в тимчасову папу і буде ці інформацю передавать далі на опрацювання
const upload = multer({
  storage,
  limits,
});

export default upload;
