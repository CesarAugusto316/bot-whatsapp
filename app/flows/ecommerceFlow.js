const bot = require("@bot-whatsapp/bot");


const itemsFlow = (
  bot
    .addKeyword('ver')
    .addAnswer(
      'Consultando items en la base de datos',
      null,
      async (ctx, { flowDynamic }) => {
        await flowDynamic('espera...')

        const listaDeArticulos = [
          {
            name: 'Item 1'
          },
          {
            name: 'Item 2'
          },
          {
            name: 'Item 3'
          }
        ];
        await new Promise((resolve) => setTimeout(() => resolve(), 4_000));

        // { body: item.name, media: 'https://i.imgur.com/0HpzsEm.png' }  // not working well
        const items = listaDeArticulos.map((item) => ({ body: item.name })); //Item 1, Item 2, Item 3
        await flowDynamic(items);
        // await flowDynamic({ media: 'https://i.imgur.com/0HpzsEm.png' })
      }
    )
);

exports.ecommerceFLow = (
  bot
    .addKeyword(['hola'])
    .addAnswer(
      [
        'Bienvenido a mi *restaurante*',
        'Escribe: *ver* para ver productos'
      ],
      null,
      null,
      [itemsFlow]
      // {}
      // does not work on free whatsapp providers
      // {
      //   button: [
      //     {
      //       body: '🤩 ver productos'
      //     }
      //   ]
      // }
    )
);
