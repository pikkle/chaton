import {Component, OnInit, Input} from '@angular/core';
import {Message} from './message';
import {EmojiService} from '../services/emoji.service';
import {Contact} from "../contact/contact";
import {SocketService} from "../services/socket.service";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  @Input()
  selectedContact: Contact;

  email: string;
  nextMessage: string;

  constructor(private emojiService: EmojiService, private socketService: SocketService) {
  }

  ngOnInit() {
    this.socketService.addListener("new_message", (data: any) => {
      console.log("Received a message: ");
      console.log(data);
      if (data.id === this.selectedContact.id) {
        this.receiveMessage(data.sender, data.content);
      }
    });
    this.email = localStorage['email'];
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
    //for (let contact of this.contacts) {
    console.log("sending message");
    this.receiveMessage(localStorage['id'], this.nextMessage);
    this.socketService.sendMessage(this.nextMessage, this.selectedContact);
    this.nextMessage = "";
    //}
  }

  /**
   * Adds a message to the component view
   * @param from
   * @param message
   */
  receiveMessage(from: string, message: string): void {
    // TODO: insert in right conversation...
    if (message !== null && message.length > 0) {
      if (/\S/.test(message)) {
        // string is not empty and not just whitespace

        this.emojiService.getEmoji(message.replace(/^\s+|\s+$/g, "")).then(emoji => {
          if (emoji !== null && emoji !== undefined) {
            this.selectedContact.addMessage(new Message(new Date().getTime(), "image", emoji.text, ".png", from));
          } else {
            this.selectedContact.addMessage(new Message(new Date().getTime(), "text", message, ".txt", from));
            console.log("added message to list");
          }
        }).then(() => {
          message = "";
          var objDiv = document.getElementById("selectedConversation");
          objDiv.scrollTop = objDiv.scrollHeight;
        });
      } else {
        message = "";
      }
    }
  }

}
