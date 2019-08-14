const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sprintf = require('sprintf-js').sprintf;
const util = require('util');

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

// TODO crypto おかしいんんで、後で使う時に検証をすること
module.exports = {
  generateToken: (data, JWT_SECRET, expires) => {
    return jwt.sign(data, JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: expires
    });
  },
  verifyToken: (token, JWT_SECRET) => {
    return jwt.verify(token, JWT_SECRET);
  },
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
  },
  generatePwd: async (pwd) => {
    const buf = await randomBytesPromise(16);
    const salt = buf.toString('base64');
    pwd = await pbkdf2Promise(pwd, salt, 101395, 16, 'sha512');
    return pwd.toString('hex');
  }
};