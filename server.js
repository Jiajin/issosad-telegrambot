const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')

//Start anti-sleep code
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//end anti-sleep code


const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username
})
var maxRandomNo = 30;
var threshold = 100;
var replyPhrase = "This is so sad";
var dict ={
  default: 90
};
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

bot.start((ctx) => ctx.reply('Hello'))
bot.help((ctx) => ctx.reply('Just start the bot and it will randomly reply!'))
bot.on('message', (ctx) => 
{
    console.log("user:" + ctx.message.from.id);
    console.log("message:" + ctx.message.text);
	if(dict[ctx.message.chat.id] === undefined)
	{
		console.log("new chatId" + ctx.message.chat.id);
    
		dict[ctx.message.chat.id] = 90;
	}else{
		console.log("before: " + dict[ctx.message.chat.id]);
		dict[ctx.message.chat.id] = dict[ctx.message.chat.id] + getRandomInt(maxRandomNo);
		console.log("after" + dict[ctx.message.chat.id]);
		if(dict[ctx.message.chat.id] > 100)
		{
			dict[ctx.message.chat.id] = 0;
			ctx.reply(replyPhrase, Extra.inReplyTo(ctx.message.message_id))
		}
	}
	
})
bot.action('delete', ({ deleteMessage }) => deleteMessage())
bot.startPolling()