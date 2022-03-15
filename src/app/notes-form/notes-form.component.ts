import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotesService } from '../notes.service';
import { SwitchService } from '../switch.service';
import { Notes } from '../notes';

@Component({
  selector: 'app-notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.scss'],
})
export class NotesFormComponent implements OnInit {
  constructor(
    private noteService: NotesService,
    public switchService: SwitchService
  ) {}

  ngOnInit(): void {
    if (Object.keys(this.switchService.note).length > 0) {
      const obj = { ...this.switchService.note };

      this.isToUpdate = true;
      this.noteForm.setValue({
        title: obj.title,
        desc: obj.desc,
      });
    }
  }

  @Input() toShowNoteList?: boolean;

  noteForm = new FormGroup({
    title: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
  });

  isValid: boolean = true;
  isToUpdate: boolean = false;

  onSubmit(): void {
    if (!this.noteForm.valid) {
      this.isValid = false;
    } else {
      const input = {
        id: this.noteService.notes.length + 1,
        ...this.noteForm.value,
      };

      this.noteService.add(input);
      this.switchService.showNotesList();
    }
  }

  onUpdate(note: Notes): void {
    if (!this.noteForm.valid) {
      this.isValid = false;
    } else {
      const input = {
        id: note.id,
        ...this.noteForm.value,
      };

      console.log('test', this.noteForm.value);

      this.noteService.update(input);
      this.switchService.showNotesList();
    }
  }
}
