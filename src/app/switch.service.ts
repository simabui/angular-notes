import { Injectable } from '@angular/core';
import { Notes } from './notes';
@Injectable({
  providedIn: 'root',
})
export class SwitchService {
  route: string = 'notesList';
  note: any = {};

  showNotesList(): void {
    this.route = 'notesList';
  }

  showNoteForm(): void {
    this.note = {};
    this.route = 'noteForm';
  }

  showNoteFormWithValues(value: Notes): void {
    this.note = value;
    this.route = 'noteForm';
  }
}
