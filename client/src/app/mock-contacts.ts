import {ContactComponent} from './contact/contact.component';
import {ConversationComponent} from './conversation/conversation.component'
import {MessageComponent} from './message/message.component'
import {Contact} from "./contact/contact";

export const CONTACTS: ContactComponent[] = [
  new ContactComponent(new Contact('1', 'Jane', '../assets/default_avatar.png'),
    new ConversationComponent('Conv 1', ['1'], [
      new MessageComponent(1, 'image', ':-)', 'text', "test@test.com"),
      new MessageComponent(1, 'text', 'Message 3 of Jane', 'text', "other@other.com"),
      new MessageComponent(1, 'image', ':crying:', 'text', "test@test.com"),
      new MessageComponent(1, 'image', ':-(', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 5 of Jane', 'text', "other@other.com"),
    ])
  ),
  new ContactComponent(new Contact('2', 'Jack', '../assets/default_avatar.png'),
    new ConversationComponent('Conv 2', ['2'], [
      new MessageComponent(1, 'text', 'Message 1 of Jack', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 2 of Jack', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 3 of Jack', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 4 of Jack', 'text', "other@other.com")
    ])
  ),
  new ContactComponent(new Contact('3', 'Joe', '../assets/default_avatar.png'),
    new ConversationComponent('Conv 3', ['3'], [
      new MessageComponent(1, 'text', 'Message 1 of Joe', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 2 of Joe', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 3 of Joe', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 4 of Joe', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 5 of Joe', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 6 of Joe', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 7 of Joe', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 8 of Joe', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 7 of Joe', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 8 of Joe', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 7 of Joe', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 8 of Joe', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'This is a much longer message This is a much longer message This is a much longer message This is a much longer message This is a much longer message This is a much longer message This is a much longer message This is a much longer message This is a much longer message This is a much longer message ', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 8 of Joe', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 7 of Joe', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Short message', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'sho', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 10 of Joe', 'text', "other@other.com"),
      new MessageComponent(1, 'text', 'Message 11 of Joe', 'text', "other@other.com"),
    ])
  )
];
