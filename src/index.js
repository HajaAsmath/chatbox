import './style/style.css';



window.crypto.subtle.generateKey(
    {
    name: "RSA-OAEP",
    // Consider using a 4096-bit key for systems that require long-term security
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  ).then(keypair => {
      console.log(keypair);
      exportCryptoKey(keypair.privateKey);
      exportPublicCryptoKey(keypair.publicKey);
  });
  var publicKey;
  var privateKey;

  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  }

  async function exportCryptoKey() {
    // const exported = await window.crypto.subtle.exportKey(
    //   "pkcs8",
    //   key
    // );
    // const exportedAsString = ab2str(exported);
    // const exportedAsBase64 = window.btoa(exportedAsString);
    const pemExported = `-----BEGIN PRIVATE KEY-----
    MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDEUK3dEfnpRyg9t1B2XZ5SSKvqb3rme94IzfVqW96Ra4DCuK7xpCGIFVMR0/zQ5Y/IscKOajweIJ2G7Q289vCWBjTedmy5nEKPjDEksmAzK8C33pxk9JVMq4Ffq2nwkUaqrHlFnTuJt5ttlaSMTulK8N6XowhRA3c4Ph6VrIeRjOLUW12vREo73s3BCk88Ousz2FnBfiTBkRfu4/CkPUrx7ZTu2Ynem00DDtO7huK05qsDP0VlNjHKus1OHLHUB9y7CxlZooUUV7GZyUMPadHLaq5iacEvoUkeNd/BfNq5m1QZN4GYQZJl7mWwPKYsfUWb2Iw+7WtgMeLoeeov+kLTAgMBAAECggEAPGiRH5pE+xYU2WzbuxiSu8I1+IVGXb8W80GhN5G+eqQIcqLO3neBg/T/41gGjydcp8afViB1kFW784VleVTJcnjFcwEg8rqVNsPOaXrkJErd2haLrHsgp/+MZ2qBRnAFvUYmaRf5dqbDkqR+BljP6+oTrLiTug4ldO6Ujb0R2GTl+uFQrEB/jSE4nIZ1c0/UOqwOoya9CO+7nyOxwcrxIgiDMOISC2YvuYqg519XzA3h1Iwcle0WLelNIfRF+sTB8pEMBnmAZ/AcoAXaNISI56aYfehSgGnqpXNVaeXmCRd6SF2O/rYeAmGEq73T9ghypyqo6limmzSG2XnhGdLA/QKBgQD0V84jdo824ekW0hKxpPAtvYH/932Pra6e7Kj3DRRFOWC1sR1KEId73ge5d7hDJrqWzTIKcWUiohlspyj6mTQq94sV9M3D8LFaE96pGf1x9shXhQloBUECSZtQ2WAMmQ0IFjiPpZU/DOyU1VGipXbXHMlJ/AwcBJbdv5kdlo7aBQKBgQDNrk2lsnZ0/pbIjNBaNMLt7D0PSjDrgTYJ5Z6lToO0haGrOJ3AhplfUXDQs4bVsQwsWaw0tnGaWhmzObf1RDLcZ/e9EssvOASATumGnTucLvKniyA5Xp7fIdyTpsO5QGFd8cWOTOpngzwBhZl5wFw0bLmb9ZCEgSJ2JTtg6SrI9wKBgQCCtwZ8SkzLW4fKwY9moYorrhoByXDOkGe+dXTe1YxmjA+Eo7+7g6Q3S8xuF/HnWqyvSA7hL1CfeoCHc9WkWplh8xPhJxl9HSKDweV4KYNAmHkM+QrTLxxcEOyaD/AmTSp/jQOtNTPmiw91f7kwfbxZz/iPL9t6kanz7zAGeCjr0QKBgAEjpQR075kIS/eCaCkHv8inlVL/WzQCvDTj07QgsjQOxW14W89UL4dKoTBWvjlyyJl6SazlEc4ED75hZHZ0UT/NR58BeqShT80SItL/DfR4ghmReLU4o/KicmFS/CSLib6Gd0ypembmYC+1+Lqm6RvVOlX1zz4cpP84h5Kq1/TTAoGBANXSLr77YDN/mLZqUpe4KjjCnOdHEgL3zOH0WBfPgnm9IET0YZpYk6cPyRNPVx6o/WKaGAtJe52rMOi3qeLlhRF0hc5/OnC9n+O5gL1iNjer9btV4jA+KNG/q8mAWIDjItsGoKqZzOn9rpM0d1yjtmYWzOIjLea+csb7x1yy8OND
    -----END PRIVATE KEY-----`;

    // privateKey = key;

    console.log(pemExported);

    const result = importPrivateKey(pemExported);
  result.then(res => {
      console.log(res);
      let cat = window.atob(`nVvGGjx9rINgaElXEE6o9XILyHQDW3MKZDSY8T7fw24ABSZtc+NJmh+yy8W6SXsVG2kdTPT/Vs3XHai1xDlPaoETW/FPJxsynK99oAwJIlSxHgC2UjsjUsGEts2vtJayeYbcMkyaK/NRcI2Wo3zowkkTLbGhKr4o9ukYnY58PSWgdNI5EqA9m5tfAEzt2LOI3X/C8KTr62x5RN/5i6Qa0uwUaNId/qNtHP9bd/XF3jJrknfuNeN40mXt9shq2cwRfisv83+TWPW4B+ZF13oVIoFQ6gK/TSZ7zWzDqXoFpjHentuiQ1CaFX9bEt9jJRr/ROjSNSlAe7GSwAqS/Q1+KA==`);
    decryptMessage(res, str2ab(cat)).then(res => {
        let dec = new TextDecoder();
        console.log("resule : "+dec.decode(res));
    });
  });

  }

  exportCryptoKey();

  

  async function exportPublicCryptoKey(key) {
    const exported = await window.crypto.subtle.exportKey(
      "spki",
      key
    );
    const exportedAsString = ab2str(exported);
    const exportedAsBase64 = window.btoa(exportedAsString);
    const pemExported = `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
    publicKey = pemExported;

    console.log(pemExported);
    let enc = encryptMessage(key)
    .then(cypher => {
        let enc = new TextDecoder();
        let cc =  ab2str(cypher);
        let pp = window.btoa(cc);
        console.log(pp);
        let kk = str2ab(window.atob(pp));
        
        decryptMessage(privateKey, cypher).then(res => {
            let dec = new TextDecoder();
            console.log(dec.decode(res));
        });
    })
    .catch(error => {
        console.log(error)
    });
    console.log(enc);

  }

  function getMessageEncoding() {
    let message = 'hello';
    let enc = new TextEncoder();
    return enc.encode(message);
  }
  
  async function encryptMessage(publicKey) {
    let encoded = getMessageEncoding();
    let ciphertext = await window.crypto.subtle.encrypt(
        {
          name: "RSA-OAEP"
        },
        publicKey,
        encoded
      );
    return ciphertext;
  }


/*
Convert a string into an ArrayBuffer
from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
*/
function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
  
  
  /*
  Import a PEM encoded RSA private key, to use for RSA-PSS signing.
  Takes a string containing the PEM encoded key, and returns a Promise
  that will resolve to a CryptoKey representing the private key.
  */
  function importPrivateKey(pem) {
    // fetch the part of the PEM string between header and footer
    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
    // base64 decode the string to get the binary data
    const binaryDerString = window.atob(pemContents);
    // convert from a binary string to an ArrayBuffer
    const binaryDer = str2ab(binaryDerString);
  
    return window.crypto.subtle.importKey(
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

  function decryptMessage(privateKey, ciphertext) {
    return window.crypto.subtle.decrypt(
      {
        name: "RSA-OAEP"
      },
      privateKey,
      ciphertext
    );
  }

  
  

 