import {Component, OnInit} from '@angular/core';
import {ConversationComponent} from '../conversation/conversation.component'
import {Contact} from "./contact";

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css']
})
export class ContactComponent {
  private contact: Contact;
  conversation: ConversationComponent;

  constructor(contact: Contact, conversation: ConversationComponent) {
    this.contact = contact;
    this.conversation = conversation;
  }

  get id() {
    return this.contact.id;
  }

  get avatar() {
    return this.contact.avatar;
  }

  get username() {
    return this.contact.username;
  }

}
