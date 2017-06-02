const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const port = process.env.PORT || 8080;
const ip = process.env.IP || '0.0.0.0';
const DB_URL = 'db.json';

app.use(bodyParser.json());

// accept CORS requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/unicorns/get', (req, res) => {
  const body = req.body;
  if(body) {
    fs.readFile('db.json', 'utf8', (err, data) => {
      if(err) {
        res.status(500).json({
          message: 'database error'
        });
      } else {
        const parsed = JSON.parse(data);
        console.log(parsed);
        res.status(200).json(parsed.unicorns);
      }
    });
  } else {
    res.status(400).json({
      message: 'error no request body'
    });
  }
});

app.post('/api/unicorns/create', (req, res) => {
  const body = req.body;
  if(body && body.unicorn) {
    const u = body.unicorn;
    !(u.name && u.age && u.color && u.gender) ? res.status(400).json({message: 'user input error'}) : '';
    fs.readFile(DB_URL, 'utf8', (err, data) => {
      if(err) {
        console.log(err);
        res.status(500).json({message: 'database error'});
      } else {
        const parsed = JSON.parse(data);
        parsed.unicorns.push(u);
        console.log(parsed);
        fs.writeFile(DB_URL, JSON.stringify(parsed), (err) => {
          if(err) {
            res.status(500).json({message: 'database @ write error'});
          } else {
            res.status(200).json(parsed.unicorns);
          }
        });
      }
    });
  } else {
    res.status(400).json({message: 'error no request body'});
  }
});

app.listen(port, ip, () => {
  console.log(`server ready on ${ip}:${port}`)
});