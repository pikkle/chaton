import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {Contact, SimpleContact, GroupContact} from './contact';
import {ContactService} from '../services/contact.service';
import {EmojiService} from '../services/emoji.service';
import {Emoji} from '../services/emoji';
import {ApiService} from "../services/api.service";

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

  emojis: Emoji[]; // All emojis
  nextMessage: string;
  selfId: string;


  /**
   * Initializing contactService
   */
  constructor(private apiService: ApiService) {
  }

  /**
   * Selecting a contact in the list
   * @param contact
   */
  onSelect(contact: Contact): void {
    this.selectedContactChange.emit(contact);
    this.selectedContact = contact;
  }


  /**
   * Called on component instanciation
   */
  ngOnInit(): void {
    this.selfId = localStorage['id'];
  }

  sender(contact: Contact): string {
    if (contact.lastMessage().sender === this.selfId)
      return "You: ";
    var simpleContact: SimpleContact = <SimpleContact> contact;
    if (contact instanceof GroupContact) {
      simpleContact = (<GroupContact> contact).contacts.find(c => c.id === contact.lastMessage().sender);
    }
    return simpleContact.username + ": ";
  }

}
