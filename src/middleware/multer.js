const Multer = require("multer");
const path = require("path");

const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
const maxFileSize = 8 * 1024 * 1024; // 8 MB

const generateUploadImageMulter = (uploadPath) => {
  const storage = Multer.diskStorage({
    destination: (req, file, cb) => {
      const destinationPath = path.join(__dirname, "..", uploadPath); // Ruta segura
      cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
      const sanitizedFileName = sanitizeFileName(file.originalname);
      cb(null, Date.now() + "-" + sanitizedFileName);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de archivo no permitido"), false);
    }
  };

  return Multer({
    storage,
    fileFilter,
    limits: { fileSize: maxFileSize },
  });
};

const sanitizeFileName = (fileName) => {
  // Implementa lógica de limpieza de nombres de archivo aquí
  // Por ejemplo, puedes eliminar caracteres especiales o reemplazarlos
  return fileName.replace(/[^\w.-]/g, "_");
};

const diskStorage = Multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, "..", "uploads"); // Ruta segura
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const sanitizedFileName = sanitizeFileName(file.originalname);
    cb(null, Date.now() + "-" + sanitizedFileName);
  },
});

const diskUpload = Multer({
  storage: diskStorage,
  limits: { fileSize: 8000000 }, // 8 MB
});

const uploadUserImages = generateUploadImageMulter("assets/images/userImages");
const uploadFeedbackImages = generateUploadImageMulter(
  "assets/images/feedbackImages"
);
const uploadEventImages = generateUploadImageMulter(
  "assets/images/eventImages"
);

module.exports = {
  uploadEventImages,
  uploadUserImages,
  uploadFeedbackImages,
  diskUpload,
};
