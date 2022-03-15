import { Notes } from '../app/notes';

export class MockSwitchService {
  route = 'noteList';
  note = {};

  showNoteForm() {
    this.route = 'noteForm';
  }

  showNotesList(): void {
    this.route = 'notesList';
  }
}

export class MockNoteService {
  notes: Notes[] = [];

  add(note: Notes) {
    this.notes.push(note);
  }
  update(note: Notes) {
    const originalNote = this.notes.find((item) => item.id === note.id);

    if (originalNote) {
      originalNote.title = note.title;
      originalNote.desc = note.desc;
    }
  }
  remove(note: Notes) {
    this.notes = this.notes.filter((item) => item.id !== note.id);
  }
  clear() {}
}
