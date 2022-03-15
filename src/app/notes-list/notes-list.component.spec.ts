import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwitchService } from '../switch.service';
import { NotesService } from '../notes.service';
import { NotesListComponent } from './notes-list.component';
import { NoteCardComponent } from '../note-card/note-card.component';
import {
  MockSwitchService,
  MockNoteService,
} from '../../testing/mock-services';

describe('NotesListComponent', () => {
  let switchService: SwitchService;
  let noteService: NotesService;
  let component: NotesListComponent;
  let fixture: ComponentFixture<NotesListComponent>;
  let componentElement: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BrowserAnimationsModule],
        declarations: [NotesListComponent, NoteCardComponent],
        providers: [
          NotesListComponent,
          {
            provide: NotesService,
            useClass: MockNoteService,
          },
          {
            provide: SwitchService,
            useClass: MockSwitchService,
          },
        ],
      })
        .compileComponents()
        .then(() => {
          switchService = TestBed.inject(SwitchService);
          noteService = TestBed.inject(NotesService);
          fixture = TestBed.createComponent(NotesListComponent);
          component = fixture.componentInstance;
          componentElement = fixture.nativeElement;
        });
    })
  );

  afterEach(() => {
    noteService.notes = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input with list of todos', () => {
    noteService.add({ id: 1, title: 'title', desc: 'desc' });
    fixture.detectChanges();

    const input = componentElement.querySelector('.filter__input');
    const todos = componentElement.querySelectorAll('.notes__item');
    const title = componentElement.querySelector('.notes__title');
    const desc = componentElement.querySelector('.notes__desc');

    expect(component.filteredNotes.length).toEqual(1);
    expect(input).toBeTruthy();
    expect(todos.length).toBe(1);
    expect(title?.innerHTML).toEqual('Title');
    expect(desc?.innerHTML).toEqual(' desc ');
  });

  it('should filter todo on inputs', () => {
    noteService.add({ id: 1, title: 'title', desc: 'desc' });
    fixture.detectChanges();

    let onInput: jasmine.Spy = spyOn(
      component,
      'filterNotes'
    ).and.callThrough();
    const input: HTMLInputElement =
      componentElement.querySelector('.filter__input')!;

    input.value = 'some another';
    input.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();

    expect(onInput.calls.any()).toBeTrue();
    expect(component.filteredNotes.length).toEqual(0);
  });

  it('should delete todo note', () => {
    noteService.add({ id: 1, title: 'title', desc: 'desc' });
    fixture.detectChanges();

    let onDelete: jasmine.Spy = spyOn(component, 'remove').and.callThrough();
    const deleteButton: HTMLInputElement =
      componentElement.querySelector('.notes__delete')!;

    deleteButton.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(onDelete.calls.any()).toBeTrue();
    expect(component.filteredNotes.length).toEqual(0);
    expect(noteService.notes.length).toEqual(0);
  });
});
