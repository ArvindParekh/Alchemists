const express = require('express');
const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyAXHmtulh-E58AHJkGOL4hOjvSg6UPMsHU');

const upload = multer({ dest: 'uploads/' });

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors')());

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

app.post('/process-image', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).send('No prompt provided.');
  }

  // Check if the MIME type is supported
//   maybe sharp is causing some issues? Ensure that the conversion is necessary and that the resulting file is compatible with the Google Generative AI service.
  const supportedMimeTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/heic', 'image/heif'];
  let imagePart;
  if (!supportedMimeTypes.includes(req.file.mimetype)) {
    // Convert the image to a supported format (e.g., JPEG) using sharp
    const outputPath = req.file.path + ".jpeg"; // Create a new file path with .jpeg extension
    await sharp(req.file.path).toFormat('jpeg').toFile(outputPath);
    fs.unlinkSync(req.file.path); // Delete the original file
    imagePart = fileToGenerativePart(outputPath, 'image/jpeg');
    fs.unlinkSync(outputPath); // Optionally delete the converted file after processing
  } else {
    imagePart = fileToGenerativePart(req.file.path, req.file.mimetype);
    fs.unlinkSync(req.file.path); // Delete the original file
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = await response.text();
    console.log(text);

    // uncomment this if you'd like to send response back to the client
    // res.json({ result: text });
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Error processing the image.');
  }
});

app.listen(port, () => {
  console.log('Server running on port ${port}');
});