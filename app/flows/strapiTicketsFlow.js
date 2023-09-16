const bot = require("@bot-whatsapp/bot");
const { default: axios } = require("axios");


const strapiAPI = 'https://api-9hq8a.strapidemo.com/api';
const accessToken = '15c6c812399c9eb4f806dceb85f6ead7a42d1d7ed09d6e5ca9a19dd3f19e85d8465b0d465aef1d77bd50c886d186b06da9541a37e228cc7ab24a348a3a3747f6b06ddb4a768f2b1765b17a42aa3906419a9c4fed947968636a3bfca9ab2f7a985a0432a5b912e743e9c65d062a0d4fcc0ec46f7ca8bc932b90662308a8105163';
let GLOBAL_STATE = {};

exports.tiketsFlow = (
  bot
    .addKeyword('hola')
    .addAnswer('Bienvenido a mi *Tienda Virtual*')
    .addAnswer(
      'Cual es tu nombre?',

      { capture: true },

      async (ctx, { fallBack, flowDynamic }) => {
        GLOBAL_STATE[ctx.from] = {
          phone_number: ctx.from,
          costumer_name: ctx.body,
          // address: '',
          // description: ''
        }
      }
    )
    .addAnswer(
      'Direccion de envio?',

      { capture: true },

      async (ctx, { fallBack, flowDynamic }) => {
        GLOBAL_STATE[ctx.from] = {
          ...GLOBAL_STATE[ctx.from],
          address: ctx.body,
        }
      }
    )
    .addAnswer(
      'Description?',

      { capture: true },

      async (ctx, { fallBack, flowDynamic }) => {
        GLOBAL_STATE[ctx.from] = {
          ...GLOBAL_STATE[ctx.from],
          description: ctx.body,
        }
      }
    )
    .addAnswer(
      'Tu orden se esta procesando...',
      null,
      async (ctx, { fallBack, flowDynamic }) => {
        console.log(GLOBAL_STATE[ctx.from])
        try {
          const { data } = (
            await axios
              .post(
                `${strapiAPI}/tickets`,
                { data: GLOBAL_STATE[ctx.from] },
                { headers: { Authorization: `Bearer ${accessToken}` } }
              )
          );

          await flowDynamic('user tikect created successfully')
        }
        catch (error) {
          console.log(error.name)
          await flowDynamic('There was a problem')
        }
      }
    )
);
