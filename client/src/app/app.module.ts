import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Routing
import { RouterModule } from '@angular/router'

// Angular-modal
import {ModalModule} from "ng2-modal";

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { MessageComponent } from './message/message.component';
import { ContactService } from './contact.service';
import { EmojiComponent } from './emoji/emoji.component'
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

// Bootstrap
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule,
    RouterModule.forRoot([
      { path: 'register', component: RegisterComponent },
      { path: '', component: LoginComponent},
      { path: 'authentified', component: ContactListComponent }
    ]),
    AlertModule
  ],
  declarations: [
    AppComponent,
    ContactComponent,
    ContactListComponent,
    ConversationComponent,
    MessageComponent,
    EmojiComponent,
    RegisterComponent,
    LoginComponent
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { 
}