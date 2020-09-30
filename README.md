# Sunshine Conversations API Examples

## Get started

For a detailed guide, see the [Sunshine Conversations API Quickstart](https://docs.smooch.io/guide/api-quickstart):

### Node.js

1. Clone the repository
2. Go to the _nodejs_ subdirectory
3. Update index.js to include your secret key and key ID from your [Sunshine Conversations](https://app.smooch.io) settings
4. Install dependencies (`npm install`)
5. Run the server (`node index`)
6. Use [ngrok](https://ngrok.com/) to create a secure tunnel to port 8000(`ngrok http 8000` after ngrok is installed on your PC)
7. Create a Facebook page and [connect it to Sunshine Conversations](https://app.smooch.io/integrations/messenger)
8. Create a Webhook from your [dashboard](https://app.smooch.io/integrations/webhook) and point it at the full url for the /messages endpoint (e.g. https://MY-NGROK-DOMAIN.ngrok.io/messages )
9. Send messages to your Facebook page and watch the auto-replies roll in
