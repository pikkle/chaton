import {Injectable} from "@angular/core";
import {Contact} from '../contact/contact';

import * as io from "socket.io-client";
import {CryptoService} from "./crypto.service";

@Injectable()
export class SocketService {
  private host: string = "http://localhost:3030";
  private socket: SocketIOClient.Socket;
  private token: string;
  private id: string;
  private email: string;
  authenticated: boolean = false;

  /**
   * Singleton constructor
   */
  constructor(private cryptoService: CryptoService) {
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
    this.socket = io.connect(this.host);
    this.token = token;
    this.id = id;
    this.email = email;
    this.socket.emit("authenticate", {token: this.token, id: this.id});
    this.authenticated = true;
    this.socket.on("error_authentication", function(event, data){
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
    this.socket.close();
  }

  /**
   * Sends a message
   * @param message the message to be sent
   * @param to the recipient
   */
  public sendMessage(message: string, to: Contact): void {
    this.socket.emit('send_message', {
      token: this.token,
      id: this.id,
      sender: this.email,
      receiver: to.id,
      content: this.cryptoService.cipher(message, to.publickey)
    });
  }

  public addListener(type: string, listener: Function): void {
    if (!this.socket) {
      throw new Error("Websocket is not opened !");
    }
    this.socket.on(type, listener);
  }

}
