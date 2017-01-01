import {Message} from "../conversation/message";

export class Contact {

  private _id: string;
  private _username: string;
  private _avatar: string;
  private _publickey: string;
  private _messages: Message[] = [];

  constructor(id: string, username: string, avatar: string, publickey: string) {
    this._id = id;
    this._username = username;
    this._avatar = avatar;
    this._publickey = publickey;
  }

  public static contactFromJson(data: any): Contact {
    const id = data._id;
    const username = data.username;
    const publickey = data.public_key;
    const avatar = '../assets/cat.jpg';  // TODO: download avatar as a picture and pick path here
    return new Contact(id, username, avatar, publickey);
  }

  public static contactsFromJson(data: any): Contact[] {
    const contacts = [];
    for (let c of data.contacts) {
      contacts.push(Contact.contactFromJson(c));
    }
    return contacts;
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

  get messages(): Message[] {
    return this._messages;
  }

  lastMessage(): Message {
    if (this.messages.length == 0) {
      return null;
    } else {
      return this.messages[this.messages.length-1];
    }
  }

  public addMessage(message: Message) {
    this._messages.push(message);
  }
}
