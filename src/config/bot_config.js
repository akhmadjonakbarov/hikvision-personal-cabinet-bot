// index.js
const ButtonController = require("../controllers/button_controller");
const RegisterServiceApi = require("../services/RegisterServiceApi");
const ApiConfig = require("../core/utils/ApiConfig");
const ControlNumber = require("../core/utils/ControlNumber");
const {mainButtons, sharePhoneNumber} = require("../views/markup_buttons");
const {Telegraf} = require('telegraf');


const bot = new Telegraf('7455268756:AAHsEz4wSEhB2gmH_MeEPtr6mpZhQAtdBSg');


async function launchBot() {

    await bot.start(async (ctx) => {
        const chatId = ctx.message.chat.id;

        // Initialize the ButtonController
        const buttonController = new ButtonController(chatId);

        // Setup handlers for button clicks
        buttonController.setupHandlers(bot);


        // await ctx.reply('Please share your phone number to register:', keyboard);
        const message = `Xush kelibsiz <b>${ctx.message.from.first_name}</b>!\n\nBotdan foydalanish uchun <b>ro'yhatdan o'tishingiz kerak</b>! \n\n<b>Ro'yhatdan o'tish uchun telefon raqamingizni yuboring!</b>`;

        await ctx.reply(message, {parse_mode: 'HTML', ...sharePhoneNumber});
    });

    bot.on('contact', async (ctx) => {
        const contact = ctx.message.contact;
        const registerServiceApi = new RegisterServiceApi(ApiConfig.getRegisterUrl());

        if (contact && contact.phone_number) {
            const phone_number = contact.phone_number;

            // Here, you can perform additional validation if needed
            if (ControlNumber.isValidNumber(phone_number)) {
                // Store or process the phone number
                console.log(`Received phone number: ${phone_number}`);
                const formatted_number = ControlNumber.removePreffix(phone_number);

                const response = await registerServiceApi.register(formatted_number, ctx.message.chat.id);

                const data = response.data;
                console.log(data);

                if (data.success === true) {
                    await ctx.reply("Roʻyxatdan oʻtish muvaffaqiyatli yakunlandi!", mainButtons);
                }

            } else {
                await ctx.reply("Iltimos to'g'ri telefon kiriting!\nIltimos qaytadan boshlash uchun /start kommandasini yuboring",);
            }
        } else {
            await ctx.reply('Telefon raqamingizni qabul qilib bo‘lmadi. Iltimos, qayta urinib koʻring.');
        }
    });


    await bot.launch();
}

module.exports = launchBot;

