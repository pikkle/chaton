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
  hash(clearPassword: string): string {
    return clearPassword;
  }

  /**
   * Encrypt a message using a given key
   * @param message the message to encrypt
   * @param key the key used in the hash algorithm (generally a public key)
   * @returns {string} the encrypted message
   */
  cipher(message: string, key: JsonWebKey) {

    return message;
  }

  /**
   * Decrypt a message using a given key
   * @param message the message to be decrypted
   * @param key the key used in the hash algorithm (generally a private key)
   * @returns {string} the decrypted message
   */
  decipher(message: string, key: JsonWebKey) {
    return message;
  }
}

export class Keypair {
  public publicKey: JsonWebKey;
  public privateKey: JsonWebKey;
}
