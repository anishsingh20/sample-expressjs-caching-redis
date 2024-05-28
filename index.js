// app.js
const express = require('express');
const app = express();
const getRedisClient = require('./redisClient');
const client = getRedisClient();

// Endpoint without caching
app.get('/data', (req, res) => {
  const data = fetchDataFromDB();
  res.json(data);
});

// Endpoint with Redis caching
app.get('/cached-data', (req, res) => {
  const key = req.originalUrl;
  client.get(key, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.send(JSON.parse(data));
    } else {
      const data = fetchCachedDataFromDB();
      client.setex(key, 3600, JSON.stringify(data));
      res.json(data);
    }
  });
});

// Simulate database calls
const fetchDataFromDB = () => {
  return { data: 'This is data from the DB' };
};

const fetchCachedDataFromDB = () => {
  return { data: 'This is Cached data from the DB' };
};

for (let line of startupMessage.split("\n")) {
	console.log(line)
}

app.listen(port, () => console.log(`sample-expressjs app listening on port ${port}!`))
