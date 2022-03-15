import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesFormComponent } from './notes-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SwitchService } from '../switch.service';
import { NotesService } from '../notes.service';
import {
  MockNoteService,
  MockSwitchService,
} from '../../testing/mock-services';

describe('NotesFormComponent', () => {
  let switchService: SwitchService;
  let noteService: NotesService;
  let component: NotesFormComponent;
  let fixture: ComponentFixture<NotesFormComponent>;
  let componentElement: HTMLElement;
  let onSubmit: jasmine.Spy;
  let onUpdate: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [NotesFormComponent],
      providers: [
        NotesFormComponent,
        { provide: SwitchService, useClass: MockSwitchService },
        { provide: NotesService, useClass: MockNoteService },
      ],
    }).compileComponents();
    switchService = TestBed.inject(SwitchService);
    noteService = TestBed.inject(NotesService);
    fixture = TestBed.createComponent(NotesFormComponent);
    component = fixture.componentInstance;
    componentElement = fixture.nativeElement;
    onSubmit = spyOn(component, 'onSubmit').and.callThrough();
    onUpdate = spyOn(component, 'onUpdate').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form', () => {
    const labels = componentElement.querySelectorAll('.label');
    const inputs = componentElement.querySelectorAll('.input');

    expect(labels[0].childNodes[0].nodeValue).toEqual(' Title ');
    expect(labels[1].childNodes[0].nodeValue).toEqual(' Body ');

    inputs.forEach((input) => {
      expect(input).toBeTruthy();
    });
  });

  it('should submit form', () => {
    const form = fixture.debugElement.query(By.css('#form'));
    form.triggerEventHandler('ngSubmit', null);

    fixture.detectChanges();

    expect(onSubmit.calls.any()).toBeTruthy();
  });

  it('should create new note', () => {
    component.noteForm.controls['title'].setValue('some title');
    component.noteForm.controls['desc'].setValue('some desc');

    const form = fixture.debugElement.query(By.css('#form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.isToUpdate).toBeFalsy();
    expect(component.isValid).toBeTruthy();
    expect(noteService.notes[0]).toBeDefined();
    expect(noteService.notes[0].title).toEqual('some title');
    expect(noteService.notes[0].desc).toEqual('some desc');
  });

  it('should prefill form for update', () => {
    switchService.note = {
      id: 1,
      title: 'to update item',
      desc: 'to update desc',
    };

    fixture.detectChanges();
    const input = componentElement.querySelector('input') as HTMLInputElement;
    const textarea = componentElement.querySelector(
      'textarea'
    ) as HTMLTextAreaElement;
    const button = componentElement.querySelector(
      '.button-save'
    ) as HTMLButtonElement;

    expect(component.isToUpdate).toBeTruthy();
    expect(component.noteForm.controls['title'].value).toEqual(
      'to update item'
    );
    expect(input.value).toEqual('to update item');
    expect(component.noteForm.controls['desc'].value).toEqual('to update desc');
    expect(textarea.value).toEqual('to update desc');
    expect(button.innerText).toEqual('Update');
  });

  it('should update new note', () => {
    noteService.add({ id: 1, title: 'item', desc: 'desc' });
    switchService.note = { id: 1, title: 'item', desc: 'desc' };
    fixture.detectChanges();

    component.noteForm.controls['title'].setValue('new title');
    component.noteForm.controls['desc'].setValue('new desc');
    component.isToUpdate = true;

    fixture.detectChanges();

    const updateButton = fixture.debugElement.query(By.css('.button-save'));
    updateButton.triggerEventHandler('click', null);

    expect(component.isToUpdate).toBeTruthy();
    expect(component.isValid).toBeTruthy();
    expect(onUpdate.calls.any()).toBeTruthy();
    expect(noteService.notes[0]).toBeDefined();
    expect(noteService.notes[0].title).toEqual('new title');
    expect(noteService.notes[0].desc).toEqual('new desc');
  });

  it('should display error message', () => {
    const form = fixture.debugElement.query(By.css('#form'));
    form.triggerEventHandler('ngSubmit', null);

    fixture.detectChanges();
    const errorEl = componentElement.querySelector('.form-error');
    const { errors: errorsTitle } = component.noteForm.controls['title'];
    const { errors: errorsDesc } = component.noteForm.controls['desc'];

    expect(component.isValid).toBeFalsy();
    expect(errorEl).toBeDefined();
    expect(errorsTitle?.required).toBeTruthy();
    expect(errorsDesc?.required).toBeTruthy();
  });
});
