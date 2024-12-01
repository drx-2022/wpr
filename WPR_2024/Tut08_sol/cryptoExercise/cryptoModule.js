// cryptoModule.js
const crypto = require('crypto');


// Function to encrypt text using AES-128-ECB
function encryptText(plainText, key) {
    if (key.length !== 16) {
        throw new Error('Key must be 16 bytes long (128 bits)');
    }

    const cipher = crypto.createCipheriv('aes-128-ecb', Buffer.from(key), null);
    let encrypted = cipher.update(plainText, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

// Function to decrypt text using AES-128-ECB
function decryptText(encryptedText, key) {
    if (key.length !== 16) {
        throw new Error('Key must be 16 bytes long (128 bits)');
    }

    const decipher = crypto.createDecipheriv('aes-128-ecb', Buffer.from(key), null);
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
function main(){
    const key = '1234567890abcdef'; // 16-byte key
    const plainText = 'Hello, World!';

    // Test Encryption
    const encryptedText = encryptText(plainText, key);
    console.log('Encrypted Text:', encryptedText);

    // Test Decryption
    const decryptedText = decryptText(encryptedText, key);
    console.log('Decrypted Text:', decryptedText);
}
main()
