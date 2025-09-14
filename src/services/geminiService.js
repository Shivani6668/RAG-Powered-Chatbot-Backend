const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const BASE_URL = 'https://generativelanguage.googleapis.com/v1';

let cachedModel = null; // cache selected working model

// 🔍 1. Discover working model dynamically
async function getValidModel() {
  if (cachedModel) return cachedModel;

  try {
    const { data } = await axios.get(`${BASE_URL}/models?key=${GEMINI_API_KEY}`);
    const models = data.models || [];

    const candidate = models.find(m => m.name.includes('gemini-pro')) || models[0];

    if (!candidate) throw new Error('❌ No compatible model found for generateContent');

    cachedModel = candidate.name;
    console.log("✅ Using Gemini model:", cachedModel);
    return cachedModel;
  } catch (err) {
    console.error("❌ Failed to fetch Gemini models:", err.response?.data || err.message);
    throw err;
  }
}

// 🤖 2. Generic Gemini prompt call
async function sendPromptToGemini(promptText) {
  try {
    const model = await getValidModel();
    const url = `${BASE_URL}/${model}:generateContent?key=${GEMINI_API_KEY}`;

    const response = await axios.post(
      url,
      {
        contents: [{ parts: [{ text: promptText }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || '🤷 No response text.';
  } catch (error) {
    console.error('💥 Gemini API call failed:', error.message);
    if (error.response) {
      console.error('📦 Response:', error.response.data);
      console.error('📋 Status:', error.response.status);
    }

    if (error.response?.status === 429) {
      return '🚫 Rate limit exceeded. Please try again later.';
    }

    return '❌ Gemini failed to respond.';
  }
}

// ✨ 3. Summary function using Gemini
async function generateSummaryEmbedding(text) {
  const prompt = `Summarize this article in one paragraph:\n${text}`;
  return await sendPromptToGemini(prompt);
}

// ✨ 4. Ask Gemini anything
async function askGemini(prompt) {
  return await sendPromptToGemini(prompt);
}

module.exports = {
  askGemini,
  generateSummaryEmbedding
};
