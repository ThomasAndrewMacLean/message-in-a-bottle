"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decrypt = exports.encrypt = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const algorithm = 'aes-256-ctr';

const encrypt = (text, key) => {
  var cipher = _crypto.default.createCipher(algorithm, key);

  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

exports.encrypt = encrypt;

const decrypt = (text, key) => {
  var decipher = _crypto.default.createDecipher(algorithm, key);

  var dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

exports.decrypt = decrypt;