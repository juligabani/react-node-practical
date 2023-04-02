const crypto = require("crypto");
const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

exports.error = function(message, status = 400) {

    return { success: false, message: message, data: {} };

};

exports.success = function(message, data = null) {

    var data = (data == null) ? {} : data;

    return { success: true, message: message, data: data };

};

exports.formatValidationResponse = function(errors) {

    var err = errors.array().map((err) => ({ field: err.param, message: err.msg }));

    return this.error(err);
};

exports.encrypt_text = function(text) {

    var cipher = crypto.createCipher(algorithm, secretKey);  
    return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');

};
exports.decrypt_text = function(encrypted) {

    var decipher = crypto.createDecipher(algorithm, secretKey);
    return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
};
