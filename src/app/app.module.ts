import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NotesFormComponent } from './notes-form/notes-form.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoteCardComponent } from './note-card/note-card.component';

@NgModule({
  declarations: [AppComponent, NotesFormComponent, NotesListComponent, NoteCardComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
