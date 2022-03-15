import { NotesService } from './notes.service';

const defaultNote = { id: 1, title: 'test', desc: 'desc' };
const defaultNot2 = { id: 2, title: 'test2', desc: 'desc2' };

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(() => {
    service = new NotesService();
  });

  afterEach(() => {
    service.notes = [];
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add note', () => {
    service.add(defaultNote);
    expect(service.notes.length).toEqual(1);
    expect(service.notes[0].title).toEqual(defaultNote.title);
    expect(service.notes[0].desc).toEqual(defaultNote.desc);
  });

  it('should update note', () => {
    const updatedNote = { id: 1, title: 'new test', desc: 'new desc' };

    service.add(defaultNote);
    service.update(updatedNote);
    expect(service.notes.length).toEqual(1);
    expect(service.notes[0].title).toEqual(updatedNote.title);
    expect(service.notes[0].desc).toEqual(updatedNote.desc);
  });

  it('should remove note', () => {
    service.add(defaultNote);
    service.remove(defaultNote);
    expect(service.notes.length).toEqual(0);
  });

  it('should clear all notes', () => {
    service.add(defaultNote);
    service.add(defaultNot2);
    service.clear();

    expect(service.notes.length).toEqual(0);
  });
});
