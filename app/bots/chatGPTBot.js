const { CoreClass, EVENTS } = require("@bot-whatsapp/bot");


class ChatGPTBot extends CoreClass {

  queue = [];
  openAI;


  constructor(_dataBase, _provider) {
    super(null, _dataBase, _provider, { listEvents: EVENTS });
    this.init().then();
  }


  async init() {
    const { ChatGPTAPI } = await import('chatgpt');

    this.openAI = new ChatGPTAPI({
      apiKey: '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'
    });
  }


  handleMsg = async (ctx) => {
    if (!ctx.body) return

    // let prevMsg = await this.databaseClass.getPrevByNumber(ctx.from);
    // const refToContinue = this.flowClass.findBySerialize(prevMsg?.refSerialize);

    // if (prevMsg?.ref) {
    //   delete prevMsg._id;
    //   const ctxByNumber = toCtx({
    //     body,
    //     from,
    //     prevRef: prevMsg.refSerialize,
    //   });
    //   await this.databaseClass.save(ctxByNumber);
    // }

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
}

// new ChatGPTBot;

module.exports = { ChatGPTBot };
