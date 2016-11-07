import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { MessageComponent } from './message/message.component';
import { ContactService } from './contact.service';
import { EmojiComponent } from './emoji/emoji.component'

// Angular-modal

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [
    AppComponent,
    ContactComponent,
    ContactListComponent,
    ConversationComponent,
    MessageComponent,
    EmojiComponent
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }