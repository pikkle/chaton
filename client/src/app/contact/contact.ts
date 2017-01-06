import {Message} from "../conversation/message";

export abstract class Contact {
  public id: string;
  public groupId: string;
  public name: string;
  public color: string;
  public messages: Message[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.color = '#' + Math.random().toString(16).slice(-3);
  }

  public lastMessage(): Message {
    if (this.messages.length == 0) {
      return null;
    } else {
      return this.messages[this.messages.length - 1];
    }
  }

  public initials(): string {
    if (this.name.length == 0) {
      return "!";
    } else if (this.name.length == 1) {
      return this.name.charAt(0).toUpperCase();
    } else {
      return this.name.charAt(0).toLocaleUpperCase() + this.name.charAt(1).toLocaleLowerCase();
    }
  }

  public addMessage(message: Message) {
    this.messages.push(message);
  }

  public static contactsFromJson(data: any): Contact[] {
    var findSimpleContact = function (members: any[], contacts: SimpleContact[]): SimpleContact {
      for (let c of contacts) {
        if (c.id === members[0]._id || c.id === members[1]._id) return c;
      }
      return null
    };

    var simpleContacts: SimpleContact[] = [];
    var groupContacts: GroupContact[] = [];
    for (let c of data.contacts) { // retrieve simple contacts
      simpleContacts.push(SimpleContact.contactFromJson(c));
    }
    for (let history of data.history) { // fill contacts with groups and populate all contacts with history
      if (history.group.members.length > 2) {
        var g: GroupContact = GroupContact.contactFromJson(history);
        g.messages = history.messages;
        groupContacts.push(g);
      } else {
        var simpleContact = findSimpleContact(history.group.members, simpleContacts);
        if (simpleContact) {
          simpleContact.messages = history.messages;
          simpleContact.groupId = history.group._id;
        }
      }
    }
    return (<Contact[]> simpleContacts).concat(groupContacts);
  }

}

export class SimpleContact extends Contact {
  public username: string;
  public publicKey: string;

  constructor(id: string, username: string, publickey: string) {
    super(id, username);
    this.username = username;
    this.publicKey = publickey;
  }

  public static contactFromJson(data: any): SimpleContact {
    const id = data._id;
    const username = data.username;
    const publickey = data.public_key;
    const groupId = data.group;
    return new SimpleContact(id, username, publickey);
  }

}

export class GroupContact extends Contact {
  public contacts: SimpleContact[];

  constructor(id: string, title: string, contacts: SimpleContact[]) {
    super(id, title);
    this.contacts = contacts;
  }

  public static contactFromJson(data: any): GroupContact {
    const id = data.group._id;
    const name = data.group.name;
    var members: SimpleContact[] = [];
    for (let member of data.group.members) {
      members.push(new SimpleContact(member._id, member.username, member.public_key));
    }
    return new GroupContact(id, name, members);
  }
}
