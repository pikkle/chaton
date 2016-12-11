import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {Contact} from './contact';
import {ContactService} from '../services/contact.service';
import {EmojiService} from '../services/emoji.service';
import {EmojiComponent} from '../emoji/emoji.component';
import {ApiService} from '../services/api.service';
import {SocketService} from '../services/socket.service';
import {Router} from "@angular/router";

declare let io: any;

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
  @Output()
  selectedContactChange = new EventEmitter<Contact>();
  @Input()
  selectedContact: Contact; // Contact that user selects in GUI

  @Input()
  contacts: Contact[]; // All user's contacts
  emojis: EmojiComponent[]; // All emojis
  nextMessage: string; // Typed message

  /**
   * Initializing contactService
   */
  constructor(private apiService: ApiService,
              private socketService: SocketService,
              private emojiService: EmojiService,
              private router: Router) {
  }


  /**
   * Selecting a contact in the list
   * @param contact
   */
  onSelect(contact: Contact): void {
    this.selectedContactChange.emit(contact);
    this.selectedContact = contact;

    /*setTimeout(function () {
     var objDiv = document.getElementById("selectedConversation");
     objDiv.scrollTop = objDiv.scrollHeight;
     }, 200);*/
  }




  // Calls the Emoji Service for emoji list
  getEmojis(): void {
    this.emojiService.getEmojis().then(emojis => this.emojis = emojis);
  }


  // Called on component instanciation
  ngOnInit(): void {
    //this.getContacts();
    this.getEmojis();
  }

}
