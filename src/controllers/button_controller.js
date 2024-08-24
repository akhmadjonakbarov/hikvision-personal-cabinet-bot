const GroupServiceApi = require("../services/register_service_api");
const ScoreServiceApi = require("../services/score_service_api");
const PersonalCabinet = require("../services/personal_cabinet");
const {personalCabinetButtons, mainButtons, balanceButtons, backButton} = require("../views/markup_buttons");

class ButtonController {
    constructor(chatId) {
        this.chatId = chatId;
        this.personalCabinetData = null;

        this.initApi();
    }

    async initApi() {
        const personalCabinet = new PersonalCabinet("https://bot.programm.uz/api/cabinet");
        try {
            this.personalCabinetData = await personalCabinet.getPersonalInfo(this.chatId);
        } catch (e) {
            console.error(e.message);
        }
    }

    handleRegister(bot) {
        const groupServiceApi = new GroupServiceApi("https://bot.programm.uz/api/register");

        bot.hears('Ro’yhatga kirish', async (ctx) => {
            try {
                const {username, group_id} = ctx.message.chat;
                const response = await groupServiceApi.registerUser(username, group_id);
                if (response.success) {
                    await ctx.reply('Ro’yhatga kirildi!', mainButtons);
                } else {
                    await ctx.reply('Ro’yhatga kirishda xatolik yuz berdi.');
                }
            } catch (error) {
                console.error('Error registering user:', error);
                await ctx.reply('Ro’yhatga kirishda xatolik yuz berdi.');
            }
        });
    }

    handleMainButtons(bot) {
        bot.hears('Shahsiy kabinet', async (ctx) => {
            try {
                if (this.personalCabinetData != null) {
                    const data = await this.personalCabinetData.data;

                    const message = `👥 *Group*\n\n*Nomi:* ${data.name}\n*Rahbar:* ${data.capitan}\n*Ishchilar soni:* ${data.count} ta\n*To’plagan bali:* ${data.ball}`;

                    // Send the formatted message with Markdown parse mode
                    await ctx.reply(message, {parse_mode: 'Markdown'});
                } else {
                    await ctx.reply('Maʼlumotni olishda xatolik yuz berdi.');
                }

                await ctx.reply('Shahsiy kabinetga xush kelibsiz!', personalCabinetButtons);
            } catch (error) {
                console.error('Error fetching group data:', error);
                await ctx.reply('Maʼlumotni olishda xatolik yuz berdi.');
            }
        });

        bot.hears('Yordam', (ctx) => {
            ctx.reply('Qanday yordam kerak?');
        });
    }

    handlePersonalCabinetButtons(bot) {
        const scoreApiService = new ScoreServiceApi("https://bot.programm.uz/api/ball");
        bot.hears('Ball yig\'ish uchun nima qilish kerak? 📃', async (ctx) => {
            const infoForGettingScore = await scoreApiService.getScore();
            await ctx.reply(`${infoForGettingScore.data.text}`);
        });


        bot.hears('Balansni tekshirish 💸', async (ctx) => {

            /*
            *  TODO: 1. 3 ta tugma chiqadi vaqtlarni tanlash uchun
            *  TODO: 2. vaqt orqaliqlarini tanlash uchun tugma
            *
            * */


            try {
                ctx.reply("Vaqtni tanlang!", balanceButtons);
                bot.hears('7 kun', async (ctx) => {
                    ctx.reply("Balans: 7000 so'm");
                });
                bot.hears('1 oy', async (ctx) => {
                    ctx.reply("Balans: 10000 so'm");
                });
                bot.hears("Ma'lum vaqt oralig'i", async (ctx) => {
                    await ctx.reply("Iltimos vaqt oralig'ni kiriting.\nMisol: <b>20.05.2024 dan 02.06.2024 gacha</b>", {
                        parse_mode: 'HTML',
                    });
                });

            } catch (e) {
                console.error(e)
            }

        });

        bot.hears('Bosh sahifa ⬅', (ctx) => {
            ctx.reply('Bosh sahifaga qaytish.', mainButtons);
        });
    }


    setupHandlers(bot) {
        this.handleRegister(bot);
        this.handleMainButtons(bot);
        this.handlePersonalCabinetButtons(bot);
    }
}

module.exports = ButtonController;
