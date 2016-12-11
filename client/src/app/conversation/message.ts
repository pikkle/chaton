import { Component } from '@angular/core';
import { EmojiService } from '../services/emoji.service';

export class Message {
  timestamp: number;
  type: string; // should contain for example "txt", "image", "file" etc
  content: string;
  extension: string;
  sender: string;
  emojiService: EmojiService;
  constructor(timestamp: number, type: string, content: string, extension: string, sender: string) {
    this.timestamp = timestamp;
    this.type = type;
    this.emojiService = new EmojiService();
    if (this.type === 'image') {
      this.emojiService.getEmoji(content).then(emoji => this.content = emoji.path);
    }
    this.content = content;
    this.extension = extension;
    this.sender = sender;
  }

}
