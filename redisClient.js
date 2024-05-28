// redisClient.js
const redis = require('redis');

let redisClient;

const getRedisClient = () => {
  if (!redisClient) {
    redisClient = redis.createClient({
      host: 'db-redis-blr1-55103-do-user-13729304-0.c.db.ondigitalocean.com',
      port: 25061,
      password: 'AVNS_3Sj9qjkIRWdTG_4UIph'
    });

    redisClient.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }
  return redisClient;
};

module.exports = getRedisClient;
