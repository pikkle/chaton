import {Message} from "../conversation/message";

export class Contact {

  private _id: string;
  private _username: string;
  private _publickey: string;
  private _messages: Message[] = [];
  public color: string;

  constructor(id: string, username: string, publickey: string) {
    this._id = id;
    this._username = username;
    this._publickey = publickey;

    this.color = '#' + Math.random().toString(16).slice(-3);
  }

  public static contactFromJson(data: any): Contact {
    const id = data._id;
    const username = data.username;
    const publickey = data.public_key;
    return new Contact(id, username, publickey);
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
      return this.messages[this.messages.length - 1];
    }
  }

  public initials(): string {
    if (this._username.length == 0) {
      return "!";
    } else if (this._username.length == 1) {
      return this._username.charAt(0).toUpperCase();
    } else {
      return this._username.charAt(0).toLocaleUpperCase() + this._username.charAt(1).toLocaleLowerCase();
    }
  }


  public addMessage(message: Message) {
    this._messages.push(message);
  }
}
