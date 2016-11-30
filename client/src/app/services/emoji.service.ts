import { Injectable } from '@angular/core';
import { EmojiComponent } from '../emoji/emoji.component'
import { EMOJIS } from '../emojis';
@Injectable()
export class EmojiService {
  constructor() { }
  getEmojis(): Promise<EmojiComponent[]> {
    return Promise.resolve(EMOJIS);
  }
  getEmoji(message): Promise<EmojiComponent> {
    return this.getEmojis().then(emojis => emojis.find(emoji => emoji.text === message))
  };
}