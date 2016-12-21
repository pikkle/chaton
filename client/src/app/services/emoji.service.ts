import {Injectable} from '@angular/core';
import {Emoji} from './emoji';

@Injectable()
export class EmojiService {
  private emojis: Emoji[] = [
    new Emoji(":-)", "../assets/emojis/1f60a.png"),
    new Emoji(":-P", "../assets/emojis/1f60b.png"),
    new Emoji("<:-)", "../assets/emojis/1f60c.png"),
    new Emoji("<3-D", "../assets/emojis/1f60d.png"),
    new Emoji("B-)", "../assets/emojis/1f60e.png"),
    new Emoji(",-)", "../assets/emojis/1f60f.png"),
    new Emoji(":kiss:", "../assets/emojis/1f61a.png"),
    new Emoji(":tongue:", "../assets/emojis/1f61b.png"),
    new Emoji(";-P", "../assets/emojis/1f61c.png"),
    new Emoji("X-P", "../assets/emojis/1f61d.png"),
    new Emoji(":-(", "../assets/emojis/1f61e.png"),
    new Emoji(":", "../assets/emojis/1f61f.png"),
    new Emoji(":sleepy:", "../assets/emojis/1f62a.png"),
    new Emoji(":scream:", "../assets/emojis/1f62b.png"),
    new Emoji(":teeth:", "../assets/emojis/1f62c.png"),
    new Emoji(":crying:", "../assets/emojis/1f62d.png"),
    new Emoji(":-O", "../assets/emojis/1f62e.png"),
    new Emoji("<:-O", "../assets/emojis/1f62f.png")
  ];

  constructor() {
  }

  getEmojis(): Promise<Emoji[]> {
    return Promise.resolve(this.emojis);
  }

  getEmoji(message): Promise<Emoji> {
    return this.getEmojis().then(emojis => emojis.find(emoji => emoji.text === message))
  };
}
