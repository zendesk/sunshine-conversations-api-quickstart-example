'use strict';

// Imports
const express = require('express');
const bodyParser = require('body-parser');
const SunshineConversationsApi = require('./dist/smooch-core-v2');


// Config
let defaultClient = SunshineConversationsApi.ApiClient.instance;
let basicAuth = defaultClient.authentications['basicAuth'];
basicAuth.username = 'app_5f621864eeda8f000c4ca199'
basicAuth.password = 'CJ2mNgfrhDCTK7UIvA9dEBMEH3obo2O-GnMCk88K-1OHU01PltrcAzURWfl_b-9TjwZ9Up2oT8DjQetCd-FZlg'
const PORT = 8000;

const apiInstance = new SunshineConversationsApi.MessagesApi()

// Server https://expressjs.com/en/guide/routing.html
const app = express();

app.use(bodyParser.json());

// Expose /messages endpoint to capture webhooks https://docs.smooch.io/rest/#webhooks-payload
app.post('/messages', function(req, res) {
  console.log('webhook PAYLOAD:\n', JSON.stringify(req.body, null, 4));

  const conversationId = req.body.conversation._id;
  const appId = req.body.app._id;

  // Call REST API to send message https://docs.smooch.io/rest/#post-message
  if (req.body.trigger === 'message:appUser') {
    sendMessage(appId, conversationId);
    res.end();
  }
});

// Listen on port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

async function sendMessage(appId, conversationId){
    let messagePost = new SunshineConversationsApi.MessagePost();  
    messagePost.setAuthor({role: 'business'});
    messagePost.setContent({type: 'text', text: 'Live long and propser'});
    let response = await apiInstance.postMessage(appId, conversationId, messagePost);
    console.log('API RESPONSE:\n', response);
}