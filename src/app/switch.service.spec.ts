import { TestBed } from '@angular/core/testing';
import { SwitchService } from './switch.service';

const defaultNote = { id: 10, title: 'test', desc: 'desc' };

describe('SwitchService', () => {
  let service: SwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show notesList', () => {
    service.showNotesList();
    expect(service.route).toEqual('notesList');
  });

  it('should show noteForm', () => {
    service.showNoteForm();
    expect(service.route).toEqual('noteForm');
  });

  it('should show noteForm with values', () => {
    service.showNoteFormWithValues(defaultNote);
    expect(service.route).toEqual('noteForm');
    expect(service.note).toEqual(defaultNote);
  });
});
