const bot = require('@bot-whatsapp/bot');


// subflows
const nextFlow = (
  bot.addKeyword(["siguiente"])
    .addAnswer(
      [
        'Abracadabra, estas son las opciones del dia:',
        '1 *gato1*',
        '2 *gato2*',
        '3 *gato3*',
      ],

      { capture: true }, // waits for user anwswer, before passing to the next answer

      async (ctx, { fallBack }) => {
        if (![1, 2, 3].includes(Number(ctx.body))) {
          // fallBack('esa opcion no es vaida')
          return fallBack()
        }
        else {
          const userResponse = Number(ctx.body)
          console.log(userResponse)
        }
      }
    )
    .addAnswer('Gracias por tu decision')
);

const prevFlow = (
  bot.addKeyword(["anterior"])
    .addAnswer('Abracadabra anterior')
);


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
        '',
        'escribe *siguiente*',
        'escribe *anterior*',
        'para ver los subflujos'
      ],
      null,
      null,
      [prevFlow, nextFlow]
    )
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


// exports.flowString = (
//   bot.addKeyword('hola').addAnswer('Este mensaje envia tres botones', {
//     buttons: [{ body: 'Boton 1' }, { body: 'Boton 2' }, { body: 'Boton 3' }],
//   })
// );
