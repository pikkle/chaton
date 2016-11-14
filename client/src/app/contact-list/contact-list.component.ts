import { Component, OnInit, Output } from '@angular/core';
import { ContactComponent } from '../contact/contact.component'
import { ConversationComponent } from '../conversation/conversation.component'
import { MessageComponent } from '../message/message.component'
import { ContactService } from '../contact.service'
import { EmojiService } from '../emoji.service'
import { EmojiComponent } from '../emoji/emoji.component'
import { Router } from '@angular/router'
import { UserService } from '../user.service'
//import "/socket.io/socket.io.js"; 
// Angular-modal

@Component({
  inputs: ['nextMessage'],
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [
    ContactService,
    EmojiService/*,
    UserService*/
  ],
})

export class ContactListComponent implements OnInit {
  selectedContact: ContactComponent;
  contacts: ContactComponent[];
  emojis: EmojiComponent[];
  // Typed message
  nextMessage: string;
  changeMessage(newMess: string) {
    this.nextMessage = newMess;
    this.sendMessage();
  }
  // Selecting a contact in the list
  onSelect(contact: ContactComponent): void {
    this.selectedContact = contact;
    setTimeout(function () {
      var objDiv = document.getElementById("selectedConversation");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 200);
  }

  // Calls the Contact Service for the contact list
  getContacts(): void {
    this.contactService.getContacts().then(contacts => this.contacts = contacts)
  }

  // Calls the Emoji Service for emoji list
  getEmojis(): void {
    this.emojiService.getEmojis().then(emojis => this.emojis = emojis);
  }
  // Initializing contactService
  constructor(private contactService: ContactService, private emojiService: EmojiService, private router: Router/*, private userService: UserService*/) {
    this.contactService = contactService;
    this.emojiService = emojiService;
    //    this.userService = userService;
  }

  sendMessage(): void {
    // Using server here

    if (this.nextMessage !== null && this.nextMessage.length > 0) {
      if (/\S/.test(this.nextMessage)) {
        // string is not empty and not just whitespace

        var context = this.selectedContact.conversation.messages;
        this.emojiService.getEmoji(this.nextMessage).then(emoji => {
          if (emoji !== null && emoji !== undefined) {
            context.push(new MessageComponent(0, "image", emoji.text, ".png", "test@test.com"));
          } else {
            context.push(new MessageComponent(0, "text", this.nextMessage, ".txt", "test@test.com"));
          }
        }).then(() => {
          this.nextMessage = "";
          var objDiv = document.getElementById("selectedConversation");
          objDiv.scrollTop = objDiv.scrollHeight;
        });
      } else {
        this.nextMessage = "";
      }
    }
  }
  textChanged(): void {

  }
  ngOnInit(): void {
    this.getContacts();
    this.getEmojis();
  }
}