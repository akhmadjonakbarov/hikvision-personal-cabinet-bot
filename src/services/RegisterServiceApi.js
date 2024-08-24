const axios = require("axios");

class RegisterServiceApi {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async register(phone_number, chat_id) {
        try {
            const response = await axios.get(`${this.baseUrl}/${phone_number}/${chat_id}`);
            return response.data;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = RegisterServiceApi;