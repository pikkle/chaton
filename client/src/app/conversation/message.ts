import {EmojiService} from '../services/emoji.service';
import {CryptoService} from "../services/crypto.service";

export class Message {
  private path: string;
  private static privateKey: JsonWebKey;

  constructor(private cryptoService: CryptoService,
              private emojiService: EmojiService,
              public timestamp: number,
              public type: string,
              public content: string,
              public extension: string,
              public sender: string,
              public groupId: string) {
    if (this.type === 'image') {
      this.emojiService.getEmoji(content).then(emoji => this.path = emoji.path);
    }
  }

  static parseMessage(content: string,
                      from: string,
                      groupId: string,
                      emojiService: EmojiService,
                      cryptoService: CryptoService): Promise<Message> {
    if (content !== null && content.length > 0) {
      if (/\S/.test(content)) {
        // string is not empty and not just whitespace
        return emojiService.getEmoji(content.replace(/^\s+|\s+$/g, "")).then(emoji => {
          if (emoji !== null && emoji !== undefined) {
            return new Message(cryptoService, emojiService, new Date().getTime(), "image", emoji.text, ".png", from, groupId);
          } else {
            return new Message(cryptoService, emojiService, new Date().getTime(), "text", content, ".txt", from, groupId);
          }
        });
      }
    }
    return Promise.reject("Empty message");
  }

  static parseEncryptedMessage(encryptedContent: string,
                               from: string,
                               groupId: string,
                               emojiService: EmojiService,
                               cryptoService: CryptoService): PromiseLike<Message> {
    if (!Message.privateKey) {
      Message.privateKey = JSON.parse(localStorage['privateKey']);
    }
    var privateKey: PromiseLike<CryptoKey> = CryptoService.jsonWebKeyToPromiseLikeCryptoKey(Message.privateKey, true);
    return cryptoService.decipher(encryptedContent, privateKey).then(decrypted => {
      return Message.parseMessage(decrypted, from, groupId, emojiService, cryptoService);
    });
  }


}
