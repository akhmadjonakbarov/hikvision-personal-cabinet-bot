class ApiConfig {
    static API_URL = "https://bot.programm.uz/api";
    static PERSONAL_CABINET_URL = `${ApiConfig.API_URL}/cabinet`;
    static REGISTER_SERVICE_URL = `${ApiConfig.API_URL}/group`;
    static GETTING_SCORE_INFO_URL = `${ApiConfig.API_URL}/ball`;

    static getPersonalCabinetUrl() {
        return this.PERSONAL_CABINET_URL;
    }

    static getRegisterUrl() {
        return this.REGISTER_SERVICE_URL;
    }

    static getScoreInfoUrl() {
        return this.GETTING_SCORE_INFO_URL
    }
}


module.exports = ApiConfig;
