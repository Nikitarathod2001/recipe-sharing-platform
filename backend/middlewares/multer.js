import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads",
  filename: function(req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  }
});

const uploadImage = multer({storage});

export default uploadImage;