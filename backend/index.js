import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import generateSwift from "./swift/generateSwift.js";

const app = express();
app.use(cors());
app.use(express.json());

const SAVE_FOLDER = "saved_swift_files";
if (!fs.existsSync(SAVE_FOLDER)) {
  fs.mkdirSync(SAVE_FOLDER, { recursive: true });
}

app.post("/api/swift/save", (req, res) => {
  const swiftText = generateSwift(req.body);

  const fileName = `swift_message_${Date.now()}.txt`;
  const filePath = path.join(SAVE_FOLDER, fileName);

  
  fs.writeFile(filePath, swiftText, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error saving file" });
    }

    console.log(`File saved at ${filePath}`);
    res.json({ message: "File saved successfully", path: filePath });
  });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
