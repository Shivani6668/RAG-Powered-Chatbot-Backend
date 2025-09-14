// src/services/vectorStore.js
const { QdrantClient } = require('@qdrant/js-client-rest');
const crypto = require('crypto');
const { generateSummaryEmbedding } = require('../services/geminiService'); // Hypothetical embedding service
require('dotenv').config();

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
  checkCompatibility: false,
});

async function upsertToQdrant(collectionName, articles) {
  const points = articles.map((article) => ({
    id: crypto.randomUUID(),
    payload: {
      title: article.title,
      summary: article.summary,
      link: article.link,
    },
    vector: Array(1536).fill(Math.random()), // placeholder vector
  }));

  try {
    await client.upsert(collectionName, { points });
    console.log(`Inserted ${points.length} articles to Qdrant Cloud.`);
  } catch (err) {
    console.error("Error inserting to Qdrant:", err);
  }
}



async function searchInQdrant(query, topK = 3) {
  // Simulate embedding by summarizing query (Gemini hack)
  const summary = await generateSummaryEmbedding(query);

  // Use fake embedding or hybrid search (Qdrant supports keyword search too)
  const results = await client.search('news_articles', {
    vector: Array(1536).fill(Math.random()), // placeholder vector
    limit: topK
  });

  return results;
}

module.exports = { upsertToQdrant, searchInQdrant };
