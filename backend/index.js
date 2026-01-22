import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import "dotenv/config";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.text());

const SAVE_FOLDER = process.env.SWIFT_SAVE_FOLDER || "saved_swift_files";

if (!fs.existsSync(SAVE_FOLDER)) {
  fs.mkdirSync(SAVE_FOLDER, { recursive: true });
}

app.post("/api/swift/save", (req, res) => {
  const swiftText = req.body
  console.log(req.body);

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

