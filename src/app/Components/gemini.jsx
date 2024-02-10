const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const FormData = require('form-data');

// Replace with your actual API key
const API_KEY = 'AIzaSyAXHmtulh-E58AHJkGOL4hOjvSg6UPMsHU';

async function downloadImage(url, path) {
  const response = await axios.get(url, { responseType: 'stream' });
  const writer = fs.createWriteStream(path);
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function resizeAndConvertToBase64(inputPath, outputPath) {
  await sharp(inputPath)
    .resize(512, Math.round(512 * (await sharp(inputPath).metadata()).height / (await sharp(inputPath).metadata()).width))
    .toBuffer()
    .then(buffer => {
      fs.writeFileSync(outputPath, buffer.toString('base64'));
    });
}

async function sendImagesToGemini(prompt, imagePath) {
  const base64Image = fs.readFileSync(imagePath, 'utf8');
  const payload = {
    contents: [{
      parts: [
        { text: prompt },
        {
          inline_data: {
            mime_type: 'image/jpeg',
            data: base64Image
          }
        }
      ]
    }]
  };

  const form = new FormData();
  form.append('requests', JSON.stringify(payload));

  const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${API_KEY}`, form, {
    headers: form.getHeaders(),
    maxContentLength: Infinity,
    maxBodyLength: Infinity
  });

  const text = response.data.responses[0].text;
  console.log(text);
}

module.exports = async function geminiRequestHandler(req, res) {
  const prompt = req.body.prompt;
  const imageUrl = req.body.imageUrl;
  const imagePath = './temp_image.jpg';
  const base64Path = './temp_base64.txt';

  try {
    await downloadImage(imageUrl, imagePath);
    // await resizeAndConvertToBase64(imagePath, base64Path);
    await sendImagesToGemini(prompt, base64Path);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    // Clean up temporary files
    fs.unlinkSync(imagePath);
    fs.unlinkSync(base64Path);
  }
};
