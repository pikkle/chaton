import { Component, OnInit, Output } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
import { ConversationComponent } from '../conversation/conversation.component'
import { MessageComponent } from '../message/message.component';
import { ContactService } from '../services/contact.service';
import { EmojiService } from '../services/emoji.service';
import { EmojiComponent } from '../emoji/emoji.component';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ApiService } from '../services/api.service';
import { SocketService } from '../services/socket.service';

declare let io: any;

@Component({
  inputs: ['nextMessage'],
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [
    ContactService,
    EmojiService,
    ApiService
  ]
})

export class ContactListComponent implements OnInit {
  selectedContact: ContactComponent; // Contact that user selects in GUI
  contacts: ContactComponent[]; // All user's contacts
  emojis: EmojiComponent[]; // All emojis
  nextMessage: string; // Typed message
  token: string; // JWT token
  id: number; // id
  email: string; // email

  // Initializing contactService
  constructor(
    private contactService: ContactService,
    private apiService: ApiService,
    private socketService: SocketService,
    private emojiService: EmojiService,
    private router: Router,
    private http: Http,
  ) { }

  // Sets the content of "nextMessage" and sends it
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
    //this.contactService.getContacts().then(contacts => this.contacts = contacts);
    let headers = new Headers({ 'Content-Type': 'application/json', Authorization: "Bearer " + this.token });
    let options = new RequestOptions({ headers: headers });
    let url = '/api/profile/' + this.id;
    this.contacts = [];
    this.apiService.get(headers, options, url).then(data => {
      for (let c of data.contacts) {
        this.contacts.push(
          new ContactComponent(
            c["_id"],
            c["username"],
            '../assets/default_avatar.png',  // TODO: download avatar as a picture and pick path here
            new ConversationComponent(
              c["username"],
              [c["_id"]],
              []
            )
          )
        );
      }
    })
    //this.contactService.getContacts().then(contacts => this.contacts = contacts)
  }

  // Calls the Emoji Service for emoji list
  getEmojis(): void {
    this.emojiService.getEmojis().then(emojis => this.emojis = emojis);
  }


  /**
   * Sends a message to the server"
   * 
   * The content of the field "nextMessage" is analyzed and sent
   */
  sendMessage(): void {
    // Using server here
    if (this.nextMessage !== null && this.nextMessage.length > 0) {
      if (/\S/.test(this.nextMessage)) {
        // string is not empty and not just whitespace

        this.emojiService.getEmoji(this.nextMessage.replace(/^\s+|\s+$/g, "")).then(emoji => {
          if (emoji !== null && emoji !== undefined) {
            this.selectedContact.conversation.messages.push(new MessageComponent(new Date().getTime(), "image", emoji.text, ".png", this.email));
          } else {
            this.selectedContact.conversation.messages.push(new MessageComponent(new Date().getTime(), "text", this.nextMessage, ".txt", this.email));
          }
          this.socketService.sendMessage(this.nextMessage, this.selectedContact);
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

  receiveMessage(from: string, message: string): void {
    // TODO: insert in right conversation...
    if (message !== null && message.length > 0) {
      if (/\S/.test(message)) {
        // string is not empty and not just whitespace

        this.emojiService.getEmoji(message.replace(/^\s+|\s+$/g, "")).then(emoji => {
          if (emoji !== null && emoji !== undefined) {
            this.selectedContact.conversation.messages.push(new MessageComponent(new Date().getTime(), "image", emoji.text, ".png", from));
          } else {
            this.selectedContact.conversation.messages.push(new MessageComponent(new Date().getTime(), "text", message, ".txt", from));
          }
        }).then(() => {
          message = "";
          var objDiv = document.getElementById("selectedConversation");
          objDiv.scrollTop = objDiv.scrollHeight;
        });
      } else {
        message = "";
      }
    }
    //this.selectedContact.conversation.messages.push(new MessageComponent(new Date().getTime(), "text", message, ".txt", from)); 
  }

  // Called on component instanciation
  ngOnInit(): void {
    // JWT token and user id, obtained by the LoginComponent
    this.token = localStorage["token"];
    this.id = localStorage["id"];
    this.email = localStorage["email"];
    this.getContacts();
    this.getEmojis();
    this.socketService.addListener("new_message", (data: any) => {
      console.log(data);
      this.receiveMessage(data.sender, data.content);
    });
  }
}