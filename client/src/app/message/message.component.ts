import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  timestamp: number;
  type: string; // should contain for example "txt", "image", "file" etc
  content: string;
  extension: string;
  constructor(param_timestamp: number, param_type: string, param_content: string, param_extension: string) {
    this.timestamp = param_timestamp;
    this.type = param_type;
    this.content = param_content;
    this.extension = param_extension;
  }

}