import {Message} from "../conversation/message";
import {EmojiService} from "../services/emoji.service";

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

    for (let history of data.history) { // fill contacts with groups and populate all contacts with history
      if (history.group.isCreatedGroup) { // history concerns a group
        var g: GroupContact = GroupContact.contactFromJson(history);
        for (let m of history.messages) {
          Message.parseMessage(m.content, m.sender, g.groupId, emojiService).then(message => {
            groupContacts.find(g => g.groupId === message.groupId).addMessage(message);
          });
        }
        groupContacts.push(g);
      } else { // history concerns a simple contact
        var simpleContact = SimpleContact.contactFromJson(history);
        simpleContacts.push(simpleContact);
        if (simpleContact) {
          simpleContact.groupId = history.group._id;
          for (let m of history.messages) {
            var saveMessage = function (contact: SimpleContact, message: Message) {
              contact.messages.push(message);
            };
            Message.parseMessage(m.content, m.sender, simpleContact.groupId, emojiService).then(message => {
              simpleContacts.find(c => c.groupId === message.groupId).addMessage(message);
            });
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
    var selfId = localStorage['id'];
    var c;
    if (data.group.members[0]._id === selfId) {
      c = data.group.members[1];
    } else {
      c = data.group.members[0];
    }
    const id = c._id;
    const username = c.username;
    const publickey = c.public_key;
    return new SimpleContact(id, data.group._id, username, publickey);
  }

}

export class GroupContact extends Contact {
  public contacts: SimpleContact[];

  constructor(id: string, title: string, contacts: SimpleContact[]) {
    super(id, id, title);
    this.contacts = contacts;
  }

  public static contactFromJson(data: any): GroupContact {
    const id = data.group._id;
    const name = data.group.name;
    var members: SimpleContact[] = [];
    for (let member of data.group.members) {
      members.push(new SimpleContact(member._id, id, member.username, member.public_key));
    }
    return new GroupContact(id, name, members);
  }
}
