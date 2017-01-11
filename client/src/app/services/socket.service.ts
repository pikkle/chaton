import {Injectable} from "@angular/core";
import {Contact, SimpleContact, GroupContact} from '../contact/contact';

import * as io from "socket.io-client";
import {CryptoService} from "./crypto.service";
import {Message} from "../conversation/message";
import {ApiService} from "./api.service";
import {ConfigService} from "./config.service";

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket;
  private token: string;
  private id: string;
  private email: string;
  authenticated: boolean = false;

  /**
   * Singleton constructor
   */
  constructor(private cryptoService: CryptoService,
              private configService: ConfigService,
              private apiService: ApiService) {
  }

  /**
   * Authenticate the user opening a websocket
   * @param token the user's token
   * @param id the user's id
   * @param email the user's mail
   * @returns {boolean} whether the user is authenticated or not
   */
  public authenticate(token: string, id: string, email: string) {
    if (this.isAuthenticated()) {
      return true;
    }
    this.socket = io.connect(this.configService.server());
    this.token = token;
    this.id = id;
    this.email = email;
    //this.publicKey = JSON.parse(publicKey);
    this.socket.emit("authenticate", {token: this.token, id: this.id});
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
    var messages: any[] = [];

    if (to instanceof GroupContact) {
      contacts = (<GroupContact>to).contacts; // contacts contains already self
    } else if (to instanceof SimpleContact) {
      contacts.push(<SimpleContact> to);
      this.cryptoService.cipher(message.content, this.cryptoService.publicKey).then(m => {
        this.socket.emit('send_message', { // message for self
          token: this.token,
          timestamp: date,
          state: 0,
          type: "txt",
          extension: "txt",
          group: to.groupId,
          sender: this.id,
          receiver: this.id,
          content: m
        });
      })
    }

    var date = Date.now();
    for (let contact of contacts) {
      var publicKey: PromiseLike<CryptoKey> = CryptoService.jsonWebKeyToPromiseLikeCryptoKey(contact.publicKey);
      this.cryptoService.cipher(message.content, publicKey).then(m => {
        this.socket.emit('send_message', {
          token: this.token,
          timestamp: date,
          state: 0,
          type: "txt",
          extension: "txt",
          group: to.groupId,
          sender: this.id,
          receiver: contact.id,
          content: m
        });
      });
    }


  }

  public addListener(type: string, listener: Function): void {
    if (!this.socket) {
      throw new Error("Websocket is not opened !");
    }
    this.socket.on(type, listener);
  }

}
