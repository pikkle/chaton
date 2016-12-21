import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

// ConfigService injection
import {ConfigService} from './services/config.service';

// Routing
import {RouterModule} from '@angular/router'

// Angular-material
import {MaterialModule} from '@angular/material';

// Angular-modal
import {ModalModule} from "ng2-modal";

// Application components
import {AppComponent} from './app.component';
import {ChatonComponent} from './chaton.component';
import {ContactListComponent} from './contact/contact-list.component';
import {ConversationComponent} from './conversation/conversation.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';

// Services injection
import {ContactService} from './services/contact.service';
import {SocketService} from './services/socket.service';
import {CryptoService} from "./services/crypto.service";
import {ApiService} from "./services/api.service";

// Bootstrap
import {AlertModule} from 'ng2-bootstrap/ng2-bootstrap';

import {Autosize} from '../../node_modules/angular2-autosize/angular2-autosize'
import {EmojiService} from "./services/emoji.service";
import 'hammerjs';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule,
    RouterModule.forRoot([
      {path: 'register', component: RegisterComponent},
      {path: '', component: LoginComponent},
      {path: 'chat', component: ChatonComponent}
    ]),
    AlertModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    AppComponent,
    Autosize,
    ChatonComponent,
    ContactListComponent,
    ConversationComponent,
    RegisterComponent,
    LoginComponent
  ],
  providers: [
    ApiService,
    ContactService,
    EmojiService,
    SocketService,
    CryptoService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
