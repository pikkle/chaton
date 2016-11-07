import { Component, OnInit } from '@angular/core';
import { ContactComponent } from '../contact/contact.component'
import { ConversationComponent } from '../conversation/conversation.component'
import { MessageComponent } from '../message/message.component'
import { ContactService } from '../contact.service'
import { EmojiService } from '../emoji.service'
// Angular-modal

@Component({
  inputs: ['nextMessage'],
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [
    ContactService,
    EmojiService
  ]
})

export class ContactListComponent implements OnInit {

  selectedContact: ContactComponent;
  contacts: ContactComponent[];

  // Typed message
  nextMessage: string;

  // Selecting a contact in the list
  onSelect(contact: ContactComponent): void {
    this.selectedContact = contact;
    window.scrollTo(0, document.body.scrollHeight);
  }

  // Calls the Contact Service for the contact list
  getContacts(): void {
    this.contactService.getContacts().then(contacts => this.contacts = contacts)
  }

  // Initializing contactService
  constructor(private contactService: ContactService, private emojiService: EmojiService) {
    this.contactService = contactService;
    this.emojiService = emojiService;
  }

  sendMessage(): void {
    // Using server here

    if (this.nextMessage !== null && this.nextMessage.length > 0) {
      var context = this.selectedContact.conversation.messages;
      this.emojiService.getEmoji(this.nextMessage).then(emoji => {
        if (emoji !== null && emoji !== undefined) {
          context.push(new MessageComponent(0, "image", emoji.path, ".png"));
        } else {
          context.push(new MessageComponent(0, "text", this.nextMessage, ".txt"));
        }
      }).then(() => {
        this.nextMessage = "";
      });
    }
  }

  ngOnInit(): void {
    this.getContacts();
  }

  showEmoji() {

  }
}