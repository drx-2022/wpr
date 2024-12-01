// testCrypto.js
const { encryptText, decryptText } = require('./cryptoModule');

const key = '1234567890abcdef'; // 16-byte key
const plainText = 'Hello, World!';

// Test Encryption
const encryptedText = encryptText(plainText, key);
console.log('Encrypted Text:', encryptedText);

// Test Decryption
const decryptedText = decryptText(encryptedText, key);
console.log('Decrypted Text:', decryptedText);
