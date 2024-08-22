const {personalCabinetButtons} = require("../views/buttons");
const {mainButtons} = require("../views/buttons");

class ButtonController {
    constructor() {}

    handleMainButtons(bot) {
        bot.hears('Shahsiy kabinet', (ctx) => {
            ctx.reply('Shahsiy kabinetga xush kelibsiz!', personalCabinetButtons);
        });

        bot.hears('Yordam', (ctx) => {
            ctx.reply('Qanday yordam kerak?');
        });
    }

    handlePersonalCabinetButtons(bot) {
        bot.hears('Ball yig\'ish uchun nima qilish kerak? 📃', (ctx) => {
            ctx.reply('Ball yig\'ish uchun qoidalarni bajaring.');
        });

        bot.hears('Balansni tekshirish 💸', (ctx) => {
            ctx.reply('Sizning balansingiz: $500');
        });

        bot.hears('Bosh sahifa ⬅', (ctx) => {
            ctx.reply('Bosh sahifaga qaytish.', mainButtons);
        });
    }

    setupHandlers(bot) {
        this.handleMainButtons(bot);
        this.handlePersonalCabinetButtons(bot);
    }
}

module.exports = ButtonController;
