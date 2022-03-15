import { Component } from '@angular/core';
import { SwitchService } from './switch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public switchService: SwitchService) {}

  title = 'angular-my-notes';
}
