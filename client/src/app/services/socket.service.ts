import { Injectable } from "@angular/core";
import {Contact, SimpleContact, GroupContact} from '../contact/contact';

import * as io from "socket.io-client";
import { CryptoService } from "./crypto.service";
import { Message } from "../conversation/message";
import {ApiService} from "./api.service";

@Injectable()
export class SocketService {
  private host: string = "http://localhost:3030";
  private socket: SocketIOClient.Socket;
  private token: string;
  private id: string;
  private email: string;
  private publicKey: string;
  authenticated: boolean = false;

  /**
   * Singleton constructor
   */
  constructor(
    private cryptoService: CryptoService,
    private apiService: ApiService) {
  }

  /**
   * Authenticate the user opening a websocket
   * @param token the user's token
   * @param id the user's id
   * @param email the user's mail
   * @returns {boolean} whether the user is authenticated or not
   */
  public authenticate(token: string, id: string, email: string, publicKey: string) {
    if (this.isAuthenticated()) {
      return true;
    }
    this.socket = io.connect(this.host);
    this.token = token;
    this.id = id;
    this.email = email;
    this.publicKey = publicKey;
    this.socket.emit("authenticate", { token: this.token, id: this.id });
    this.authenticated = true;
    this.socket.on("error_authentication", function (event, data) {
      console.error("Received an error_authentication message from the server");
      console.error(event);
      console.error(data);
      this.SocketService.authenticated = false;
    });
  }

  /**
   * @returns {boolean} whether or not the user is authenticated
   */
  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public disconnect(): void {
    this.authenticated = false;
    this.socket.close();
  }

  /**
   * Sends a message
   * @param message the message to be sent
   * @param to the recipient
   */
  public sendMessage(message: Message, to: Contact): void {
    var contacts: SimpleContact[] = [];
    if (to instanceof GroupContact) {
      contacts = (<GroupContact> to).contacts;
    } else if (to instanceof SimpleContact) {
      contacts.push(<SimpleContact> to);
    }

    var date = Date.now();
    var messageForSelf = {
      token: this.token,
      timestamp: date,
      state: 0,
      type: "txt",
      extension: "txt",
      group: to.groupId,
      sender: this.email,
      receiver: this.id,
      content: this.cryptoService.cipher(message.content, this.publicKey)
    };
    if (to.groupId) {
      messageForSelf.group = to.groupId;
    }
    this.apiService.saveToHistory(messageForSelf);

    for(let contact of contacts) {
      var messageForOther = {
        token: this.token,
        timestamp: date,
        state: 0,
        type: "txt",
        extension: "txt",
        group: contact.groupId,
        sender: this.email,
        receiver: contact.id,
        content: this.cryptoService.cipher(message.content, contact.publicKey)
      };
      if (contact.groupId) {
        messageForOther.group = contact.groupId;
      }
      this.socket.emit('send_message', messageForOther);
    }
  }

  public addListener(type: string, listener: Function): void {
    if (!this.socket) {
      throw new Error("Websocket is not opened !");
    }
    this.socket.on(type, listener);
  }

}
