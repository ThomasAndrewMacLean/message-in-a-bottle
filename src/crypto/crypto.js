import crypto from 'crypto';
const algorithm = 'aes-256-ctr';

export const encrypt = (text, key) => {
  var cipher = crypto.createCipher(algorithm, key.toLowerCase());
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

export const decrypt = (text, key) => {
  var decipher = crypto.createDecipher(algorithm, key.toLowerCase());
  var dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};
