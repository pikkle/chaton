import {Injectable} from '@angular/core';

@Injectable()
export class CryptoService {


  /**
   * Generates a key pair
   * @returns {{private: string, public: string}} the object containing both keys
   */
  generateKeypair(): PromiseLike<Keypair> {
    return crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: {name: "SHA-256"},
      },
      true,
      ["encrypt", "decrypt"]
    ).then(k => {
        return Promise.all([
          crypto.subtle.exportKey("jwk", k.publicKey),
          crypto.subtle.exportKey("jwk", k.privateKey)
        ]).then(([pub, priv]) => {
          var keypair = new Keypair();
          keypair.publicKey = pub;
          keypair.privateKey = priv;
          console.log(keypair);
          return keypair;
        });
      }
    );

  }

  /**
   * Hashes a password
   * @param clearPassword the password to hash
   * @returns {string} the hashed password
   */
  hash(clear: string, key: string): PromiseLike<string> {
    /*
    return crypto.subtle.generateKey(
      {
        name: "AES-CTR",
        length: 256,
      },
      false, //whether the key is extractable (i.e. can be used in exportKey)
      ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    ).then(function (key) {
      return window.crypto.subtle.encrypt(
        {
          name: "AES-CTR",
          //Don't re-use counters!
          //Always use a new counter every time your encrypt!
          counter: new Uint8Array(16),
          length: 128, //can be 1-128
        },
        key, //from generateKey or importKey above
        this.stringToArrayBuffer(clear) //ArrayBuffer of data you want to encrypt
      ).then(function (encrypted) {
        return encrypted;
      })
    });
    */ return null;
  }

  dehash(hash: string, key: string): PromiseLike<string> {
    return crypto.subtle.generateKey(
      {
        name: "AES-CTR",
        length: 256, //can be  128, 192, or 256
      },
      false, //whether the key is extractable (i.e. can be used in exportKey)
      ["encrypt", "decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
    ).then(function (key) {

      return "";
    });
  }

  /**
   * Encrypt a message using a given key
   * @param message the message to encrypt
   * @param key the key used in the hash algorithm (generally a public key)
   * @returns {string} the encrypted message
   */
  cipher(message: string, key: string) {

    return message;
  }

  /**
   * Decrypt a message using a given key
   * @param message the message to be decrypted
   * @param key the key used in the hash algorithm (generally a private key)
   * @returns {string} the decrypted message
   */
  decipher(message: string, key: string) {
    return message;
  }

  private arrayBufferToString(buffer: ArrayBuffer): string {
    return String.fromCharCode.apply(null, new Uint16Array(buffer));
  }

  private stringToArrayBuffer(str: string): ArrayBuffer {
    var buf = new ArrayBuffer(str.length * 2);
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
}

export class Keypair {
  public publicKey: JsonWebKey;
  public privateKey: JsonWebKey;
}
