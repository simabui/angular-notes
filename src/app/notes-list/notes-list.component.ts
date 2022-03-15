import { Component, OnInit } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';
import { NotesService } from '../notes.service';
import { SwitchService } from '../switch.service';
import { Notes } from '../notes';

const listAnimation = trigger('listAnimation', [
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translateY(-30px)',
    }),
    animate(
      '200ms',
      style({
        opacity: 1,
        transform: 'translateY(0)',
        height: '*',
      })
    ),
  ]),
  transition('* => void', [
    animate('100ms', style({ opacity: 1, transform: 'scale(1.1)' })),
    animate(
      '100ms',
      style({
        opacity: 0,
        height: 0,
        transform: 'scale(0.6)',
      })
    ),
  ]),
]);
const staggerAnimation = trigger('staggerAnimation', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({
          opacity: 0,
          height: 0,
        }),
        stagger(100, [animate('0.2s ease')]),
      ],
      { optional: true }
    ),
  ]),
]);
@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [listAnimation, staggerAnimation],
})
export class NotesListComponent implements OnInit {
  constructor(
    public noteService: NotesService,
    public switchService: SwitchService
  ) {}

  ngOnInit(): void {
    const hashedNotes = localStorage.getItem('notes');

    if (hashedNotes) {
      this.noteService.notes = JSON.parse(hashedNotes);
    }

    this.filteredNotes = this.noteService.notes;
  }

  filteredNotes: Notes[] = [];

  filterNotes(event: KeyboardEvent): void {
    const _str: string = (event.target as HTMLInputElement).value || '';

    this.filteredNotes = this.noteService.notes.filter((note) =>
      note.title.includes(_str)
    );
  }

  remove(note: Notes): void {
    this.noteService.remove(note);
    this.filteredNotes = this.filteredNotes.filter(
      (item) => item.id !== note.id
    );
  }
}
