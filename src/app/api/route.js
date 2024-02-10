// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IncomingForm } from 'formidable';
import fs from 'fs';
import axios from 'axios';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve(files);
      });
    });

    const audioFile = data.audio.filepath;
    const audioData = fs.readFileSync(audioFile);
    const apiKey = 'aead6301dbd547c9a9a8d87166dc1049'; // Store your API key in .env.local

    try {
      const uploadResponse = await axios({
        method: 'post',
        url: 'https://api.assemblyai.com/v2/upload',
        headers: {
          authorization: apiKey,
          'Transfer-Encoding': 'chunked',
        },
        data: audioData,
      });

      const transcriptionResponse = await axios({
        method: 'post',
        url: 'https://api.assemblyai.com/v2/transcribe',
        headers: {
          authorization: apiKey,
          'Content-Type': 'application/json',
        },
        data: {
          audio_url: uploadResponse.data.upload_url,
        },
      });

      // Polling AssemblyAI for the transcription result...
      // For simplicity, directly sending the response (you should implement polling based on the transcription id)
      res.status(200).json(transcriptionResponse.data);
    } catch (error) {
      console.error('Transcription error:', error);
      res.status(500).json({ error: 'Error transcribing audio' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
