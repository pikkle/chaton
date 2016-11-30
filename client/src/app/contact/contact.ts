export class Contact {

  private _id: string;
  private _username: string;
  private _avatar: string;
  private _publicKey: string;

  constructor(id: string, username: string, avatar: string) {
    this._id = id;
    this._username = username;
    this._avatar = avatar;
  }

  public static contactFromJson(data: any): Contact {
    var id = data._id;
    var username = data.username;
    var avatar = '../assets/cat.jpg';  // TODO: download avatar as a picture and pick path here
    return new Contact(id, username, avatar);
  }

  public static contactsFromJson(data: any): Contact[] {
    var contacts = [];
    for (let c of data.contacts) {
      contacts.push(Contact.contactFromJson(c));
    }
    return contacts;
  }

  get avatar(): string {
    return this._avatar;
  }

  get username(): string {
    return this._username;
  }

  get id(): string {
    return this._id;
  }

  get publicKey(): string {
    return this._publicKey;
  }

}
