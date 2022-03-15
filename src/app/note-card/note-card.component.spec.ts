import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SwitchService } from '../switch.service';
import { NotesService } from '../notes.service';
import { NoteCardComponent } from '../note-card/note-card.component';
import { MockNoteService } from '../../testing/mock-services';

describe('NoteCardComponent', () => {
  let switchService: SwitchService;
  let noteService: NotesService;
  let component: NoteCardComponent;
  let fixture: ComponentFixture<NoteCardComponent>;
  let componentElement: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [NoteCardComponent],
        providers: [
          NoteCardComponent,
          {
            provide: NotesService,
            useClass: MockNoteService,
          },
        ],
      })
        .compileComponents()
        .then(() => {
          switchService = TestBed.inject(SwitchService);
          noteService = TestBed.inject(NotesService);
          fixture = TestBed.createComponent(NoteCardComponent);
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

  it('should display card with input', () => {
    component.note = { id: 1, title: 'title', desc: 'desc' };
    fixture.detectChanges();

    const title = componentElement.querySelector('.notes__title');
    const desc = componentElement.querySelector('.notes__desc');

    expect(title?.innerHTML).toEqual('Title');
    expect(desc?.innerHTML).toEqual(' desc ');
  });

  it('should delete todo note', () => {
    component.note = { id: 1, title: 'title', desc: 'desc' };
    fixture.detectChanges();

    let onDelete: jasmine.Spy = spyOn(
      component,
      'removeItem'
    ).and.callThrough();
    const deleteButton: HTMLInputElement =
      componentElement.querySelector('.notes__delete')!;

    deleteButton.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(onDelete.calls.any()).toBeTrue();
    expect(noteService.notes.length).toEqual(0);
  });

  it('should render without fadeOut', () => {
    component.note = { id: 1, title: 'title', desc: 'desc' };
    fixture.detectChanges();

    const fadeOutBlock = componentElement.querySelector(
      '.fade-out-truncation'
    )!;
    const style = getComputedStyle(fadeOutBlock);

    expect(style.display).toEqual('none');
  });

  it('should render with fadeOut', () => {
    component.note = {
      id: 1,
      title: 'title',
      desc: 'very long description very long description very long description very long descriptionvery long description very long description very long description very long description very long description very long description very long description very long description very long description very long description very long description very long description very long description',
    };
    fixture.detectChanges();

    const fadeOutBlock = componentElement.querySelector(
      '.fade-out-truncation'
    )!;
    const style = getComputedStyle(fadeOutBlock);

    expect(style.display).toEqual('block');
  });
});
