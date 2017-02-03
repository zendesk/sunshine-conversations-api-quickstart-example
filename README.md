# Smooch API Examples

## Get started

For a detailed guide, see the [Smooch API Quickstart](https://docs.smooch.io/guide/api-quickstart) and [our API QuickStart video tutorial](https://vimeo.com/198071401):

<a href="https://vimeo.com/198071401" target="_blank"><img src="https://i.vimeocdn.com/video/610957143.webp?mw=1800&mh=1013&q=70"
alt="VIMEO" width="240" border="10" /></a>

### Node.js

1. Clone the repository
2. Go to the _nodejs_ subdirectory
3. Update index.js to include your secret key and key ID from your [Smooch](https://app.smooch.io) settings
![Smooch App settings](http://i.imgur.com/oUlMAqz.png)
![Smooch Create new secret key](http://i.imgur.com/Yp7dlO3.png)
4. Install dependencies (`npm install`)
5. Run the server (`node index`)
6. Use [ngrok](https://ngrok.com/) to create a secure tunnel to port 8000(`ngrok http 8000` after ngrok is installed on your PC)
7. Create a Facebook page and [connect it to Smooch](https://app.smooch.io/integrations/messenger)
8. Create a Webhook from your [dashboard](https://app.smooch.io/integrations/webhook) and point it at the full url for the /messages endpoint (e.g. https://MY-NGROK-DOMAIN.ngrok.io/messages )
9. Send messages to your Facebook page and watch the auto-replies roll in

### Python

1. Fork the Smooch API Examples repository
2. Write an example in Python
3. Make a PR
