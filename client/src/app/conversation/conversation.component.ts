import {Component, OnInit} from '@angular/core';
import {MessageComponent} from '../message/message.component';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  name: string;
  members: string[]; // ids
  messages: MessageComponent[];

  constructor(name: string, members: string[], messages: MessageComponent[]) {
    this.name = name;
    this.members = members;
    this.messages = messages;
  }

  ngOnInit() {
    console.log("Conversation ngOnInit")
  }

}
