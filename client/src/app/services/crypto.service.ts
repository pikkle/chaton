import {Injectable} from '@angular/core';

@Injectable()
export class CryptoService {
  private RSAKey: PromiseLike<CryptoKeyPair>;
  private existingAESKeys: {
    key: string,
    cryptoKey: PromiseLike<CryptoKey>
  }[] = [];

  constructor() {
    this.RSAKey = crypto.subtle.generateKey({
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: {name: "SHA-256"},
      },
      true,
      ["encrypt", "decrypt"]
    );
  }

  /**
   * Encrypt symmetrically data with a string key
   * @param clear the data to encrypt
   * @param key the key to encrypt the data (also used for decryption)
   * @returns {PromiseLike<string>} the encrypted data
   */
  encrypt(clear: string, key: string): PromiseLike<string> {
    return this.generateSymmetricCryptoKey(key).then(aesKey => {
        return crypto.subtle.encrypt({
            name: "AES-CTR",
            counter: new Uint8Array(16),
            length: 128
          },
          aesKey,
          CryptoService.stringToArrayBuffer(clear)
        ).then(encrypted => {
          return CryptoService.arrayBufferToString(encrypted);
        });
      }
    );
  }

  /**
   * Decrypt symmetrically data with a string key
   * @param clear the encrypted data to decrypt
   * @param key the key to decrypt the data (also used for encryption)
   * @returns {PromiseLike<string>} the decrypted data
   */
  decrypt(hash: string, key: string): PromiseLike <string> {
    return this.generateSymmetricCryptoKey(key).then(aesKey => {
        return crypto.subtle.decrypt({
            name: "AES-CTR",
            counter: new ArrayBuffer(16),
            length: 128
          },
          aesKey,
          CryptoService.stringToArrayBuffer(hash)
        ).then(encrypted => {
          return CryptoService.arrayBufferToString(encrypted);
        });
      }
    );
  }

  private generateSymmetricCryptoKey(key: string): PromiseLike<CryptoKey> {
    var found = this.existingAESKeys.find(tuple => tuple.key === key);
    if (found) {
      return found.cryptoKey;
    } else {
      var salt = "s283r23rrudsg9727ft7vvhj23f3brnf";
      var aesKey: PromiseLike<CryptoKey> = crypto.subtle.importKey(
        "raw",
        CryptoService.stringToArrayBuffer(key),
        {name: "PBKDF2"},
        false,
        ["deriveKey"]
      ).then(baseKey => {
        return crypto.subtle.deriveKey({
            name: "PBKDF2",
            salt: CryptoService.stringToArrayBuffer(salt),
            iterations: 1000,
            hash: "SHA-256"
          },
          baseKey,
          {name: "AES-CTR", length: 128},
          true,
          ["encrypt", "decrypt"]
        );
      });
      this.existingAESKeys.push({key: key, cryptoKey: aesKey});
      return aesKey;
    }
  }

  /**
   * Generates a key pair
   * @returns {{private: string, public: string}} the object containing both keys
   */
  generateKeypair(): PromiseLike<Keypair> {
    return this.RSAKey.then(k => {
        return Promise.all([
          crypto.subtle.exportKey("jwk", k.publicKey),
          crypto.subtle.exportKey("jwk", k.privateKey)
        ]).then(([pub, priv]) => {
          var keypair = new Keypair();
          keypair.publicKey = pub;
          keypair.privateKey = priv;
          return keypair;
        });
      }
    );

  }


  /**
   * Encrypt a message using a given key
   * @param message the message to encrypt
   * @param publicKey the public key used in the encrypt algorithm
   * @returns {string} the encrypted message
   */
  cipher(message: string, publicKey: PromiseLike<CryptoKey>) {
    return publicKey.then(pub => {
      return crypto.subtle.encrypt({
          name: "RSA-OAEP"
        },
        pub,
        CryptoService.stringToArrayBuffer(message)
      ).then(encrypted => {
        return CryptoService.arrayBufferToString(encrypted);
      });
    });
  }

  /**
   * Decrypt a message using a given key
   * @param message the message to be decrypted
   * @param key the key used in the encrypt algorithm (generally a private key)
   * @returns {string} the decrypted message
   */
  decipher(encryptedMessage: string, privateKey: PromiseLike<CryptoKey>) {
    return privateKey.then(pub => {
      return crypto.subtle.decrypt({
          name: "RSA-OAEP"
        },
        pub,
        CryptoService.stringToArrayBuffer(encryptedMessage)
      ).then(decrypted => {
        return CryptoService.arrayBufferToString(decrypted);
      });
    });
  }

  private static
  arrayBufferToString(buffer: ArrayBuffer): string {
    return String.fromCharCode.apply(null, new Uint16Array(buffer));
  }

  private static
  stringToArrayBuffer(str: string): ArrayBuffer {
    var buf = new ArrayBuffer(str.length * 2);
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  public static jsonWebKeyToPromiseLikeCryptoKey(json: JsonWebKey, isPrivateKey: boolean): PromiseLike<CryptoKey> {
    var usage: string = isPrivateKey ? "decrypt" : "encrypt";
    return crypto.subtle.importKey(
      "jwk",
      json,
      {
        name: "RSA-OAEP",
        hash: {name: "SHA-256"}
      },
      false,
      [usage]
    );
  }
}

export class Keypair {
  public publicKey: JsonWebKey;
  public privateKey: JsonWebKey;
}
