// src/scripts/ingestAndStore.js
const Parser = require('rss-parser');
const { upsertToQdrant } = require('../services/vectorStore');

const parser = new Parser({
  // If your feed requires authentication, set it here
  headers: {
    'User-Agent': 'News-RAG-Chatbot/1.0',
    // 'Authorization': 'Bearer YOUR_FEED_API_KEY', // uncomment if needed
  },
});

const FEED_URL = 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml';

const COLLECTION_NAME = 'news_articles';

async function fetchAndStore() {
  try {
    const feed = await parser.parseURL(FEED_URL);

    const articles = feed.items.map((item) => ({
      title: item.title,
      summary: item.contentSnippet || item.content || '',
      link: item.link,
    }));

    console.log(`Fetched ${articles.length} articles from RSS feed.`);

    await upsertToQdrant(COLLECTION_NAME, articles);
  } catch (err) {
    console.error("Error fetching RSS feed:", err);
  }
}

fetchAndStore();
