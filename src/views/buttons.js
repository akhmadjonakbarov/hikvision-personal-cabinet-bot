// views/buttons.js
const {Markup} = require('telegraf');

const mainButtons = Markup.keyboard([
    ['Shahsiy kabinet', 'Yordam'],
]).resize();

const personalCabinetButtons = Markup.keyboard([
    ['Ball yig\'ish uchun nima qilish kerak? 📃'],
    ['Bosh sahifa ⬅', 'Balansni tekshirish 💸']
]).resize();


module.exports = {
    mainButtons, personalCabinetButtons
};
