// redisClient.js
const redis = require('redis');

let redisClient;

const getRedisClient = () => {
  if (!redisClient) {
    redisClient = redis.createClient({
      host: 'your-redis-host',
      port: your-redis-port,
      password: 'your-redis-password'
    });

    redisClient.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }
  return redisClient;
};

module.exports = getRedisClient;
