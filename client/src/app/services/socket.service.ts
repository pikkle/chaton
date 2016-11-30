import { Injectable } from "@angular/core";
import { ContactComponent } from '../contact/contact.component';

import * as io from "socket.io-client";

@Injectable()
export class SocketService {
    private host: string = "http://localhost:3030";
    private socket: SocketIOClient.Socket;
    private token: string;
    private id: string;
    private email: string

    /**
     * Singleton constructor
     */
    constructor() { 
        console.log("Creating a socket service");
     }

    /**
     * Authenticate the user opening a websocket
     */
    public authenticate(token: string, id: string, email: string): boolean {
        if (this.isAuthenticated()) {
            return true;
        }
        this.socket = io.connect(this.host);
        this.token = token;
        this.id = id;
        this.email = email;
        this.socket.emit("authenticate", { token: this.token, id: this.id });

        return this.isAuthenticated();
    }

    /**
     * Returns whether or not the user is authenticated
     */
    public isAuthenticated(): boolean {
        return this.socket != undefined && this.socket.connected;
    }

    public sendMessage(message: string, to: ContactComponent): void {
        this.socket.emit('send_message', { token: this.token, id: this.id, sender: this.email, receiver: to.id, content: message });
    }

    public addListener(type: string, listener: Function): void {
        this.socket.on(type, listener);
    }

}