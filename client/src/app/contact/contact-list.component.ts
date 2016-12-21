import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {Contact} from './contact';
import {ContactService} from '../services/contact.service';
import {EmojiService} from '../services/emoji.service';
import {Emoji} from '../services/emoji';

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
  nextMessage: string; // Typed message

  /**
   * Initializing contactService
   */
  constructor() {
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
  }

}
