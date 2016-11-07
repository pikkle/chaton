import { Component } from '@angular/core';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.css']
})
export class EmojiComponent {

  text: string;
  path: string;
  constructor(param_text: string, param_path: string) { 
    this.text = param_text;
    this.path = param_path;
  }
}
