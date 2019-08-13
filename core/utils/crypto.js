const crypto = require('crypto');
const sprintf = require('sprintf-js').sprintf;

module.exports = {
  encrypt: (text, key, iv) => {
    key = crypto.createHash("sha256").update(sprintf('%016s', key)).digest();
    iv = Buffer.from(sprintf('%016s',iv.slice(0, 16)));

    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString('hex');
  },
  decrypt: (text, key, iv) => {
    key = crypto.createHash("sha256").update(sprintf('%016s', key)).digest();
    iv = Buffer.from(sprintf('%016s', iv.slice(0, 16)));
    iv = iv.toString('hex');
    iv = Buffer.from(iv, 'hex');

    let encryptedText = Buffer.from(text, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }
};