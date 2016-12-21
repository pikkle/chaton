import {Component, OnInit} from '@angular/core';
import {SocketService} from "./services/socket.service";
import {Router} from "@angular/router";
import {Contact} from "./contact/contact";
import {ApiService} from "./services/api.service";
import {Message} from "./conversation/message";
import {EmojiService} from "./services/emoji.service";

@Component({
  selector: 'app-chaton',
  templateUrl: './chaton.component.html',
  styleUrls: ['./chaton.component.css']
})
export class ChatonComponent implements OnInit {
  contacts: Contact[];
  selectedContact: Contact;
  token: string;
  id: string;
  email: string;
  username: string;

  formUsername: string;
  formOldPassword: string;
  formNewPassword: string;
  formRepeatPassword: string;

  constructor(private router: Router,
              private socketService: SocketService,
              private apiService: ApiService,
              private emojiService: EmojiService) {
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    this.socketService.disconnect();
    this.router.navigateByUrl('');
  }

  /**
   * Calls the Contact Service for the contact list
   */
  getContacts(): void {
    console.log("Fetching contacts...");
    this.contacts = [];
    this.apiService.getContacts(this.id, this.token).then(newContacts => {
      //TODO: trier les contacts par ordre chronologique du dernier message
      this.contacts = newContacts;
      if (this.contacts.length > 0) {
        this.selectedContact = this.contacts[0];
      }
    });

  }

  ngOnInit(): void {
    // JWT token and user id, obtained by the LoginComponent
    this.token = localStorage["token"];
    this.id = localStorage["id"];
    this.email = localStorage["email"];
    this.username = localStorage["username"]

    this.formUsername = this.username;
    this.formOldPassword = "";
    this.formNewPassword = "";
    this.formRepeatPassword = "";


    if (!this.socketService.isAuthenticated()) {
      console.log("You are not authenticated");
      this.router.navigateByUrl('');
      return;
    }
    this.getContacts();

    this.socketService.addListener("new_message", (data: any) => {
      console.log("Received a message: ");
      console.log(data);
      Message.parseMessage(data.content, data.id, this.emojiService).then(message => {
        for (let c of this.contacts) {
          if (c.id === data.id) {
            c.addMessage(message);
          }
        }
      });
    });
  }

  updateUserInfos(): void {
    console.log("Updating infos");
    if (this.formUsername != this.username) {

    }
  }

}
