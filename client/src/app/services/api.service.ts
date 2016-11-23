import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ApiService {
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

 private extractData(res: Response) {
    console.log(res);
    let body = res.json();
    return body || {};
  }


  post(headers, options, data, url): any {
    return this.http.post("http://localhost:3030" + url, JSON.stringify(data), options)
      .toPromise()
      .catch(this.handleError)
  }
  get(headers, options, url): any {
    return this.http.get("http://localhost:3030" + url, options)
      .toPromise()
      .then(response => {
        console.log("RESPONSE");
        console.log(response);
        return response;
      }).then(this.extractData)
      .catch(this.handleError)
  }
  constructor(private http: Http) { }

}
