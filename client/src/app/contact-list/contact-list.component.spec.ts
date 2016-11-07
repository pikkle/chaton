/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ContactListComponent } from './contact-list.component';
import { EmojiService } from '../emoji.service';
import { ContactService } from '../contact.service';
describe('Component: ContactList', () => {
  it('should create an instance', () => {
    let component = new ContactListComponent(new ContactService(), new EmojiService());
    expect(component).toBeTruthy();
  });
});
