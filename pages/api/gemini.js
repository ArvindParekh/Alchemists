// pages/api/gemini.js
import axios from 'axios';
import sharp from 'sharp';
import fs from 'fs';
import FormData from 'form-data';

// Replace with your actual API key
const API_KEY = 'AIzaSyAXHmtulh-E58AHJkGOL4hOjvSg6UPMsHU';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { prompt, imageUrl } = req.body;

  try {
    // Download the image
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    // Resize the image
    const resizedImageBuffer = await sharp(imageBuffer)
      .resize(512, Math.round(512 * (await sharp(imageBuffer).metadata()).height / (await sharp(imageBuffer).metadata()).width))
      .toBuffer();

    // Convert the image to base64
    const base64Image = resizedImageBuffer.toString('base64');

    // Create the JSON payload
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

    // Send the request to the Gemini API
    const form = new FormData();
    form.append('requests', JSON.stringify(payload));

    const geminiResponse = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${API_KEY}`, form, {
      headers: form.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    // Extract the text from the response
    const text = geminiResponse.data.responses[0].text;

    // Return the text in the response
    res.status(200).json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while processing the request.' });
  }
}
