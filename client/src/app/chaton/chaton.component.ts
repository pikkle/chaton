import { Component, OnInit } from '@angular/core';
import { SocketService } from "../services/socket.service";
import { Router } from "@angular/router";
import { Contact } from "../contact/contact";
import { ApiService } from "../services/api.service";
import { Message } from "../conversation/message";
import { EmojiService } from "../services/emoji.service";
import { SimpleContact } from "../contact/contact";
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

  formNewContactEmail: string;

  formGroupName: string;
  formGroupList: any;

  imageList = [
    "../../assets/backgrounds/b1.jpg",
    "../../assets/backgrounds/b2.jpg",
    "../../assets/backgrounds/b3.jpg",
    "../../assets/backgrounds/b4.jpg",
    "../../assets/backgrounds/b5.jpg"
  ]

  selectedImage: any;
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

    this.formGroupName = "";
    this.formGroupList = [];

    if (!this.socketService.isAuthenticated()) {
      this.router.navigateByUrl('');
      return;
    }
    this.getContacts();

    this.socketService.addListener("new_message", (data: any) => {
      console.log(data);
      Message.parseMessage(data.content, data.sender, data.group, this.emojiService).then(message => {
        this.contacts.find(c => c.groupId === data.group).addMessage(message);
        this.sortContacts();
      });
    });
    this.socketService.addListener("new_group", (data: any) => {
      this.getContacts();
    })
    this.socketService.addListener("new_contact", (data: any) => {
      this.getContacts();
      // Go through contacts and associate to group id
      /*var newContactId;
      if (data.members[0] === this.id) {
        newContactId = data.members[1];
      } else {
        newContactId = data.members[0];
      }
      this.contacts.forEach(contact => {
        if (contact.id === newContactId) {
          contact.groupId = data._id;
        }
    });*/
    })
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
        if (response["username"])
          this.username = response["username"];
      });
    }
  }

  addNewContact(): void {
    if (this.formNewContactEmail != "") {
      this.apiService.addContact(this.formNewContactEmail).then(newContact => {
        this.getContacts();
      });
    }
  }

  createGroup(): void {
    console.log("createGroup")
    var members: string[] = [];
    for (var contactId in this.formGroupList) {
      if (this.formGroupList[contactId]) {
        members.push(contactId);
      }
    }
    members.push(this.id);
    if (this.formGroupName != "" && members != []) {
      this.apiService.createGroup(this.formGroupName, members).then(_ => {
        this.formGroupName = "";
        this.formGroupList = {};
        this.getContacts();
      });
    }

  }

  haveNewMessage(): void {
    this.sortContacts();
  }

  isSimpleContact(contact: Contact): boolean {
    return contact instanceof SimpleContact;
  }

  onSelect(image): void {
    console.log(image);
    this.selectedImage = image;
  }

}
