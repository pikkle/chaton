import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  private _server: string;
  private _debug: boolean;

  constructor() {
    this._server = "http://localhost:3030";
    this._debug = false;
  }

  public server(): string {
    return this._server;
  }

  public debug(): boolean {
    return this._debug;
  }
}
