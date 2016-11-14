import { Component, OnInit } from '@angular/core';
import { EmojiService } from '../emoji.service';
@Component({

  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers: [
    EmojiService
  ]
})
export class MessageComponent {
  timestamp: number;
  type: string; // should contain for example "txt", "image", "file" etc
  content: string;
  extension: string;
  sender: string;
  emojiService: EmojiService;
  constructor(param_timestamp: number, param_type: string, param_content: string, param_extension: string, param_sender: string) {
    this.timestamp = param_timestamp;
    this.type = param_type;
    this.emojiService = new EmojiService();
    if (this.type === 'image') {
      this.emojiService.getEmoji(param_content).then(emoji => this.content = emoji.path);
    }
    this.content = param_content;
    this.extension = param_extension;
    this.sender = param_sender;
  }

}