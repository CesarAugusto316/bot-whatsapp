const bot = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
// const { ecommerceFLow } = require('./flows/ecommerceFlow');
const { tiketsFlow } = require('./flows/strapiTicketsFlow');
// const { mainFlow, goodByFlow, eventsFlows, noteVoice } = require('./flows/mainFlow');


exports.initChatBot = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = bot.createFlow([tiketsFlow]);
  const adapterProvider = bot.createProvider(BaileysProvider);

  bot.createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};
