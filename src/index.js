const launchBot = require('../src/config/bot_config');


launchBot().then(value => {
    console.log("Bot is running");
})