const redis = require('redis');

const client = redis.createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: process.env.REDIS_URL.startsWith('rediss://'),
    rejectUnauthorized: false
  }
});

client.on('error', err => console.error('❌ Redis Error:', err));

(async () => {
  try {
    await client.connect();
    console.log('✅ Redis connected');
  } catch (err) {
    console.error('❌ Redis connection failed:', err);
  }
})();

module.exports = client;
