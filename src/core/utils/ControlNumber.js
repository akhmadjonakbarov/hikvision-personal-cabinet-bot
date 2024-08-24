class ControlNumber {

    static regex = /^\+998\d{9}$/;

    static isValidNumber(phone_number) {
        return ControlNumber.regex.test(phone_number)
    }

    static removePreffix(phone_number) {
        return phone_number.replace(/^\+998/, '');
    }
}

module.exports = ControlNumber;