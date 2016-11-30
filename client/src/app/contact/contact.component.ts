import {Component} from '@angular/core';
import {ConversationComponent} from '../conversation/conversation.component';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css']
})
export class ContactComponent {
  private _conversation: ConversationComponent;
  private _id: string;
  private _username: string;
  private _avatar: string;
  private _publickey: string;

  constructor(id: string, username: string, avatar: string, publickey: string, conversation: ConversationComponent) {
    this._id = id;
    this._username = username;
    this._avatar = avatar;
    this._publickey = publickey;
    this._conversation = conversation;
  }

  public static contactFromJson(data: any): ContactComponent {
    const id = data._id;
    const username = data.username;
    const publickey = data.public_key;
    const avatar = '../assets/cat.jpg';  // TODO: download avatar as a picture and pick path here
    return new ContactComponent(id, username, avatar, publickey, new ConversationComponent(username, [], []));
  }

  public static contactsFromJson(data: any): ContactComponent[] {
    var contacts = [];
    for (let c of data.contacts) {
      contacts.push(ContactComponent.contactFromJson(c));
    }
    return contacts;
  }

  get conversation(): ConversationComponent {
    return this._conversation;
  }

  get id(): string {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  get avatar(): string {
    return this._avatar;
  }

  get publickey(): string {
    return this._publickey;
  }
}
