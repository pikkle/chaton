import {ApiService} from './api.service';
import {SocketService} from './socket.service';
import {NgModule} from "@angular/core";
import {ConfigService} from './config.service';
import {CryptoService} from "./crypto.service";


@NgModule({
  imports: [ConfigService],
  declarations: [ApiService, SocketService, CryptoService],
  bootstrap: []
})
export class ServiceModule {

}
