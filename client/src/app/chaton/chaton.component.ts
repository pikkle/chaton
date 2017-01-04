import {Component, OnInit} from '@angular/core';
import {SocketService} from "../services/socket.service";
import {Router} from "@angular/router";
import {Contact} from "../contact/contact";
import {ApiService} from "../services/api.service";
import {Message} from "../conversation/message";
import {EmojiService} from "../services/emoji.service";

@Component({
  selector: 'app-chaton',
  templateUrl: 'chaton.component.html',
  styleUrls: ['chaton.component.css']
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

  formNewContactEmail: string;

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
      this.contacts = newContacts;
      this.sortContacts();
      if (this.contacts.length > 0) {
        this.selectedContact = this.contacts[0];
      }
    });

  }

  sortContacts(): void {
    this.contacts.sort((a, b) => {
      if (a.messages.length >= 0 && b.messages.length == 0) {
        return -1;
      } else if (a.messages.length == 0 && b.messages.length > 0) {
        return 1;
      } else {
        var atime = a.lastMessage().timestamp;
        var btime = b.lastMessage().timestamp;
        return btime - atime;
      }
    });
  }

  ngOnInit(): void {
    // JWT token and user id, obtained by the LoginComponent
    this.token = localStorage["token"];
    this.id = localStorage["id"];
    this.email = localStorage["email"];
    this.username = localStorage["username"];

    this.formUsername = this.username;
    this.formOldPassword = "";
    this.formNewPassword = "";
    this.formRepeatPassword = "";
    this.formNewContactEmail = "";


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
            this.sortContacts();
          }
        }
      });
    });
  }

  updateUserInfos(): void {
    console.log("Updating infos");
    var changedData = {};
    if (this.formUsername != "" && this.formUsername != this.username) {
      changedData["username"] = this.formUsername;
      console.log("Changing username");
    }
    if (this.formOldPassword != "" && this.formNewPassword != "" && this.formRepeatPassword != "" && this.formNewPassword == this.formRepeatPassword) {
      changedData["password"] = this.formNewPassword;
      console.log("Changing password");
    }
    if (changedData != {}) {
      this.apiService.updateUser(changedData).then(response => {
        console.log(response);
        if (response["username"])
          this.username = response["username"];
      });
    }
  }

  addNewContact(): void {
    console.log("Adding new contact");
    if (this.formNewContactEmail != "") {
      this.apiService.addContact(this.formNewContactEmail).then(newContact => {
        console.log("Added new contact !");
        this.getContacts();
      });
    }
  }

  haveNewMessage(): void {
    this.sortContacts();
  }

}