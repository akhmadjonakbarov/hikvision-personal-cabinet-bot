// index.js
const ButtonController = require("../controllers/button_controller");
const RegisterServiceApi = require("../services/register_service_api");
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
        const registerServiceApi = new RegisterServiceApi("https://bot.programm.uz/api/group")

        if (contact && contact.phone_number) {
            const phoneNumber = contact.phone_number;

            // Here, you can perform additional validation if needed
            if (validatePhoneNumber(phoneNumber)) {
                // Store or process the phone number
                console.log(`Received phone number: ${phoneNumber}`);

                const response = await registerServiceApi.register(phoneNumber, ctx.message.chat.id);

                const data = response.data;

                if (data.success === true) {
                    // Confirm registration
                    await ctx.reply(`Thank you for sharing your phone number: ${phoneNumber}. Registration complete.`, mainButtons);
                }


            } else {
                await ctx.reply('The phone number format is invalid. Please share a valid phone number.');
            }
        } else {
            await ctx.reply('Failed to receive your phone number. Please try again.');
        }
    });

// Example validation function
    function validatePhoneNumber(phoneNumber) {
        // Implement your validation logic here
        return true; // For example purposes, always return true
    }


    await bot.launch();
}

module.exports = launchBot;

