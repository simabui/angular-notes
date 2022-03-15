import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SwitchService } from './switch.service';
import { MockSwitchService } from '../testing/mock-services';

@Component({ selector: 'app-notes-list', template: '' })
class NotListStubComponent {}

@Component({ selector: 'app-notes-form', template: '' })
class NoteFormStubComponent {}

describe('AppComponent', () => {
  let switchService: SwitchService;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          AppComponent,
          NotListStubComponent,
          NoteFormStubComponent,
        ],
        providers: [
          AppComponent,
          { provide: SwitchService, useClass: MockSwitchService },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      })
        .compileComponents()
        .then(() => {
          switchService = TestBed.inject(SwitchService);
          fixture = TestBed.createComponent(AppComponent);
          component = fixture.componentInstance;
        });
    })
  );

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'angular-my-notes'`, () => {
    expect(component.title).toEqual('angular-my-notes');
  });

  it('should display form list after click button', () => {
    switchService.route = 'notesList';
    fixture.detectChanges();
    const buttonEl = fixture.debugElement.query(By.css('.addButton'));

    buttonEl.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(switchService.route).toEqual('noteForm');
  });
});
