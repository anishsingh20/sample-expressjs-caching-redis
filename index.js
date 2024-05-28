const express = require('express');
const app = express();
const getRedisClient = require('./redisClient');
const client = getRedisClient();

app.get('/data', (req, res) => {
  try {
    const data = fetchDataFromDB();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred fetching data from the DB' });
  }
});

app.get('/cached-data', (req, res) => {
  const key = req.originalUrl;
  client.get(key, (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Redis error occurred' });
      return;
    }
    if (data !== null) {
      res.send(JSON.parse(data));
    } else {
      try {
        const data = fetchCachedDataFromDB();
        client.setex(key, 3600, JSON.stringify(data));
        res.json(data);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred fetching cached data from the DB' });
      }
    }
  });
});

const fetchDataFromDB = () => {
  return { data: 'This is data from the DB' };
};

const fetchCachedDataFromDB = () => {
  return { data: 'This is Cached data from the DB' };
};

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
