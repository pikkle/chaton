import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {ConfigService} from './config.service';
import {SocketService} from "./socket.service";
import {CryptoService} from "./crypto.service";
import {Contact} from "../contact/contact";

@Injectable()
export class ApiService {
  private static readonly jsonHeader = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http,
              private config: ConfigService,
              private socketService: SocketService,
              private cryptoService: CryptoService) {
  }

  /**
   * Handles error responses
   * @param { Reponse | any } error: Error response sent by server
   * @return { Promise } Promisified error message
   */
  private handleError(error: Response | any) {
    console.log(error);
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

  /**
   * Extracts data from raw response
   * @param res the raw response
   * @returns {any|{}} an object containing the response's data
   */
  private extractData(res: Response): any {
    let body = res.json();
    return body || {};
  }

  /**
   * Sends a POST request to the server
   * @param options HTTP options
   * @param path API-REST path
   * @param data the data to send along the post
   * @returns {Promise<TResult|TResult>} the body response of the server
   */
  private post(options, path, data): any {
    return this.http.post(this.config.server() + path, JSON.stringify(data), options)
      .toPromise()
      .then(response => {
        console.log("POST RESPONSE");
        console.log(response);
        return response;
      })
      .then(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Sends a GET request to the server
   * @param options HTTP options
   * @param path API-REST path
   * @returns {Promise<TResult|TResult>} the body response of the server
   */
  private get(options, path): any {
    return this.http.get(this.config.server() + path, options)
      .toPromise()
      .then(response => {
        console.log("GET RESPONSE");
        console.log(response);
        return response;
      })
      .then(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Requests a login to the server. Calls an authentication aswell.
   * @param email the user's email
   * @param password the user's password
   * @returns {any} the body response
   */
  public login(email: string, password: string): Promise<any> {
    var options = new RequestOptions({headers: ApiService.jsonHeader});
    var path = '/api/auth';
    var data = {
      "email": email,
      "password": this.cryptoService.hashPassword(password)
    };

    return this.post(options, path, data);
  }

  /**
   * Requests a registering to the server.
   * @param email the new account's email
   * @param username the new account's username
   * @param password the new account's password
   * @returns {Promise<any>} the body response
   */
  public register(email: string, username: string, password: string): Promise<any> {
    var keypair = this.cryptoService.generateKeypair();
    localStorage["privateKey"] = keypair.private;
    localStorage["publicKey"] = keypair.public;

    var options = new RequestOptions({headers: ApiService.jsonHeader});
    var path = "/api/profile";
    var data = {
      "email": email,
      "username": username,
      "password": password,
      "public_key": keypair.public
    };

    return this.post(options, path, data);
  }

  /**
   * Requests a contact list fr om the server
   * @param userId the user's id
   * @param token the user's session token
   * @returns {Promise<ContactComponent[]>} the body response
   */
  public getContacts(userId: string, token: string): Promise<Contact[]> {
    var headers = new Headers({'Content-Type': 'application/json', Authorization: "Bearer " + token});
    var options = new RequestOptions({headers: headers});
    var path = '/api/profile/' + userId;
    return this.get(options, path).then(response => {
      localStorage["username"] = response.username;
      localStorage["avatar"] = '../assets/cat.jpg';
      return response;
    }).then(Contact.contactsFromJson);
  }

  public updateUser(data: Object) {
    // TODO: une fois que le serveur permet d'updater les infos
  }


}
