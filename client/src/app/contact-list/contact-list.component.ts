import { Component, OnInit, Output } from '@angular/core';
import { ContactComponent } from '../contact/contact.component'
import { MessageComponent } from '../message/message.component'
import { ContactService } from '../contact.service'
import { EmojiService } from '../emoji.service'
import { EmojiComponent } from '../emoji/emoji.component'
import { Router } from '@angular/router'
import { UserService } from '../user.service'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ApiService } from '../api.service'
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
  private socket;

  // Contact that user selects in GUI
  selectedContact: ContactComponent;

  // All user's contacts
  contacts: ContactComponent[];

  // All emojis
  emojis: EmojiComponent[];

  // Typed message
  nextMessage: string;

  // JWT token
  token: string;

  // id
  id: number;

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
    //    this.contactService.getContacts().then(contacts => this.contacts = contacts);
    let headers = new Headers({ 'Content-Type': 'application/json', Authorization: "Bearer " + this.token });
    let options = new RequestOptions({ headers: headers });
    let url = '/api/profile/' + this.id;

    this.apiService.get(headers, options, url).then(data => {
      console.log("In contact-list");
      //this.contacts = data.contacts;
      //console.log(this.contacts);
    })
    this.contactService.getContacts().then(contacts => this.contacts = contacts)
  }

  // Calls the Emoji Service for emoji list
  getEmojis(): void {
    this.emojiService.getEmojis().then(emojis => this.emojis = emojis);
  }

  // Initializing contactService
  constructor(private contactService: ContactService, private emojiService: EmojiService, private router: Router, private http: Http, private apiService: ApiService) {
    this.contactService = contactService;
    this.emojiService = emojiService;
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
            this.selectedContact.conversation.messages.push(new MessageComponent(new Date().getTime(), "image", emoji.text, ".png", "test@test.com"));
          } else {
            this.selectedContact.conversation.messages.push(new MessageComponent(new Date().getTime(), "text", this.nextMessage, ".txt", "test@test.com"));
            var socket = io.connect("http://localhost:3030");
            // socket.emit("authenticate", { token: localStorage["token"] });
            socket.emit('send_message', { token: localStorage["token"], receiver: "henrikake@gmail.com", content: this.nextMessage });
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

  // Called on component instanciation
  ngOnInit(): void {
    // JWT token and user id, obtained by the LoginComponent
    this.token = localStorage["token"];
    this.id = localStorage["id"];

    this.getContacts();
    this.getEmojis();
  }
}