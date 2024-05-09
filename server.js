const express = require("express");
const multer = require("multer");
const csvParser = require("csv-parser");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

// Serve static files from the public folder
app.use(express.static("public"));

// Define routes

// Route for uploading CSV files
app.post("/upload", upload.single("csvFile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Extract file details
  const { originalname, path } = req.file;

  // Rename file to original name
  fs.renameSync(path, `uploads/${originalname}`);

  res.status(201).json({ message: "File uploaded successfully" });
});

// Route for listing uploaded CSV files
app.get("/files", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(files);
  });
});

// Route for retrieving data from a selected CSV file
app.get("/data/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = `uploads/${filename}`;

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  // Parse CSV file and send data
  const data = [];
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (row) => {
      data.push(row);
    })
    .on("end", () => {
      res.status(200).json({ filename, data });
    })
    .on("error", (err) => {
      res.status(500).json({ error: "Error parsing CSV file" });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
