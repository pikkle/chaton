import { Injectable } from "@angular/core";
import { ContactComponent } from '../contact/contact.component';
import { Listener } from './listener';

import * as io from "socket.io-client";

@Injectable()
export class SocketService {
    private static _instance: SocketService = new SocketService(); // singleton construction

    private host: string = "http://localhost:3030"
    private socket: SocketIOClient.Socket;
    private token: string;
    private id: string;
    private email: string

    /**
     * Singleton constructor
     */
    constructor() {
        if (SocketService._instance) {
            throw new Error("Error: Instantiation failed: use SocketService.getInstance() instead")
        }
        SocketService._instance = this;
    }

    public static getInstance(): SocketService {
        return SocketService._instance;
    }

    /**
     * Authenticate the user opening a websocket
     */
    public authenticate(token: string, id: string, email: string): boolean {
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
        return this.socket.connected;
    }

    public sendMessage(message: string, to: ContactComponent): void {
        this.socket.emit('send_message', { token: this.token, id: this.id, sender: this.email, receiver: to.id, content: message });
    }

    public addListener(type: string, listener: Function): void {
        this.socket.on(type, listener);
    }

}