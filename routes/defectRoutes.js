// routes/defectRoutes.js
const express = require("express");
const multer = require("multer");
const router = express.Router();
const defectController = require("../controllers/defectController");

// Route to log a new defect
//router.post("/", defectController.createDefect);

// Route to get all defects (optional filters)
router.get("/", defectController.getDefects);

// Route to retrieve a specific defect by ID
router.get("/:id", defectController.getDefectById);


router.put("/:id/status", defectController.updateDefectStatus); // Update defect status
router.put("/:id/resolution", defectController.addResolution);  // Add resolution details


// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Directory to save uploaded files // Ensure 'uploads' directory exists in your root folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname); // Unique file name
    },
  });
  const upload = multer({ storage });

// Route to log a new defect with optional image upload
router.post("/", upload.single("image"), defectController.createDefect);

// Route to update a defect, with optional image upload
router.put("/:id", upload.single("image"), defectController.updateDefect);

// Add the delete route
router.delete("/:id", defectController.deleteDefect);
router.patch("/:id/resolve", defectController.resolvedDefect);

module.exports = router;
