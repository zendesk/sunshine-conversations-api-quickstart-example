'use strict';

// Imports
const express = require('express');
const bodyParser = require('body-parser');
const SunshineConversationsApi = require('sunshine-conversations-client');


// Config
let defaultClient = SunshineConversationsApi.ApiClient.instance;
let basicAuth = defaultClient.authentications['basicAuth'];
basicAuth.username = 'your_key_id';
basicAuth.password = 'your_secret_key';
const PORT = 8000;

const apiInstance = new SunshineConversationsApi.MessagesApi()

// Server https://expressjs.com/en/guide/routing.html
const app = express();

app.use(bodyParser.json());

// Expose /messages endpoint to capture webhooks https://docs.smooch.io/rest/#operation/eventWebhooks
app.post('/messages', function(req, res) {
  console.log('webhook PAYLOAD:\n', JSON.stringify(req.body, null, 4));

  const appId = req.body.app.id;
  const trigger = req.body.events[0].type;

  // Call REST API to send message https://docs.smooch.io/rest/#operation/postMessage
  if (trigger === 'conversation:message') {
    const authorType = req.body.events[0].payload.message.author.type;
    if(authorType === 'user'){
        const conversationId = req.body.events[0].payload.conversation.id;
        sendMessage(appId, conversationId);
        res.end();
    }
  }
});

// Listen on port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

async function sendMessage(appId, conversationId){
    let messagePost = new SunshineConversationsApi.MessagePost();  
    messagePost.setAuthor({type: 'business'});
    messagePost.setContent({type: 'text', text: 'Live long and prosper'});
    let response = await apiInstance.postMessage(appId, conversationId, messagePost);
    console.log('API RESPONSE:\n', response);
}
