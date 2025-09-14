// src/services/newsIngest.js
const Parser = require('rss-parser');
const parser = new Parser();

async function fetchNewsArticles(limit = 50) {
const feed = await parser.parseURL('https://www.reuters.com/rssFeed/businessNews');
  const articles = feed.items.slice(0, limit).map((item, index) => ({
    id: index + 1,
    title: item.title,
    content: item.contentSnippet || item.content || item.title,
    link: item.link
  }));
  return articles;
}

module.exports = { fetchNewsArticles };
