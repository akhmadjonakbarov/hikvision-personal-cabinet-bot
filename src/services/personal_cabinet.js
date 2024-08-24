const axios = require("axios");


class PersonalCabinet {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }


    async getPersonalInfo(chatId) {
        try {
            const response = await axios.get(`${this.baseUrl}/${chatId}`);

            return response.data;
        } catch (e) {
            throw e;
        }
    }
}


module.exports = PersonalCabinet;