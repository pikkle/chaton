import { Message } from "../conversation/message";
import { EmojiService } from "../services/emoji.service";

export abstract class Contact {
  public id: string;
  public groupId: string;
  public name: string;
  public color: string;
  public messages: Message[] = [];

  constructor(id: string, groupId: string, name: string) {
    this.id = id;
    this.groupId = groupId;
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

  public static contactsFromJson(data: any, emojiService: EmojiService): Contact[] {

    var simpleContacts: SimpleContact[] = [];
    var groupContacts: GroupContact[] = [];
    /*for (let c of data.contacts) { // retrieve simple contacts
      simpleContacts.push(SimpleContact.contactFromJson(c));
    }*/

    for (let history of data.history) { // fill contacts with groups and populate all contacts with history
      if (history.group) {
        if (history.group.isCreatedGroup) {
          var g: GroupContact = GroupContact.contactFromJson(history);
          for (let m of history.messages) {
            Message.parseMessage(m.content, m.sender, g.groupId, emojiService).then(message => {
              g.messages.push(message);
            });
          }
          groupContacts.push(g);
        } else {
          var simpleContact = SimpleContact.contactFromJson(history);
          simpleContacts.push(simpleContact);
          if (simpleContact) {
            simpleContact.groupId = history.group._id;
            for (let m of history.messages) {
              var saveMessage = function (contact: SimpleContact, message: Message) {
                contact.messages.push(message);
              };
              Message.parseMessage(m.content, m.sender, simpleContact.groupId, emojiService).then(message => {
                simpleContacts.find(c => c.groupId === message.groupId).messages.push(message);
              });
            }
          }
        }
      }
    }
    var contacts = (<Contact[]>simpleContacts).concat(groupContacts);
    return contacts;
  }

}

export class SimpleContact extends Contact {
  public username: string;
  public publicKey: string;

  constructor(id: string, groupId: string, username: string, publickey: string) {
    super(id, groupId, username);
    this.username = username;
    this.publicKey = publickey;
  }

  public static contactFromJson(data: any): SimpleContact {
    const id = data._id;
    const username = data.username;
    const publickey = data.public_key;
    return new SimpleContact(id, null, username, publickey);
  }

}

export class GroupContact extends Contact {
  public contacts: SimpleContact[];

  constructor(id: string, groupId: string, title: string, contacts: SimpleContact[]) {
    super(id, groupId, title);
    this.contacts = contacts;
  }

  public static contactFromJson(data: any): GroupContact {
    const id = data.group._id;
    const name = data.group.name;
    var members: SimpleContact[] = [];
    for (let member of data.group.members) {
      members.push(new SimpleContact(member._id, member.username, member.public_key));
    }
    return new GroupContact(id, id, name, members);
  }
}
