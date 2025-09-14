// src/controllers/chatController.js
const redis = require('../services/redisClient');
const { searchInQdrant } = require('../services/vectorStore');
const { askGemini } = require('../services/geminiService');

// const SESSION_TTL = 60 * 60; // 1 hour
const SESSION_TTL = 259200; // 3 days


exports.handleChat = async (req, res) => {
  console.log('📩 Received chat request:', req.body);

  try {
    const { sessionId, message } = req.body;

    // 🧠 Step 1: Get related context from Qdrant
    const results = await searchInQdrant(message, 3);
    const context = results.map(r => `- ${r.payload.title}: ${r.payload.summary}`).join('\n');

    // 🤖 Step 2: Ask Gemini with context
    const prompt = `You are a helpful assistant. Use the following news context to answer:\n${context}\n\nUser: ${message}`;
    const botReply = await askGemini(prompt);
    // 💾 Step 3: Save chat in Redis
    const sessionKey = `chat:${sessionId}`;
    const history = await redis.get(sessionKey);
    const chatHistory = history ? JSON.parse(history) : [];

    chatHistory.push({ role: 'user', message });
    chatHistory.push({ role: 'bot', message: botReply });

    await redis.setEx(sessionKey, SESSION_TTL, JSON.stringify(chatHistory));

    res.json({ reply: botReply });
  } catch (err) {
    console.error('❌ Chat controller error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};

exports.getSessionHistory = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const history = await redis.get(`chat:${sessionId}`);
    res.json({ history: history ? JSON.parse(history) : [] });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Unable to get session history' });
  }
};

exports.clearSession = async (req, res) => {
  const { sessionId } = req.params;
  try {
    await redis.del(`chat:${sessionId}`);
    res.json({ message: 'Session cleared' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Unable to clear session' });
  }
};
