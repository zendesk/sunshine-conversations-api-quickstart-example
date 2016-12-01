# Smooch API Quickstart Sample code

## Get started

For a detailed guide, see the [Smooch API Quickstart](https://docs.smooch.io/docs/api-quickstart)

### Node.js

- Clone the repository
- Go to the _nodejs_ subdirectory
- Update index.js to include your secret key and key ID from your [Smooch](app.smooch.io) settings
- Install dependencies (`npm install`)
- Run the server (`node index`)
- Use [ngrok](https://ngrok.com/) to create a secure tunnel to port 8000
- Create a Facebook page and [connect it to Smooch](https://app.smooch.io/integrations/messenger)
- Create a Webhook from your [dashboard](https://app.smooch.io/integrations/webhook) and point it at the full url for the /messages endpoint (e.g. https://https://MY-NGROK-DOMAIN.ngrok.io/messages )
- Send messages to your Facebook page and watch the auto-replies roll in.
