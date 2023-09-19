const { CoreClass, EVENTS } = require("@bot-whatsapp/bot");


class ChatGPTBot extends CoreClass {

  queue = [];
  openAI = undefined;


  constructor(_dataBase, _provider, _args = {}) {
    super(null, _dataBase, _provider, { ..._args, listEvents: EVENTS });
    this.init().then();
  }


  async init() {
    const { ChatGPTAPI } = await import('chatgpt');

    this.openAI = new ChatGPTAPI({
      apiKey: ''
    });
  }


  handleMsg = async (ctx) => {
    if (!ctx.body) return
    try {
      const interaccionChatGPT = (
        await
          this.openAI
            .sendMessage(
              ctx.body,
              {
                conversationId: (
                  !this.queue.length ?
                    undefined :
                    this.queue[this.queue.length - 1].conversationId
                ),
                parentMessageId: (
                  !this.queue.length ?
                    undefined :
                    this.queue[this.queue.length - 1].id
                ),
              }
            )
      );
      this.queue.push(interaccionChatGPT);
      const parseMessage = {
        ...interaccionChatGPT,
        answer: interaccionChatGPT.text
      }
      // sends the chatGPT response to the user via whatsapp
      this.sendFlowSimple([parseMessage], ctx.from)
      return interaccionChatGPT;
    }
    catch (error) {
      console.log(error)
      return
    }
  }
}

// new ChatGPTBot;

module.exports = { ChatGPTBot };
