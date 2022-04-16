const axios = require('axios');
const crypto = require('crypto');
const { subtle } = require('crypto').webcrypto;
const path = require('path')
const fs = require('fs')
const atob = require('atob');
let textArray = [];

exports.getPublicKey = function(req, res) {
    const absolutePath = path.resolve('/Users/hasma00/Documents/JSOdin/chatbox/src/publicKey.pem');
    const publicKey = fs.readFileSync(absolutePath, 'utf8');
    res.json({publicKey});
}

exports.saveText = function(req, res) {
    decryptAndSaveMessage(req.body.text);
    res.send('done');
}

exports.getLatestTexts = function(req, res) {
    const response = {
        message: textArray.toString(),
    }
    textArray = [];
    res.json(response);
}

decryptAndSaveMessage = async function (toDecrypt) {
    const absolutePath = path.resolve('/Users/hasma00/Documents/JSOdin/chatbox/src/privateKey.pem');
    const privateKey = fs.readFileSync(absolutePath, 'utf8').toString();
    const pk = await importPrivateKey(privateKey).then(res => {
        const buffer = Buffer.from(toDecrypt, 'base64');
        return subtle.decrypt(
            {
              name: "RSA-OAEP"
            },
            res,
            buffer
          ).then(res => {
            let dec = new TextDecoder();
            textArray.push(dec.decode(res));
          });
    });
  }

  importPrivateKey = function (pem) {
    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length-1);
    //console.log(pemContents);
    // base64 decode the string to get the binary data
    const binaryDerString = atob(pemContents);
    
    // convert from a binary string to an ArrayBuffer
    const binaryDer = str2ab(binaryDerString);
    return subtle.importKey(
        "pkcs8",
        binaryDer,
        {
          name: "RSA-OAEP",
          hash: "SHA-256",
        },
        true,
        [ "decrypt"]
      );
  }

  function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }