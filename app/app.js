const { createProvider } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
// const { ecommerceFLow } = require('./flows/ecommerceFlow');
// const { tiketsFlow } = require('./flows/strapiTicketsFlow');
const { ChatGPTBot } = require('./bots/chatGPTBot');
// const { mainFlow, goodByFlow, eventsFlows, noteVoice } = require('./flows/mainFlow');


exports.initChatBot = async () => {
  const adapterDB = new MockAdapter();
  // const adapterFlow = bot.createFlow([tiketsFlow]);
  const adapterProvider = createProvider(BaileysProvider);

  new ChatGPTBot(
    // flow: adapterFlow,
    adapterDB,
    adapterProvider,
  );

  QRPortalWeb();
};
