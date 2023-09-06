const bot = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const { mainFlow, goodByFlow } = require('./flows/mainFlow');


exports.initializeBot = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = bot.createFlow([mainFlow, goodByFlow]);
  const adapterProvider = bot.createProvider(BaileysProvider);

  bot.createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};
