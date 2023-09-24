const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
const QR_CODE_LENGTH = 15;

const generateRandomQrCode = () => {
    var result = "";
    for (var i = 0; i < QR_CODE_LENGTH; i++) {
        result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }
    return result;
};

module.exports.generateRandomQrCode = generateRandomQrCode;
