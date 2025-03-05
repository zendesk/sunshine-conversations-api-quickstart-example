"use strict";

// Imports
const express = require("express");
const bodyParser = require("body-parser");
const SunshineConversationsApi = require("sunshine-conversations-client");

const ZENDESK_SUBDOMAIN = "{subdomain}.zendesk.com";
const KEY_ID = "{key-id}";
const KEY_SECRET = "{key-secret}";

// Config
let defaultClient = SunshineConversationsApi.ApiClient.instance;
defaultClient.basePath = `https://${ZENDESK_SUBDOMAIN}/sc`;

let basicAuth = defaultClient.authentications["basicAuth"];
basicAuth.username = KEY_ID;
basicAuth.password = KEY_SECRET;
const PORT = 8000;

const apiInstance = new SunshineConversationsApi.MessagesApi();

// Server https://expressjs.com/en/guide/routing.html
const app = express();

app.use(bodyParser.json());

// Expose /messages endpoint to capture webhooks https://docs.smooch.io/rest/#operation/eventWebhooks
app.post("/messages", async function (req, res) {
  const appId = req.body.app.id;
  const [event] = req.body.events;

  // Call REST API to send message https://docs.smooch.io/rest/#operation/postMessage
  if (event.type === "conversation:message") {
    const { conversation, message } = event.payload;

    if (message.author.type === "user") {
      console.log(
        "User message received:\n",
        JSON.stringify(req.body, null, 4)
      );

      try {
        await sendMessage(
          appId,
          conversation.id,
          `You said: ${message.content.text}`
        );
        console.log("Message sent successfully");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  }

  res.end();
});

// Listen on port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

async function sendMessage(appId, conversationId, text) {
  const messagePost = new SunshineConversationsApi.MessagePost();
  messagePost.setAuthor({ type: "business" });
  messagePost.setContent({ type: "text", text });
  const response = await apiInstance.postMessage(
    appId,
    conversationId,
    messagePost
  );
  console.log("API RESPONSE:\n", JSON.stringify(response, null, 4));
}
