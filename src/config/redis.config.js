const redis = require('redis');

const client = redis.createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true, // only if it's a rediss://
    rejectUnauthorized: false
  }
});

client.connect();
