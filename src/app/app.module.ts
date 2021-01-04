import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Is nodig om http verkeer te sturen naar de backend
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { NoteComponent } from './note/note.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NoteSearchComponent } from './note-search/note-search.component'

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NoteComponent,
    NoteDetailComponent,
    UserDetailComponent,
    NoteSearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule { }
