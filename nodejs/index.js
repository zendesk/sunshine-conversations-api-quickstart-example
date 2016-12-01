'use strict';

// Imports
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const superagent = require('superagent');

// Config
const PORT = 8000;
const KEY_ID = 'your_key_id';
const SECRET = 'your_secret_key';

// JWT https://docs.smooch.io/rest/#jwt
const authToken = jwt.sign({ scope: 'app' }, SECRET, {
    header: {
        typ: 'JWT',
        kid: KEY_ID,
        alg: 'HS256'
    }
});

// Server https://expressjs.com/en/guide/routing.html
const app = express();

app.use(bodyParser.json());

// Expose /messages endpoint to capture webhooks https://docs.smooch.io/rest/#webhooks-payload
app.post('/message', function(req, res) {
  console.log('webhook PAYLOAD:\n', JSON.stringify(req.body, null, 4));

  const appUserId = req.body.appUser._id;
  // Call REST API to send message https://docs.smooch.io/rest/#post-message
  if (req.body.trigger === 'message:appUser') {
    superagent
    .post(`https://app.smooch.io/v1/appusers/${appUserId}/conversation/messages`)
    .send({
        text: 'Live long and prosper',
        role: 'appMaker'
    })
    .set('authorization', `Bearer ${authToken}`)
    .set('Accept', 'application/json')
    .end(function(err, response) {
        console.log('API RESPONSE:\n', err, response.body, response.statusCode);
        res.end();
    });
  }
});

// Listen on port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
