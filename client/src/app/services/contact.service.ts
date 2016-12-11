import { Injectable } from '@angular/core';
import { Contact } from '../contact/contact';

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
