import { Component, OnInit } from '@angular/core';
import { ConversationComponent } from '../conversation/conversation.component'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  id: number;
  name: string;
  avatar: string;
  conversation: ConversationComponent;
  constructor(param_id: number, param_name: string, param_avatar: string, param_conversations: ConversationComponent) {
    this.id = param_id;
    this.name = param_name;
    this.avatar = param_avatar;
    this.conversation = param_conversations;
  }  
}
