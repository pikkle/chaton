import { Injectable } from '@angular/core';
import { ContactComponent } from '../contact/contact.component'
import { CONTACTS } from '../mock-contacts'
@Injectable()
export class ContactService {
  /*
  getContacts(): Promise<ContactComponent[]> {
    return Promise.resolve(CONTACTS);
  }

  getContact(id): Promise<ContactComponent> {
    return this.getContacts().then(contacts => contacts.find(contact => contact.id === id));
  }
  */
  constructor() { }

}
