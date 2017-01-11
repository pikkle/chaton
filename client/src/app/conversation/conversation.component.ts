import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Message} from './message';
import {EmojiService} from '../services/emoji.service';
import {Contact, SimpleContact, GroupContact} from "../contact/contact";
import {SocketService} from "../services/socket.service";
import {Emoji} from "../services/emoji";
import {CryptoService} from "../services/crypto.service";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  @Input()
  selectedContact: Contact;

  email: string;
  id: string;
  nextMessage: string;

  @Input()
  background: string;

  emojis: Emoji[];



  @Output()
  addedNewMessage = new EventEmitter<Message>();


  constructor(private emojiService: EmojiService,
              private socketService: SocketService,
              private cryptoService: CryptoService) {
  }

  ngOnInit() {
    this.background = "../../assets/backgrounds/b1.jpg";
    this.email = localStorage['email'];
    this.id = localStorage['id'];
    this.emojiService.getEmojis().then(emojis => this.emojis = emojis);
  }

  // Sets the content of "nextMessage" and sends it
  changeMessage(newMess: string) {
    this.nextMessage = newMess;
    this.sendMessage();
  }

  /**
   * The user wrote a message. It is added to the component,
   * and sent to every concerned contact through the server
   */
  sendMessage(): void {
    Message.parseMessage(this.nextMessage,
      this.id,
      this.selectedContact.groupId,
      this.emojiService,
      this.cryptoService
    ).then(message => {
      this.selectedContact.addMessage(message);
      this.socketService.sendMessage(message, this.selectedContact);
      this.nextMessage = "";
      this.addedNewMessage.emit(message);
    }).catch(error => {

    });

  }

  findSender(message: Message): SimpleContact {
    if (this.selectedContact instanceof SimpleContact){
      return this.selectedContact;
    } else {
      return (<GroupContact> this.selectedContact).contacts.find(c => c.id === message.sender);
    }
  }


}
