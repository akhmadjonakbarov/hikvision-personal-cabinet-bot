const axios = require("axios");

class ScoreServiceApi {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }


    async getScore() {
        try {
            const response = await axios.get(this.baseUrl);
            return response.data;
        } catch (e) {
            throw e;
        }
    }

}


module.exports = ScoreServiceApi;