# Sunshine Conversations API Examples

## Get started

For a detailed guide, see the [Sunshine Conversations API Quickstart](https://developer.zendesk.com/documentation/conversations/getting-started/api-quickstart/):

### Node.js

1. Clone the repository
2. Go to the _nodejs_ subdirectory
3. Install dependencies (`npm install`)
4. Use [ngrok](https://ngrok.com/) to create a secure tunnel to port 8000 (`ngrok http 8000` after ngrok is installed on your PC)
5. Create a webhook and API key in Admin Center and point it at the full url for the `/messages` endpoint (e.g. `https://MY-NGROK-DOMAIN.ngrok.io/messages`)
6. Update `index.js` to set proper values for `ZENDESK_SUBDOMAIN`, `KEY_ID` and `KEY_SECRET`
7. Run the server (`node index`)
8. Send messages to your Web Widget and watch the auto-replies roll in
