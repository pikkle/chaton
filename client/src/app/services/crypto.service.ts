/// <reference path="../../../typings/modules/crypto-js/index.d.ts" />
import * as crypto from 'crypto-js';

import {Injectable} from '@angular/core';

@Injectable()
export class CryptoService {
  
  constructor() {

  }

  /**
   * Generates a key pair
   * @returns {{private: string, public: string}} the object containing both keys
   */
  generateKeypair(): any {

    return {
      "private": "asfsufhsifisd",
      "public": "ivhdidfviudfi"
    }
  }

  /**
   * Hashes a password
   * @param clearPassword the password to hash
   * @returns {string} the hashed password
   */
  hashPassword(clearPassword: string): string {
    return clearPassword;
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
}
