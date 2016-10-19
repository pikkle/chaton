import { Component, OnInit } from '@angular/core';
import { ContactComponent } from '../contact/contact.component'
import { ConversationComponent } from '../conversation/conversation.component'
import { MessageComponent } from '../message/message.component'
import { ContactService } from '../contact.service'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService]
})

export class ContactListComponent implements OnInit {
 
  selectedContact: ContactComponent;
  contacts: ContactComponent[];
  
  onSelect(contact: ContactComponent): void {
    this.selectedContact = contact;
    console.log("Selected " + contact.name)
  }

  getContacts(): void {
    this.contactService.getContacts().then(contacts => this.contacts = contacts)
  }
  
  constructor(private contactService: ContactService) {
    console.log("Hello from contact list contructor")
    this.contactService = contactService;
   }
  
  ngOnInit(): void {
    this.getContacts();
  }
}