import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// ConfigService injection
import { ConfigService } from './services/config.service';

// Routing
import { RouterModule } from '@angular/router'

// Angular-modal
import {ModalModule} from "ng2-modal";

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { ContactListComponent } from './contact/contact-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { MessageComponent } from './message/message.component';
import { EmojiComponent } from './emoji/emoji.component'
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

// Services injection
import { ContactService } from './services/contact.service';
import { SocketService } from './services/socket.service';

// Bootstrap
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { Autosize } from '../../node_modules/angular2-autosize/angular2-autosize'
import {CryptoService} from "./services/crypto.service";
import {ApiService} from "./services/api.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule,
    RouterModule.forRoot([
      { path: 'register', component: RegisterComponent },
      { path: '', component: LoginComponent},
      { path: 'authenticated', component: ContactListComponent }
    ]),
    AlertModule
  ],
  declarations: [
    AppComponent,
    Autosize,
    ContactComponent,
    ContactListComponent,
    ConversationComponent,
    MessageComponent,
    EmojiComponent,
    RegisterComponent,
    LoginComponent
  ],
  providers: [ApiService, ContactService, SocketService, CryptoService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
