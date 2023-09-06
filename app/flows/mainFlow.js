const bot = require('@bot-whatsapp/bot');


// global flow
exports.mainFlow = (
  bot.addKeyword(['hola', 'ole', 'alo', 'buenas', 'buenos dias', 'hey', 'buenas tardes'], { sensitive: false })
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
);


// global flow
exports.goodByFlow = (
  bot.addKeyword(['chao']).addAnswer(['Nos vemos'])
);
