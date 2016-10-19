import { ContactComponent } from './contact/contact.component';
import { ConversationComponent } from './conversation/conversation.component'
import { MessageComponent } from './message/message.component'
export const CONTACTS: ContactComponent[] = [
  new ContactComponent(1, 'Contact 1', 'osef', [
      new ConversationComponent('Conv 1', [1], [
        new MessageComponent(1, 'text', 'Message 1 of contact 1', 'text'),
        new MessageComponent(1, 'text', 'Message 2 of contact 1', 'text'),
        new MessageComponent(1, 'text', 'Message 3 of contact 1', 'text'),
        new MessageComponent(1, 'text', 'Message 4 of contact 1', 'text'),
        new MessageComponent(1, 'text', 'Message 5 of contact 1', 'text'),
      ])
  ]),
  new ContactComponent(2, 'Contact 2', 'osef', [
      new ConversationComponent('Conv 2', [2], [
        new MessageComponent(1, 'text', 'Message 1 of contact 2', 'text'),
        new MessageComponent(1, 'text', 'Message 2 of contact 2', 'text'),
        new MessageComponent(1, 'text', 'Message 3 of contact 2', 'text'),
        new MessageComponent(1, 'text', 'Message 4 of contact 2', 'text')
      ])
  ]),
  new ContactComponent(3, 'Contact 3', 'osef', [
      new ConversationComponent('Conv 3', [2], [
        new MessageComponent(1, 'text', 'Message 1 of contact 3', 'text'),
        new MessageComponent(1, 'text', 'Message 2 of contact 3', 'text'),
        new MessageComponent(1, 'text', 'Message 3 of contact 3', 'text'),
        new MessageComponent(1, 'text', 'Message 4 of contact 3', 'text'),
        new MessageComponent(1, 'text', 'Message 5 of contact 3', 'text'),
        new MessageComponent(1, 'text', 'Message 6 of contact 3', 'text'),
        new MessageComponent(1, 'text', 'Message 7 of contact 3', 'text'),
        new MessageComponent(1, 'text', 'Message 8 of contact 3', 'text'),
        new MessageComponent(1, 'text', 'Message 7 of contact 3', 'text'),
        new MessageComponent(1, 'text', 'Message 8 of contact 3', 'text'),
        new MessageComponent(1, 'text', 'Message 7 of contact 3', 'text'),
        new MessageComponent(1, 'text', 'Message 8 of contact 3', 'text'),
        new MessageComponent(1, 'text', 'This is a much longer message This is a much longer message This is a much longer message This is a much longer message This is a much longer message This is a much longer message This is a much longer message This is a much longer message This is a much longer message This is a much longer message ', 'text'),
        new MessageComponent(1, 'text', 'Message 8 of contact 3', 'text'),
        new MessageComponent(1, 'text', 'Message 7 of contact 3', 'text'),
        new MessageComponent(1, 'text', 'Short message', 'text'),
        new MessageComponent(1, 'text', 'sho', 'text'),
        new MessageComponent(1, 'text', 'Message 10 of contact 3', 'text'),
        new MessageComponent(1, 'text', 'Message 11 of contact 3', 'text'),
      ])
  ])
  ];