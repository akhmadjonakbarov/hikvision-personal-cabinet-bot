// views/markup_buttons.js
const {Markup} = require('telegraf');


const mainButtons = Markup.keyboard([
    ['Shahsiy kabinet', 'Yordam'],
]).resize();

const personalCabinetButtons = Markup.keyboard([
    ['Ball yig\'ish uchun nima qilish kerak? 📃'],
    ['Bosh sahifa ⬅', 'Balansni tekshirish 💸']
]).resize();

const backButton = Markup.keyboard([
    ['Bosh sahifa ⬅']
]).resize();

const balanceButtons = Markup.keyboard([
    ['7 kun', '1 oy',],
    ['Ma\'lum vaqt oralig\'i']
]).resize();

const sharePhoneNumber = Markup.keyboard([
    [{text: '📞 Telefon raqamni yuborish', request_contact: true}]
]).resize().oneTime();


module.exports = {
    mainButtons, personalCabinetButtons, balanceButtons, backButton, sharePhoneNumber
};
