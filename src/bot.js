// bot.js
const {Telegraf} = require('telegraf');
const personalCabinetHandler = require('./controllers/button_controller');
const ButtonController = require("./controllers/button_controller");
const {mainButtons, personalCabinetButtons} = require('./views/buttons');

const bot = new Telegraf('7455268756:AAHsEz4wSEhB2gmH_MeEPtr6mpZhQAtdBSg');


// Initialize the ButtonController
const buttonController = new ButtonController();

// Setup handlers for button clicks
buttonController.setupHandlers(bot);

bot.start((ctx) => {
    ctx.reply('Xush kelibsiz!', mainButtons);
});

bot.launch();

console.log('Bot is running...');

