# Smooch API Examples - Start Branch

## Get started

For a detailed guide, see the [Smooch API Quickstart](https://docs.smooch.io/docs/api-quickstart)

## First Step

This branch, "Start", contains a basic, empty Express app from which the rest of the demo is built. If you want to see the server built in stages, take a look at the other branches named "StepN". The complete example is available in the master branch. 

### Node.js

1. Clone the repository
2. Go to the _nodejs_ subdirectory
3. Update index.js to include your secret key and key ID from your [Smooch](app.smooch.io) settings
4. Install dependencies (`npm install`)
5. Run the server (`node index`)
6. Use [ngrok](https://ngrok.com/) to create a secure tunnel to port 8000
7. Create a Facebook page and [connect it to Smooch](https://app.smooch.io/integrations/messenger)
8. Create a Webhook from your [dashboard](https://app.smooch.io/integrations/webhook) and point it at the full url for the /messages endpoint (e.g. https://https://MY-NGROK-DOMAIN.ngrok.io/messages )
9. Send messages to your Facebook page and watch the auto-replies roll in

### Python

1. Fork the Smooch API Examples repository
2. Write an example in Python
3. Make a PR
