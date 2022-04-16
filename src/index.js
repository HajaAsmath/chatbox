import './style/style.css';

    const sumbitButton = document.querySelector('#submitButton');
    sumbitButton.addEventListener('click' , encryptAndSendMessage);

    let messageQueue = [];

    async function encryptAndSendMessage() {
        let { publicKey }= await fetch('http://localhost:3001/getPublicKey').then((res) => res.json());
        const message = document.querySelector('#message').value;
        insertIntoDom(message, true);
        cleanInputField();
        const importedPublicKey = await importPublicKey(publicKey)
        const encodedChiperText = await encryptMessage(importedPublicKey, message);
        //const encodedChiperText = window.btoa(chipherText);
        const body = {
            text: encodedChiperText
        }
        console.log(JSON.stringify(body));
        await fetch('http://localhost:3001/sendText', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(body)
        }).then(res => {
            if(res.ok) {
                console.log('Text Sent');
            } else {
                addToQueue(encodedChiperText);
            }
        })
        .catch(error => console.log(error));
    }

    function addToQueue(message) {
        messageQueue.push(message);
    }

    function cleanInputField() {
        const inputfield = document.querySelector('#message');
        inputfield.value = '';
    }

    setInterval(getLatestMessage, 1000);
    
    async function getLatestMessage() {
        let { message } = await fetch('http://localhost:3000/getLatestTexts').then(res => res.json());
        if(message.length > 0) {
            const messageArray = message.split(',');
            console.log(messageArray);
            for(let i = 0;i<messageArray.length; i++) {
                insertIntoDom(messageArray[i], false);
            }
        }
    }

    function insertIntoDom(message, self) {
        const chatContainer = document.querySelector('#chat-container');
        const messageSpan = document.createElement('span');
        messageSpan.textContent = message;
        messageSpan.classList.add(self == true? 'self':'other');
        chatContainer.appendChild(messageSpan);
    }

  function getMessageEncoding(message) {
    let enc = new TextEncoder();
    return enc.encode(message);
  }
  
  async function encryptMessage(publicKey, message) {
    let encoded = getMessageEncoding(message);
    let ciphertext = await window.crypto.subtle.encrypt(
        {
          name: "RSA-OAEP"
        },
        publicKey,
        encoded
      );
    const exportedAsString = ab2str(ciphertext);
    const exportedAsBase64 = window.btoa(exportedAsString);
    return exportedAsBase64;
  }

  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  }

function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
  
  function importPublicKey(pem) {
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length-1);
    //console.log(pemContents)

    const binaryDerString = window.atob(pemContents);

    const binaryDer = str2ab(binaryDerString);
  
    return window.crypto.subtle.importKey(
        "spki",
        binaryDer,
        {
          name: "RSA-OAEP",
          hash: "SHA-256",
        },
        true,
        [ "encrypt"]
      );
  }

  
  

 