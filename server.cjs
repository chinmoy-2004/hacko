
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize GoogleGenAI client with service account key file
const ai = new GoogleGenAI({
  apiKeyFile: path.join(__dirname, 'service-account.json'), // path to your downloaded JSON key
  // OR apiKey: process.env.GOOGLE_API_KEY if you have a direct key (less common for Gemini)
});

app.post('/api/ask-ai', async (req, res) => {
  try {
    const { messages } = req.body;

    // Combine messages into one string prompt or use the first user message
    // (Modify depending on Gemini API expected input)
    const promptText = messages
      .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');

    // Call Gemini generateContent
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // your chosen Gemini model
      contents: promptText,
    });

    // Send back the AI's reply text
    res.json({ text: response.text });
  } catch (error) {
    console.error('API ERROR:', error);
    res.status(500).json({ error: 'AI request failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
