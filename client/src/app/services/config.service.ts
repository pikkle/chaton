import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private _server: string;

  constructor() {
    this._server = "http://localhost:3030";
  }

  public server(): string {
    return this._server;
  }
}
