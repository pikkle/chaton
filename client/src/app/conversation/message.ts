import {EmojiService} from '../services/emoji.service';

export class Message {
  timestamp: number;
  type: string; // should contain for example "txt", "image", "file" etc
  content: string;
  extension: string;
  sender: string;

  emojiService: EmojiService;

  constructor(emojiService: EmojiService, timestamp: number, type: string, content: string, extension: string, sender: string) {
    this.emojiService = emojiService;
    this.timestamp = timestamp;
    this.type = type;
    if (this.type === 'image') {
      this.emojiService.getEmoji(content).then(emoji => this.content = emoji.path);
    }
    this.content = content;
    this.extension = extension;
    this.sender = sender;
  }

  static parseMessage(content: string, from: string, emojiService: EmojiService) : Promise<Message> {
    if (content !== null && content.length > 0) {
      if (/\S/.test(content)) {
        // string is not empty and not just whitespace
        return emojiService.getEmoji(content.replace(/^\s+|\s+$/g, "")).then(emoji => {
          if (emoji !== null && emoji !== undefined) {
            return new Message(emojiService, new Date().getTime(), "image", emoji.text, ".png", from);
          } else {
            return new Message(emojiService, new Date().getTime(), "text", content, ".txt", from);
          }
        });
      }
    }
    return Promise.reject("Empty message");
  }

}
