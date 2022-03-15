import { Injectable } from '@angular/core';
import { Notes } from './notes';
@Injectable({
  providedIn: 'root',
})
export class NotesService {
  notes: Notes[] = [];

  add(note: Notes): void {
    this.notes.push(note);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  update(note: Notes): void {
    const originalNote = this.notes.find((item) => item.id === note.id);
    if (originalNote) {
      originalNote.title = note.title;
      originalNote.desc = note.desc;
    }

    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  remove(note: Notes): void {
    this.notes = this.notes.filter((item) => item.id !== note.id);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  clear(): void {
    this.notes = [];
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
}
