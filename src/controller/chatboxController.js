const axios = require('axios');
const crypto = require('crypto');
const path = require('path')
const fs = require('fs')
const textArray = [];

exports.getPublicKey = function(req, res) {
    const absolutePath = path.resolve('/Users/hasma00/Documents/JSOdin/chatbox/src/publicKey.pem');
    const publicKey = fs.readFileSync(absolutePath, 'utf8');
    res.send(publicKey);
}

exports.encrypt = function(req, res) {
    const encrypted = encrypt("hello");
    const decrypted = decrypt(encrypted);
    console.log(encrypted);
    console.log(decrypted);
    res.send(decrypted);
} 

exports.saveText = function(req, res) {
    let text = decrypt(req.text);
    text.push(text);
}

exports.getLatestTexts = function(req, res) {
    res.send(text.toString());
}

encrypt = function(toEncrypt) {
    const absolutePath = path.resolve('/Users/hasma00/Documents/JSOdin/chatbox/src/publicKey.pem');
    const publicKey = fs.readFileSync(absolutePath, 'utf8');
    const buffer = Buffer.from(toEncrypt, 'utf8');
    const encrypted = crypto.publicEncrypt({
		key: publicKey,
		padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
		oaepHash: "sha256",
	}, buffer);
    return encrypted.toString('base64');
}


decrypt = function (toDecrypt) {
    const absolutePath = path.resolve('/Users/hasma00/Documents/JSOdin/chatbox/src/privateKey.pem');
    const privateKey = fs.readFileSync(absolutePath, 'utf8');
    const buffer = Buffer.from(toDecrypt, 'base64');
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey.toString(),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
		oaepHash: "sha256",
        passphrase: '',
      },
      buffer,
    );
    return decrypted.toString('utf8')
}