const bot = require('@bot-whatsapp/bot');


// global flow
exports.mainFlow = (
  bot.addKeyword(['hola', 'ole', 'alo', 'buenas', 'buenos dias', 'hey', 'buenas tardes', 'oye'], { sensitive: false })
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer(
      [
        'te comparto los siguientes links de interes sobre el proyecto',
        '👉 *doc* para ver la documentación',
        '👉 *gracias*  para ver la lista de videos',
        '👉 *discord* unirte al discord',
      ],
      null,
      null,
      // [flowDocs, flowGracias, flowTuto, flowDiscord]
    )
    .addAnswer('te envio un imagen', { media: 'https://cdn.britannica.com/q:60/91/181391-050-1DA18304/cat-toes-paw-number-paws-tiger-tabby.jpg' })
    .addAnswer('te envio un video', { media: 'https://www.youtube.com/watch?v=h42b6Tc7UmE' })
);


// https://www.youtube.com/watch?v=h42b6Tc7UmE
// global flow
exports.goodByFlow = (
  bot.addKeyword(['chao']).addAnswer(['Nos vemos'])
);


exports.eventsFlows = (
  bot.addKeyword(bot.EVENTS.WELCOME).addAnswer(['this a welcome messsage'])
);


exports.noteVoice = (
  bot.addKeyword(bot.EVENTS.VOICE_NOTE).addAnswer(['This is a voice note'])
);


exports.flowString = (
  bot.addKeyword('hola').addAnswer('Este mensaje envia tres botones', {
    buttons: [{ body: 'Boton 1' }, { body: 'Boton 2' }, { body: 'Boton 3' }],
  })
);
